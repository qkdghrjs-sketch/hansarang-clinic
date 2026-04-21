"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SubPageHeader from "@/components/SubPageHeader";
import SubPageBanner from "@/components/SubPageBanner";
import Footer from "@/components/Footer";
import FloatingBanner from "@/components/FloatingBanner";

/* ━━━ Reveal hook ━━━ */
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

/* ━━━ Data ━━━ */
const DISEASES = [
  { name: "역류성 식도염", img: "https://cdn.imweb.me/upload/S20260108b9005a7eb2710/7776a733ca8bb.jpeg" },
  { name: "식도암", img: "https://cdn.imweb.me/upload/S20260108b9005a7eb2710/0da02f859ba01.jpeg" },
  { name: "조기 위암", img: "https://cdn.imweb.me/upload/S20260108b9005a7eb2710/c9ae7485a21dd.jpeg" },
  { name: "진행성 위암", img: "https://cdn.imweb.me/upload/S20260108b9005a7eb2710/ec1ab5b8b9a3c.jpeg" },
  { name: "위 궤양", img: "https://cdn.imweb.me/upload/S20260108b9005a7eb2710/03451ccef9d59.jpeg" },
  { name: "십이지장 위궤양", img: "https://cdn.imweb.me/upload/S20260108b9005a7eb2710/c027be3686a76.jpeg" },
];

const CHART_DATA = [
  { label: "4기", pct: 10 },
  { label: "3B기", pct: 30 },
  { label: "3A기", pct: 50 },
  { label: "2기", pct: 70 },
  { label: "1B기", pct: 85 },
  { label: "1A기", pct: 95 },
  { label: "0기", pct: 100 },
];

/* ━━━ Component ━━━ */
export default function GastroPage() {
  const s1 = useReveal();
  const s2 = useReveal();
  const s3 = useReveal();
  const s4 = useReveal();
  const s5 = useReveal();
  const s6 = useReveal();
  const s8 = useReveal();

  return (
    <>
      <SubPageHeader />
      <SubPageBanner category="내시경센터" title="위 내시경" breadcrumb={["홈", "내시경센터", "위 내시경"]} />

      {/* ━━━ S1: 히어로 배너 ━━━ */}
      <section
        ref={s1.ref}
        style={{ position: "relative", height: 320, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Image src="https://cdn.imweb.me/upload/S20260108b9005a7eb2710/751d7204baa45.png" alt="위 내시경" fill unoptimized style={{ objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,22,40,0.60)" }} />
        <div
          className="relative z-10 text-center px-6"
          style={{ opacity: s1.v ? 1 : 0, transform: s1.v ? "translateY(0)" : "translateY(30px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
        >
          <h2 style={{ fontFamily: "var(--font-noto-serif-kr)", fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 700, color: "white", marginBottom: 20 }}>
            조기진단이 중요! 위내시경
          </h2>
          <div style={{ width: 48, height: 2, background: "#38b2f0", margin: "0 auto 20px" }} />
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.78)", lineHeight: 1.8, wordBreak: "keep-all", maxWidth: 560, margin: "0 auto" }}>
            위암은 우리나라 사람이 가장 많이 걸리는 암이고,<br />
            진행이 되어 발견을 하면 치료할 수가 없기 때문에<br />
            조기 진단이 중요합니다.
          </p>
        </div>
      </section>

      {/* ━━━ S2: 위 내시경이란? ━━━ */}
      <section className="bg-white" ref={s2.ref}>
        <div className="max-w-[1280px] mx-auto px-5 lg:px-12" style={{ paddingTop: 100, paddingBottom: 100 }}>
          <h2 className="text-center font-bold" style={{ fontFamily: "var(--font-noto-serif-kr)", fontSize: "clamp(24px,3vw,34px)", color: "#0f2a3a", marginBottom: 56 }}>
            위 내시경은 어떤 검사일까요?
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 lg:gap-[60px] items-center">
            {/* 텍스트 */}
            <div style={{ opacity: s2.v ? 1 : 0, transform: s2.v ? "translateY(0)" : "translateY(30px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
              <p style={{ fontSize: 15, color: "#4a7a90", lineHeight: 2.0, marginBottom: 20, wordBreak: "keep-all" }}>
                <strong style={{ color: "#0f2a3a", fontWeight: 700 }}>내시경</strong>은 긴 관 형태의 기구로 그 끝에 광학 렌즈와 불빛을 비출 수 있는 장치가 있어 인체의 내부를 관찰할 수 있게 만든 기계입니다.
              </p>
              <p style={{ fontSize: 15, color: "#4a7a90", lineHeight: 2.0, marginBottom: 20, wordBreak: "keep-all" }}>
                위 내시경 기계의 두께는 최근 점점 가늘어 지는 추세로 일반적으로 볼펜 두께와 비슷하거나 그 보다 약간 큽니다.
              </p>
              <p style={{ fontSize: 15, color: "#4a7a90", lineHeight: 2.0, wordBreak: "keep-all" }}>
                <strong style={{ color: "#0f2a3a", fontWeight: 700 }}>위 내시경 검사</strong>는 인체 내부를 관찰할 수 있는 내시경 기계를 이용하여 식도와 위를 통해 십이지장의 중간 부분까지 들어가서{" "}
                <strong style={{ color: "#1a9de0", fontWeight: 700 }}>식도염, 식도암, 위염, 위궤양, 위암, 십이지장 궤양 등 위, 식도, 십이지장의 질병을 가장 정확히 진단 할 수 있는 검사</strong>입니다.
              </p>
            </div>
            {/* SVG 해부도 */}
            <div
              style={{
                background: "#f0f9ff", borderRadius: 20, padding: 32, textAlign: "center",
                opacity: s2.v ? 1 : 0, transform: s2.v ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s",
              }}
            >
              <svg width="100%" height="280" viewBox="0 0 300 280">
                {/* 식도 */}
                <rect x="125" y="10" width="30" height="80" rx="12" fill="#7dd3f8" />
                {/* 위 */}
                <ellipse cx="150" cy="150" rx="85" ry="70" fill="#38b2f0" opacity="0.8" />
                {/* 십이지장 */}
                <path d="M220 130 Q260 160 240 200 Q220 240 200 240" stroke="#1a9de0" strokeWidth="22" fill="none" strokeLinecap="round" opacity="0.7" />
                {/* 연결선 */}
                <line x1="60" y1="45" x2="120" y2="45" stroke="#dceef8" strokeWidth="1.5" strokeDasharray="4,2" />
                <line x1="30" y1="150" x2="65" y2="150" stroke="#dceef8" strokeWidth="1.5" strokeDasharray="4,2" />
                <line x1="248" y1="220" x2="280" y2="240" stroke="#dceef8" strokeWidth="1.5" strokeDasharray="4,2" />
                {/* 라벨 - 식도 */}
                <rect x="10" y="32" width="50" height="26" rx="13" fill="white" stroke="#dceef8" strokeWidth="1.5" />
                <text x="35" y="50" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0f2a3a">식도</text>
                {/* 라벨 - 위 */}
                <rect x="120" y="138" width="60" height="26" rx="13" fill="white" stroke="#dceef8" strokeWidth="1.5" />
                <text x="150" y="156" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0f2a3a">위</text>
                {/* 라벨 - 십이지장 */}
                <rect x="232" y="238" width="68" height="26" rx="13" fill="white" stroke="#dceef8" strokeWidth="1.5" />
                <text x="266" y="256" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f2a3a">십이지장</text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ S3: 진단 가능한 질병 ━━━ */}
      <section style={{ background: "#f8fcff" }} ref={s3.ref}>
        <div className="max-w-[1280px] mx-auto px-5 lg:px-12" style={{ paddingTop: 80, paddingBottom: 80 }}>
          <h2 className="text-center font-bold" style={{ fontFamily: "var(--font-noto-serif-kr)", fontSize: "clamp(22px,2.8vw,32px)", color: "#0f2a3a", marginBottom: 48 }}>
            위 내시경 검사로 진단이 가능한 질병
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
            {DISEASES.map((d, i) => (
              <div
                key={d.name}
                className="group overflow-hidden"
                style={{
                  background: "white", border: "1px solid #dceef8", borderRadius: 16,
                  transition: "all 0.3s",
                  opacity: s3.v ? 1 : 0, transform: s3.v ? "translateY(0)" : "translateY(30px)",
                  transitionDelay: s3.v ? `${i * 0.08}s` : "0s",
                  transitionProperty: "opacity, transform, box-shadow, border-color",
                  transitionDuration: "0.5s, 0.5s, 0.3s, 0.3s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(56,178,240,0.14)"; e.currentTarget.style.borderColor = "rgba(56,178,240,0.3)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "#dceef8"; }}
              >
                <div className="relative overflow-hidden" style={{ height: 200 }}>
                  <Image src={d.img} alt={d.name} fill unoptimized className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div style={{ padding: "16px 20px", fontSize: 15, fontWeight: 700, color: "#0f2a3a", textAlign: "center" }}>{d.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ S4: 검사 시기 ━━━ */}
      <section className="bg-white" ref={s4.ref}>
        <div className="max-w-[1280px] mx-auto px-5 lg:px-12" style={{ paddingTop: 80, paddingBottom: 80 }}>
          <h2 className="text-center font-bold" style={{ fontFamily: "var(--font-noto-serif-kr)", fontSize: "clamp(22px,2.8vw,32px)", color: "#0f2a3a", marginBottom: 48 }}>
            위 내시경 검사는 언제 받아야 하나?
          </h2>
          <div
            style={{
              maxWidth: 900, margin: "0 auto 40px",
              background: "white", border: "1px solid #dceef8", borderRadius: 16, padding: "36px 40px",
              opacity: s4.v ? 1 : 0, transform: s4.v ? "translateY(0)" : "translateY(30px)", transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <p style={{ fontSize: 15, lineHeight: 2.0, wordBreak: "keep-all", margin: 0 }}>
              <strong style={{ color: "#0f2a3a", fontWeight: 700 }}>위암은 우리나라 사람이 가장 많이 걸리는 암이고 진행이 되어 발견을 하면 치료할 수가 없기 때문에 조기 진단이 가장 중요합니다.</strong>
              <span style={{ color: "#4a7a90", fontWeight: 300 }}>
                {" "}그러나 조기 위암은 대부분 증상이 없고 증상이 있다고 해도 일반적인 위염이나 위궤양에 의한 속쓰림 및 소화불량증과 구별이 안 가기 때문에 위 내시경 검사를 통해서만 구별이 가능합니다. 따라서 위암의 발생률이 증가하는 40대 이후에는 증상에 상관없이 1년에 한번 위 내시경 검사를 받아야 하며 20-30대라도 위암의 가족력이 있거나 위장 증상이 있으면 반드시 위 내시경 검사를 1-2년 간격으로 정기적으로 받아야 합니다.
              </span>
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5" style={{ maxWidth: 900, margin: "0 auto" }}>
            <div style={{ background: "rgba(239,68,68,0.04)", borderLeft: "3px solid #ef4444", borderRadius: "0 12px 12px 0", padding: "20px 24px" }}>
              <p style={{ fontSize: 14, color: "#4a7a90", lineHeight: 1.85, wordBreak: "keep-all", margin: 0 }}>
                조기 위암의 경우 대부분 증상이 없으며 증상이 있어도 단순한 속쓰림이나 소화불량증과 구별이 안됩니다.{" "}
                <strong style={{ color: "#0f2a3a", fontWeight: 700 }}>진행성 위암이 되어야만 비로서 구토, 복통, 체중 감소, 소화 불량, 토혈 등 여러가지 증상이 나타나게 됩니다.</strong>
              </p>
            </div>
            <div style={{ background: "rgba(56,178,240,0.04)", borderLeft: "3px solid #1a9de0", borderRadius: "0 12px 12px 0", padding: "20px 24px" }}>
              <p style={{ fontSize: 14, color: "#4a7a90", lineHeight: 1.85, wordBreak: "keep-all", margin: 0 }}>
                <strong style={{ color: "#0f2a3a", fontWeight: 700 }}>조기 위암</strong>과 같이 위암을 초기에 발견할 경우 완치가 가능하나{" "}
                <strong style={{ color: "#0f2a3a", fontWeight: 700 }}>진행성 위암</strong>과 같이 암이 많이 진행되어 발견될 경우는 현대 의학으로도 치료할 수 없습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ S5: 5년 생존율 차트 ━━━ */}
      <section style={{ background: "#f8fcff" }} ref={s5.ref}>
        <div className="max-w-[1280px] mx-auto px-5 lg:px-12" style={{ paddingTop: 80, paddingBottom: 80 }}>
          <h2 className="text-center font-bold" style={{ fontFamily: "var(--font-noto-serif-kr)", fontSize: "clamp(22px,2.8vw,32px)", color: "#0f2a3a", marginBottom: 48 }}>
            위암의 병기별 5년 생존율
          </h2>
          <div style={{ background: "white", border: "1px solid #dceef8", borderRadius: 20, padding: "40px 24px", boxShadow: "0 4px 24px rgba(56,178,240,0.08)" }}>
            <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: "touch" }}>
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 20, height: 300, paddingBottom: 40, borderBottom: "2px solid #f0f7fc", position: "relative", minWidth: 600 }}>
                {/* Y축 가이드 */}
                {[0, 25, 50, 75, 100].map((y) => (
                  <div key={y} style={{ position: "absolute", left: 0, bottom: 40 + (y / 100) * 240, width: "100%", display: "flex", alignItems: "center" }}>
                    <span style={{ fontFamily: "var(--font-outfit)", fontSize: 11, color: "#82aabf", width: 28, textAlign: "right", flexShrink: 0 }}>{y}</span>
                    <div style={{ flex: 1, height: 1, background: y === 0 ? "transparent" : "#f0f7fc", marginLeft: 8 }} />
                  </div>
                ))}
                {/* 바 */}
                <div style={{ display: "flex", alignItems: "flex-end", gap: 20, marginLeft: 40, position: "relative", zIndex: 1 }}>
                  {CHART_DATA.map((d) => (
                    <div key={d.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                      <span style={{ fontFamily: "var(--font-outfit)", fontSize: 13, fontWeight: 700, color: "#1a9de0" }}>{d.pct}%</span>
                      <div
                        style={{
                          width: 52,
                          height: s5.v ? (d.pct / 100) * 240 : 0,
                          background: "linear-gradient(to top, #1a9de0, #38b2f0)",
                          borderRadius: "6px 6px 0 0",
                          transition: "height 1s ease",
                        }}
                      />
                      <span style={{ fontSize: 13, color: "#4a7a90", fontWeight: 500, marginTop: 8 }}>{d.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ marginTop: 24 }}>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {[
                  "전문가에 의한 위내시경 검사는 수 mm 크기의 조기 위암도 정확히 진단할 수 있습니다.",
                  "특히 색소를 이용한 색소내시경의 경우 육안적으로 구별하기 힘든 병변도 정확히 진단 할 수 있습니다.",
                ].map((t, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "#4a7a90", lineHeight: 1.8, marginBottom: 6 }}>
                    <span style={{ width: 6, height: 6, background: "#38b2f0", borderRadius: "50%", flexShrink: 0, marginTop: 8 }} />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ S6: OLYMPUS CV-290 장비 소개 ━━━ */}
      <section className="bg-white" ref={s6.ref}>
        <div className="max-w-[1280px] mx-auto px-5 lg:px-12" style={{ paddingTop: 80, paddingBottom: 80 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* 왼쪽: 사진 */}
            <div
              className="group"
              style={{
                opacity: s6.v ? 1 : 0,
                transform: s6.v ? "translateX(0)" : "translateX(-40px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
              }}
            >
              <div className="rounded-2xl overflow-hidden" style={{ boxShadow: "0 12px 48px rgba(56,178,240,0.12)" }}>
                <Image
                  src="https://cdn.imweb.me/upload/S20260108b9005a7eb2710/b9ca18b461837.png"
                  alt="OLYMPUS CV-290"
                  width={640}
                  height={480}
                  unoptimized
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  style={{ aspectRatio: "4/3" }}
                />
              </div>
            </div>

            {/* 오른쪽: 텍스트 */}
            <div
              style={{
                opacity: s6.v ? 1 : 0,
                transform: s6.v ? "translateX(0)" : "translateX(40px)",
                transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s",
                wordBreak: "keep-all",
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 700, color: "#1a9de0", letterSpacing: 1.5, fontFamily: "var(--font-outfit)", textTransform: "uppercase", marginBottom: 12 }}>
                EQUIPMENT
              </div>
              <h3
                className="font-bold"
                style={{
                  fontFamily: "var(--font-noto-serif-kr)",
                  fontSize: "clamp(24px, 2.8vw, 32px)",
                  color: "#0f2a3a", letterSpacing: "-0.5px",
                  lineHeight: 1.4, marginBottom: 20,
                }}
              >
                대학병원과 동일한
                <br />
                최고 사양 내시경 장비
              </h3>
              <div
                style={{
                  fontFamily: "var(--font-outfit)",
                  fontSize: 28, fontWeight: 800, color: "#0f2a3a",
                  letterSpacing: "-0.5px", marginBottom: 8,
                }}
              >
                OLYMPUS CV-290
              </div>
              <div style={{ fontSize: 14, color: "#1a9de0", fontWeight: 600, marginBottom: 24 }}>
                현존하는 최고 사양의 내시경 시스템
              </div>
              <p style={{ fontSize: 15, color: "#4a7a90", lineHeight: 1.9, marginBottom: 24 }}>
                Full HD 화질과 NBI 색소내시경 기능으로 식도, 위 점막의 미세한 변화까지 면밀히 관찰할 수 있어
                1mm 이하의 조기 병변도 정확하게 진단합니다.
              </p>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "3대", label: "내시경 본체" },
                  { value: "7대", label: "위내시경 Fiber" },
                  { value: "6대", label: "대장내시경 Fiber" },
                ].map((es) => (
                  <div
                    key={es.label}
                    className="text-center"
                    style={{ background: "#f0f9ff", border: "1px solid #dceef8", borderRadius: 12, padding: 16 }}
                  >
                    <div style={{ fontFamily: "var(--font-outfit)", fontSize: 22, fontWeight: 800, color: "#1a9de0" }}>
                      {es.value}
                    </div>
                    <div style={{ fontSize: 12, color: "#82aabf", marginTop: 4 }}>{es.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ S8: 하단 CTA ━━━ */}
      <section
        ref={s8.ref}
        style={{ background: "linear-gradient(135deg, #1a9de0, #0d8fcc)", padding: "56px 24px", textAlign: "center" }}
      >
        <div style={{ opacity: s8.v ? 1 : 0, transform: s8.v ? "translateY(0)" : "translateY(30px)", transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s" }}>
          <h2 style={{ fontFamily: "var(--font-noto-serif-kr)", fontSize: "clamp(22px,2.8vw,36px)", fontWeight: 700, color: "white", lineHeight: 1.5, wordBreak: "keep-all", marginBottom: 12 }}>
            조기 발견이 완치의 지름길입니다
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", marginBottom: 36 }}>
            전문의가 직접 시행하는 위내시경으로 건강을 지키세요
          </p>
          <div className="flex justify-center flex-wrap gap-4">
            <a href="tel:031-912-8720" className="no-underline transition-all hover:-translate-y-[2px]" style={{ background: "white", color: "#1a9de0", padding: "16px 36px", borderRadius: 14, fontSize: 15, fontWeight: 700, boxShadow: "0 8px 28px rgba(0,0,0,0.15)" }}>
              📞 031-912-8720 전화예약
            </a>
            <a href="https://naver.me/FvEgeFyj" target="_blank" rel="noopener noreferrer" className="no-underline transition-all hover:-translate-y-[2px]" style={{ background: "rgba(255,255,255,0.15)", color: "white", padding: "16px 36px", borderRadius: 14, fontSize: 15, fontWeight: 600, border: "1.5px solid rgba(255,255,255,0.35)", backdropFilter: "blur(8px)" }}>
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
