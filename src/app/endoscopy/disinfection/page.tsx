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
const STEPS = [
  <>철저한 소독을 위해서 <strong style={{ color: "#0f2a3a", fontWeight: 700 }}>최고성능의 올림푸스 내시경 전용세척기 2대를 보유</strong>해 사용하고 있습니다.</>,
  <>용종절제와 조직검사 등에 사용하는 내시경 부속장비의 소독을 위해 <strong style={{ color: "#0f2a3a", fontWeight: 700 }}>전용 EO가스 소독기를 보유</strong>하고 있습니다.</>,
  <>내시경은 인체로 직접 삽입되므로 <strong style={{ color: "#0f2a3a", fontWeight: 700 }}>청결이 매우 중요</strong>합니다. 저희 한사랑속편한내과는 <strong style={{ color: "#0f2a3a", fontWeight: 700 }}>최신형 내시경을 보유하고 있으며 한분 한분 마다 새로 소독한 내시경으로 검사</strong>를 하고 있습니다.</>,
  <>세척 소독제로는 살균효과가 매우 뛰어나며 현재 대학병원 급에서 사용중이며 <strong style={{ color: "#0f2a3a", fontWeight: 700 }}>인체에 무해한 내시경 전용 소독제인 고가의 Cidex 소독액을 사용</strong>하고 있습니다.</>,
  <>위내시경검사에 필수적인 <strong style={{ color: "#0f2a3a", fontWeight: 700 }}>마우스피스를 일회용으로 사용</strong>하여 환자 여러분에게 내시경 검사로 인한 어떠한 감염도 일어나지 않도록 하고 있습니다.</>,
];

const PRINCIPLES = [
  { icon: "🧼", title: "1회 1소독 원칙", desc: "매 검사 후 새로 소독한 내시경 사용" },
  { icon: "🔬", title: "올림푸스 전용 세척기", desc: "최고성능 내시경 전용 세척기 2대 보유" },
  { icon: "💨", title: "EO가스 멸균", desc: "부속기구 전용 EO가스 소독기 보유" },
  { icon: "🪣", title: "Cidex 소독액", desc: "대학병원급 인체 무해 전용 소독제 사용" },
];

/* ━━━ Component ━━━ */
export default function DisinfectionPage() {
  const s1 = useReveal();
  const s2 = useReveal();
  const s3 = useReveal();
  const s4 = useReveal();
  const s5 = useReveal();

  return (
    <>
      <SubPageHeader />
      <SubPageBanner category="내시경센터" title="내시경소독" breadcrumb={["홈", "내시경센터", "내시경소독"]} />

      {/* ━━━ S1: 히어로 배너 ━━━ */}
      <section
        ref={s1.ref}
        style={{
          position: "relative",
          height: 300,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          src="https://cdn.imweb.me/upload/S20260108b9005a7eb2710/e72dc805bf29e.png"
          alt="내시경 소독"
          fill
          unoptimized
          style={{ objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,22,40,0.60)" }} />
        <div
          className="relative z-10 text-center px-6"
          style={{
            opacity: s1.v ? 1 : 0,
            transform: s1.v ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-noto-serif-kr)",
              fontSize: "clamp(28px, 3.5vw, 44px)",
              fontWeight: 700,
              color: "white",
              marginBottom: 20,
            }}
          >
            내시경 소독
          </h2>
          <div style={{ width: 48, height: 2, background: "#38b2f0", margin: "0 auto 20px" }} />
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.78)", lineHeight: 1.8, wordBreak: "keep-all", maxWidth: 560, margin: "0 auto" }}>
            철저한 소독 원칙으로 환자분의 안전을 최우선으로 지킵니다.
            <br />
            한사랑속편한내과는 1회 1소독 원칙을 철저히 준수합니다.
          </p>
        </div>
      </section>

      {/* ━━━ S2: 소독 5단계 번호 카드 ━━━ */}
      <section className="bg-white" ref={s2.ref}>
        <div className="max-w-[1280px] mx-auto px-5 lg:px-12" style={{ padding: "100px 48px" }}>
          <h2
            className="text-center font-bold"
            style={{
              fontFamily: "var(--font-noto-serif-kr)",
              fontSize: "clamp(24px, 3vw, 34px)",
              color: "#0f2a3a",
              marginBottom: 56,
            }}
          >
            한사랑속편한내과의 내시경 소독
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS.map((content, i) => (
              <div
                key={i}
                className="group relative overflow-hidden"
                style={{
                  background: "white",
                  border: "1.5px solid #dceef8",
                  borderRadius: 20,
                  padding: "36px 32px",
                  textAlign: "center",
                  transition: "all 0.3s ease",
                  opacity: s2.v ? 1 : 0,
                  transform: s2.v ? "translateY(0)" : "translateY(30px)",
                  transitionDelay: s2.v ? `${i * 0.08}s` : "0s",
                  transitionProperty: "opacity, transform, box-shadow, border-color",
                  transitionDuration: "0.5s, 0.5s, 0.3s, 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = "0 16px 48px rgba(56,178,240,0.14)";
                  e.currentTarget.style.borderColor = "rgba(56,178,240,0.3)";
                  const bar = e.currentTarget.querySelector("[data-accent]") as HTMLElement;
                  if (bar) bar.style.transform = "scaleX(1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "#dceef8";
                  const bar = e.currentTarget.querySelector("[data-accent]") as HTMLElement;
                  if (bar) bar.style.transform = "scaleX(0)";
                }}
              >
                <div
                  data-accent
                  style={{
                    position: "absolute", top: 0, left: 0, right: 0,
                    height: 3,
                    background: "linear-gradient(90deg, #1a9de0, #38b2f0)",
                    transform: "scaleX(0)",
                    transformOrigin: "left",
                    transition: "transform 0.4s ease",
                  }}
                />
                <div
                  style={{
                    fontFamily: "var(--font-outfit)",
                    fontSize: 56,
                    fontWeight: 800,
                    color: "rgba(56,178,240,0.15)",
                    lineHeight: 1,
                    marginBottom: 20,
                    letterSpacing: "-2px",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p
                  style={{
                    fontSize: 14.5,
                    color: "#4a7a90",
                    lineHeight: 1.85,
                    fontWeight: 300,
                    wordBreak: "keep-all",
                    textAlign: "left",
                    margin: 0,
                  }}
                >
                  {content}
                </p>
              </div>
            ))}

            {/* 6번째 셀: 사진 */}
            <div
              className="flex flex-col items-center justify-center"
              style={{
                background: "#f8fcff",
                border: "1.5px solid #dceef8",
                borderRadius: 20,
                overflow: "hidden",
                padding: 24,
                opacity: s2.v ? 1 : 0,
                transform: s2.v ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 0.5s ease 0.4s, transform 0.5s ease 0.4s",
              }}
            >
              <div className="relative w-full overflow-hidden" style={{ height: 200, borderRadius: 12 }}>
                <Image
                  src="https://cdn.imweb.me/thumbnail/20240614/5c0d41d1c7e70.jpg"
                  alt="내시경 소독실"
                  fill
                  unoptimized
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div style={{ marginTop: 14, fontSize: 13, color: "#82aabf", fontWeight: 500, textAlign: "center" }}>
                내시경 소독실 내부
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ S3: 소독 사진 2세트 ━━━ */}
      <section style={{ background: "#f8fcff" }} ref={s3.ref}>
        <div className="max-w-[1280px] mx-auto px-5 lg:px-12" style={{ padding: "80px 48px" }}>
          <h2
            className="text-center font-bold"
            style={{
              fontFamily: "var(--font-noto-serif-kr)",
              fontSize: "clamp(22px, 2.5vw, 30px)",
              color: "#0f2a3a",
              marginBottom: 40,
            }}
          >
            소독 과정
          </h2>

          <div className="flex flex-col gap-6">
            {[
              {
                step: "소독 STEP 01",
                caption: "내시경 자동 세척기를 이용한 소독 과정",
                img: "https://cdn.imweb.me/upload/S20260108b9005a7eb2710/d6c55128d7c5d.png",
              },
              {
                step: "소독 STEP 02",
                caption: "EO가스를 이용한 내시경 부속기구 멸균과정",
                img: "https://cdn.imweb.me/upload/S20260108b9005a7eb2710/5b1ea004f7d71.png",
              },
            ].map((set, si) => (
              <div
                key={si}
                style={{
                  background: "white",
                  border: "1px solid #dceef8",
                  borderRadius: 20,
                  overflow: "hidden",
                  padding: 32,
                  opacity: s3.v ? 1 : 0,
                  transform: s3.v ? "translateY(0)" : "translateY(30px)",
                  transition: `opacity 0.5s ease ${si * 0.1}s, transform 0.5s ease ${si * 0.1}s`,
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[0, 1, 2].map((pi) => (
                    <div key={pi} className="relative overflow-hidden" style={{ height: 200, borderRadius: 12 }}>
                      <Image
                        src={set.img}
                        alt={`${set.step} - ${pi + 1}`}
                        fill
                        unoptimized
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  ))}
                </div>
                <div className="text-center" style={{ marginTop: 20 }}>
                  <div className="flex items-center justify-center gap-2" style={{ marginBottom: 8 }}>
                    <span style={{ width: 40, height: 1, background: "rgba(56,178,240,0.3)" }} />
                    <span
                      style={{
                        fontFamily: "var(--font-outfit)",
                        fontSize: 11,
                        color: "#1a9de0",
                        letterSpacing: 1.5,
                        fontWeight: 700,
                      }}
                    >
                      {set.step}
                    </span>
                    <span style={{ width: 40, height: 1, background: "rgba(56,178,240,0.3)" }} />
                  </div>
                  <div style={{ fontSize: 14, color: "#4a7a90", fontWeight: 500 }}>
                    {set.caption}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ S4: 소독 원칙 요약 배너 ━━━ */}
      <section
        ref={s4.ref}
        style={{
          background: "linear-gradient(135deg, #0a1628, #0f2a3a)",
          padding: "64px 48px",
          textAlign: "center",
        }}
      >
        <h2
          className="font-bold"
          style={{
            fontFamily: "var(--font-noto-serif-kr)",
            fontSize: "clamp(22px, 2.8vw, 32px)",
            color: "white",
            marginBottom: 40,
          }}
        >
          한사랑속편한내과 소독 원칙
        </h2>

        <div className="max-w-[1280px] mx-auto grid grid-cols-2 md:flex md:justify-center md:items-start">
          {PRINCIPLES.map((p, i) => (
            <div key={p.title} className="contents">
              {i > 0 && (
                <div
                  className="hidden md:block flex-shrink-0 self-center"
                  style={{ width: 1, height: 60, background: "rgba(255,255,255,0.15)" }}
                />
              )}
              <div
                className="flex flex-col items-center"
                style={{
                  flex: 1,
                  padding: "12px 32px",
                  opacity: s4.v ? 1 : 0,
                  transform: s4.v ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`,
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 12 }}>{p.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "white" }}>{p.title}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", marginTop: 6 }}>{p.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ━━━ S5: 하단 CTA ━━━ */}
      <section
        ref={s5.ref}
        style={{
          background: "linear-gradient(135deg, #1a9de0, #0d8fcc)",
          padding: "72px 48px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            opacity: s5.v ? 1 : 0,
            transform: s5.v ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-noto-serif-kr)",
              fontSize: "clamp(22px, 2.8vw, 36px)",
              fontWeight: 700,
              color: "white",
              lineHeight: 1.5,
              wordBreak: "keep-all",
              marginBottom: 12,
            }}
          >
            안전하고 철저한 내시경 검사
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", marginBottom: 36 }}>
            완벽한 소독 시스템으로 감염 걱정 없이 검사받으세요
          </p>
          <div className="flex justify-center flex-wrap gap-4">
            <a
              href="tel:031-912-8720"
              className="no-underline transition-all hover:-translate-y-[2px]"
              style={{
                background: "white",
                color: "#1a9de0",
                padding: "16px 36px",
                borderRadius: 14,
                fontSize: 15,
                fontWeight: 700,
                boxShadow: "0 8px 28px rgba(0,0,0,0.15)",
              }}
            >
              📞 031-912-8720 전화예약
            </a>
            <a
              href="https://naver.me/FvEgeFyj"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline transition-all hover:-translate-y-[2px]"
              style={{
                background: "rgba(255,255,255,0.15)",
                color: "white",
                padding: "16px 36px",
                borderRadius: 14,
                fontSize: 15,
                fontWeight: 600,
                border: "1.5px solid rgba(255,255,255,0.35)",
                backdropFilter: "blur(8px)",
              }}
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
