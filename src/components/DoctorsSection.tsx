"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const DOCTORS = [
  {
    name: "오성남",
    title: "원장 · 내과 전문의",
    specialty: "소화기내과",
    hospital: "고려대 의료원",
    image: "https://cdn.imweb.me/upload/S20260108b9005a7eb2710/642c2d4699941.png",
    careers: [
      "고려대학교의료원 내과",
      "고려대학교의료원 구로병원 임상교수",
      "고려대학교의료원 외래교수",
      "소화기내과 분과전문의",
    ],
  },
  {
    name: "김두랑",
    title: "원장 · 내과 전문의",
    specialty: "소화기내과",
    hospital: "고려대 의료원",
    image: "https://cdn.imweb.me/upload/S20260108b9005a7eb2710/cfb599f8cfac0.png",
    careers: [
      "고려대학교의료원 내과",
      "고려대학교의료원 안암병원 임상교수",
      "고려대학교의료원 외래교수",
      "소화기내시경 세부전문의",
    ],
  },
  {
    name: "김영진",
    title: "원장 · 내과 전문의",
    specialty: "소화기내과",
    hospital: "고려대 의료원",
    image: "https://cdn.imweb.me/upload/S20260108b9005a7eb2710/8a26b388c0918.png",
    careers: [
      "고려대학교의료원 내과",
      "고려대학교의료원 안암병원 임상교수",
      "고려대학교의료원 외래교수",
      "소화기내시경 세부전문의",
    ],
  },
  {
    name: "장윤정",
    title: "원장 · 내과 전문의",
    specialty: "소화기내과",
    hospital: "고려대 의료원",
    image: "https://cdn.imweb.me/upload/S20260108b9005a7eb2710/1dff3786fa149.png",
    careers: [
      "고려대학교의료원 내과",
      "고려대학교의료원 구로병원 임상교수",
      "고려대학교의료원 외래교수",
      "소화기내과 분과전문의",
    ],
  },
  {
    name: "김수지",
    title: "원장 · 내과 전문의",
    specialty: "내과",
    hospital: "가톨릭 성빈센트",
    image: "https://cdn.imweb.me/upload/S20260108b9005a7eb2710/0636f90867d49.png",
    careers: [
      "고려대학교 의료원 내과",
      "가톨릭성빈센트병원 임상교수",
      "가톨릭성빈센트병원 외래교수",
    ],
  },
  {
    name: "최영균",
    title: "원장 · 내과 전문의",
    specialty: "소화기내과",
    hospital: "일산백병원",
    image: "https://cdn.imweb.me/upload/S20260108b9005a7eb2710/2989e6fd501b6.png",
    careers: [
      "일산백병원 내과",
      "일산백병원 소화기내과 임상교수",
      "대한 내과학회 평생회원",
      "대한 소화기학회 정회원",
    ],
  },
  {
    name: "박상윤",
    title: "원장 · 가정의학과 전문의",
    specialty: "가정의학과",
    hospital: "고려대 의료원",
    image: "https://cdn.imweb.me/upload/S20260108b9005a7eb2710/986a72cbb8e4a.png",
    careers: [
      "가정의학과 전문의",
      "고려대학교 의료원 가정의학과",
      "대한 위대장 내시경학회 위대장 내시경 인증의",
      "한국 초음파학회 정회원",
    ],
  },
  {
    name: "현보라",
    title: "원장 · 가정의학과 전문의",
    specialty: "가정의학과",
    hospital: "일산백병원",
    image: "https://cdn.imweb.me/upload/S20260108b9005a7eb2710/e6f0f8c1c0baf.png",
    careers: [
      "가정의학과 지도 전문의",
      "일산 백병원 가정의학과",
      "김포 우리병원 검진센터",
    ],
  },
];

export default function DoctorsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);
  const [fadeKey, setFadeKey] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleTab = (i: number) => {
    if (i === active) return;
    setActive(i);
    setFadeKey((k) => k + 1);
  };

  const doc = DOCTORS[active];

  return (
    <section ref={sectionRef} className="py-[60px] md:py-[100px]" style={{ background: "#f8fcff" }}>
      <div className="max-w-[1280px] mx-auto px-5 md:px-6 lg:px-12">

        {/* 헤더 */}
        <div
          className="text-center"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
            marginBottom: 48,
          }}
        >
          <div
            className="inline-flex items-center gap-[10px] text-xs font-semibold tracking-[2.5px] uppercase mb-4"
            style={{ fontFamily: "var(--font-outfit)", color: "#1a9de0" }}
          >
            <span className="w-5 h-[2px] rounded-sm" style={{ background: "#38b2f0" }} />
            OUR DOCTORS
          </div>
          <h2
            className="text-[clamp(28px,3vw,44px)] font-bold leading-[1.3] tracking-tight mb-4"
            style={{ fontFamily: "var(--font-noto-serif-kr)", color: "#0f2a3a" }}
          >
            8인의 전문 의료진
          </h2>
          <p style={{ fontSize: 16, color: "#82aabf", lineHeight: 1.8, wordBreak: "keep-all" }}>
            대학병원 임상교수 출신의 풍부한 경험을 가진 전문의들이 직접 진료합니다
          </p>
        </div>

        {/* 탭 버튼 */}
        <div
          className="flex md:flex-wrap md:justify-center overflow-x-auto scrollbar-hide pb-2"
          style={{ gap: 10, marginBottom: 40, WebkitOverflowScrolling: "touch" as const }}
        >
          {DOCTORS.map((d, i) => {
            const isActive = i === active;
            return (
              <button
                key={d.name}
                onClick={() => handleTab(i)}
                className="transition-all duration-200"
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "10px 24px",
                  borderRadius: 100,
                  border: isActive ? "1.5px solid transparent" : "1.5px solid #dceef8",
                  background: isActive ? "linear-gradient(135deg, #1a9de0, #0d8fcc)" : "white",
                  color: isActive ? "white" : "#4a7a90",
                  fontSize: 15,
                  fontWeight: isActive ? 700 : 500,
                  cursor: "pointer",
                  boxShadow: isActive ? "0 4px 16px rgba(56,178,240,0.35)" : "none",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(15px)",
                  transition: `opacity 0.4s ease ${i * 0.06}s, transform 0.4s ease ${i * 0.06}s, background 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s`,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = "#38b2f0";
                    e.currentTarget.style.color = "#1a9de0";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = "#dceef8";
                    e.currentTarget.style.color = "#4a7a90";
                    e.currentTarget.style.transform = "translateY(0)";
                  }
                }}
              >
                <Image
                  src={d.image}
                  alt={d.name}
                  width={32}
                  height={32}
                  unoptimized
                  className="hidden sm:block"
                  style={{
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: isActive ? "2px solid rgba(255,255,255,0.5)" : "2px solid #dceef8",
                  }}
                />
                {d.name}
              </button>
            );
          })}
        </div>

        {/* 상세 패널 */}
        <div
          key={fadeKey}
          style={{
            background: "white",
            borderRadius: 24,
            border: "1px solid #dceef8",
            boxShadow: "0 8px 40px rgba(56,178,240,0.10)",
            overflow: "hidden",
            animation: "doctorPanelFade 0.35s ease both",
          }}
        >
          <style>{`
            @keyframes doctorPanelFade {
              from { opacity: 0; transform: translateY(12px); }
              to   { opacity: 1; transform: translateY(0); }
            }
          `}</style>
          <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr]">

            {/* 사진 */}
            <div
              className="relative"
              style={{ background: "linear-gradient(135deg, #e8f4fd, #dceef8)", minHeight: 280 }}
            >
              <div className="relative w-full h-[280px] lg:h-full" style={{ minHeight: 280 }}>
                <Image
                  src={doc.image}
                  alt={doc.name}
                  fill
                  unoptimized
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                />
              </div>
              <div
                style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  height: "35%",
                  background: "linear-gradient(to top, rgba(10,22,40,0.5), transparent)",
                  pointerEvents: "none",
                }}
              />
              <span
                style={{
                  position: "absolute", top: 20, left: 20,
                  background: "rgba(26,157,224,0.92)",
                  backdropFilter: "blur(4px)",
                  color: "white", fontSize: 12, fontWeight: 700,
                  padding: "7px 16px", borderRadius: 100,
                  fontFamily: "var(--font-outfit)", letterSpacing: 0.5,
                }}
              >
                {doc.specialty}
              </span>
              <div style={{ position: "absolute", bottom: 24, left: 24 }}>
                <div
                  style={{
                    fontFamily: "var(--font-noto-serif-kr)",
                    fontSize: 28, fontWeight: 700, color: "white",
                    letterSpacing: "-0.8px",
                  }}
                >
                  {doc.name}
                </div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", marginTop: 4 }}>
                  {doc.title}
                </div>
              </div>
            </div>

            {/* 상세 */}
            <div className="flex flex-col justify-center" style={{ padding: "clamp(24px,4vw,48px) clamp(20px,4vw,44px)" }}>
              <div
                className="inline-flex items-center gap-[6px] w-fit"
                style={{
                  background: "#f0f9ff", border: "1px solid #dceef8",
                  borderRadius: 8, padding: "6px 14px",
                  fontSize: 12, fontWeight: 600, color: "#1a9de0",
                  fontFamily: "var(--font-outfit)", letterSpacing: 0.5,
                  marginBottom: 24,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#1a9de0">
                  <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z" />
                </svg>
                {doc.hospital}
              </div>

              <div
                style={{
                  fontFamily: "var(--font-noto-serif-kr)",
                  fontSize: "clamp(28px, 3vw, 38px)",
                  fontWeight: 700, color: "#0f2a3a",
                  letterSpacing: "-1px", marginBottom: 6,
                }}
              >
                {doc.name}
              </div>
              <div style={{ fontSize: 15, color: "#1a9de0", fontWeight: 600, marginBottom: 32 }}>
                {doc.title}
              </div>

              <div style={{ height: 1, background: "#f0f7fc", marginBottom: 28 }} />

              <div
                style={{
                  fontSize: 12, fontWeight: 700, color: "#82aabf",
                  letterSpacing: 1.5, textTransform: "uppercase" as const,
                  fontFamily: "var(--font-outfit)", marginBottom: 16,
                }}
              >
                CAREER
              </div>

              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {doc.careers.map((c, ci) => (
                  <li
                    key={ci}
                    style={{
                      display: "flex", alignItems: "flex-start", gap: 12,
                      padding: "11px 0",
                      borderBottom: ci < doc.careers.length - 1 ? "1px solid #f0f7fc" : "none",
                      fontSize: 14.5, color: "#4a7a90",
                      lineHeight: 1.5, fontWeight: 300,
                      wordBreak: "keep-all",
                    }}
                  >
                    <span
                      className="flex-shrink-0 flex items-center justify-center"
                      style={{ width: 20, height: 20, background: "#f0f9ff", borderRadius: "50%", marginTop: 2 }}
                    >
                      <span style={{ width: 6, height: 6, background: "#1a9de0", borderRadius: "50%" }} />
                    </span>
                    {c}
                  </li>
                ))}
              </ul>

              {/* 더보기 + 예약 */}
              <div className="flex flex-wrap gap-3" style={{ marginTop: 32 }}>
                <Link
                  href="/about/doctors"
                  className="no-underline transition-all hover:-translate-y-[2px]"
                  style={{
                    background: "#1a9de0", color: "white",
                    borderRadius: 10, padding: "13px 28px",
                    fontSize: 14, fontWeight: 700,
                    boxShadow: "0 4px 16px rgba(56,178,240,0.3)",
                  }}
                >
                  의료진 전체보기
                </Link>
                {/* 모바일: 전화 / PC: 네이버 예약 */}
                <a
                  href="tel:031-912-8720"
                  className="no-underline transition-all hover:-translate-y-[2px] lg:hidden inline-flex items-center gap-2"
                  style={{
                    background: "white", color: "#1a9de0",
                    border: "1.5px solid #dceef8",
                    borderRadius: 10, padding: "13px 28px",
                    fontSize: 14, fontWeight: 600,
                  }}
                >
                  📞 전화 예약
                </a>
                <a
                  href="https://naver.me/FvEgeFyj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="no-underline transition-all hover:-translate-y-[2px] hidden lg:inline-flex items-center gap-2"
                  style={{
                    background: "white", color: "#1a9de0",
                    border: "1.5px solid #dceef8",
                    borderRadius: 10, padding: "13px 28px",
                    fontSize: 14, fontWeight: 600,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#38b2f0"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#dceef8"; }}
                >
                  📞 진료 예약
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
