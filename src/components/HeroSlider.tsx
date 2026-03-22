"use client";

import { useState, useEffect, useCallback } from "react";

const slides = [
  "https://cdn.imweb.me/upload/S20260108b9005a7eb2710/6920104428aa9.png",
  "https://cdn.imweb.me/upload/S20260108b9005a7eb2710/24024b5858e8c.png",
  "https://cdn.imweb.me/upload/S20260108b9005a7eb2710/e72dc805bf29e.png",
];


export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [key, setKey] = useState(0);

  const goTo = useCallback(
    (idx: number) => {
      setCurrent(idx);
      setKey((k) => k + 1);
    },
    []
  );

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);
  const prev = useCallback(
    () => goTo((current - 1 + slides.length) % slides.length),
    [current, goTo]
  );

  useEffect(() => {
    const timer = setInterval(next, 4500);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative h-[100svh] min-h-[560px] md:min-h-[660px] overflow-hidden pt-[60px] md:pt-[76px]">
      {/* Slides */}
      <div className="absolute inset-0 top-[60px] md:top-[76px]">
        {slides.map((src, i) => (
          <div
            key={i}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-[1200ms] ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${src})`, willChange: "transform" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[rgba(8,24,48,0.68)] via-[rgba(8,24,48,0.32)] to-[rgba(8,24,48,0.08)]" />
          </div>
        ))}
      </div>

      {/* Hero text */}
      <div className="relative z-10 h-full max-w-[1280px] mx-auto px-5 md:px-6 lg:px-12 pb-[120px] md:pb-[100px] flex flex-col justify-end">
        <div className="animate-hero-fade-up inline-flex items-center gap-2 bg-white/14 backdrop-blur-[8px] border border-white/28 text-white/92 text-xs font-medium px-4 py-[7px] rounded-full mb-5 w-fit">
          <span className="w-[7px] h-[7px] bg-green-400 rounded-full shadow-[0_0_0_3px_rgba(74,222,128,0.3)] animate-blink" />
          진료 중
        </div>
        <h1 className="animate-hero-fade-up-1 font-[var(--font-noto-serif-kr)] text-[clamp(28px,7vw,64px)] font-bold text-white leading-[1.2] tracking-[-2px] mb-[18px]" style={{ fontFamily: "var(--font-noto-serif-kr)" }}>
          정확한 건강검진,
          <br />
          <span className="text-sky-mid">편안한 내시경</span> 검사
        </h1>
        <p className="animate-hero-fade-up-2 text-[14px] md:text-[17px] font-light text-white/75 leading-[1.8] mb-9 tracking-tight">
          2009년 개원 이래 154,000건 이상의 내시경 경험.
          <br />
          대학병원급 최신 장비와 전문의 직접 진료로 신뢰를 드립니다.
        </p>
        <div className="animate-hero-fade-up-3 flex flex-col md:flex-row gap-3 md:gap-[14px]">
          <a
            href="tel:031-912-8720"
            className="bg-white text-sky-deep px-[38px] py-[14px] md:py-[15px] rounded-2xl text-[15px] font-bold no-underline shadow-[0_8px_28px_rgba(0,0,0,0.2)] transition-all hover:-translate-y-[2px] hover:shadow-[0_12px_36px_rgba(0,0,0,0.28)] text-center"
          >
            🩺 진료 예약하기
          </a>
          <a
            href="#checkup"
            className="bg-white/12 text-white px-8 py-[14px] md:py-[15px] rounded-2xl text-[15px] font-medium no-underline border-[1.5px] border-white/35 backdrop-blur-[8px] transition-all hover:bg-white/22 text-center"
          >
            건강검진 안내 →
          </a>
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-[48px] left-6 lg:left-12 z-20 flex gap-[10px] items-center">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-[3px] rounded-[3px] cursor-pointer transition-all duration-400 relative overflow-hidden ${
              i === current
                ? "w-[60px] bg-white/40"
                : "w-[28px] bg-white/35"
            }`}
          >
            {i === current && (
              <span
                key={key}
                className="absolute top-0 left-0 bottom-0 bg-white rounded-[3px] animate-progress-bar"
              />
            )}
          </button>
        ))}
      </div>

      {/* Arrows */}
      <div className="absolute bottom-[40px] right-5 md:right-6 lg:right-12 z-20 flex gap-[10px]">
        <button
          onClick={prev}
          className="w-10 h-10 md:w-11 md:h-11 bg-white/14 backdrop-blur-[8px] border-[1.5px] border-white/28 rounded-full flex items-center justify-center text-white text-base transition-all hover:bg-white/28"
        >
          ←
        </button>
        <button
          onClick={next}
          className="w-10 h-10 md:w-11 md:h-11 bg-white/14 backdrop-blur-[8px] border-[1.5px] border-white/28 rounded-full flex items-center justify-center text-white text-base transition-all hover:bg-white/28"
        >
          →
        </button>
      </div>

    </section>
  );
}
