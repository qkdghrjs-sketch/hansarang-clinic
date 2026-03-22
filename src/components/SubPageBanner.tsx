"use client";

import { useEffect, useState } from "react";

interface SubPageBannerProps {
  category: string;
  title: string;
  breadcrumb: string[];
}

export default function SubPageBanner({ category, title, breadcrumb }: SubPageBannerProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div
      className="relative overflow-hidden flex items-end h-[160px] md:h-[220px] pt-[60px] md:pt-[76px]"
      style={{
        background: "linear-gradient(135deg, #0a1628, #0f2a3a, #1a3a4a)",
      }}
    >
      {/* BG glows */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-60px", right: "-80px", width: 450, height: 450, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(56,178,240,0.12), transparent 70%)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-60px", left: "-60px", width: 350, height: 350, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(14,165,170,0.08), transparent 70%)",
        }}
      />

      <div
        className="relative z-10 max-w-[1280px] mx-auto w-full px-5 md:px-6 lg:px-12 pb-6 md:pb-8"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        {/* Category + Title */}
        <div className="text-center mb-4">
          <div
            className="text-xs font-semibold tracking-[2.5px] uppercase mb-3"
            style={{ fontFamily: "var(--font-outfit)", color: "#38b2f0" }}
          >
            {category}
          </div>
          <h1
            className="font-bold text-white leading-[1.2] tracking-tight"
            style={{
              fontFamily: "var(--font-noto-serif-kr)",
              fontSize: "clamp(22px, 5vw, 48px)",
            }}
          >
            {title}
          </h1>
        </div>

        {/* Breadcrumb */}
        <div className="flex justify-center gap-0 text-[11px] md:text-[13px]">
          {breadcrumb.map((item, i) => (
            <span key={i} className="flex items-center">
              {i > 0 && (
                <span className="mx-2" style={{ color: "rgba(255,255,255,0.25)" }}>&gt;</span>
              )}
              <span
                style={{
                  color: i === breadcrumb.length - 1 ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.5)",
                  fontWeight: i === breadcrumb.length - 1 ? 600 : 400,
                }}
              >
                {item}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
