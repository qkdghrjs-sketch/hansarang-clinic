"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ━━━ Data ━━━ */
const cards = [
  {
    img: "https://cdn.imweb.me/upload/S20260108b9005a7eb2710/41300a7a3791f.png",
    tag: "SPACE",
    tagColor: "#1a9de0",
    title: "편안하고 안락한 공간",
    desc: "개인 VIP룸을 제공하여 안락한 공간에서 편안한 휴식과 최상의 의료서비스를 제공해드립니다.",
  },
  {
    img: "https://cdn.imweb.me/upload/S20260108b9005a7eb2710/16da0e6f5b95b.jpeg",
    tag: "SPECIALIST",
    tagColor: "#0ea5aa",
    title: "특화된 전문의",
    desc: "8명의 풍부한 경험을 가진 내과전문의들의 노하우로 최상의 검진서비스를 제공해드립니다.",
  },
  {
    img: "https://cdn.imweb.me/upload/S20260108b9005a7eb2710/d6c55128d7c5d.png",
    tag: "EQUIPMENT",
    tagColor: "#6366f1",
    title: "대학병원급 최신 장비보유",
    desc: "대학병원급 내시경장비, 초음파, 임상병리장비를 도입하여 신속하고 정확한 진단이 가능합니다.",
  },
  {
    img: "https://cdn.imweb.me/upload/S20260108b9005a7eb2710/5a0f145b1ac87.png",
    tag: "PROGRAM",
    tagColor: "#f59e0b",
    title: "특화 건강검진 프로그램",
    desc: "다양한 건강검진 프로그램으로 성별, 연령에 따른 최적의 프로그램을 제공해 드립니다.",
  },
];

const stats = [
  { value: "당일", label: "결과 확인" },
  { value: "VIP", label: "전용 공간" },
  { value: "8인", label: "전문의 진료" },
  { value: "최신", label: "대학병원급 장비" },
];

/* ━━━ Canvas Particles ━━━ */
function useParticles(canvasRef: React.RefObject<HTMLCanvasElement | null>, active: boolean) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !active) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    const isMobile = window.innerWidth <= 768;
    const count = isMobile ? 15 : 40;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 1 + Math.random() * 2,
      speed: 0.12 + Math.random() * 0.3,
      opacity: 0.12 + Math.random() * 0.4,
      drift: (Math.random() - 0.5) * 0.25,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.y -= p.speed;
        p.x += p.drift;
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [canvasRef, active]);
}

/* ━━━ Component ━━━ */
export default function CheckupCenterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);

  // Header observer
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setHeaderVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Cards observer
  useEffect(() => {
    const el = cardsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setCardsVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useParticles(canvasRef, headerVisible);

  return (
    <section ref={sectionRef} id="checkup-center" className="overflow-hidden">
      {/* ━━━ Header (dark) ━━━ */}
      <div
        className="relative overflow-hidden py-10 md:py-[60px] px-5 md:px-6 lg:px-12"
        style={{
          background: "linear-gradient(135deg, #0a1628 0%, #0f2a3a 50%, #1a3a4a 100%)",
          paddingBottom: "clamp(60px, 10vw, 80px)",
        }}
      >
        {/* BG glows */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "-100px", right: "-100px", width: 500, height: 500, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(56,178,240,0.12), transparent 70%)",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "-80px", left: "-80px", width: 400, height: 400, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(14,165,170,0.08), transparent 70%)",
          }}
        />

        {/* Canvas particles */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
        />

        {/* Text */}
        <div className="relative z-10 max-w-[1280px] mx-auto text-center">
          <div
            className="inline-flex items-center gap-3 text-xs font-semibold tracking-[2.5px] uppercase mb-6"
            style={{
              fontFamily: "var(--font-outfit)", color: "#38b2f0",
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.7s ease 0s, transform 0.7s ease 0s",
            }}
          >
            <span className="w-5 h-[2px] rounded-sm bg-[#38b2f0]" />
            건강검진센터
            <span className="w-5 h-[2px] rounded-sm bg-[#38b2f0]" />
          </div>

          <h2
            className="font-bold text-white leading-[1.2] mb-5"
            style={{
              fontFamily: "var(--font-noto-serif-kr)",
              fontSize: "clamp(32px, 4vw, 52px)",
              letterSpacing: "-1px",
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
            }}
          >
            한사랑속편한내과
            <br />
            <span style={{ color: "#7dd3f8" }}>건강검진의 특별함</span>
          </h2>

          <p
            className="text-base font-light max-w-[520px] mx-auto"
            style={{
              color: "rgba(255,255,255,0.65)",
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s",
            }}
          >
            8인의 전문의와 대학병원급 장비로 최상의 검진 서비스를 제공합니다
          </p>
        </div>
      </div>

      {/* ━━━ Cards grid ━━━ */}
      <div className="px-5 md:px-6 pb-16 md:pb-[100px]" style={{ background: "#f8fcff" }}>
        <div
          ref={cardsRef}
          className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
          style={{ marginTop: "-40px" }}
        >
          {cards.map((card, i) => (
            <div
              key={card.tag}
              className="group flex flex-col overflow-hidden cursor-pointer"
              style={{
                background: "white",
                borderRadius: 24,
                border: "1px solid rgba(56,178,240,0.1)",
                boxShadow: "0 4px 24px rgba(56,178,240,0.08)",
                opacity: cardsVisible ? 1 : 0,
                transform: cardsVisible ? "translateY(0)" : "translateY(50px)",
                transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 0.12}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 0.12}s, box-shadow 0.4s ease, border-color 0.4s ease`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 24px 64px rgba(56,178,240,0.18)";
                e.currentTarget.style.borderColor = "rgba(56,178,240,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 24px rgba(56,178,240,0.08)";
                e.currentTarget.style.borderColor = "rgba(56,178,240,0.1)";
              }}
            >
              {/* Image */}
              <div className="relative h-[260px] overflow-hidden">
                <Image
                  src={card.img}
                  alt={card.title}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-[800ms] group-hover:scale-[1.06]"
                  style={{
                    transform: cardsVisible ? "scale(1)" : "scale(1.05)",
                    transition: "transform 0.8s ease",
                  }}
                />
                <div
                  className="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none"
                  style={{ background: "linear-gradient(to top, rgba(10,22,40,0.5), transparent)" }}
                />
              </div>

              {/* Text */}
              <div className="flex-1 flex flex-col" style={{ padding: "20px 20px 24px" }}>
                <div
                  className="inline-block text-[11px] font-bold tracking-[1.5px] uppercase mb-[10px]"
                  style={{ fontFamily: "var(--font-outfit)", color: card.tagColor }}
                >
                  {card.tag}
                </div>
                <div
                  className="text-[20px] font-bold tracking-tight mb-3"
                  style={{ fontFamily: "var(--font-noto-serif-kr)", color: "#0f2a3a", letterSpacing: "-0.3px" }}
                >
                  {card.title}
                </div>
                <p className="text-[14px] font-light leading-[1.8]" style={{ color: "#4a7a90" }}>
                  {card.desc}
                </p>
                <div
                  className="mt-5 inline-flex items-center gap-[6px] text-[13px] font-semibold transition-all group-hover:gap-[10px]"
                  style={{ color: card.tagColor }}
                >
                  더 알아보기
                  <span className="transition-transform duration-300 group-hover:translate-x-[2px]">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ━━━ Stats banner ━━━ */}
        <div
          className="max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-4"
          style={{
            background: "linear-gradient(135deg, #1a9de0, #0d8fcc)",
            borderRadius: 20,
            padding: "28px 16px",
            marginTop: 32,
            opacity: cardsVisible ? 1 : 0,
            transform: cardsVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.7s ease 0.5s, transform 0.7s ease 0.5s",
          }}
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="flex flex-col items-center justify-center text-center py-3"
              style={{ borderLeft: i % 2 === 0 ? "none" : "1px solid rgba(255,255,255,0.2)" }}
            >
              <div
                className="text-[22px] md:text-[32px] font-extrabold text-white leading-none tracking-tight"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                {s.value}
              </div>
              <div className="text-[12px] md:text-[13px] mt-[6px]" style={{ color: "rgba(255,255,255,0.75)" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
