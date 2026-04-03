"use client";

import { useEffect, useRef, useState } from "react";
import SubPageHeader from "@/components/SubPageHeader";
import SubPageBanner from "@/components/SubPageBanner";
import Footer from "@/components/Footer";
import FloatingBanner from "@/components/FloatingBanner";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } },
      { threshold: 0.08 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, v };
}

const PROGRAMS = [
  {
    name: "혈액종합검진",
    sub: "80여종의 혈액, 소변 검사를 통해 전반적인 건강상태를 확인",
    items: [
      "일반혈액검사(16종)", "간기능검사(9종)", "신장질환검사(2종)",
      "전해질검사(3종)", "순환기검사(5종)", "빈혈검사(2종)",
      "당뇨검사(4종)", "혈액형검사(2종)", "부갑상선검사(2종)",
      "갑상선검사(2종)", "간염검사(4종)", "혈청면역검사",
      "췌장검사", "염증검사", "성병검사(2종)",
      "관절염검사(2종)", "소변검사(13종)", "A,B,C형 간염검사",
      "종양(암)표지자: 간, 대장, 췌장/담도, 전립선(남)/난소(여)",
    ],
  },
  {
    name: "기본종합검진",
    sub: "20대~30대 초반의 젊은 연령층에 맞춘 기본종합검진 프로그램",
    items: [
      "기본: 문진, 혈압, 신장, 체중, 허리둘레, 시력, 청력",
      "혈액종합검사(혈액 및 소변 80여종 검사)",
      "종양(암)표지자: 간, 대장, 췌장/담도, 전립선(남)/난소(여)",
      "A,B,C 형 간염검사", "종합판정", "영양상담",
      "심전도검사", "흉부 X-RAY", "폐기능검사",
      "복부초음파", "갑상선초음파", "유방초음파",
      "수면위내시경",
    ],
  },
  {
    name: "정밀 종합검진 프로그램",
    sub: "모든 성인을 위한 주요암 조기 진단을 위한 심층 프로그램",
    items: [
      "기본: 문진, 혈압, 신장, 체중, 허리둘레, 시력, 청력",
      "혈액종합검사(혈액 및 소변 80여종 검사)",
      "종양(암)표지자: 간, 대장, 췌장/담도, 전립선(남)/난소(여)",
      "A,B,C 형 간염검사", "종합판정", "영양상담",
      "심전도검사", "안저촬영", "흉부 X-RAY",
      "골밀도검사", "폐기능검사", "복부초음파",
      "갑상선초음파", "전립선 초음파", "수면위내시경",
      "수면대장내시경", "자궁경부암검사(여성)",
      "유방초음파, 유방촬영", "경동맥초음파, 동맥 경화",
    ],
  },
];

export default function ProgramPage() {
  const s1 = useReveal();

  return (
    <>
      <SubPageHeader />
      <SubPageBanner category="종합검진센터" title="종합검진프로그램" breadcrumb={["홈", "종합검진센터", "종합검진프로그램"]} />

      <section style={{ background: "#f8fcff" }} ref={s1.ref}>
        <div className="max-w-[1280px] mx-auto px-5 lg:px-12" style={{ paddingTop: 80, paddingBottom: 100 }}>
          <div
            className="text-center mb-12"
            style={{
              opacity: s1.v ? 1 : 0,
              transform: s1.v ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <h2
              className="font-bold"
              style={{
                fontFamily: "var(--font-noto-serif-kr)",
                fontSize: "clamp(24px, 3vw, 34px)",
                color: "#0f2a3a",
                marginBottom: 12,
              }}
            >
              종합검진프로그램
            </h2>
            <p style={{ fontSize: 15, color: "#82aabf" }}>
              개인별 맞춤 검진 프로그램으로 정확한 건강 상태를 확인합니다
            </p>
          </div>

          <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: "touch" }}>
            <table className="w-full" style={{ borderCollapse: "separate", borderSpacing: 0, borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 24px rgba(56,178,240,0.08)", minWidth: 700 }}>
              <thead>
                <tr>
                  <th style={{ background: "#0f2a3a", color: "white", padding: "16px 24px", fontWeight: 700, textAlign: "left", width: 280 }}>검진종류</th>
                  <th style={{ background: "#0f2a3a", color: "white", padding: "16px 24px", fontWeight: 700, textAlign: "left" }}>주요검사 항목</th>
                  <th style={{ background: "#0f2a3a", color: "white", padding: "16px 24px", fontWeight: 700, textAlign: "center", width: 120 }}>검진비용</th>
                </tr>
              </thead>
              <tbody>
                {PROGRAMS.map((p) => (
                  <tr key={p.name}>
                    <td style={{ background: "#f0f9ff", padding: "24px 28px", verticalAlign: "top", borderRight: "2px solid #dceef8", borderBottom: "2px solid #dceef8" }}>
                      <div style={{ fontWeight: 700, color: "#0f2a3a", fontSize: 16 }}>{p.name}</div>
                      <div style={{ fontSize: 13, color: "#82aabf", marginTop: 8, lineHeight: 1.5 }}>{p.sub}</div>
                    </td>
                    <td style={{ padding: 0, verticalAlign: "top", borderBottom: "2px solid #dceef8" }}>
                      {p.items.map((item, j) => (
                        <div key={j} style={{ padding: "11px 20px", borderBottom: j < p.items.length - 1 ? "1px solid #f0f7fc" : "none", fontSize: 14, color: "#4a7a90", background: j % 2 === 0 ? "white" : "#fafcff" }}>
                          {item}
                        </div>
                      ))}
                    </td>
                    <td style={{ textAlign: "center", verticalAlign: "middle", fontSize: 13, color: "#82aabf", borderBottom: "2px solid #dceef8" }}>문의</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="text-center" style={{ background: "linear-gradient(135deg, #1a9de0, #0d8fcc)", padding: "56px 24px" }}>
          <h3 className="font-bold text-white" style={{ fontFamily: "var(--font-noto-serif-kr)", fontSize: "clamp(22px,2.5vw,32px)", marginBottom: 12 }}>
            검진 프로그램 상담 및 예약
          </h3>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", marginBottom: 36 }}>전문 상담원이 친절하게 안내해 드립니다</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:031-916-8720" className="no-underline transition-all hover:-translate-y-[2px]" style={{ background: "white", color: "#1a9de0", borderRadius: 12, padding: "16px 36px", fontSize: 16, fontWeight: 700, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}>
              031-916-8720 종합검진실
            </a>
            <a href="https://naver.me/FvEgeFyj" target="_blank" rel="noopener noreferrer" className="no-underline transition-all hover:-translate-y-[2px]" style={{ background: "rgba(255,255,255,0.15)", color: "white", border: "1.5px solid rgba(255,255,255,0.35)", borderRadius: 12, padding: "16px 36px", fontSize: 16, fontWeight: 600, backdropFilter: "blur(8px)" }}>
              네이버 예약하기 →
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingBanner />
    </>
  );
}
