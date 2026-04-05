"use client";

import { useState, useRef, useEffect } from "react";

const teamMembers = [
  {
    name: "Rohan Malik",
    role: "CEO",
    phone: "916387142699",
    image: "/images/team/rohan.png",
    imagePosition: "center 85%",
    imageScale: false,
    status: "online" as const,
  },
  {
    name: "Mayank Goyal",
    role: "CTO",
    image: "/images/team/mayank.png",
    imagePosition: "center center",
    imageScale: true,
    phone: "917014474484",
    status: "online" as const,
  },
];

export function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (widgetRef.current && !widgetRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChat = (phone: string) => {
    const message = encodeURIComponent(
      "Hi! I'm interested in learning more about GenosAI's services."
    );
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  return (
    <div ref={widgetRef} className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3">
      {/* Expanded Panel */}
      <div
        className={`
          origin-bottom-right transition-all duration-300 ease-out
          ${isOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-90 translate-y-4 pointer-events-none"
          }
        `}
      >
        <div className="w-[320px] rounded-2xl overflow-hidden shadow-2xl shadow-black/40 border border-white/[0.08] backdrop-blur-sm">
          {/* Header */}
          <div className="bg-[#075E54] px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold text-[15px] leading-tight">
                  Chat with us
                </h3>
                <p className="text-white/70 text-xs mt-0.5">
                  Typically replies within minutes
                </p>
              </div>
            </div>
          </div>

          {/* Chat Background */}
          <div
            className="px-4 py-4 flex flex-col gap-3"
            style={{
              backgroundColor: "#0b141a",
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          >
            {/* Team Members */}
            {teamMembers.map((member) => (
              <button
                key={member.phone}
                onClick={() => handleChat(member.phone)}
                className="group flex items-center gap-3 w-full p-3 rounded-xl bg-white/[0.05] hover:bg-[#075E54]/30 border border-white/[0.06] hover:border-[#25D366]/30 transition-all duration-200 cursor-pointer"
              >
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-white/10 ring-2 ring-white/10 group-hover:ring-[#25D366]/40 transition-all">
                    <img
                      src={member.image}
                      alt={member.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                      style={{
                        ...(member.imagePosition ? { objectPosition: member.imagePosition } : {}),
                        ...(member.imageScale ? { transform: "scale(1.6)" } : {}),
                      }}
                    />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#25D366] rounded-full border-2 border-[#0b141a]" />
                </div>

                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium text-sm truncate">
                      {member.name}
                    </span>
                    <span className="text-[10px] font-medium text-[#25D366]/80 bg-[#25D366]/10 px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                      {member.role}
                    </span>
                  </div>
                  <p className="text-white/50 text-xs mt-0.5">
                    {member.status === "online" ? "Online" : "Offline"} · Click to chat
                  </p>
                </div>

                <svg
                  className="w-4 h-4 text-white/30 group-hover:text-[#25D366] group-hover:translate-x-0.5 transition-all shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}
          </div>

          <div className="bg-[#0b141a] border-t border-white/[0.06] px-4 py-2.5">
            <p className="text-white/30 text-[10px] text-center">
              Powered by WhatsApp
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          group relative w-[60px] h-[60px] rounded-full flex items-center justify-center
          shadow-lg shadow-[#25D366]/20 hover:shadow-xl hover:shadow-[#25D366]/30
          transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer
          ${isOpen ? "bg-[#075E54]" : "bg-[#25D366]"}
        `}
        aria-label="Chat on WhatsApp"
      >
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-wa-ping" />
        )}

        <svg
          className={`w-7 h-7 text-white transition-transform duration-300 ${isOpen ? "rotate-90 scale-0" : "rotate-0 scale-100"}`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>

        <svg
          className={`absolute w-6 h-6 text-white transition-transform duration-300 ${isOpen ? "rotate-0 scale-100" : "-rotate-90 scale-0"}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}