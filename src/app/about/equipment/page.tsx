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
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, v };
}

/* ━━━ Data ━━━ */
const TABS = ["전체", "내시경", "초음파·영상", "검사장비"];

const EQUIPMENT = [
  { id: 1, category: "내시경", name: "OLYMPUS CV-290", desc: "현존 최고 사양 내시경 시스템 (Full HD + NBI)", image: "https://cdn.imweb.me/upload/S20260108b9005a7eb2710/b9ca18b461837.png" },
  { id: 2, category: "초음파·영상", name: "LOGIQ P9", desc: "초음파 장비", image: "https://gehealthcare-ultrasound.com/media/ultrasound/Products/LOGIQ/LOGIQ_P9_XDclear/Webseite-Highlight.png" },
  { id: 3, category: "초음파·영상", name: "Javix DR", desc: "Digital Radiography System", image: "https://images.allengers.net/product/2025/09/ceiling-free-digital-radiography-system-17567869521918.jpg" },
  { id: 4, category: "초음파·영상", name: "mammo", desc: "Mammography", image: "https://m.kukinews.com/data/kuk/image/2020/10/23/kuk202010230324.jpg" },
  { id: 5, category: "초음파·영상", name: "골밀도 장비", desc: "골밀도 장비", image: "https://www.dkms.co.kr/images/big_stratos.png" },
  { id: 6, category: "검사장비", name: "Hitachi 7100", desc: "자동생화학분석기", image: "https://www.hitachi-hightech.com/kr/ko/media/ana-f7100_main_jpg_tcm40-28113.jpg" },
];

const STATS = [
  { value: "3대", label: "내시경 본체" },
  { value: "7대", label: "위내시경 Fiber" },
  { value: "6대", label: "대장내시경 Fiber" },
];

/* ━━━ Component ━━━ */
export default function EquipmentPage() {
  const [activeTab, setActiveTab] = useState("전체");
  const [fadeKey, setFadeKey] = useState(0);
  const s1 = useReveal();
  const s2 = useReveal();
  const s3 = useReveal();

  const filtered = activeTab === "전체" ? EQUIPMENT : EQUIPMENT.filter((e) => e.category === activeTab);

  const handleTab = (tab: string) => {
    setActiveTab(tab);
    setFadeKey((k) => k + 1);
  };

  return (
    <>
      <SubPageHeader />
      <SubPageBanner category="본원소개" title="보유장비" breadcrumb={["홈", "본원소개", "보유장비"]} />

      {/* ━━━ Header + Tabs ━━━ */}
      <section className="bg-white" ref={s1.ref}>
        <div className="max-w-[1280px] mx-auto px-5 lg:px-12" style={{ paddingTop: 80, paddingBottom: 40 }}>
          <div
            className="text-center"
            style={{
              opacity: s1.v ? 1 : 0,
              transform: s1.v ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <h2
              className="font-bold mb-4"
              style={{ fontFamily: "var(--font-noto-serif-kr)", fontSize: "clamp(26px, 3vw, 36px)", color: "#0f2a3a" }}
            >
              보유장비 안내
            </h2>
            <p style={{ fontSize: 16, color: "#4a7a90", lineHeight: 1.8, wordBreak: "keep-all" }}>
              한사랑속편한내과는 대학병원급 최신 의료장비를 갖추어
              <br className="hidden sm:block" />
              전문적이고 포괄적인 진료 서비스를 제공합니다
            </p>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto px-5 lg:px-12" style={{ paddingTop: 0, paddingBottom: 40 }}>
          <div
            className="flex flex-wrap justify-center gap-2"
            style={{
              opacity: s1.v ? 1 : 0,
              transform: s1.v ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
            }}
          >
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTab(tab)}
                className="transition-all duration-200 cursor-pointer"
                style={{
                  background: activeTab === tab ? "#1a9de0" : "#f0f9ff",
                  color: activeTab === tab ? "white" : "#4a7a90",
                  border: `1.5px solid ${activeTab === tab ? "#1a9de0" : "#dceef8"}`,
                  borderRadius: 100,
                  padding: "10px 24px",
                  fontSize: 14,
                  fontWeight: activeTab === tab ? 700 : 500,
                  boxShadow: activeTab === tab ? "0 4px 16px rgba(56,178,240,0.3)" : "none",
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ Equipment Grid ━━━ */}
      <section style={{ background: "#f8fcff" }} ref={s2.ref}>
        <div className="max-w-[1280px] mx-auto px-5 lg:px-12" style={{ paddingTop: 40, paddingBottom: 100 }}>
          <div
            key={fadeKey}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            style={{ animation: "equipFadeIn 0.3s ease" }}
          >
            {filtered.map((eq, i) => (
              <div
                key={eq.id}
                className="group overflow-hidden cursor-pointer"
                style={{
                  background: "white",
                  borderRadius: 16,
                  border: "1px solid #dceef8",
                  transition: "all 0.3s ease",
                  opacity: s2.v ? 1 : 0,
                  transform: s2.v ? "translateY(0)" : "translateY(40px)",
                  transitionDelay: s2.v ? `${i * 0.08}s` : "0s",
                  transitionProperty: "opacity, transform, box-shadow, border-color",
                  transitionDuration: "0.5s, 0.5s, 0.3s, 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = "0 16px 48px rgba(56,178,240,0.16)";
                  e.currentTarget.style.borderColor = "rgba(56,178,240,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "#dceef8";
                }}
              >
                <div className="relative overflow-hidden flex items-center justify-center" style={{ height: 240, background: "#f0f7fc", padding: 20 }}>
                  <Image
                    src={eq.image}
                    alt={eq.name}
                    fill
                    unoptimized
                    className="transition-transform duration-500 group-hover:scale-[1.05]"
                    style={{ objectFit: "contain", padding: 16 }}
                  />
                  <span
                    className="absolute top-0 left-0 text-white font-semibold"
                    style={{
                      background: "rgba(26,157,224,0.9)",
                      fontSize: 11,
                      fontFamily: "var(--font-outfit)",
                      letterSpacing: "0.5px",
                      padding: "4px 10px",
                      borderRadius: "0 0 8px 0",
                    }}
                  >
                    {eq.category}
                  </span>
                </div>
                <div style={{ padding: "20px 22px 24px" }}>
                  <div
                    className="font-bold"
                    style={{ fontFamily: "var(--font-outfit)", fontSize: 20, color: "#0f2a3a", letterSpacing: "-0.3px", marginBottom: 4 }}
                  >
                    {eq.name}
                  </div>
                  <div style={{ fontSize: 13, color: "#82aabf", fontWeight: 400, lineHeight: 1.5 }}>{eq.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ Bottom Banner ━━━ */}
      <section ref={s3.ref}>
        <div
          className="text-center"
          style={{
            background: "linear-gradient(135deg, #0a1628, #0f2a3a)",
            padding: "48px 24px",
            opacity: s3.v ? 1 : 0,
            transform: s3.v ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
          }}
        >
          <h3
            className="font-bold text-white mx-auto"
            style={{
              fontFamily: "var(--font-noto-serif-kr)",
              fontSize: "clamp(20px, 2.5vw, 30px)",
              lineHeight: 1.5,
              wordBreak: "keep-all",
              marginBottom: 32,
              maxWidth: 520,
            }}
          >
            대학병원과 동일한 장비로
            <br />
            미세한 병변까지 정확하게 확인합니다
          </h3>
          <div className="flex justify-center items-center flex-wrap" style={{ gap: 0 }}>
            {STATS.map((s, i) => (
              <div key={s.label} className="contents">
                {i > 0 && <div className="hidden md:block flex-shrink-0" style={{ width: 1, height: 48, background: "rgba(255,255,255,0.15)" }} />}
                <div className="flex flex-col items-center justify-center text-center" style={{ flex: 1, minWidth: 140, padding: "12px 24px" }}>
                  <div className="font-extrabold leading-none tracking-tight" style={{ fontFamily: "var(--font-outfit)", fontSize: 36, color: "#7dd3f8" }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", marginTop: 8 }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingBanner />

      <style>{`
        @keyframes equipFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
