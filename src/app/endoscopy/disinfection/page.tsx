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
  <>철저한 소독을 위해서 <strong style={{ color: "#0f2a3a", fontWeight: 700 }}>최고성능의 올림푸스 내시경 전용세척기 3대와 감염통 1대를 보유</strong>해 사용하고 있습니다.</>,
  <>용종절제와 조직검사 등에 사용하는 내시경 부속장비의 소독을 위해 <strong style={{ color: "#0f2a3a", fontWeight: 700 }}>전용 EO가스 소독기를 보유</strong>하고 있습니다.</>,
  <>내시경은 인체로 직접 삽입되므로 <strong style={{ color: "#0f2a3a", fontWeight: 700 }}>청결이 매우 중요</strong>합니다. 저희 한사랑속편한내과는 <strong style={{ color: "#0f2a3a", fontWeight: 700 }}>최신형 내시경을 보유하고 있으며 한분 한분 마다 새로 소독한 내시경으로 검사</strong>를 하고 있습니다.</>,
  <>세척 소독제로는 살균효과가 매우 뛰어나며 현재 대학병원 급에서 사용중이며 <strong style={{ color: "#0f2a3a", fontWeight: 700 }}>인체에 무해한 내시경 전용 소독제인 페라스텔 과초산 제제를 사용</strong>하고 있습니다.</>,
  <>위내시경검사에 필수적인 <strong style={{ color: "#0f2a3a", fontWeight: 700 }}>마우스피스를 일회용으로 사용</strong>하여 환자 여러분에게 내시경 검사로 인한 어떠한 감염도 일어나지 않도록 하고 있습니다.</>,
];

const PRINCIPLES = [
  { icon: "🧼", title: "1회 1소독 원칙", desc: "매 검사 후 새로 소독한 내시경 사용" },
  { icon: "🔬", title: "올림푸스 전용 세척기", desc: "최고성능 내시경 전용 세척기 3대 보유" },
  { icon: "💨", title: "EO가스 멸균", desc: "부속기구 전용 EO가스 소독기 보유" },
  { icon: "🪣", title: "페라스텔 과초산", desc: "대학병원급 인체 무해 전용 소독제 사용" },
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
          src="https://cdn.imweb.me/upload/S20260108b9005a7eb2710/b7d60643909e8.png"
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
        <div className="max-w-[1280px] mx-auto px-5 lg:px-12" style={{ paddingTop: 100, paddingBottom: 100 }}>
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
                  src="https://cdn.imweb.me/upload/S20260108b9005a7eb2710/b7d60643909e8.png"
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
        <div className="max-w-[1280px] mx-auto px-5 lg:px-12" style={{ paddingTop: 80, paddingBottom: 80 }}>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { src: "https://cdn.imweb.me/upload/S20260108b9005a7eb2710/79a11b52c90c4.jpeg", title: "사용 후 내시경 수거", desc: "검사 완료 후 내시경을 즉시 수거하여 소독 준비를 시작합니다." },
              { src: "https://cdn.imweb.me/upload/S20260108b9005a7eb2710/7763a2acd25a3.png", title: "1차 손세척", desc: "전용 세척액으로 내시경 외부와 채널 내부를 꼼꼼히 손세척합니다." },
              { src: "https://cdn.imweb.me/upload/S20260108b9005a7eb2710/68d1babf56bb2.jpeg", title: "자동세척기 투입", desc: "올림푸스 전용 자동세척기에 투입하여 고수준 소독을 진행합니다." },
              { src: "https://cdn.imweb.me/upload/S20260108b9005a7eb2710/39927380e94ed.png", title: "페라스텔 소독", desc: "페라스텔 과초산 제제로 내시경 전체를 완벽하게 살균 소독합니다." },
              { src: "https://cdn.imweb.me/upload/S20260108b9005a7eb2710/b72dfec515c7b.png", title: "건조 및 보관", desc: "소독 완료된 내시경을 건조 후 청결한 전용 보관함에 보관합니다." },
              { src: "https://cdn.imweb.me/upload/S20260108b9005a7eb2710/ad7e84d5722cb.jpeg", title: "소독 완료 확인", desc: "소독 이력을 기록하고 다음 검사 전까지 위생 상태를 관리합니다." },
            ].map((step, i) => (
              <div
                key={i}
                className="group bg-white overflow-hidden"
                style={{
                  border: "1px solid #dceef8",
                  borderRadius: 20,
                  opacity: s3.v ? 1 : 0,
                  transform: s3.v ? "translateY(0)" : "translateY(30px)",
                  transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s, box-shadow 0.3s ease, border-color 0.3s ease`,
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
                {/* 사진 */}
                <div className="relative overflow-hidden" style={{ height: 200 }}>
                  <Image
                    src={step.src}
                    alt={step.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                  {/* 스텝 번호 뱃지 */}
                  <div
                    className="absolute top-4 left-4 z-10 flex items-center gap-2"
                    style={{
                      background: "linear-gradient(135deg, #1a9de0, #38b2f0)",
                      borderRadius: 10,
                      padding: "6px 14px",
                      boxShadow: "0 4px 12px rgba(26,157,224,0.4)",
                    }}
                  >
                    <span style={{ fontFamily: "var(--font-outfit)", fontSize: 13, fontWeight: 800, color: "white" }}>
                      STEP {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  {/* 하단 그라데이션 */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(10,22,40,0.3), transparent)" }} />
                </div>

                {/* 텍스트 */}
                <div style={{ padding: "20px 24px 24px" }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#0f2a3a", marginBottom: 8 }}>
                    {step.title}
                  </div>
                  <p style={{ fontSize: 13.5, color: "#4a7a90", lineHeight: 1.7, wordBreak: "keep-all" }}>
                    {step.desc}
                  </p>
                </div>

                {/* 하단 진행 바 */}
                <div style={{ height: 3, background: `linear-gradient(to right, #1a9de0 ${((i + 1) / 6) * 100}%, #e0f4fd ${((i + 1) / 6) * 100}%)` }} />
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
          padding: "48px 24px",
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
          padding: "56px 24px",
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
