/* ============================================
   RM Agency — Scroll-Driven Website Engine
   ============================================ */

(function () {
  "use strict";

  // ---- Configuration ----
  const FRAME_DIR = "frames/";
  const FRAME_PREFIX = "frame_";
  const FRAME_EXT = ".webp";
  const FRAME_SPEED = 2.0;        // 1.8-2.2 — product animation completes by ~55% scroll
  const IMAGE_SCALE = 0.85;       // 0.82-0.90 sweet spot
  const INITIAL_LOAD = 10;        // Fast first paint — load 10 frames immediately

  // ---- DOM refs ----
  const loader = document.getElementById("loader");
  const loaderBar = document.getElementById("loader-bar");
  const loaderPercent = document.getElementById("loader-percent");
  const heroSection = document.getElementById("hero");
  const canvasWrap = document.getElementById("canvas-wrap");
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const scrollContainer = document.getElementById("scroll-container");
  const darkOverlay = document.getElementById("dark-overlay");

  // ---- State ----
  let FRAME_COUNT = 0;
  const frames = [];
  let currentFrame = -1;
  let bgColor = "#0e0e0e";

  // ---- Detect frame count ----
  // We try loading frames sequentially until one fails.
  // This is set after preloading.

  // ---- Canvas sizing ----
  function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    ctx.scale(dpr, dpr);
    if (currentFrame >= 0) drawFrame(currentFrame);
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  // ---- Background color sampler ----
  function sampleBgColor(img) {
    const tmpCanvas = document.createElement("canvas");
    const tmpCtx = tmpCanvas.getContext("2d");
    tmpCanvas.width = img.naturalWidth;
    tmpCanvas.height = img.naturalHeight;
    tmpCtx.drawImage(img, 0, 0);

    const corners = [
      tmpCtx.getImageData(2, 2, 1, 1).data,
      tmpCtx.getImageData(img.naturalWidth - 3, 2, 1, 1).data,
      tmpCtx.getImageData(2, img.naturalHeight - 3, 1, 1).data,
      tmpCtx.getImageData(img.naturalWidth - 3, img.naturalHeight - 3, 1, 1).data,
    ];

    let r = 0, g = 0, b = 0;
    corners.forEach(function (c) { r += c[0]; g += c[1]; b += c[2]; });
    r = Math.round(r / 4);
    g = Math.round(g / 4);
    b = Math.round(b / 4);
    return "rgb(" + r + "," + g + "," + b + ")";
  }

  // ---- Draw frame ----
  function drawFrame(index) {
    const img = frames[index];
    if (!img) return;

    const dpr = window.devicePixelRatio || 1;
    const cw = window.innerWidth;
    const ch = window.innerHeight;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const scale = Math.max(cw / iw, ch / ih) * IMAGE_SCALE;
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
  }

  // ---- Frame loader ----
  function framePath(i) {
    const num = String(i).padStart(4, "0");
    return FRAME_DIR + FRAME_PREFIX + num + FRAME_EXT;
  }

  function loadImage(index) {
    return new Promise(function (resolve, reject) {
      const img = new Image();
      img.onload = function () { resolve(img); };
      img.onerror = function () { reject(index); };
      img.src = framePath(index);
    });
  }

  async function detectFrameCount() {
    // Binary search for max frame index
    let lo = 1, hi = 600, lastGood = 0;
    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      try {
        await loadImage(mid);
        lastGood = mid;
        lo = mid + 1;
      } catch (e) {
        hi = mid - 1;
      }
    }
    return lastGood;
  }

  async function preloadFrames() {
    FRAME_COUNT = await detectFrameCount();

    if (FRAME_COUNT === 0) {
      // No frames found — hide loader and show hero only
      loader.classList.add("hidden");
      heroSection.style.opacity = "1";
      animateHero();
      return;
    }

    let loaded = 0;

    function updateProgress() {
      loaded++;
      const pct = Math.round((loaded / FRAME_COUNT) * 100);
      loaderBar.style.width = pct + "%";
      loaderPercent.textContent = pct + "%";
    }

    // Phase 1: Load first N frames for fast paint
    const firstBatch = Math.min(INITIAL_LOAD, FRAME_COUNT);
    for (let i = 1; i <= firstBatch; i++) {
      try {
        frames[i] = await loadImage(i);
        updateProgress();
        if (i % 20 === 0) bgColor = sampleBgColor(frames[i]);
      } catch (e) {
        // skip broken frame
      }
    }

    // Draw first frame immediately
    if (frames[1]) {
      bgColor = sampleBgColor(frames[1]);
      currentFrame = 1;
      drawFrame(1);
    }

    // Phase 2: Load remaining frames in parallel batches
    const batchSize = 8;
    for (let start = firstBatch + 1; start <= FRAME_COUNT; start += batchSize) {
      const batch = [];
      for (let i = start; i < start + batchSize && i <= FRAME_COUNT; i++) {
        batch.push(
          loadImage(i)
            .then(function (img) {
              frames[i] = img;
              updateProgress();
              if (i % 20 === 0) bgColor = sampleBgColor(img);
            })
            .catch(function () { updateProgress(); })
        );
      }
      await Promise.all(batch);
    }

    // All loaded — init
    loader.classList.add("hidden");
    initScrollEngine();
    animateHero();
  }

  // ---- Hero entrance animation ----
  function animateHero() {
    const words = heroSection.querySelectorAll(".hero-heading span");
    const tagline = heroSection.querySelector(".hero-tagline");
    const indicator = heroSection.querySelector(".scroll-indicator");
    const label = heroSection.querySelector(".section-label");

    gsap.to(label, { opacity: 1, y: 0, duration: 0.6, delay: 0.2 });
    gsap.to(words, {
      opacity: 1, y: 0, stagger: 0.1, duration: 0.9,
      ease: "power3.out", delay: 0.4
    });
    gsap.to(tagline, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 1.0 });
    gsap.to(indicator, { opacity: 1, duration: 0.6, delay: 1.5 });
  }

  // ---- Lenis Smooth Scroll ----
  const lenis = new Lenis({
    duration: 1.2,
    easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
    smoothWheel: true,
  });

  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
  gsap.ticker.lagSmoothing(0);

  // ---- Scroll Engine ----
  function initScrollEngine() {
    initFrameScroll();
    initHeroTransition();
    initSections();
    initMarquee();
    initDarkOverlay();
    initCounters();
  }

  // ---- Frame-to-scroll binding ----
  function initFrameScroll() {
    ScrollTrigger.create({
      trigger: scrollContainer,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: function (self) {
        const accelerated = Math.min(self.progress * FRAME_SPEED, 1);
        const index = Math.max(1, Math.min(Math.floor(accelerated * FRAME_COUNT) + 1, FRAME_COUNT));
        if (index !== currentFrame) {
          currentFrame = index;
          requestAnimationFrame(function () { drawFrame(currentFrame); });
        }
      },
    });
  }

  // ---- Circle-wipe hero reveal ----
  function initHeroTransition() {
    ScrollTrigger.create({
      trigger: scrollContainer,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: function (self) {
        var p = self.progress;
        // Hero fades out
        heroSection.style.opacity = Math.max(0, 1 - p * 15);
        // Canvas reveals via expanding circle
        var wipeProgress = Math.min(1, Math.max(0, (p - 0.01) / 0.06));
        var radius = wipeProgress * 75;
        canvasWrap.style.clipPath = "circle(" + radius + "% at 50% 50%)";
      },
    });
  }

  // ---- Section animations ----
  function initSections() {
    var sections = document.querySelectorAll(".scroll-section");

    sections.forEach(function (section) {
      var type = section.dataset.animation;
      var persist = section.dataset.persist === "true";
      var enter = parseFloat(section.dataset.enter) / 100;
      var leave = parseFloat(section.dataset.leave) / 100;
      var children = section.querySelectorAll(
        ".section-label, .section-heading, .section-body, .section-note, .cta-button, .stat"
      );

      // Build timeline
      var tl = gsap.timeline({ paused: true });

      switch (type) {
        case "fade-up":
          tl.from(children, { y: 50, opacity: 0, stagger: 0.12, duration: 0.9, ease: "power3.out" });
          break;
        case "slide-left":
          tl.from(children, { x: -80, opacity: 0, stagger: 0.14, duration: 0.9, ease: "power3.out" });
          break;
        case "slide-right":
          tl.from(children, { x: 80, opacity: 0, stagger: 0.14, duration: 0.9, ease: "power3.out" });
          break;
        case "scale-up":
          tl.from(children, { scale: 0.85, opacity: 0, stagger: 0.12, duration: 1.0, ease: "power2.out" });
          break;
        case "rotate-in":
          tl.from(children, { y: 40, rotation: 3, opacity: 0, stagger: 0.1, duration: 0.9, ease: "power3.out" });
          break;
        case "stagger-up":
          tl.from(children, { y: 60, opacity: 0, stagger: 0.15, duration: 0.8, ease: "power3.out" });
          break;
        case "clip-reveal":
          tl.from(children, { clipPath: "inset(100% 0 0 0)", opacity: 0, stagger: 0.15, duration: 1.2, ease: "power4.inOut" });
          break;
      }

      var played = false;

      ScrollTrigger.create({
        trigger: scrollContainer,
        start: "top top",
        end: "bottom bottom",
        scrub: false,
        onUpdate: function (self) {
          var p = self.progress;
          var inRange = p >= enter && p <= leave;

          if (inRange) {
            section.classList.add("visible");
            if (!played) {
              tl.play();
              played = true;
            }
          } else if (!persist || p < enter) {
            section.classList.remove("visible");
            if (played && !persist) {
              tl.reverse();
              played = false;
            }
          }
        },
      });
    });
  }

  // ---- Counter animations ----
  function initCounters() {
    document.querySelectorAll(".stat-number").forEach(function (el) {
      var target = parseFloat(el.dataset.value);
      var decimals = parseInt(el.dataset.decimals || "0", 10);

      gsap.from(el, {
        textContent: 0,
        duration: 2,
        ease: "power1.out",
        snap: { textContent: decimals === 0 ? 1 : 0.1 },
        scrollTrigger: {
          trigger: el.closest(".scroll-section"),
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
        onUpdate: function () {
          var val = parseFloat(el.textContent);
          el.textContent = val.toFixed(decimals);
        },
      });
    });
  }

  // ---- Marquee ----
  function initMarquee() {
    document.querySelectorAll(".marquee-wrap").forEach(function (el) {
      var speed = parseFloat(el.dataset.scrollSpeed) || -25;

      // Fade marquee in/out mid-scroll
      ScrollTrigger.create({
        trigger: scrollContainer,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: function (self) {
          var p = self.progress;
          // Show marquee between 20% and 80% scroll
          var opacity = 0;
          if (p > 0.15 && p < 0.20) opacity = (p - 0.15) / 0.05;
          else if (p >= 0.20 && p <= 0.75) opacity = 1;
          else if (p > 0.75 && p < 0.80) opacity = 1 - (p - 0.75) / 0.05;
          el.style.opacity = opacity;
        },
      });

      gsap.to(el.querySelector(".marquee-text"), {
        xPercent: speed,
        ease: "none",
        scrollTrigger: {
          trigger: scrollContainer,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
    });
  }

  // ---- Dark overlay for stats ----
  function initDarkOverlay() {
    // Find stats section enter/leave
    var statsSection = document.querySelector(".section-stats");
    if (!statsSection) return;

    var enter = parseFloat(statsSection.dataset.enter) / 100;
    var leave = parseFloat(statsSection.dataset.leave) / 100;
    var fadeRange = 0.04;

    ScrollTrigger.create({
      trigger: scrollContainer,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: function (self) {
        var p = self.progress;
        var opacity = 0;
        if (p >= enter - fadeRange && p <= enter) {
          opacity = (p - (enter - fadeRange)) / fadeRange;
        } else if (p > enter && p < leave) {
          opacity = 0.9;
        } else if (p >= leave && p <= leave + fadeRange) {
          opacity = 0.9 * (1 - (p - leave) / fadeRange);
        }
        darkOverlay.style.opacity = opacity;
      },
    });
  }

  // ---- Boot ----
  preloadFrames();
})();
