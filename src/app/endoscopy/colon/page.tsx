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
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } },
      { threshold: 0.08 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, v };
}

const IMG = "https://cdn.imweb.me/upload/S20260108b9005a7eb2710/";

const DISEASES = [
  { icon: "🩸", name: "심한 내치질", desc: "항문 내부 혈관이 부풀어 출혈·통증을 유발" },
  { icon: "🦠", name: "결핵성 대장염", desc: "결핵균에 의한 대장 점막의 염증성 질환" },
  { icon: "🔥", name: "궤양성 대장염", desc: "대장 점막에 궤양이 생기는 만성 염증 질환" },
  { icon: "💔", name: "허혈성 대장염", desc: "대장 혈류 감소로 점막 손상이 발생하는 질환" },
  { icon: "⬛", name: "대장 흑색증", desc: "장기간 변비약 복용으로 점막이 착색되는 상태" },
  { icon: "🫧", name: "대장 용종", desc: "대장 내벽에 돌출된 조직으로 암으로 진행 가능" },
  { icon: "🔬", name: "조기 대장암", desc: "점막층에 국한된 초기 단계로 내시경 치료 가능" },
  { icon: "⚠️", name: "진행성 대장암", desc: "점막 하층 이상 침범한 단계로 수술적 치료 필요" },
];

const SYMPTOMS = [
  "만성 변비 또는 설사 등 배변 습관 변화",
  "대변이 가늘어지거나 혈변이 보이는 경우",
  "복부 팽만감, 복통이 지속되는 경우",
  "이유 없는 빈혈이나 체중 감소",
  "40세 이상 (증상 없어도 3~5년 간격 권장)",
  "가족 중 대장암·대장 용종 병력 (30대부터 권장)",
];

export default function ColonPage() {
  const s1 = useReveal();
  const s2 = useReveal();
  const s3 = useReveal();
  const s4 = useReveal();
  const s6 = useReveal();

  return (
    <>
      <SubPageHeader />
      <SubPageBanner category="내시경센터" title="대장항문 내시경" breadcrumb={["홈", "내시경센터", "대장항문 내시경"]} />

      {/* ━━━ S1: 히어로 ━━━ */}
      <section ref={s1.ref} className="relative overflow-hidden h-[280px] md:h-[380px]">
        <Image
          src={`${IMG}cef221bccab59.png`}
          alt="대장내시경"
          fill
          unoptimized
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(10,22,40,0.82), rgba(10,22,40,0.35))" }} />
        <div
          className="relative z-10 h-full flex flex-col justify-center max-w-[1280px] mx-auto px-6 lg:px-12"
          style={{
            opacity: s1.v ? 1 : 0,
            transform: s1.v ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div
            className="inline-flex items-center gap-3 mb-4"
            style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2.5, color: "#7dd3f8", fontFamily: "var(--font-outfit)", textTransform: "uppercase" }}
          >
            <span style={{ width: 24, height: 2, background: "#38b2f0", borderRadius: 1 }} />
            COLONOSCOPY
          </div>
          <h2
            className="font-bold text-white"
            style={{ fontFamily: "var(--font-noto-serif-kr)", fontSize: "clamp(28px, 3.5vw, 44px)", letterSpacing: "-1px", lineHeight: 1.4, marginBottom: 16 }}
          >
            대장암 예방의 첫걸음
            <br />
            정기적인 대장내시경
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.7)", lineHeight: 1.8, maxWidth: 460, wordBreak: "keep-all" }}>
            대장 용종과 조기 대장암은 증상이 없습니다.
            <br />
            정기 검사만이 가장 확실한 예방법입니다.
          </p>
        </div>
      </section>

      {/* ━━━ S2: 대장내시경이란 + 검사 시기 ━━━ */}
      <section className="bg-white" ref={s2.ref}>
        <div className="max-w-[1280px] mx-auto px-5 lg:px-12" style={{ paddingTop: 100, paddingBottom: 80 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

            {/* 왼쪽: 대장내시경이란 */}
            <div
              style={{
                opacity: s2.v ? 1 : 0,
                transform: s2.v ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
                wordBreak: "keep-all",
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 700, color: "#1a9de0", letterSpacing: 1.5, fontFamily: "var(--font-outfit)", textTransform: "uppercase", marginBottom: 12 }}>
                ABOUT
              </div>
              <h3
                className="font-bold"
                style={{ fontFamily: "var(--font-noto-serif-kr)", fontSize: "clamp(24px, 2.8vw, 32px)", color: "#0f2a3a", letterSpacing: "-0.5px", lineHeight: 1.4, marginBottom: 24 }}
              >
                대장내시경 검사란?
              </h3>
              <p style={{ fontSize: 15, color: "#4a7a90", lineHeight: 2.0, marginBottom: 16 }}>
                항문을 통해 내시경을 삽입하여 직장부터 맹장까지 대장 전체를 관찰하는 검사입니다.
                <strong style={{ color: "#1a9de0" }}> 치질, 대장염, 대장 용종, 대장암</strong> 등 다양한 대장 질환을 가장 정확히 진단할 수 있습니다.
              </p>
              <p style={{ fontSize: 15, color: "#4a7a90", lineHeight: 2.0 }}>
                최신 장비로 1mm 이하의 미세 병변까지 확대 관찰이 가능하며,
                검사 중 발견된 용종은 개복 수술 없이 내시경으로 바로 제거할 수 있습니다.
              </p>
            </div>

            {/* 오른쪽: 이런 분은 꼭 검사하세요 */}
            <div
              style={{
                opacity: s2.v ? 1 : 0,
                transform: s2.v ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s",
              }}
            >
              <div
                style={{
                  background: "linear-gradient(135deg, #f0f9ff, #e8f4fd)",
                  border: "1px solid #dceef8",
                  borderRadius: 20,
                  padding: "36px 32px",
                }}
              >
                <div style={{ fontSize: 18, fontWeight: 700, color: "#0f2a3a", marginBottom: 20, fontFamily: "var(--font-noto-serif-kr)" }}>
                  이런 분은 꼭 검사하세요
                </div>
                <div className="flex flex-col gap-3">
                  {SYMPTOMS.map((s, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span
                        className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold text-white"
                        style={{ background: "#1a9de0", marginTop: 1 }}
                      >
                        {i + 1}
                      </span>
                      <span style={{ fontSize: 14, color: "#4a7a90", lineHeight: 1.7, wordBreak: "keep-all" }}>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ S3: 진단 가능한 질병 ━━━ */}
      <section style={{ background: "#f8fcff" }} ref={s3.ref}>
        <div className="max-w-[1280px] mx-auto px-5 lg:px-12" style={{ paddingTop: 80, paddingBottom: 80 }}>
          <div
            className="text-center mb-12"
            style={{
              opacity: s3.v ? 1 : 0,
              transform: s3.v ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <h3
              className="font-bold"
              style={{ fontFamily: "var(--font-noto-serif-kr)", fontSize: "clamp(24px, 2.8vw, 32px)", color: "#0f2a3a", marginBottom: 12 }}
            >
              대장내시경으로 진단 가능한 질병
            </h3>
            <p style={{ fontSize: 15, color: "#82aabf" }}>
              검사 중 용종 발견 시 즉시 제거가 가능합니다
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {DISEASES.map((d, i) => (
              <div
                key={d.name}
                className="group bg-white text-center transition-all duration-300 hover:-translate-y-1"
                style={{
                  border: "1.5px solid #dceef8", borderRadius: 20,
                  padding: "28px 20px 24px",
                  opacity: s3.v ? 1 : 0,
                  transform: s3.v ? "translateY(0)" : "translateY(30px)",
                  transition: `opacity 0.5s ease ${i * 0.06}s, transform 0.5s ease ${i * 0.06}s, box-shadow 0.3s ease, border-color 0.3s ease`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 12px 40px rgba(56,178,240,0.14)";
                  e.currentTarget.style.borderColor = "rgba(56,178,240,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "#dceef8";
                }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-[26px] mx-auto mb-4 transition-colors duration-300 group-hover:bg-[#1a9de0]/10"
                  style={{ background: "#f0f9ff" }}
                >
                  {d.icon}
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#0f2a3a", marginBottom: 6 }}>
                  {d.name}
                </div>
                <p style={{ fontSize: 12.5, color: "#82aabf", lineHeight: 1.6, wordBreak: "keep-all" }}>
                  {d.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ S4: CO2 무통 + CV-290 장비 ━━━ */}
      <section className="bg-white" ref={s4.ref}>
        <div className="max-w-[1280px] mx-auto px-5 lg:px-12" style={{ paddingTop: 80, paddingBottom: 80 }}>
          {/* 5가지 특징 */}
          <div
            className="text-center mb-10"
            style={{
              opacity: s4.v ? 1 : 0, transform: s4.v ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <h3 className="font-bold" style={{ fontFamily: "var(--font-noto-serif-kr)", fontSize: "clamp(24px, 2.8vw, 32px)", color: "#0f2a3a", marginBottom: 12 }}>
              편안하고 정확한 대장내시경
            </h3>
            <p style={{ fontSize: 15, color: "#82aabf" }}>최신 장비와 숙련된 전문의가 함께합니다</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-14">
            {[
              { icon: "⏱️", color: "#0284c7", bg: "#e0f2fe", title: "꼼꼼한 검사", desc: "충분한 시간을 할애하여 정확하게" },
              { icon: "🔬", color: "#2563eb", bg: "#dbeafe", title: "정확한 검사", desc: "고사양 장비로 미세 조직까지" },
              { icon: "💨", color: "#d97706", bg: "#fef3c7", title: "CO₂ 무통 검사", desc: "CO₂ 가스로 통증 최소화" },
              { icon: "🛡️", color: "#059669", bg: "#d1fae5", title: "청결한 검사", desc: "1회 1소독 원칙 철저 준수" },
              { icon: "❤️", color: "#db2777", bg: "#fce7f3", title: "안전한 검사", desc: "산소 공급·환자 모니터링" },
            ].map((f, i) => (
              <div
                key={f.title}
                className="group bg-white text-center transition-all duration-300 hover:-translate-y-1"
                style={{
                  border: "1.5px solid #dceef8", borderRadius: 16, padding: "24px 14px 20px",
                  opacity: s4.v ? 1 : 0, transform: s4.v ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.5s ease ${i * 0.06}s, transform 0.5s ease ${i * 0.06}s, box-shadow 0.3s ease`,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 28px rgba(56,178,240,0.12)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-[22px] mx-auto mb-3" style={{ background: f.bg }}>{f.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#0f2a3a", marginBottom: 4 }}>{f.title}</div>
                <p style={{ fontSize: 12, color: "#82aabf", lineHeight: 1.5, wordBreak: "keep-all" }}>{f.desc}</p>
              </div>
            ))}
          </div>

          {/* CV-290 장비 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div
              className="group"
              style={{
                opacity: s4.v ? 1 : 0, transform: s4.v ? "translateX(0)" : "translateX(-30px)",
                transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
              }}
            >
              <div className="rounded-2xl overflow-hidden" style={{ boxShadow: "0 12px 48px rgba(56,178,240,0.12)" }}>
                <Image
                  src="https://cdn.imweb.me/upload/S20260108b9005a7eb2710/b9ca18b461837.png"
                  alt="OLYMPUS CV-290"
                  width={640} height={480} unoptimized
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  style={{ aspectRatio: "4/3" }}
                />
              </div>
            </div>
            <div style={{ opacity: s4.v ? 1 : 0, transform: s4.v ? "translateX(0)" : "translateX(30px)", transition: "opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s", wordBreak: "keep-all" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#1a9de0", letterSpacing: 1.5, fontFamily: "var(--font-outfit)", textTransform: "uppercase", marginBottom: 12 }}>EQUIPMENT</div>
              <div style={{ fontFamily: "var(--font-outfit)", fontSize: 28, fontWeight: 800, color: "#0f2a3a", marginBottom: 8 }}>OLYMPUS CV-290</div>
              <div style={{ fontSize: 14, color: "#1a9de0", fontWeight: 600, marginBottom: 20 }}>현존하는 최고 사양의 내시경 시스템</div>
              <div className="flex flex-col gap-3">
                {[
                  "고해상도 Full HD 영상으로 미세 병변까지 확인",
                  "NBI 색소내시경으로 육안 구분 어려운 조직 정밀 관찰",
                  "얇고 유연한 내시경관으로 검사 불편함 최소화",
                  "CO₂ 가스 사용으로 검사 후 복부 팽만감 감소",
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5" style={{ background: "#fde8ec" }}>
                      <svg width="12" height="12" viewBox="0 0 22 22" fill="none"><polyline points="6 11 9.5 14.5 16 8" stroke="#e8667a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                    <span style={{ fontSize: 14, color: "#4a7a90", lineHeight: 1.7 }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ S6: CTA ━━━ */}
      <section ref={s6.ref}>
        <div
          className="text-center"
          style={{
            background: "linear-gradient(135deg, #1a9de0, #0d8fcc)",
            padding: "56px 24px",
            opacity: s6.v ? 1 : 0,
            transform: s6.v ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <h3
            className="font-bold text-white"
            style={{ fontFamily: "var(--font-noto-serif-kr)", fontSize: "clamp(22px, 2.8vw, 36px)", lineHeight: 1.5, marginBottom: 12 }}
          >
            대장암, 조기 발견이 완치의 열쇠입니다
          </h3>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", marginBottom: 36 }}>
            전문의가 직접 시행하는 대장내시경으로 건강을 지키세요
          </p>
          <div className="flex justify-center flex-wrap gap-4">
            <a
              href="tel:031-912-8720"
              className="no-underline transition-all hover:-translate-y-[2px]"
              style={{ background: "white", color: "#1a9de0", padding: "16px 36px", borderRadius: 14, fontSize: 15, fontWeight: 700, boxShadow: "0 8px 28px rgba(0,0,0,0.15)" }}
            >
              031-912-8720 전화예약
            </a>
            <a
              href="https://naver.me/FvEgeFyj"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline transition-all hover:-translate-y-[2px]"
              style={{ background: "rgba(255,255,255,0.15)", color: "white", padding: "16px 36px", borderRadius: 14, fontSize: 15, fontWeight: 600, border: "1.5px solid rgba(255,255,255,0.35)", backdropFilter: "blur(8px)" }}
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
