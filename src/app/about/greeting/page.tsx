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

const strengths = [
  {
    icon: "🏥",
    title: "1994년 개원",
    desc: "30년 이상의 진료 경험과 신뢰를 바탕으로 지역 주민의 건강을 지켜왔습니다.",
  },
  {
    icon: "👨‍⚕️",
    title: "8인 전문의 협진",
    desc: "대학병원 임상교수 출신의 풍부한 경험을 갖춘 전문의료진이 함께합니다.",
  },
  {
    icon: "🔬",
    title: "대학병원급 장비",
    desc: "최신 의료장비를 지속적으로 도입하여 정확하고 편안한 진료를 제공합니다.",
  },
  {
    icon: "🤝",
    title: "전국 30여개 네트워크",
    desc: "속편한내과 네트워크를 통한 정기 세미나와 교육으로 진료 수준을 높이고 있습니다.",
  },
];

export default function GreetingPage() {
  const s1 = useRevealRef();
  const s2 = useRevealRef();
  const s3 = useRevealRef();
  const s4 = useRevealRef();

  return (
    <>
      <SubPageHeader />
      <SubPageBanner
        category="본원소개"
        title="인사말"
        breadcrumb={["홈", "본원소개", "인사말"]}
      />

      {/* ━━━ S1: 대표 인사 ━━━ */}
      <section className="bg-white" ref={s1.ref}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12" style={{ paddingTop: 60, paddingBottom: 80 }}>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-14 lg:gap-20 items-start">
            {/* Left: Text */}
            <div
              style={{
                wordBreak: "keep-all",
                opacity: s1.visible ? 1 : 0,
                transform: s1.visible ? "translateY(0)" : "translateY(40px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
              }}
            >
              {/* Label */}
              <div
                className="inline-flex items-center gap-[10px] mb-8"
                style={{
                  fontSize: 12, fontWeight: 600, letterSpacing: 2,
                  color: "#1a9de0", fontFamily: "var(--font-outfit)",
                  textTransform: "uppercase",
                }}
              >
                <span style={{ width: 20, height: 2, background: "#38b2f0", borderRadius: 1 }} />
                GREETING
              </div>

              <h2
                className="font-bold"
                style={{
                  fontFamily: "var(--font-noto-serif-kr)",
                  fontSize: "clamp(26px, 3vw, 40px)",
                  color: "#0f2a3a",
                  letterSpacing: "-1px",
                  lineHeight: 1.5,
                  marginBottom: 32,
                }}
              >
                여러분의 건강 지킴이가 되기 위해
                <br />
                <span style={{ color: "#1a9de0" }}>항상 노력하겠습니다.</span>
              </h2>

              <p
                className="font-light"
                style={{ fontSize: 16, color: "#4a7a90", lineHeight: 2.0, marginBottom: 28 }}
              >
                한사랑속편한내과는 내과 질환에 대한 정확한 진단과 질 높은 진료와 치료를 제공한다는 목적하에
                1994년 한사랑내과로 개원하였으며, 2009년 소화기질환 전문 속편한내과가 합병하여
                한사랑속편한내과라는 이름으로 오늘에 이르고 있습니다.
              </p>

              <p
                className="font-light"
                style={{ fontSize: 16, color: "#4a7a90", lineHeight: 2.0 }}
              >
                고양시 최대 규모 전문내과의원으로서, 내원하시는 모든 분들에게
                보다 높은 수준의 진료와 서비스를 제공하기 위해 늘 정성을 다하겠습니다.
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
                  width={420}
                  height={520}
                  unoptimized
                  className="w-full object-cover"
                  style={{ aspectRatio: "4/5" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ S2: 핵심 강점 4카드 ━━━ */}
      <section style={{ background: "#f8fcff" }} ref={s2.ref}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12" style={{ paddingTop: 80, paddingBottom: 80 }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {strengths.map((item, i) => (
              <div
                key={item.title}
                className="group bg-white transition-all duration-300 hover:-translate-y-1"
                style={{
                  border: "1.5px solid #dceef8",
                  borderRadius: 20,
                  padding: "32px 28px",
                  opacity: s2.visible ? 1 : 0,
                  transform: s2.visible ? "translateY(0)" : "translateY(30px)",
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
                <div style={{ fontSize: 32, marginBottom: 16 }}>{item.icon}</div>
                <div
                  style={{
                    fontFamily: "var(--font-noto-serif-kr)",
                    fontSize: 17, fontWeight: 700, color: "#0f2a3a",
                    marginBottom: 10,
                  }}
                >
                  {item.title}
                </div>
                <p style={{ fontSize: 13.5, color: "#4a7a90", lineHeight: 1.75, fontWeight: 300, wordBreak: "keep-all" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ S3: 상세 소개 ━━━ */}
      <section className="bg-white" ref={s3.ref}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12" style={{ paddingTop: 80, paddingBottom: 100 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Photo */}
            <div
              className="group order-2 lg:order-1"
              style={{
                opacity: s3.visible ? 1 : 0,
                transform: s3.visible ? "translateY(0)" : "translateY(40px)",
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

            {/* Right: Text blocks */}
            <div
              className="order-1 lg:order-2"
              style={{
                wordBreak: "keep-all",
                opacity: s3.visible ? 1 : 0,
                transform: s3.visible ? "translateY(0)" : "translateY(40px)",
                transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s",
              }}
            >
              <h3
                className="font-bold"
                style={{
                  fontFamily: "var(--font-noto-serif-kr)",
                  fontSize: "clamp(24px, 2.8vw, 34px)",
                  color: "#0f2a3a",
                  letterSpacing: "-0.8px",
                  lineHeight: 1.4,
                  marginBottom: 32,
                }}
              >
                동네병원에서 받는
                <br />
                대학병원급 진료
              </h3>

              {/* Block 1 */}
              <div style={{ marginBottom: 24 }}>
                <div
                  style={{
                    fontSize: 14, fontWeight: 700, color: "#1a9de0",
                    marginBottom: 8, fontFamily: "var(--font-outfit)",
                    letterSpacing: 0.5,
                  }}
                >
                  전문의료진
                </div>
                <p className="font-light" style={{ fontSize: 15, color: "#4a7a90", lineHeight: 1.9 }}>
                  8명의 대학병원 임상교수 출신의 임상경험이 풍부한 전문의료진으로 구성되어 있어
                  전문적이며 포괄적인 진료가 가능합니다.
                </p>
              </div>

              {/* Block 2 */}
              <div style={{ marginBottom: 24 }}>
                <div
                  style={{
                    fontSize: 14, fontWeight: 700, color: "#1a9de0",
                    marginBottom: 8, fontFamily: "var(--font-outfit)",
                    letterSpacing: 0.5,
                  }}
                >
                  최신 의료장비
                </div>
                <p className="font-light" style={{ fontSize: 15, color: "#4a7a90", lineHeight: 1.9 }}>
                  최신의 의료장비를 업데이트하는 데 투자를 아끼지 않음으로써,
                  편안한 동네병원에서 대학병원급의 진료를 받으실 수 있도록 끊임없이 노력하고 있습니다.
                </p>
              </div>

              {/* Block 3 */}
              <div>
                <div
                  style={{
                    fontSize: 14, fontWeight: 700, color: "#1a9de0",
                    marginBottom: 8, fontFamily: "var(--font-outfit)",
                    letterSpacing: 0.5,
                  }}
                >
                  예방 중심 건강검진
                </div>
                <p className="font-light" style={{ fontSize: 15, color: "#4a7a90", lineHeight: 1.9 }}>
                  전문적인 내과질환 진단 및 치료에 대한 경험을 바탕으로 체계적인 건강검진 프로그램을
                  실시하여 증상이 발생되기 전에 질병을 조기에 발견하거나 예방하기 위해 힘쓰고 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ S4: 마무리 배너 ━━━ */}
      <section ref={s4.ref}>
        <div
          className="text-center"
          style={{
            background: "linear-gradient(135deg, #0f2a3a, #1a3a4a)",
            padding: "56px 24px",
          }}
        >
          <div
            style={{
              opacity: s4.visible ? 1 : 0,
              transform: s4.visible ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-noto-serif-kr)",
                fontSize: "clamp(22px, 2.8vw, 34px)",
                fontWeight: 700,
                color: "white",
                lineHeight: 1.6,
                wordBreak: "keep-all",
                marginBottom: 16,
              }}
            >
              환자분의 속을 편안하고 확실하게
              <br />
              <span style={{ color: "#7dd3f8" }}>지켜 드리겠습니다.</span>
            </div>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.8 }}>
              한사랑속편한내과 의료진 일동
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingBanner />
    </>
  );
}
