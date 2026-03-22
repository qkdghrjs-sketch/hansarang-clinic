"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
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
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, v };
}

const FEATURES = [
  { icon: "🕐", title: "20년 이상의 역사", desc: "국가 검진 시행 초기부터 운영해 온 일산 최고의 공단검진 기관입니다." },
  { icon: "🩺", title: "검진 후 즉시 진료 연결", desc: "검사 후 담당의사가 바로 결과를 설명하고 필요시 즉시 처방 및 치료로 연결합니다." },
  { icon: "🏥", title: "쾌적한 검진 환경", desc: "리노베이션을 통해 넓어진 대기실과 탈의실로 편안하고 쾌적한 검진 환경을 제공합니다." },
  { icon: "👨‍👩‍👧‍👦", title: "가족 같은 의료진", desc: "전 직원과 의료진이 내원하시는 모든 분을 가족처럼 생각하며 정성을 다해 모십니다." },
];

export default function NhisIntroPage() {
  const s1 = useReveal();
  const s2 = useReveal();
  const s3 = useReveal();
  const s4 = useReveal();

  return (
    <>
      <SubPageHeader />
      <SubPageBanner category="국민건강보험공단검진" title="검진센터 소개" breadcrumb={["홈", "국민건강보험공단검진", "검진센터 소개"]} />

      {/* ━━━ S1: Main intro ━━━ */}
      <section className="bg-white" ref={s1.ref}>
        <div className="max-w-[1280px] mx-auto px-5 lg:px-12" style={{ padding: "100px 48px" }}>
          {/* Label + Title */}
          <div style={{
            opacity: s1.v ? 1 : 0, transform: s1.v ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}>
            <div className="flex items-center gap-[10px] mb-4" style={{ fontFamily: "var(--font-outfit)", fontSize: 12, fontWeight: 700, color: "#1a9de0", letterSpacing: "2.5px", textTransform: "uppercase" }}>
              <span style={{ width: 20, height: 2, background: "#1a9de0", borderRadius: 2 }} />
              검진센터 소개
            </div>
            <h2 className="font-bold" style={{ fontFamily: "var(--font-noto-serif-kr)", fontSize: "clamp(28px,3.5vw,44px)", color: "#0f2a3a", letterSpacing: "-1px", marginBottom: 60, wordBreak: "keep-all" }}>
              속편한내과 공단검진센터
            </h2>
          </div>

          {/* 2-col text */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[60px] items-start">
            <div style={{
              fontSize: 15, color: "#4a7a90", lineHeight: 2.0, fontWeight: 300, wordBreak: "keep-all",
              opacity: s1.v ? 1 : 0, transform: s1.v ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}>
              <p style={{ marginBottom: 28 }}>
                속편한내과의 공단검진센터는 지난 국가 검진이 시행된 초기부터 지금까지 20여 년 이상의 긴 역사와 전통을 가지고 있습니다. 국가 검진이 지금처럼 일반화되지 않았던 때부터 시작하여 <strong style={{ fontWeight: 700, color: "#0f2a3a" }}>일산지역에서 가장 오래된 검진기관</strong>으로 자리매김하였으며, 그 동안 수많은 환자들이 본원 검진을 통해 조기에 병을 진단받고 치료하여 건강을 지킬 수 있었고, 그것은 저희의 기쁨이자 보람이었습니다.
              </p>
              <p>
                그 오랫동안의 <strong style={{ fontWeight: 700, color: "#0f2a3a" }}>축적된 경험과 노하우를 바탕으로 검진 수진자가 편안하게 검진을 받을 수 있도록 제반 시스템 및 환경을 잘 구축</strong>하고 있습니다. 특히 15년부터는 공단검진센터 리노베이션을 통해 대기실 및 탈의실을 확장하여 이전보다 더 쾌적하고 기분 좋은 검진이 될 수 있도록 최선을 다하였습니다.
              </p>
            </div>

            <div style={{
              opacity: s1.v ? 1 : 0, transform: s1.v ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s",
            }}>
              <p style={{ fontSize: 15, color: "#4a7a90", lineHeight: 2.0, fontWeight: 300, wordBreak: "keep-all", marginBottom: 32 }}>
                속편한내과의 공단검진은 검사 후 담당의사가 바로 상세히 검진결과를 설명하고 필요시 바로 처방을 함으로써 <strong style={{ fontWeight: 700, color: "#0f2a3a" }}>검진이 진료로 자연스럽게 연결되도록 하여, 검진이 검진만으로 끝나지 않도록</strong> 최선을 다하고 있습니다.
              </p>
              <p style={{ fontSize: 18, fontWeight: 700, color: "#1a9de0", lineHeight: 1.7, wordBreak: "keep-all" }}>
                지금까지처럼 앞으로도 일산 시민의 건강을 지키는 데에 저희의 역할을 다하고자 꾸준히 노력하겠습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ S2: Quote banner ━━━ */}
      <section ref={s2.ref}>
        <div className="relative overflow-hidden" style={{ height: 320 }}>
          <Image
            src="https://cdn.imweb.me/upload/S20260108b9005a7eb2710/6043d7f093cc1.jpeg"
            alt="한사랑속편한내과"
            fill
            unoptimized
            className="object-cover object-center"
          />
          <div className="absolute inset-0" style={{ background: "rgba(10,22,40,0.65)" }} />
          <div
            className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 lg:px-12"
            style={{
              opacity: s2.v ? 1 : 0,
              transform: s2.v ? "translateY(0) scale(1)" : "translateY(30px) scale(0.97)",
              transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
            }}
          >
            <span className="block select-none" style={{ fontSize: 80, color: "rgba(56,178,240,0.4)", fontFamily: "Georgia, serif", lineHeight: 0.8, marginBottom: 16 }}>
              &ldquo;
            </span>
            <h3 className="font-bold text-white" style={{ fontFamily: "var(--font-noto-serif-kr)", fontSize: "clamp(24px,3.5vw,44px)", lineHeight: 1.5, letterSpacing: "-0.8px", wordBreak: "keep-all" }}>
              가족같은 마음으로
              <br />
              신뢰와 믿음을 드리겠습니다.
            </h3>
          </div>
        </div>
      </section>

      {/* ━━━ S3: Features ━━━ */}
      <section style={{ background: "#f8fcff" }} ref={s3.ref}>
        <div className="max-w-[1280px] mx-auto px-5 lg:px-12" style={{ padding: "100px 48px" }}>
          <h2
            className="text-center font-bold"
            style={{
              fontFamily: "var(--font-noto-serif-kr)", fontSize: "clamp(24px,3vw,34px)", color: "#0f2a3a",
              marginBottom: 48, wordBreak: "keep-all",
              opacity: s3.v ? 1 : 0, transform: s3.v ? "translateY(0)" : "translateY(40px)", transition: "opacity 0.6s, transform 0.6s",
            }}
          >
            공단검진센터가 특별한 이유
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="group relative text-center overflow-hidden"
                style={{
                  background: "white", border: "1px solid #dceef8", borderRadius: 20, padding: "36px 28px",
                  transition: "all 0.3s",
                  opacity: s3.v ? 1 : 0, transform: s3.v ? "translateY(0)" : "translateY(40px)",
                  transitionDelay: s3.v ? `${i * 0.1}s` : "0s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(56,178,240,0.14)"; e.currentTarget.style.borderColor = "rgba(56,178,240,0.3)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "#dceef8"; }}
              >
                {/* Accent bar */}
                <div className="absolute top-0 left-0 right-0 h-[3px] origin-left scale-x-0 transition-transform duration-400 group-hover:scale-x-100" style={{ background: "linear-gradient(90deg, #1a9de0, #38b2f0)" }} />

                <div className="w-16 h-16 rounded-full flex items-center justify-center text-[26px] mx-auto mb-5 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-[#1a9de0] group-hover:to-[#0d8fcc]" style={{ background: "linear-gradient(135deg, #f0f9ff, #dceef8)" }}>
                  {f.icon}
                </div>
                <div className="font-bold mb-3" style={{ fontFamily: "var(--font-noto-serif-kr)", fontSize: 17, color: "#0f2a3a", wordBreak: "keep-all" }}>{f.title}</div>
                <p className="font-light" style={{ fontSize: 13.5, color: "#4a7a90", lineHeight: 1.8, wordBreak: "keep-all" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ S4: CTA ━━━ */}
      <section ref={s4.ref}>
        <div
          className="text-center"
          style={{
            background: "linear-gradient(135deg, #1a9de0, #0d8fcc)", padding: "72px 48px",
            opacity: s4.v ? 1 : 0, transform: s4.v ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
          }}
        >
          <h3 className="font-bold text-white" style={{ fontFamily: "var(--font-noto-serif-kr)", fontSize: "clamp(22px,2.5vw,32px)", marginBottom: 12 }}>
            국가건강검진 대상자이신가요?
          </h3>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", marginBottom: 36 }}>지금 바로 한사랑속편한내과에서 편안하게 검진받으세요</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:031-912-8720" className="no-underline transition-all duration-300 hover:-translate-y-[2px]" style={{ background: "white", color: "#1a9de0", borderRadius: 12, padding: "16px 36px", fontSize: 16, fontWeight: 700, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}>
              📞 031-912-8720 전화예약
            </a>
            <a href="https://naver.me/FvEgeFyj" target="_blank" rel="noopener noreferrer" className="no-underline transition-all duration-300" style={{ background: "transparent", color: "white", border: "2px solid rgba(255,255,255,0.5)", borderRadius: 12, padding: "16px 36px", fontSize: 16, fontWeight: 600 }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "white"; e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; e.currentTarget.style.background = "transparent"; }}
            >
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
