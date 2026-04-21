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

export default function NhisIntroPage() {
  const s1 = useReveal();
  const s2 = useReveal();
  const s3 = useReveal();
  const s4 = useReveal();

  return (
    <>
      <SubPageHeader />
      <SubPageBanner category="국민건강보험공단검진" title="검진센터 소개" breadcrumb={["홈", "국민건강보험공단검진", "검진센터 소개"]} />

      {/* ━━━ S1: 히어로 ━━━ */}
      <section ref={s1.ref} className="relative overflow-hidden h-[280px] md:h-[380px]">
        <Image
          src={`${IMG}55314454d3d7b.png`}
          alt="공단검진센터"
          fill
          unoptimized
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,22,40,0.65)" }} />
        <div
          className="relative z-10 h-full flex flex-col justify-center items-center text-center max-w-[1280px] mx-auto px-6 lg:px-12"
          style={{
            opacity: s1.v ? 1 : 0,
            transform: s1.v ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div className="inline-flex items-center gap-3" style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2.5, color: "#7dd3f8", fontFamily: "var(--font-outfit)", textTransform: "uppercase", marginBottom: 16 }}>
            <span style={{ width: 20, height: 2, background: "#38b2f0", borderRadius: 1 }} />
            NHIS CHECKUP CENTER
            <span style={{ width: 20, height: 2, background: "#38b2f0", borderRadius: 1 }} />
          </div>
          <h2
            className="font-bold text-white"
            style={{ fontFamily: "var(--font-noto-serif-kr)", fontSize: "clamp(28px, 3.5vw, 44px)", letterSpacing: "-1px", lineHeight: 1.4, marginBottom: 16 }}
          >
            일산 최초, 20년 이상의
            <br />
            국가검진 전문기관
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.7)", lineHeight: 1.8, maxWidth: 520, wordBreak: "keep-all" }}>
            국가 검진 시행 초기부터 운영해 온 신뢰의 검진센터.
            <br />
            검진이 진료로 자연스럽게 연결됩니다.
          </p>
        </div>
      </section>

      {/* ━━━ S2: 소개 텍스트 + 사진 ━━━ */}
      <section className="bg-white" ref={s2.ref}>
        <div className="max-w-[1280px] mx-auto px-5 lg:px-12" style={{ paddingTop: 100, paddingBottom: 80 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* 왼쪽: 텍스트 */}
            <div
              style={{
                wordBreak: "keep-all",
                opacity: s2.v ? 1 : 0,
                transform: s2.v ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
              }}
            >
              <h3
                className="font-bold"
                style={{
                  fontFamily: "var(--font-noto-serif-kr)",
                  fontSize: "clamp(24px, 2.8vw, 32px)",
                  color: "#0f2a3a", letterSpacing: "-0.5px",
                  lineHeight: 1.4, marginBottom: 28,
                }}
              >
                검진이 검진만으로
                <br />
                끝나지 않도록
              </h3>

              <p style={{ fontSize: 15, color: "#4a7a90", lineHeight: 2.0, marginBottom: 20 }}>
                속편한내과 공단검진센터는 국가 검진 시행 초기부터 20여 년 이상 운영해 온
                <strong style={{ fontWeight: 700, color: "#0f2a3a" }}> 일산지역 최초의 검진기관</strong>입니다.
                축적된 경험과 노하우로 편안하고 체계적인 검진 환경을 갖추고 있습니다.
              </p>

              <p style={{ fontSize: 15, color: "#4a7a90", lineHeight: 2.0, marginBottom: 28 }}>
                검사 후 담당의사가 바로 결과를 설명하고 필요시 즉시 처방 및 치료로 연결하여,
                <strong style={{ fontWeight: 700, color: "#0f2a3a" }}> 검진이 진료로 자연스럽게 이어지는 시스템</strong>을 운영하고 있습니다.
              </p>

              <div
                style={{
                  background: "linear-gradient(135deg, #f0f9ff, #e8f4fd)",
                  borderLeft: "4px solid #1a9de0",
                  borderRadius: "0 12px 12px 0",
                  padding: "20px 24px",
                }}
              >
                <p style={{ fontSize: 15, fontWeight: 600, color: "#1a9de0", lineHeight: 1.7, margin: 0 }}>
                  앞으로도 일산 시민의 건강을 지키는 데에
                  저희의 역할을 다하겠습니다.
                </p>
              </div>
            </div>

            {/* 오른쪽: 사진 */}
            <div
              className="group"
              style={{
                opacity: s2.v ? 1 : 0,
                transform: s2.v ? "translateY(0) scale(1)" : "translateY(30px) scale(0.97)",
                transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s",
              }}
            >
              <div className="rounded-2xl overflow-hidden" style={{ boxShadow: "0 16px 56px rgba(56,178,240,0.12)" }}>
                <Image
                  src={`${IMG}187780605910d.png`}
                  alt="공단검진센터 내부"
                  width={640}
                  height={480}
                  unoptimized
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  style={{ aspectRatio: "4/3" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ S3: 특장점 6카드 ━━━ */}
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
              공단검진센터가 특별한 이유
            </h3>
            <p style={{ fontSize: 15, color: "#82aabf" }}>
              한사랑속편한내과만의 차별화된 공단검진 서비스
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: "🕐", color: "#1a9de0", title: "20년 이상의 역사", desc: "국가 검진 시행 초기부터 운영해 온 일산 최초의 공단검진 전문기관입니다." },
              { icon: "🩺", color: "#0ea5aa", title: "검진 후 즉시 진료 연결", desc: "담당의사가 바로 결과를 설명하고 필요시 즉시 처방 및 치료로 연결합니다." },
              { icon: "🏥", color: "#6366f1", title: "쾌적한 검진 환경", desc: "리노베이션을 통해 넓어진 대기실과 탈의실로 편안한 검진을 제공합니다." },
              { icon: "👨‍⚕️", color: "#f59e0b", title: "8인 전문의 상주", desc: "대학병원 출신 전문의가 직접 검진하고 결과를 상세히 설명합니다." },
              { icon: "🤝", color: "#1a9de0", title: "가족 같은 의료진", desc: "전 직원과 의료진이 내원하시는 모든 분을 가족처럼 정성을 다해 모십니다." },
              { icon: "📋", color: "#0ea5aa", title: "체계적 사후관리", desc: "검진 결과에 따른 추적 관리와 맞춤형 건강관리를 지속적으로 지원합니다." },
            ].map((f, i) => (
              <div
                key={f.title}
                className="group bg-white transition-all duration-300 hover:-translate-y-1"
                style={{
                  border: "1.5px solid #dceef8",
                  borderRadius: 20,
                  padding: "32px 28px",
                  opacity: s3.v ? 1 : 0,
                  transform: s3.v ? "translateY(0)" : "translateY(30px)",
                  transition: `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s, box-shadow 0.3s ease, border-color 0.3s ease`,
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
                <div className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-[22px]"
                    style={{ background: `${f.color}12` }}
                  >
                    {f.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "#0f2a3a", marginBottom: 8 }}>
                      {f.title}
                    </div>
                    <p style={{ fontSize: 13.5, color: "#4a7a90", lineHeight: 1.7, wordBreak: "keep-all" }}>
                      {f.desc}
                    </p>
                  </div>
                </div>
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
            background: "linear-gradient(135deg, #1a9de0, #0d8fcc)",
            padding: "56px 24px",
            opacity: s4.v ? 1 : 0,
            transform: s4.v ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <h3
            className="font-bold text-white"
            style={{ fontFamily: "var(--font-noto-serif-kr)", fontSize: "clamp(22px, 2.5vw, 32px)", marginBottom: 12 }}
          >
            국가건강검진 대상자이신가요?
          </h3>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", marginBottom: 36 }}>
            지금 바로 한사랑속편한내과에서 편안하게 검진받으세요
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:031-917-9008"
              className="no-underline transition-all duration-300 hover:-translate-y-[2px]"
              style={{ background: "white", color: "#1a9de0", borderRadius: 12, padding: "16px 36px", fontSize: 16, fontWeight: 700, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
            >
              031-917-9008 국가건강검진
            </a>
            <a
              href="https://naver.me/FvEgeFyj"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline transition-all duration-300 hover:-translate-y-[2px]"
              style={{ background: "rgba(255,255,255,0.15)", color: "white", border: "1.5px solid rgba(255,255,255,0.35)", borderRadius: 12, padding: "16px 36px", fontSize: 16, fontWeight: 600, backdropFilter: "blur(8px)" }}
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
