"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SubPageHeader from "@/components/SubPageHeader";
import SubPageBanner from "@/components/SubPageBanner";
import Footer from "@/components/Footer";
import FloatingBanner from "@/components/FloatingBanner";

/* ━━━ Scroll reveal hook ━━━ */
function useRevealRef() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

const stats = [
  { value: "1994년", label: "개원" },
  { value: "30년+", label: "진료 경험" },
  { value: "8인", label: "전문의" },
  { value: "30개+", label: "속편한내과 네트워크" },
];

export default function GreetingPage() {
  const s1 = useRevealRef();
  const s2 = useRevealRef();
  const s3 = useRevealRef();

  return (
    <>
      <SubPageHeader />
      <SubPageBanner
        category="본원소개"
        title="인사말"
        breadcrumb={["홈", "본원소개", "인사말"]}
      />

      {/* ━━━ Section 1: Main Greeting ━━━ */}
      <section className="bg-white" ref={s1.ref}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12" style={{ padding: "120px 48px" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Text */}
            <div
              style={{
                maxWidth: 600,
                wordBreak: "keep-all",
                opacity: s1.visible ? 1 : 0,
                transform: s1.visible ? "translateY(0)" : "translateY(40px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
              }}
            >
              <span
                className="block select-none"
                style={{
                  fontSize: 120, color: "#38b2f0", opacity: 0.3,
                  fontFamily: "Georgia, serif", lineHeight: 1, marginBottom: -24,
                }}
              >
                &ldquo;
              </span>
              <h2
                className="font-bold"
                style={{
                  fontFamily: "var(--font-noto-serif-kr)",
                  fontSize: "clamp(28px, 3vw, 42px)",
                  color: "#0f2a3a",
                  letterSpacing: "-1px",
                  lineHeight: 1.5,
                  marginBottom: 40,
                }}
              >
                여러분의 건강 지킴이가 되기 위해
                <br />
                항상 노력하겠습니다.
              </h2>
              <p
                className="font-light"
                style={{
                  fontSize: 17, color: "#4a7a90",
                  lineHeight: 2.0, letterSpacing: "-0.1px",
                }}
              >
                한사랑속편한내과는 내과 질환에 대한 정확한 진단과 질 높은 진료와 치료를 제공한다는 목적하에
                1994년 한사랑내과로 개원하였으며 2009년 소화기질환 전문 속편한내과가 합병하여
                한사랑속편한내과 이름으로 오늘에 이르고 있습니다.
              </p>
            </div>

            {/* Right: Photo */}
            <div
              style={{
                opacity: s1.visible ? 1 : 0,
                transform: s1.visible ? "translateY(0) scale(1)" : "translateY(40px) scale(0.97)",
                transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s",
              }}
            >
              <div className="relative rounded-3xl overflow-hidden" style={{ boxShadow: "0 16px 56px rgba(56,178,240,0.15)" }}>
                <Image
                  src="https://cdn.imweb.me/upload/S20260108b9005a7eb2710/31a05bf07525d.png"
                  alt="한사랑속편한내과 의료진"
                  width={640}
                  height={480}
                  unoptimized
                  className="w-full object-cover"
                  style={{ aspectRatio: "4/3" }}
                />
              </div>
              {/* Floating card */}
              <div
                className="inline-flex items-center gap-[14px]"
                style={{
                  marginTop: -40, marginLeft: 24, position: "relative", zIndex: 10,
                  background: "white", borderRadius: 16, padding: "18px 24px",
                  boxShadow: "0 8px 32px rgba(56,178,240,0.15)", border: "1px solid #dceef8",
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: "#f0f9ff" }}
                >
                  🏥
                </div>
                <div>
                  <div style={{ fontSize: 13, color: "#82aabf" }}>1994년 개원</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#0f2a3a" }}>30년 이상의 신뢰</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ Section 2: High-level care ━━━ */}
      <section style={{ background: "#f8fcff" }} ref={s2.ref}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12" style={{ padding: "120px 48px" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Photo */}
            <div
              className="group"
              style={{
                opacity: s2.visible ? 1 : 0,
                transform: s2.visible ? "translateY(0)" : "translateY(40px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
              }}
            >
              <div className="rounded-3xl overflow-hidden" style={{ boxShadow: "0 16px 56px rgba(56,178,240,0.12)" }}>
                <Image
                  src="https://cdn.imweb.me/upload/S20260108b9005a7eb2710/6043d7f093cc1.jpeg"
                  alt="한사랑속편한내과 내부"
                  width={640}
                  height={480}
                  unoptimized
                  className="w-full object-cover transition-transform duration-600 group-hover:scale-[1.02]"
                  style={{ aspectRatio: "4/3" }}
                />
              </div>
            </div>

            {/* Right: Text */}
            <div style={{ wordBreak: "keep-all" }}>
              <div
                style={{
                  maxWidth: 600,
                  opacity: s2.visible ? 1 : 0,
                  transform: s2.visible ? "translateY(0)" : "translateY(40px)",
                  transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s",
                }}
              >
                <span
                  className="block select-none"
                  style={{
                    fontSize: 60, color: "#38b2f0", opacity: 0.3,
                    fontFamily: "Georgia, serif", lineHeight: 1, marginBottom: -12,
                  }}
                >
                  &ldquo;
                </span>
                <h3
                  className="font-bold mb-5"
                  style={{
                    fontFamily: "var(--font-noto-serif-kr)",
                    fontSize: "clamp(26px, 3vw, 36px)",
                    color: "#0f2a3a", letterSpacing: "-0.8px",
                  }}
                >
                  높은 수준의 진료와 서비스
                </h3>
                <p
                  className="font-light mb-8"
                  style={{ fontSize: 17, color: "#4a7a90", lineHeight: 2.0 }}
                >
                  한사랑속편한내과는 고양시 최대 규모 전문내과의원으로 여러분의 건강 지킴이가 되기 위해
                  늘 정성을 다하겠습니다.
                </p>
              </div>

              {/* Highlight box */}
              <div
                style={{
                  background: "linear-gradient(135deg, #f0f9ff, #e8f4fd)",
                  border: "1px solid #dceef8",
                  borderLeft: "4px solid #1a9de0",
                  borderRadius: "0 16px 16px 0",
                  padding: "32px 36px",
                  opacity: s2.visible ? 1 : 0,
                  transform: s2.visible ? "translateY(0)" : "translateY(40px)",
                  transition: "opacity 0.6s ease 0.25s, transform 0.6s ease 0.25s",
                }}
              >
                <p className="font-light" style={{ fontSize: 15, color: "#4a7a90", lineHeight: 2.0, marginBottom: 20 }}>
                  한사랑속편한내과는 전국 30여개 속편한내과와 연합하여 정기적인 세미나와 교육을 실시하고
                  있으며 내원하시는 분들에게 보다 높은 수준의 진료와 서비스를 제공하기 위해 노력하고
                  있습니다.
                </p>
                <div style={{ borderTop: "1px solid #dceef8", marginBottom: 20 }} />
                <p className="font-light" style={{ fontSize: 15, color: "#4a7a90", lineHeight: 2.0, marginBottom: 20 }}>
                  8명의 대학병원 임상교수 출신의 임상경험이 풍부한 전문의료진으로 구성되어 있어 전문적이며
                  포괄적인 진료가 가능하며, 최신의 의료장비를 업데이트하는 데 있어 투자를 아끼지 않음으로써
                  편안한 동네병원에서 대학병원급의 진료를 받으실 수 있도록 끊임없이 노력하고 있습니다.
                </p>
                <div style={{ borderTop: "1px solid #dceef8", marginBottom: 20 }} />
                <p className="font-light" style={{ fontSize: 15, color: "#4a7a90", lineHeight: 2.0 }}>
                  또한 전문적인 내과질환 진단 및 치료에 대한 경험을 바탕으로 체계적이고 건강검진 프로그램을
                  실시하여 증상이 발생되기 전에 질병을 조기에 발견하거나 예방하기 위해 힘쓰고 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ Section 3: Stats banner ━━━ */}
      <section ref={s3.ref}>
        <div
          className="flex justify-center items-center flex-wrap"
          style={{
            background: "linear-gradient(135deg, #1a9de0, #0d8fcc)",
            padding: "70px 48px",
            gap: 0,
          }}
        >
          {stats.map((s, i) => (
            <div key={s.label} className="contents">
              {i > 0 && (
                <div
                  className="hidden md:block flex-shrink-0"
                  style={{ width: 1, height: 52, background: "rgba(255,255,255,0.25)" }}
                />
              )}
              <div
                className="flex flex-col items-center justify-center text-center"
                style={{
                  flex: 1, minWidth: 140,
                  opacity: s3.visible ? 1 : 0,
                  transform: s3.visible ? "translateY(0)" : "translateY(30px)",
                  transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`,
                }}
              >
                <div
                  className="font-extrabold text-white leading-none tracking-tight"
                  style={{ fontFamily: "var(--font-outfit)", fontSize: "clamp(36px, 4vw, 52px)" }}
                >
                  {s.value}
                </div>
                <div style={{ fontSize: 15, marginTop: 10, color: "rgba(255,255,255,0.75)" }}>
                  {s.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
      <FloatingBanner />
    </>
  );
}
