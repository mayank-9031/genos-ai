'use client';

import { useEffect } from 'react';

export default function AnimationPage() {
  useEffect(() => {
    const embedScript = document.createElement('script');
    embedScript.type = 'text/javascript';
    embedScript.textContent = `
      !function(){
        if(!window.UnicornStudio){
          window.UnicornStudio={isInitialized:false};
          var i=document.createElement("script");
          i.src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.33/dist/unicornStudio.umd.js";
          i.onload=function(){
            window.UnicornStudio.isInitialized||(UnicornStudio.init(),window.UnicornStudio.isInitialized=true)
          };
          (document.head||document.body).appendChild(i)
        }
      }();
    `;
    document.head.appendChild(embedScript);

    const brandStyle = document.createElement('style');
    brandStyle.id = 'us-brand-hide';
    brandStyle.textContent = `
      [data-us-project] a[href*="unicorn"],
      [data-us-project] div[title*="Made with"],
      [data-us-project] .unicorn-brand,
      [data-us-project] [class*="brand"],
      [data-us-project] [class*="watermark"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        position: absolute !important;
        left: -9999px !important;
      }
    `;
    document.head.appendChild(brandStyle);

    const hideBranding = () => {
      document.querySelectorAll('[data-us-project] *').forEach(el => {
        const text = (el.textContent || '').toLowerCase();
        const href = (el.getAttribute('href') || '').toLowerCase();
        if (text.includes('made with') || text.includes('unicorn') || href.includes('unicorn.studio')) {
          (el as HTMLElement).style.cssText = 'display:none!important;visibility:hidden!important;opacity:0!important;position:absolute!important;left:-9999px!important;';
          try { el.remove(); } catch (_) {}
        }
      });
    };

    hideBranding();
    const interval = setInterval(hideBranding, 200);
    const t1 = setTimeout(hideBranding, 1000);
    const t2 = setTimeout(hideBranding, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(t1);
      clearTimeout(t2);
      document.head.removeChild(embedScript);
      const s = document.getElementById('us-brand-hide');
      if (s) document.head.removeChild(s);
    };
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-black">

      {/*
        SVG filter: blur spreads isolated dots to near-zero density,
        feColorMatrix threshold keeps only the dense Sisyphus region,
        feComposite masks the original sharp pixels with that density map.
      */}
      <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
        <defs>
          <filter id="remove-dots" x="0%" y="0%" width="100%" height="100%" color-interpolation-filters="sRGB">

            {/* Pass 1 — wide blur: sparse dots average to near-zero, dense Sisyphus region stays bright */}
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="wide-blur" />

            {/* Pass 2 — tight blur: for fine-detail preservation in the sharp composite later */}
            <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="tight-blur" />

            {/* Pass 3 — density threshold: alpha = (R+G+B)*6 - 2.2, clips anything below ~37% local brightness */}
            <feColorMatrix
              type="matrix"
              in="wide-blur"
              values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      6 6 6 0 -2.2"
              result="density-mask"
            />

            {/* Pass 4 — apply density mask to tight-blurred source (preserves edge detail, removes isolated dots) */}
            <feComposite in="tight-blur" in2="density-mask" operator="in" result="masked" />

            {/* Pass 5 — contrast boost: push whites brighter, blacks deeper */}
            <feComponentTransfer in="masked" result="contrasted">
              <feFuncR type="gamma" amplitude="1.4" exponent="0.75" offset="0" />
              <feFuncG type="gamma" amplitude="1.4" exponent="0.75" offset="0" />
              <feFuncB type="gamma" amplitude="1.4" exponent="0.75" offset="0" />
            </feComponentTransfer>

            {/* Pass 6 — subtle sharpen: merge contrasted with a high-pass layer */}
            <feGaussianBlur in="contrasted" stdDeviation="0.6" result="hp-blur" />
            <feComposite in="contrasted" in2="hp-blur" operator="arithmetic" k1="0" k2="2" k3="-1" k4="0" />

          </filter>
        </defs>
      </svg>

      {/* Sisyphus ASCII animation — full screen, sparse dots removed via density filter */}
      <div
        className="absolute inset-0 w-full h-full hidden lg:block pointer-events-none"
        style={{ filter: 'url(#remove-dots)' }}
      >
        <div
          data-us-project="OMzqyUv6M3kSnv0JeAtC"
          style={{ width: '100%', height: '100%', minHeight: '100vh' }}
        />
      </div>

      {/* Corner frame accents */}
      <div className="absolute top-0 left-0 w-8 h-8 lg:w-12 lg:h-12 border-t-2 border-l-2 border-white/30 z-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-8 h-8 lg:w-12 lg:h-12 border-t-2 border-r-2 border-white/30 z-20 pointer-events-none" />
      <div className="absolute left-0 w-8 h-8 lg:w-12 lg:h-12 border-b-2 border-l-2 border-white/30 z-20 pointer-events-none" style={{ bottom: '5vh' }} />
      <div className="absolute right-0 w-8 h-8 lg:w-12 lg:h-12 border-b-2 border-r-2 border-white/30 z-20 pointer-events-none" style={{ bottom: '5vh' }} />

      {/* Top header bar */}
      <div className="absolute top-0 left-0 right-0 z-20 border-b border-white/20">
        <div className="container mx-auto px-4 lg:px-8 py-3 lg:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 lg:gap-4">
            <div className="font-mono text-white text-xl lg:text-2xl font-bold tracking-widest italic transform -skew-x-12">
              UIMIX
            </div>
            <div className="h-3 lg:h-4 w-px bg-white/40" />
            <span className="text-white/60 text-[8px] lg:text-[10px] font-mono">EST. 2025</span>
          </div>
          <div className="hidden lg:flex items-center gap-3 text-[10px] font-mono text-white/60">
            <span>LAT: 37.7749°</span>
            <div className="w-1 h-1 bg-white/40 rounded-full" />
            <span>LONG: 122.4194°</span>
          </div>
        </div>
      </div>

      {/* CTA content — right half on desktop, centered on mobile */}
      <div className="relative z-10 flex min-h-screen items-center justify-end pt-16 lg:pt-0" style={{ marginTop: '5vh' }}>
        <div className="w-full lg:w-1/2 px-6 lg:px-16 lg:pr-[10%]">
          <div className="max-w-lg relative lg:ml-auto">

            {/* Top decorative rule */}
            <div className="flex items-center gap-2 mb-3 opacity-60">
              <div className="w-8 h-px bg-white" />
              <span className="text-white text-[10px] font-mono tracking-wider">∞</span>
              <div className="flex-1 h-px bg-white" />
            </div>

            {/* Headline */}
            <div className="relative">
              <div className="hidden lg:block absolute -right-3 top-0 bottom-0 w-1 dither-pattern opacity-40" />
              <h1 className="text-2xl lg:text-5xl font-bold text-white mb-3 lg:mb-4 leading-tight font-mono tracking-wider whitespace-nowrap lg:-ml-[5%]" style={{ letterSpacing: '0.1em' }}>
                ENDLESS PURSUIT
              </h1>
            </div>

            {/* Dot row */}
            <div className="hidden lg:flex gap-1 mb-3 opacity-40">
              {Array.from({ length: 40 }).map((_, i) => (
                <div key={i} className="w-0.5 h-0.5 bg-white rounded-full" />
              ))}
            </div>

            {/* Body copy */}
            <div className="relative">
              <p className="text-xs lg:text-base text-gray-300 mb-5 lg:mb-6 leading-relaxed font-mono opacity-80">
                Like Sisyphus, we push forward — not despite the struggle, but because of it.
                Every iteration, every pixel, every line of code is our boulder.
              </p>
              <div className="hidden lg:block absolute -left-4 top-1/2 w-3 h-3 border border-white opacity-30" style={{ transform: 'translateY(-50%)' }}>
                <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white" style={{ transform: 'translate(-50%, -50%)' }} />
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-4">
              <button className="relative px-5 lg:px-6 py-2 lg:py-2.5 bg-transparent text-white font-mono text-xs lg:text-sm border border-white hover:bg-white hover:text-black transition-all duration-200 group cursor-pointer">
                <span className="hidden lg:block absolute -top-1 -left-1 w-2 h-2 border-t border-l border-white opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="hidden lg:block absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-white opacity-0 group-hover:opacity-100 transition-opacity" />
                BEGIN THE CLIMB
              </button>
              <button className="relative px-5 lg:px-6 py-2 lg:py-2.5 bg-transparent border border-white text-white font-mono text-xs lg:text-sm hover:bg-white hover:text-black transition-all duration-200 cursor-pointer">
                EMBRACE THE JOURNEY
              </button>
            </div>

            {/* Bottom notation */}
            <div className="hidden lg:flex items-center gap-2 mt-6 opacity-40">
              <span className="text-white text-[9px] font-mono">∞</span>
              <div className="flex-1 h-px bg-white" />
              <span className="text-white text-[9px] font-mono">SISYPHUS.PROTOCOL</span>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom status bar */}
      <div className="absolute left-0 right-0 z-20 border-t border-white/20 bg-black/40 backdrop-blur-sm" style={{ bottom: '5vh' }}>
        <div className="container mx-auto px-4 lg:px-8 py-2 lg:py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 lg:gap-6 text-[8px] lg:text-[9px] font-mono text-white/50">
            <span className="hidden lg:inline">SYSTEM.ACTIVE</span>
            <span className="lg:hidden">SYS.ACT</span>
            <div className="hidden lg:flex gap-1 items-end">
              {[12, 6, 14, 4, 10, 16, 8, 5].map((h, i) => (
                <div key={i} className="w-1 bg-white/30" style={{ height: `${h}px` }} />
              ))}
            </div>
            <span>V1.0.0</span>
          </div>
          <div className="flex items-center gap-2 lg:gap-4 text-[8px] lg:text-[9px] font-mono text-white/50">
            <span className="hidden lg:inline">◐ RENDERING</span>
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-white/60 rounded-full animate-pulse" />
              <div className="w-1 h-1 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-1 h-1 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
            <span className="hidden lg:inline">FRAME: ∞</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dither-pattern {
          background-image:
            repeating-linear-gradient(0deg, transparent 0px, transparent 1px, white 1px, white 2px),
            repeating-linear-gradient(90deg, transparent 0px, transparent 1px, white 1px, white 2px);
          background-size: 3px 3px;
        }
      `}</style>
    </main>
  );
}
