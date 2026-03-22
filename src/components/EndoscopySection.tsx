"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ━━━ Data ━━━ */
interface TechCard {
  icon: string;
  color: string;
  glowColor: string;
  highlightBg: string;
  title: string;
  subtitle: string;
  desc: string;
  highlight: string;
  checks: string[];
  footnote: string;
}

const techCards: TechCard[] = [
  {
    icon: "🔬",
    color: "#1a9de0",
    glowColor: "rgba(26,157,224,0.15)",
    highlightBg: "rgba(26,157,224,0.08)",
    title: "OLYMPUS CV-290",
    subtitle: "최고 사양 내시경 장비",
    desc: "현존하는 최고 사양의 내시경 장비인 OLYMPUS CV-290으로 보다 선명하고 정확한 내시경 검사를 시행하고 있습니다.",
    highlight: "대학병원과 동일한 장비로\n미세한 병변까지 정확하게 확인합니다.",
    checks: [
      "내시경 본체 3대",
      "위내시경 Fiber 7대",
      "대장내시경 Fiber 6대",
    ],
    footnote: "다수의 내시경 장비를 보유하여 검사 대기 시간을 줄이고 보다 원활한 검사가 가능합니다.",
  },
  {
    icon: "🤖",
    color: "#0ea5aa",
    glowColor: "rgba(14,165,170,0.15)",
    highlightBg: "rgba(14,165,170,0.08)",
    title: "AI 내시경 ENAD",
    subtitle: "AI 실시간 병변 감지",
    desc: "AI 기반 내시경 분석 소프트웨어 ENAD를 도입하여 보다 정밀하고 정확한 내시경 검사를 시행하고 있습니다.",
    highlight: "AI가 내시경 영상을 실시간으로 분석하여\n작은 용종이나 미세 병변을 발견하는 데 도움을 줍니다.",
    checks: [
      "실시간 병변 감지",
      "미세 용종 발견 보조",
      "정확한 진단 지원",
    ],
    footnote: "숙련된 내시경 전문의와 AI 기술의 결합으로 더 정확한 검사를 제공합니다.",
  },
  {
    icon: "💨",
    color: "#6366f1",
    glowColor: "rgba(99,102,241,0.15)",
    highlightBg: "rgba(99,102,241,0.08)",
    title: "CO₂ 대장내시경",
    subtitle: "통증을 줄인 편안한 검사",
    desc: "대장내시경 검사 시 일반 공기 대신 의료용 이산화탄소(CO₂)를 사용하여 보다 편안한 검사가 가능합니다.",
    highlight: "CO₂는 장에서 빠르게 흡수되기 때문에\n검사 후 복부 팽만감과 통증이 현저히 줄어듭니다.",
    checks: [
      "검사 후 복부 불편감 감소",
      "통증 및 팽만감 감소",
      "보다 편안한 검사",
    ],
    footnote: "편안한 수면내시경과 CO₂ 시스템으로 부담 없는 대장내시경 검사를 제공합니다.",
  },
];

interface RecordItem {
  target: number;
  suffix: string;
  label: string;
}

const records: RecordItem[] = [
  { target: 154000, suffix: "례", label: "위내시경" },
  { target: 45000, suffix: "례", label: "대장내시경" },
  { target: 18830, suffix: "례", label: "대장용종 절제술" },
  { target: 1054, suffix: "명", label: "암 진단" },
];

/* ━━━ Count-up hook ━━━ */
function useCountUp(target: number, start: boolean, duration = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number;
    let raf: number;

    const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      setCount(Math.floor(easeOutExpo(progress) * target));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);

  return count;
}

function RecordNumber({ item, started }: { item: RecordItem; started: boolean }) {
  const count = useCountUp(item.target, started);
  return (
    <div className="text-center">
      <div
        className="text-[28px] md:text-[34px] font-extrabold leading-none tracking-tight"
        style={{ fontFamily: "var(--font-outfit)", color: "#38b2f0" }}
      >
        {count.toLocaleString()}
        <span className="text-[16px] font-semibold text-white/60">{item.suffix}</span>
      </div>
      <div className="text-[12px] text-white/50 mt-[6px]">{item.label}</div>
    </div>
  );
}

/* ━━━ Main Component ━━━ */
export default function EndoscopySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(false);

  // Section observer
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Banner observer (for count-up)
  useEffect(() => {
    const el = bannerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBannerVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="endoscopy"
      className="relative py-[110px] px-6 lg:px-12 overflow-hidden"
      style={{ background: "#f8fcff" }}
    >
      {/* ── BG decorative glows ── */}
      <div
        className="absolute top-[-100px] right-[-150px] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(56,178,240,0.06), transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-[-80px] left-[-120px] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(56,178,240,0.05), transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto">
        {/* ── Header text ── */}
        <div className="mb-14">
          <div
            className="inline-flex items-center gap-[10px] text-xs font-semibold tracking-[2.5px] uppercase mb-4"
            style={{
              fontFamily: "var(--font-outfit)",
              color: "#1a9de0",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <span className="w-5 h-[2px] rounded-sm" style={{ background: "#38b2f0" }} />
            내시경 센터
          </div>
          <h2
            className="text-[clamp(28px,3vw,44px)] font-bold leading-[1.3] tracking-tight mb-4"
            style={{
              fontFamily: "var(--font-noto-serif-kr)",
              color: "#0f2a3a",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.6s ease 0.05s, transform 0.6s ease 0.05s",
            }}
          >
            대학병원과 동일한
            <br />
            최고 사양 내시경 시스템
          </h2>
          <p
            className="text-[16px] font-light leading-[1.85] max-w-[560px]"
            style={{
              color: "#4a7a90",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
            }}
          >
            OLYMPUS CV-290 · AI 내시경 ENAD · CO₂ 시스템으로 더 정확하고 편안한 검사를 제공합니다
          </p>
        </div>

        {/* ── 2-column grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 items-start mb-14">

          {/* ── Left column: Photo + stats + quote ── */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.95)",
              transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
            }}
          >
            {/* Photo */}
            <div className="relative rounded-[20px] overflow-hidden group cursor-pointer">
              <div className="relative aspect-[4/5]">
                <Image
                  src="https://cdn.imweb.me/thumbnail/20240614/5c0d41d1c7e70.jpg"
                  alt="OLYMPUS CV-290 내시경 장비"
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-600 group-hover:scale-[1.04]"
                />

                {/* Bottom gradient overlay + text */}
                <div
                  className="absolute inset-x-0 bottom-0 h-[45%] z-10"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(10,22,40,0.85) 0%, rgba(10,22,40,0.4) 60%, transparent 100%)",
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <div className="text-[18px] font-bold text-white tracking-tight mb-1">
                    OLYMPUS CV-290
                  </div>
                  <div className="text-[13px] font-light text-white/65">
                    현존하는 최고 사양의 내시경 시스템
                  </div>
                </div>

                {/* Floating badge top-left */}
                <div
                  className="absolute top-5 left-5 z-20 px-4 py-[7px] rounded-full text-[12px] font-bold text-white shadow-lg"
                  style={{
                    background: "linear-gradient(135deg, #38b2f0, #1a9de0)",
                    animation: "endo-float 3s ease-in-out infinite",
                  }}
                >
                  대학병원급 장비
                </div>
              </div>
            </div>

            {/* Equipment stats: 3 items horizontal */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[
                { label: "내시경 본체", val: "3대", icon: "🔬" },
                { label: "위내시경", val: "7대", icon: "🩺" },
                { label: "대장내시경", val: "6대", icon: "💊" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl p-3 text-center"
                  style={{
                    background: "white",
                    border: "1px solid #dceef8",
                  }}
                >
                  <div className="text-lg mb-1">{s.icon}</div>
                  <div
                    className="text-[15px] font-bold tracking-tight"
                    style={{ fontFamily: "var(--font-outfit)", color: "#0f2a3a" }}
                  >
                    {s.val}
                  </div>
                  <div className="text-[11px] text-[#4a7a90] mt-[2px]">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Quote block */}
            <div
              className="relative mt-4"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 0.6s ease 0.35s, transform 0.6s ease 0.35s",
              }}
            >
              <span
                className="absolute select-none pointer-events-none"
                style={{
                  top: "-8px",
                  left: "-4px",
                  fontSize: "32px",
                  color: "#38b2f0",
                  opacity: 0.4,
                  fontFamily: "Georgia, serif",
                  lineHeight: 1,
                }}
              >
                &ldquo;
              </span>
              <div
                className="pl-[22px] pr-[22px] py-[18px]"
                style={{
                  background: "rgba(56,178,240,0.07)",
                  borderLeft: "3px solid #1a9de0",
                  borderRadius: "0 12px 12px 0",
                  fontFamily: "var(--font-noto-serif-kr)",
                  fontSize: "14.5px",
                  color: "#0f2a3a",
                  lineHeight: 1.85,
                }}
              >
                <span className="font-semibold">8인의 전문의와 충분한 장비가 갖춰진 환경에서,</span>
                <br />
                <span className="font-normal">여유롭고 꼼꼼한 검사를 약속드립니다.</span>
              </div>
            </div>
          </div>

          {/* ── Right column: 3 tech cards ── */}
          <div className="flex flex-col gap-4">
            {techCards.map((card, i) => (
              <div
                key={card.title}
                className="group relative bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1"
                style={{
                  border: "1px solid #dceef8",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateX(0)" : "translateX(40px)",
                  transition: `opacity 0.6s ease ${0.1 + i * 0.15}s, transform 0.6s ease ${0.1 + i * 0.15}s, box-shadow 0.3s ease, border-color 0.3s ease`,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.boxShadow = `0 12px 40px rgba(56,178,240,0.18)`;
                  el.style.borderColor = card.color;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.boxShadow = "none";
                  el.style.borderColor = "#dceef8";
                }}
              >
                {/* Left accent bar */}
                <div
                  className="absolute top-0 left-0 bottom-0 w-[4px] transition-shadow duration-300 group-hover:shadow-[0_0_12px_var(--bar-glow)]"
                  style={{
                    background: card.color,
                    "--bar-glow": card.glowColor,
                  } as React.CSSProperties}
                />

                <div className="pl-7 pr-6 py-6 flex gap-5">
                  {/* Icon */}
                  <div
                    className="flex-shrink-0 w-[52px] h-[52px] rounded-xl flex items-center justify-center text-[26px]"
                    style={{ background: card.glowColor }}
                  >
                    {card.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-[11px] font-bold tracking-[0.5px] uppercase"
                        style={{ fontFamily: "var(--font-outfit)", color: card.color }}
                      >
                        {card.title}
                      </span>
                    </div>
                    <div
                      className="text-[16px] font-bold tracking-tight mb-[6px]"
                      style={{ color: "#0f2a3a", fontFamily: "var(--font-noto-serif-kr)" }}
                    >
                      {card.subtitle}
                    </div>
                    <p className="text-[13px] font-light leading-[1.65] mb-3" style={{ color: "#4a7a90" }}>
                      {card.desc}
                    </p>

                    {/* Highlight quote */}
                    <div
                      className="mb-3 whitespace-pre-line"
                      style={{
                        background: card.highlightBg,
                        borderLeft: `2px solid ${card.color}`,
                        borderRadius: "0 8px 8px 0",
                        padding: "10px 14px",
                        fontSize: "13.5px",
                        fontWeight: 600,
                        lineHeight: 1.7,
                        color: card.color,
                      }}
                    >
                      {card.highlight}
                    </div>

                    {/* Checklist */}
                    <div className="flex flex-wrap gap-x-4 gap-y-[6px]">
                      {card.checks.map((c) => (
                        <div key={c} className="flex items-center gap-[6px]">
                          <span
                            className="flex-shrink-0 w-[16px] h-[16px] rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                            style={{ background: card.color }}
                          >
                            ✓
                          </span>
                          <span className="text-[12px] text-[#4a7a90] leading-[1.4]">{c}</span>
                        </div>
                      ))}
                    </div>

                    {/* Footnote */}
                    <p
                      className="italic"
                      style={{
                        borderTop: "1px solid #dceef8",
                        paddingTop: "12px",
                        marginTop: "12px",
                        fontSize: "12.5px",
                        fontWeight: 300,
                        color: "#82aabf",
                        lineHeight: 1.65,
                      }}
                    >
                      {card.footnote}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom: Record banner ── */}
        <div
          ref={bannerRef}
          className="rounded-[20px] px-8 md:px-12 py-10 md:py-11"
          style={{
            background: "linear-gradient(135deg, #0f2a3a, #1a3a4a)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s",
          }}
        >
          <div className="text-center mb-8">
            <div
              className="text-[18px] md:text-[20px] font-bold text-white tracking-tight leading-[1.4]"
              style={{ fontFamily: "var(--font-noto-serif-kr)" }}
            >
              2009년 개원 이후 압도적인 내시경 경험
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
            {records.map((r, i) => (
              <div key={i} className="relative flex justify-center">
                {/* Divider (desktop only, not before first) */}
                {i > 0 && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-10 bg-white/10 hidden md:block" />
                )}
                <RecordNumber item={r} started={bannerVisible} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
