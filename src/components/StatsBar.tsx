"use client";

import { useEffect, useRef, useState } from "react";

interface StatItem {
  target: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  { target: 154000, suffix: "례", label: "위내시경 시행" },
  { target: 45000, suffix: "례", label: "대장내시경 시행" },
  { target: 18830, suffix: "례", label: "대장용종 절제술" },
  { target: 1054, suffix: "명", label: "암 진단" },
  { target: 2009, suffix: "년~", label: "개원 이후 축적된 경험" },
];

function useCountUp(target: number, start: boolean, duration = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number;
    let raf: number;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);

  return count;
}

function StatNumber({ item, started }: { item: StatItem; started: boolean }) {
  const count = useCountUp(item.target, started);
  return (
    <div className="text-center">
      <div className="text-[clamp(20px,5vw,36px)] font-extrabold text-white leading-none tracking-tight" style={{ fontFamily: "var(--font-outfit)" }}>
        {item.target === 2009 ? count : count.toLocaleString()}
        <span className="text-[20px] font-semibold">{item.suffix}</span>
      </div>
      <div className="text-xs text-white/75 mt-[6px] font-normal">{item.label}</div>
    </div>
  );
}

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="bg-gradient-to-br from-sky-deep to-[#0d8fcc] py-8 md:py-7 px-5 md:px-6 lg:px-12 mt-0"
    >
      <div className="max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-5 justify-items-center items-center">
        {stats.map((item, i) => (
          <StatNumber key={i} item={item} started={started} />
        ))}
      </div>
    </div>
  );
}
