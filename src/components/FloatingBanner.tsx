"use client";

import { useEffect, useState } from "react";

interface FloatBtn {
  href: string;
  target?: string;
  bg: string;
  hoverBg: string;
  color: string;
  icon: React.ReactNode;
  label: string;
}

const buttons: FloatBtn[] = [
  {
    href: "https://naver.me/FvEgeFyj",
    target: "_blank",
    bg: "#03C75A",
    hoverBg: "#02b351",
    color: "#ffffff",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
        <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727z" />
      </svg>
    ),
    label: "예약하기",
  },
  {
    href: "https://place.map.kakao.com/9589940?referrer=daumsearch_local",
    target: "_blank",
    bg: "#FEE500",
    hoverBg: "#f5dc00",
    color: "#3A1D1D",
    icon: (
      <svg width="21" height="21" viewBox="0 0 256 256" fill="#3A1D1D">
        <path d="M128 36C70.562 36 24 72.013 24 116c0 29.093 18.882 54.628 47.552 69.253l-9.962 36.853a3.5 3.5 0 005.32 3.932l42.169-28.191C115.328 199.267 121.6 200 128 200c57.438 0 104-36.013 104-84S185.438 36 128 36z" />
      </svg>
    ),
    label: "카카오맵",
  },
  {
    href: "tel:031-912-8720",
    bg: "#1a9de0",
    hoverBg: "#158bc9",
    color: "#ffffff",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
    label: "전화하기",
  },
];

export default function FloatingBanner() {
  const [visible, setVisible] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const size = 52;

  return (
    <div
      className="fixed z-[9999] flex-col gap-3 hidden md:flex"
      style={{
        bottom: 32,
        right: 32,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.3s ease, transform 0.3s ease",
      }}
    >
      {buttons.map((btn, i) => {
        const isHovered = hoveredIdx === i;
        return (
          <a
            key={btn.label}
            href={btn.href}
            target={btn.target}
            rel={btn.target === "_blank" ? "noopener noreferrer" : undefined}
            className="flex items-center no-underline overflow-hidden"
            style={{
              width: isHovered ? 140 : size,
              height: size,
              minWidth: size,
              borderRadius: 9999,
              background: isHovered ? btn.hoverBg : btn.bg,
              color: btn.color,
              boxShadow: isHovered
                ? "0 8px 28px rgba(0,0,0,0.22)"
                : "0 4px 16px rgba(0,0,0,0.15)",
              paddingLeft: isHovered ? 15 : 0,
              paddingRight: isHovered ? 16 : 0,
              gap: isHovered ? 10 : 0,
              justifyContent: "center",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            <span
              className="flex items-center justify-center flex-shrink-0"
              style={{ width: 22, height: 22 }}
            >
              {btn.icon}
            </span>
            <span
              className="text-[12px] font-bold whitespace-nowrap"
              style={{
                opacity: isHovered ? 1 : 0,
                transition: "opacity 0.2s ease 0.1s",
              }}
            >
              {btn.label}
            </span>
          </a>
        );
      })}
    </div>
  );
}
