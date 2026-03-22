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
const CARDS = [
  {
    title: "한사랑속편한내과 내시경실은",
    desc: "유수의 대학병원 소화기분야에서 세부전공을 마친 소화기내시경 전문의들로 구성된 다수의 의료진이 검사를 시행합니다. 연 1만 건 정도의 내시경 검사를 통해 많은 조기 병변을 진단하고 치료함으로써 풍부한 임상실적을 축적하고 있는 고양시 최고의 소화기전문 클리닉입니다.",
  },
  {
    title: "최고의 내시경 장비를 갖추고 있습니다.",
    desc: "저희 내시경센터에서는 전세계적으로 가장 상위기종인 Olympus 290H 모델을 보유하고 있습니다. 이 모델은 full HD의 화질과 NBI라는 색소내시경이 가능하여 식도, 위, 대장 점막의 미세한 변화를 면밀히 관찰할 수 있어 조기 병변을 진단하는데 있어 최선의 장비라 할 수 있습니다.",
  },
  {
    title: "진단과 치료를 동시에",
    desc: "대장내시경 검사 중 용종이 발견되면 검사 당일 용종절제술을 시행함으로써 치료를 위하여 추가로 검사를 또 해야 되는 불편함이 없습니다. 신속하고 정확한 당일 진단·치료 시스템으로 환자분의 소중한 시간을 아껴드립니다.",
  },
  {
    title: "완벽한 내시경 소독 원칙을 철저히 지키고 있습니다.",
    desc: "9개의 내시경을 구비하여 원활한 검사와 충분한 소독시간을 확보하고 있으며, 1회 내시경, 1회 소독의 원칙을 지키고 있습니다. 마우스피스는 1일 1인 1회 사용하고 매일 멸균 소독합니다. 생검겸자와 처치용구는 EO가스 소독 후 1일 1회 사용합니다.",
  },
];

const STATS = [
  { value: "연 1만건+", label: "내시경 검사" },
  { value: "9대", label: "내시경 보유" },
  { value: "1회", label: "1소독 원칙" },
  { value: "Olympus 290H", label: "최고 사양 장비" },
];

const EQUIP_STATS = [
  { value: "3대", label: "내시경 본체" },
  { value: "7대", label: "위내시경 Fiber" },
  { value: "6대", label: "대장내시경 Fiber" },
];

/* ━━━ Component ━━━ */
export default function EndoscopyRoomPage() {
  const s1 = useReveal();
  const s2 = useReveal();
  const s3 = useReveal();
  const s4 = useReveal();
  const s5 = useReveal();

  return (
    <>
      <SubPageHeader />
      <SubPageBanner category="내시경센터" title="내시경실" breadcrumb={["홈", "내시경센터", "내시경실"]} />

      {/* ━━━ S1: 히어로 배너 ━━━ */}
      <section
        ref={s1.ref}
        style={{
          position: "relative",
          height: 320,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          src="https://cdn.imweb.me/upload/S20260108b9005a7eb2710/6043d7f093cc1.jpeg"
          alt="내시경실"
          fill
          unoptimized
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,22,40,0.58)" }} />
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
            내시경실
          </h2>
          <div style={{ width: 48, height: 2, background: "#38b2f0", margin: "0 auto 20px" }} />
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.78)", lineHeight: 1.8, wordBreak: "keep-all", maxWidth: 560, margin: "0 auto" }}>
            속이 불편하시다면 이제 안심 하십시오.
            <br />
            한사랑속편한내과가 환자분의 속을 편안하고 확실하게 지켜 드립니다.
          </p>
        </div>
      </section>

      {/* ━━━ S2: 특징 4개 카드 ━━━ */}
      <section className="bg-white" ref={s2.ref}>
        <div className="max-w-[1280px] mx-auto px-5 lg:px-12" style={{ padding: "100px 48px" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CARDS.map((card, i) => (
              <div
                key={i}
                className="group relative overflow-hidden"
                style={{
                  background: "white",
                  border: "1.5px solid #dceef8",
                  borderRadius: 20,
                  padding: "40px 40px",
                  transition: "all 0.3s ease",
                  opacity: s2.v ? 1 : 0,
                  transform: s2.v ? "translateY(0)" : "translateY(30px)",
                  transitionDelay: s2.v ? `${i * 0.1}s` : "0s",
                  transitionProperty: "opacity, transform, box-shadow, border-color",
                  transitionDuration: "0.5s, 0.5s, 0.3s, 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
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
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: "linear-gradient(90deg, #1a9de0, #38b2f0)",
                    transform: "scaleX(0)",
                    transformOrigin: "left",
                    transition: "transform 0.4s ease",
                  }}
                />
                <div
                  style={{
                    fontFamily: "var(--font-noto-serif-kr)",
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#1a9de0",
                    marginBottom: 20,
                    wordBreak: "keep-all",
                    lineHeight: 1.4,
                  }}
                >
                  {card.title}
                </div>
                <p
                  style={{
                    fontSize: 14.5,
                    color: "#4a7a90",
                    lineHeight: 1.9,
                    fontWeight: 300,
                    wordBreak: "keep-all",
                    margin: 0,
                  }}
                >
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ S3: 수치 배너 ━━━ */}
      <section ref={s3.ref} style={{ background: "linear-gradient(135deg, #0a1628, #0f2a3a)", padding: "64px 48px" }}>
        <div className="max-w-[1280px] mx-auto flex justify-center items-center flex-wrap">
          {STATS.map((s, i) => (
            <div key={s.label} className="contents">
              {i > 0 && (
                <div
                  className="hidden md:block flex-shrink-0"
                  style={{ width: 1, height: 56, background: "rgba(255,255,255,0.15)" }}
                />
              )}
              <div
                className="flex flex-col items-center justify-center text-center"
                style={{
                  flex: 1,
                  minWidth: 140,
                  padding: "12px 24px",
                  opacity: s3.v ? 1 : 0,
                  transform: s3.v ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`,
                }}
              >
                <div
                  className="font-extrabold leading-none tracking-tight"
                  style={{
                    fontFamily: "var(--font-outfit)",
                    fontSize: "clamp(28px, 3vw, 40px)",
                    color: "#7dd3f8",
                  }}
                >
                  {s.value}
                </div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", marginTop: 8 }}>
                  {s.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ━━━ S4: 내시경 장비 소개 ━━━ */}
      <section style={{ background: "#f8fcff" }} ref={s4.ref}>
        <div className="max-w-[1280px] mx-auto px-5 lg:px-12" style={{ padding: "100px 48px" }}>
          <h2
            className="text-center font-bold"
            style={{
              fontFamily: "var(--font-noto-serif-kr)",
              fontSize: "clamp(22px, 2.8vw, 32px)",
              color: "#0f2a3a",
              marginBottom: 48,
              wordBreak: "keep-all",
            }}
          >
            대학병원과 동일한 최고 사양 내시경 장비
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* 왼쪽: 사진 */}
            <div
              style={{
                opacity: s4.v ? 1 : 0,
                transform: s4.v ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
              }}
            >
              <div className="relative w-full overflow-hidden" style={{ borderRadius: 20, boxShadow: "0 12px 40px rgba(56,178,240,0.15)", aspectRatio: "4/3" }}>
                <Image
                  src="https://cdn.imweb.me/thumbnail/20240614/5c0d41d1c7e70.jpg"
                  alt="OLYMPUS CV-290"
                  fill
                  unoptimized
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>

            {/* 오른쪽: 설명 */}
            <div
              style={{
                opacity: s4.v ? 1 : 0,
                transform: s4.v ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-outfit)",
                  fontSize: 28,
                  fontWeight: 800,
                  color: "#0f2a3a",
                  letterSpacing: "-0.5px",
                  marginBottom: 8,
                }}
              >
                OLYMPUS CV-290
              </div>
              <div style={{ fontSize: 14, color: "#1a9de0", fontWeight: 600, marginBottom: 24 }}>
                현존하는 최고 사양의 내시경 시스템
              </div>
              <p
                style={{
                  fontSize: 14.5,
                  color: "#4a7a90",
                  lineHeight: 1.9,
                  fontWeight: 300,
                  wordBreak: "keep-all",
                  marginBottom: 28,
                }}
              >
                Full HD 화질과 NBI 색소내시경 기능으로 식도, 위, 대장
                점막의 미세한 변화까지 면밀히 관찰할 수 있습니다.
                대학병원과 동일한 장비로 조기 병변을 정확하게 진단합니다.
              </p>

              <div className="grid grid-cols-3 gap-3">
                {EQUIP_STATS.map((es) => (
                  <div
                    key={es.label}
                    className="text-center"
                    style={{
                      background: "white",
                      border: "1px solid #dceef8",
                      borderRadius: 12,
                      padding: 16,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-outfit)",
                        fontSize: 24,
                        fontWeight: 800,
                        color: "#1a9de0",
                      }}
                    >
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
            편안하고 정확한 내시경 검사
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", marginBottom: 36 }}>
            전문의가 직접 시행하는 안전한 내시경 검사를 받아보세요
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
