"use client";

import { useEffect, useState } from "react";

interface FloatBtn {
  href: string;
  target?: string;
  bg: string;
  color: string;
  icon: React.ReactNode;
  label: string;
}

const buttons: FloatBtn[] = [
  {
    href: "https://naver.me/FvEgeFyj",
    target: "_blank",
    bg: "#03C75A",
    color: "#ffffff",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="white" className="block flex-shrink-0">
        <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727z" />
      </svg>
    ),
    label: "예약하기",
  },
  {
    href: "https://place.map.kakao.com/9589940?referrer=daumsearch_local",
    target: "_blank",
    bg: "#FEE500",
    color: "#3A1D1D",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#3A1D1D" className="block flex-shrink-0">
        <path d="M12 3C6.477 3 2 6.582 2 11c0 2.67 1.487 5.03 3.8 6.56L4.5 21l4.07-2.15C9.6 19.27 10.78 19.4 12 19.4c5.523 0 10-3.582 10-8.4C22 6.582 17.523 3 12 3z" />
      </svg>
    ),
    label: "카카오톡",
  },
  {
    href: "tel:031-912-8720",
    bg: "#1a9de0",
    color: "#ffffff",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="white" className="block flex-shrink-0">
        <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.58a1 1 0 01-.24 1.01l-2.21 2.2z" />
      </svg>
    ),
    label: "전화하기",
  },
];

export default function FloatingBanner() {
  const [visible, setVisible] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const size = isMobile ? 48 : 52;

  return (
    <div
      className="fixed z-[9999] flex flex-col gap-3 hidden md:flex"
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
        const isHovered = hoveredIdx === i && !isMobile;
        return (
          <a
            key={btn.label}
            href={btn.href}
            target={btn.target}
            rel={btn.target === "_blank" ? "noopener noreferrer" : undefined}
            className="flex items-center justify-center no-underline overflow-hidden"
            style={{
              width: isHovered ? 130 : size,
              height: size,
              minWidth: size,
              borderRadius: 9999,
              background: btn.bg,
              color: btn.color,
              boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
              padding: isHovered ? "0 18px" : "0",
              gap: isHovered ? 8 : 0,
              justifyContent: isHovered ? "flex-start" : "center",
              transition: "width 0.3s ease, padding 0.3s ease, gap 0.3s ease, justify-content 0.3s ease",
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
            {!isMobile && (
              <span
                className="text-[12px] font-bold whitespace-nowrap"
                style={{
                  opacity: isHovered ? 1 : 0,
                  transition: "opacity 0.2s ease 0.1s",
                }}
              >
                {btn.label}
              </span>
            )}
          </a>
        );
      })}
    </div>
  );
}
