"use client";

import { useState, useEffect } from "react";
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

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
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

  const closeMobile = () => {
    setMobileOpen(false);
    setOpenCategory(null);
  };

  const toggleCategory = (label: string) => {
    setOpenCategory((prev) => (prev === label ? null : label));
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-300`}
    >
      <div
        className={`bg-white/92 backdrop-blur-[20px] border-b border-sky/12 transition-shadow duration-300 ${
          scrolled ? "shadow-[0_4px_32px_rgba(56,178,240,0.12)]" : ""
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-12 h-[60px] md:h-[76px] flex items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="https://cdn.imweb.me/upload/S20260108b9005a7eb2710/409b9bd75d692.png"
              alt="한사랑속편한내과"
              width={180}
              height={48}
              className="h-[36px] md:h-[48px] w-auto"
              style={{ objectFit: "contain" }}
              unoptimized
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center h-[76px]">
            {navItems.map((item) => (
              <div key={item.label} className="relative h-full flex items-center group">
                <Link
                  href={item.href}
                  className="px-[18px] text-[14px] font-semibold text-text no-underline tracking-tight h-full flex items-center whitespace-nowrap transition-colors relative
                    after:content-[''] after:absolute after:bottom-0 after:left-[18px] after:right-[18px] after:h-[2.5px] after:bg-sky-deep after:rounded-t-sm after:scale-x-0 after:transition-transform after:duration-250
                    hover:text-sky-deep hover:after:scale-x-100"
                >
                  {item.label}
                </Link>
                {/* Dropdown */}
                <div className="absolute top-[calc(100%+2px)] left-1/2 -translate-x-1/2 translate-y-[10px] bg-white border border-gray-100 rounded-[14px] shadow-[0_12px_48px_rgba(26,157,224,0.16)] min-w-[158px] py-[10px] opacity-0 pointer-events-none transition-all duration-200 z-[500]
                  before:content-[''] before:absolute before:top-[-6px] before:left-1/2 before:-translate-x-1/2 before:w-3 before:h-[6px] before:bg-white before:[clip-path:polygon(50%_0%,0%_100%,100%_100%)]
                  group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0">
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      className="block px-[22px] py-[11px] text-[13.5px] font-normal text-text-mid no-underline whitespace-nowrap transition-all duration-200 hover:text-sky-deep hover:bg-sky-pale hover:pl-7"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex gap-[10px] items-center">
            <a
              href="tel:031-912-8720"
              className="flex items-center gap-2 bg-sky-pale text-sky-deep border-[1.5px] border-sky-light px-[18px] py-[9px] rounded-[10px] text-[13px] font-semibold no-underline transition-all hover:bg-sky-light hover:border-sky-mid"
            >
              📞 031-912-8720
            </a>
            <a
              href="tel:031-912-8720"
              className="bg-gradient-to-br from-sky to-sky-deep text-white px-[22px] py-[10px] rounded-[10px] text-[13px] font-bold no-underline shadow-[0_4px_16px_rgba(56,178,240,0.30)] transition-all hover:-translate-y-[1px] hover:shadow-[0_6px_22px_rgba(56,178,240,0.40)]"
            >
              진료 예약
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden flex items-center justify-center w-[44px] h-[44px] p-0 bg-transparent border-none cursor-pointer"
            onClick={() => setMobileOpen(true)}
            aria-label="메뉴 열기"
          >
            <div className="flex flex-col gap-[6px]">
              <span className="block w-[22px] h-[2px] bg-text rounded-full"></span>
              <span className="block w-[22px] h-[2px] bg-text rounded-full"></span>
              <span className="block w-[22px] h-[2px] bg-text rounded-full"></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Full-Screen Menu */}
      <div
        className={`fixed inset-0 z-[9999] md:hidden transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          background: "rgba(10,22,40,0.97)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        {/* Close Button */}
        <div className="flex items-center justify-end h-[60px] px-4">
          <button
            className="flex items-center justify-center w-[44px] h-[44px] p-0 bg-transparent border-none cursor-pointer"
            onClick={closeMobile}
            aria-label="메뉴 닫기"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Menu Content */}
        <div className="flex flex-col h-[calc(100%-60px)] px-6 overflow-y-auto">
          <nav className="flex-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
              >
                {/* Category Header */}
                <button
                  className="w-full flex items-center justify-between bg-transparent border-none cursor-pointer text-left"
                  style={{
                    padding: "16px 0",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "white",
                  }}
                  onClick={() => toggleCategory(item.label)}
                >
                  <span>{item.label}</span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="rgba(255,255,255,0.5)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform duration-200 ${
                      openCategory === item.label ? "rotate-180" : ""
                    }`}
                  >
                    <polyline points="6 8 10 12 14 8" />
                  </svg>
                </button>

                {/* Children (Accordion) */}
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    openCategory === item.label
                      ? "max-h-[500px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pl-4 pb-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        onClick={closeMobile}
                        className="block no-underline"
                        style={{
                          padding: "12px 0",
                          fontSize: "15px",
                          color: "rgba(255,255,255,0.7)",
                        }}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>

          {/* Bottom Phone Button */}
          <div className="pb-8 pt-6">
            <a
              href="tel:031-912-8720"
              className="flex items-center justify-center gap-2 w-full no-underline text-white font-bold"
              style={{
                background: "#1a9de0",
                borderRadius: "12px",
                padding: "16px 0",
                fontSize: "16px",
              }}
            >
              📞 031-912-8720
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
