"use client";

import { useEffect, useRef, useState, useCallback, type MouseEvent } from "react";

/* ━━━ Data ━━━ */
interface AwardItem {
  name: string;
  grade: "최우수" | "우수";
  emoji: string;
  isGold: boolean;
}

const awardItems: AwardItem[] = [
  { name: "일반검진", grade: "최우수", emoji: "🥇", isGold: true },
  { name: "대장암검진", grade: "최우수", emoji: "🥇", isGold: true },
  { name: "간암검진", grade: "최우수", emoji: "🥇", isGold: true },
  { name: "위암검진", grade: "우수", emoji: "🥈", isGold: false },
  { name: "유방암검진", grade: "우수", emoji: "🥈", isGold: false },
];

/* ━━━ Particle system ━━━ */
interface Particle {
  x: number;
  y: number;
  r: number;
  speed: number;
  opacity: number;
  drift: number;
}

function useParticles(canvasRef: React.RefObject<HTMLCanvasElement | null>, active: boolean) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !active) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    const isMobile = window.innerWidth <= 768;
    const count = isMobile ? 20 : 50;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create particles
    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 1 + Math.random() * 2,
      speed: 0.15 + Math.random() * 0.35,
      opacity: 0.15 + Math.random() * 0.45,
      drift: (Math.random() - 0.5) * 0.3,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        // Move upward
        p.y -= p.speed;
        p.x += p.drift;
        // Reset when off-screen
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
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

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef, active]);
}

/* ━━━ 3D Tilt Card ━━━ */
function TiltCard({
  item,
  index,
  visible,
}: {
  item: AwardItem;
  index: number;
  visible: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (isMobile) return;
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateY = ((x - centerX) / centerX) * 8;
      const rotateX = ((centerY - y) / centerY) * 8;
      setTiltStyle({
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`,
        boxShadow: "0 20px 60px rgba(56,178,240,0.3)",
        transition: "transform 0.15s ease-out, box-shadow 0.15s ease-out",
      });
    },
    [isMobile]
  );

  const handleMouseLeave = useCallback(() => {
    setTiltStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
      boxShadow: "none",
      transition: "transform 0.4s ease, box-shadow 0.4s ease",
    });
  }, []);

  return (
    <div
      className="w-full"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.6s ease ${index * 0.12}s, transform 0.6s ease ${index * 0.12}s`,
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative rounded-[20px] p-8 text-center cursor-pointer"
        style={{
          background: "rgba(255,255,255,0.06)",
          border: item.isGold
            ? "2px solid rgba(245,200,66,0.5)"
            : "1px solid rgba(255,255,255,0.12)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          ...tiltStyle,
        }}
      >
        {/* Emoji */}
        <div className="text-[48px] mb-5 leading-none">{item.emoji}</div>

        {/* Name */}
        <div
          className="text-[16px] font-semibold text-white/90 mb-5 tracking-tight"
          style={{ fontFamily: "var(--font-noto-sans-kr)" }}
        >
          {item.name}
        </div>

        {/* Badge */}
        {item.isGold ? (
          <div
            className="relative overflow-hidden inline-flex items-center gap-[6px] px-5 py-[7px] rounded-full text-[13px] font-bold text-white tracking-[0.5px]"
            style={{
              background: "linear-gradient(135deg, #f5c842, #e8a020)",
              boxShadow: "0 4px 16px rgba(245,200,66,0.35)",
            }}
          >
            {/* Shimmer overlay */}
            <span
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
                animation: "award-shimmer 2.5s ease-in-out infinite",
              }}
            />
            <span className="relative z-10">최우수</span>
          </div>
        ) : (
          <div
            className="inline-flex items-center gap-[6px] px-5 py-[7px] rounded-full text-[13px] font-bold text-white/80 tracking-[0.5px]"
            style={{
              background: "linear-gradient(135deg, #d4d4d4, #a0a0a0, #c8c8c8)",
              boxShadow: "0 4px 16px rgba(192,192,192,0.2)",
            }}
          >
            우수
          </div>
        )}
      </div>
    </div>
  );
}

/* ━━━ Main Component ━━━ */
export default function AwardSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(false);
  const [underlineVisible, setUnderlineVisible] = useState(false);

  // IntersectionObserver
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          // Underline fires 1s after section enters
          setTimeout(() => setUnderlineVisible(true), 1000);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Particles
  useParticles(canvasRef, visible);

  return (
    <section
      ref={sectionRef}
      id="award"
      className="relative py-[120px] px-6 lg:px-12 overflow-hidden"
      style={{ background: "#0a1628" }}
    >
      {/* ── BG Layer 2: radial glows ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            "radial-gradient(ellipse 600px 500px at 15% 20%, rgba(56,178,240,0.12), transparent)",
            "radial-gradient(ellipse 500px 400px at 85% 80%, rgba(26,157,224,0.08), transparent)",
          ].join(", "),
        }}
      />

      {/* ── BG Layer 3: Canvas particles ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
      />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="text-center mb-[72px]">
          {/* Label */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.7s ease 0s, transform 0.7s ease 0s",
            }}
          >
            <div
              className="inline-flex items-center gap-3 text-xs font-semibold tracking-[2.5px] uppercase mb-6"
              style={{
                fontFamily: "var(--font-outfit)",
                color: "#38b2f0",
              }}
            >
              <span className="w-5 h-[2px] rounded-sm" style={{ background: "#38b2f0" }} />
              검진기관 평가
              <span className="w-5 h-[2px] rounded-sm" style={{ background: "#38b2f0" }} />
            </div>
          </div>

          {/* Main title */}
          <h2
            className="text-[clamp(32px,4vw,52px)] font-bold text-white leading-[1.2] tracking-[-1.5px] mb-5"
            style={{
              fontFamily: "var(--font-noto-serif-kr)",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
            }}
          >
            국가가 인정한
            <br />
            <span style={{ color: "#7dd3f8" }}>검진 품질</span>
          </h2>

          {/* Sub */}
          <p
            className="text-[16px] font-light leading-[1.85] max-w-[480px] mx-auto"
            style={{
              color: "rgba(255,255,255,0.5)",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
            }}
          >
            엄격한 국가 심사를 통과한 최우수 검진기관
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5 mb-[72px]">
          {awardItems.map((item, i) => (
            <TiltCard key={item.name} item={item} index={i} visible={visible} />
          ))}
        </div>

        {/* Bottom highlight */}
        <div
          className="text-center"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.7s ease 0.9s, transform 0.7s ease 0.9s",
          }}
        >
          <p
            className="inline-block text-[clamp(20px,2.2vw,28px)] font-bold text-white/90 tracking-tight leading-[1.4]"
            style={{ fontFamily: "var(--font-noto-serif-kr)" }}
          >
            정확한 건강검진
            <span className="mx-2" style={{ color: "#7dd3f8" }}>
              ·
            </span>
            편안한 내시경 검사
          </p>
          {/* Animated underline */}
          <div className="flex justify-center mt-3">
            <div
              className="h-[3px] rounded-full"
              style={{
                width: "220px",
                background: "linear-gradient(90deg, #38b2f0, #1a9de0)",
                transform: underlineVisible ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "left",
                transition: "transform 0.8s ease",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
