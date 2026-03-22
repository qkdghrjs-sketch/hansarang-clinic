"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

const navItems = [
  {
    label: "본원소개",
    href: "/about/greeting",
    children: [
      { label: "인사말", href: "/about/greeting" },
      { label: "의료진소개", href: "/about/doctors" },
      { label: "진료시간표", href: "/about/hours" },
      { label: "병원둘러보기", href: "/about/tour" },
      { label: "보유장비", href: "/about/equipment" },
      { label: "찾아오시는길", href: "/about/location" },
    ],
  },
  {
    label: "종합검진센터",
    href: "/checkup/intro",
    children: [
      { label: "종합검진센터소개", href: "/checkup/intro" },
      { label: "종합검진프로그램", href: "/checkup/program" },
      { label: "채용검진프로그램", href: "/checkup/employment" },
      { label: "종합검진 주의사항", href: "/checkup/notice" },
    ],
  },
  {
    label: "국민건강보험공단검진",
    href: "/nhis/intro",
    children: [
      { label: "검진센터 소개", href: "/nhis/intro" },
      { label: "일반검진", href: "/nhis/general" },
      { label: "암검진", href: "/nhis/cancer" },
      { label: "생애전환기검진", href: "/nhis/lifecycle" },
      { label: "검진시 주의사항", href: "/nhis/caution" },
    ],
  },
  {
    label: "내시경센터",
    href: "/endoscopy/room",
    children: [
      { label: "내시경실", href: "/endoscopy/room" },
      { label: "내시경소독", href: "/endoscopy/disinfection" },
      { label: "위 내시경", href: "/endoscopy/gastro" },
      { label: "대장항문 내시경", href: "/endoscopy/colon" },
    ],
  },
];

export default function SubPageHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Body scroll lock
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    setOpenAccordion(null);
  }, []);

  const toggleAccordion = (idx: number) => {
    setOpenAccordion((prev) => (prev === idx ? null : idx));
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[200] transition-all duration-300">
      <div
        className={`bg-white/92 backdrop-blur-[20px] border-b border-[rgba(56,178,240,0.12)] transition-shadow duration-300 ${
          scrolled ? "shadow-[0_4px_32px_rgba(56,178,240,0.12)]" : ""
        }`}
      >
        {/* Desktop: 76px height / Mobile: 60px height */}
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 h-[60px] md:h-[76px] flex items-center justify-between gap-8">
          {/* Logo - mobile: 36px height / desktop: 48px height */}
          <Link href="/" className="flex items-center">
            <Image
              src="https://cdn.imweb.me/upload/S20260108b9005a7eb2710/409b9bd75d692.png"
              alt="한사랑속편한내과"
              width={180}
              height={48}
              className="h-[36px] w-auto md:h-[48px]"
              style={{ objectFit: "contain" }}
              unoptimized
              priority
            />
          </Link>

          {/* Desktop Nav - hidden below md */}
          <nav className="hidden md:flex items-center h-[76px]">
            {navItems.map((item) => (
              <div key={item.label} className="relative h-full flex items-center group">
                <Link
                  href={item.href}
                  className="px-[18px] text-[14px] font-semibold text-[#1a3a4a] no-underline tracking-tight h-full flex items-center whitespace-nowrap transition-colors relative
                    after:content-[''] after:absolute after:bottom-0 after:left-[18px] after:right-[18px] after:h-[2.5px] after:bg-[#1a9de0] after:rounded-t-sm after:scale-x-0 after:transition-transform after:duration-250
                    hover:text-[#1a9de0] hover:after:scale-x-100"
                >
                  {item.label}
                </Link>
                <div className="absolute top-[calc(100%+2px)] left-1/2 -translate-x-1/2 translate-y-[10px] bg-white border border-[#dceef8] rounded-[14px] shadow-[0_12px_48px_rgba(26,157,224,0.16)] min-w-[158px] py-[10px] opacity-0 pointer-events-none transition-all duration-200 z-[500]
                  before:content-[''] before:absolute before:top-[-6px] before:left-1/2 before:-translate-x-1/2 before:w-3 before:h-[6px] before:bg-white before:[clip-path:polygon(50%_0%,0%_100%,100%_100%)]
                  group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0">
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      className="block px-[22px] py-[11px] text-[13.5px] font-normal text-[#4a7a90] no-underline whitespace-nowrap transition-all duration-200 hover:text-[#1a9de0] hover:bg-[#f0f9ff] hover:pl-7"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* Desktop Actions - hidden below md */}
          <div className="hidden md:flex gap-[10px] items-center">
            <a
              href="tel:031-912-8720"
              className="flex items-center gap-2 bg-[#f0f9ff] text-[#1a9de0] border-[1.5px] border-[#e0f4fd] px-[18px] py-[9px] rounded-[10px] text-[13px] font-semibold no-underline transition-all hover:bg-[#e0f4fd] hover:border-[#7dd3f8]"
            >
              📞 031-912-8720
            </a>
            <a
              href="tel:031-912-8720"
              className="bg-gradient-to-br from-[#38b2f0] to-[#1a9de0] text-white px-[22px] py-[10px] rounded-[10px] text-[13px] font-bold no-underline shadow-[0_4px_16px_rgba(56,178,240,0.30)] transition-all hover:-translate-y-[1px] hover:shadow-[0_6px_22px_rgba(56,178,240,0.40)]"
            >
              진료 예약
            </a>
          </div>

          {/* Mobile hamburger - visible below md */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 relative z-[310]"
            onClick={() => {
              if (mobileOpen) {
                closeMobile();
              } else {
                setMobileOpen(true);
              }
            }}
            aria-label={mobileOpen ? "메뉴 닫기" : "메뉴 열기"}
          >
            <span
              className={`block w-6 h-[2px] bg-[#1a3a4a] transition-all duration-300 ${
                mobileOpen ? "rotate-45 translate-y-[3.5px]" : ""
              }`}
            />
            <span
              className={`block w-6 h-[2px] bg-[#1a3a4a] transition-all duration-300 mt-[5px] ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-[2px] bg-[#1a3a4a] transition-all duration-300 mt-[5px] ${
                mobileOpen ? "-rotate-45 -translate-y-[8.5px]" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Full-screen mobile menu overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-black/40 z-[250] transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMobile}
      />

      {/* Slide-in mobile menu panel */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-[85%] max-w-[360px] bg-white z-[300] shadow-[-8px_0_32px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-in-out overflow-y-auto ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Mobile menu header */}
        <div className="h-[60px] flex items-center justify-between px-6 border-b border-[#dceef8]">
          <Link href="/" onClick={closeMobile} className="flex items-center">
            <Image
              src="https://cdn.imweb.me/upload/S20260108b9005a7eb2710/409b9bd75d692.png"
              alt="한사랑속편한내과"
              width={130}
              height={36}
              className="h-[36px] w-auto"
              style={{ objectFit: "contain" }}
              unoptimized
            />
          </Link>
          <button
            onClick={closeMobile}
            className="w-10 h-10 flex items-center justify-center"
            aria-label="메뉴 닫기"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a3a4a" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Accordion nav */}
        <nav className="px-4 py-4">
          {navItems.map((item, idx) => (
            <div key={item.label} className="border-b border-[#eef6fc] last:border-0">
              <button
                onClick={() => toggleAccordion(idx)}
                className="w-full flex items-center justify-between py-4 px-2 text-left"
              >
                <span className="text-[15px] font-semibold text-[#1a3a4a]">
                  {item.label}
                </span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className={`transition-transform duration-300 ${
                    openAccordion === idx ? "rotate-180" : ""
                  }`}
                >
                  <path
                    d="M5 7.5L10 12.5L15 7.5"
                    stroke="#1a9de0"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openAccordion === idx ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="pl-4 pb-3">
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      onClick={closeMobile}
                      className="block py-[10px] px-2 text-[14px] text-[#4a7a90] no-underline transition-colors duration-200 hover:text-[#1a9de0] hover:bg-[#f0f9ff] rounded-lg"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </nav>

        {/* Mobile action buttons */}
        <div className="px-6 py-4 border-t border-[#eef6fc]">
          <a
            href="tel:031-912-8720"
            className="flex items-center justify-center gap-2 bg-[#f0f9ff] text-[#1a9de0] border-[1.5px] border-[#e0f4fd] py-3 rounded-[10px] text-[14px] font-semibold no-underline mb-3 transition-all hover:bg-[#e0f4fd]"
          >
            📞 031-912-8720
          </a>
          <a
            href="tel:031-912-8720"
            className="flex items-center justify-center bg-gradient-to-br from-[#38b2f0] to-[#1a9de0] text-white py-3 rounded-[10px] text-[14px] font-bold no-underline shadow-[0_4px_16px_rgba(56,178,240,0.30)] transition-all"
          >
            진료 예약
          </a>
        </div>
      </div>
    </header>
  );
}
