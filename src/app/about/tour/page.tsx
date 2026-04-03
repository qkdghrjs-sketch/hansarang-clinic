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
const sections = [
  {
    label: "본관",
    images: [
      "https://cdn.imweb.me/upload/S20260108b9005a7eb2710/41300a7a3791f.png",
      "https://cdn.imweb.me/upload/S20260108b9005a7eb2710/16da0e6f5b95b.jpeg",
      "https://cdn.imweb.me/upload/S20260108b9005a7eb2710/5a0f145b1ac87.png",
      "https://cdn.imweb.me/upload/S20260108b9005a7eb2710/bc7d99392d014.png",
      "https://cdn.imweb.me/upload/S20260108b9005a7eb2710/6db687d6578f4.png",
      "https://cdn.imweb.me/upload/S20260108b9005a7eb2710/6b59d534a9138.png",
      "https://cdn.imweb.me/upload/S20260108b9005a7eb2710/e02619e0cab3d.png",
      "https://cdn.imweb.me/upload/S20260108b9005a7eb2710/deefeb09150d8.png",
    ],
  },
  {
    label: "검진센터",
    images: [
      "https://cdn.imweb.me/upload/S20260108b9005a7eb2710/55314454d3d7b.png",
      "https://cdn.imweb.me/upload/S20260108b9005a7eb2710/3ca711a1c2ad7.png",
      "https://cdn.imweb.me/upload/S20260108b9005a7eb2710/187780605910d.png",
    ],
  },
  {
    label: "내시경실",
    images: [
      "https://cdn.imweb.me/upload/S20260108b9005a7eb2710/c6493d972c116.png",
      "https://cdn.imweb.me/upload/S20260108b9005a7eb2710/cef221bccab59.png",
      "https://cdn.imweb.me/upload/S20260108b9005a7eb2710/b5c2f9b9623b7.png",
    ],
  },
];

/* ━━━ Gallery Section ━━━ */
function GallerySection({ label, images, index }: { label: string; images: string[]; index: number }) {
  const { ref, v } = useReveal();

  return (
    <div ref={ref} style={{ marginBottom: index < sections.length - 1 ? 72 : 0 }}>
      {/* Section label */}
      <div
        className="flex items-center gap-3 mb-6"
        style={{
          opacity: v ? 1 : 0,
          transform: v ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}
      >
        <span
          style={{
            width: 20, height: 2, background: "#38b2f0", borderRadius: 1,
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-noto-serif-kr)",
            fontSize: 22, fontWeight: 700, color: "#0f2a3a",
          }}
        >
          {label}
        </span>
      </div>

      {/* Grid */}
      <div
        className={`grid gap-4 ${
          images.length <= 3
            ? "grid-cols-1 sm:grid-cols-3"
            : "grid-cols-2 md:grid-cols-4"
        }`}
      >
        {images.map((src, i) => (
          <div
            key={i}
            className="group relative overflow-hidden cursor-pointer"
            style={{
              borderRadius: 16,
              aspectRatio: images.length <= 3 ? "4/3" : "3/2",
              opacity: v ? 1 : 0,
              transform: v ? "translateY(0) scale(1)" : "translateY(30px) scale(0.97)",
              transition: `opacity 0.5s ease ${i * 0.06}s, transform 0.5s ease ${i * 0.06}s`,
            }}
          >
            <Image
              src={src}
              alt={`${label} ${i + 1}`}
              fill
              unoptimized
              className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
            />
            {/* Hover overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
              style={{ background: "rgba(10,22,40,0.3)" }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="11" y1="8" x2="11" y2="14" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ━━━ Page ━━━ */
export default function TourPage() {
  const hero = useReveal();

  return (
    <>
      <SubPageHeader />
      <SubPageBanner
        category="본원소개"
        title="병원둘러보기"
        breadcrumb={["홈", "본원소개", "병원둘러보기"]}
      />

      {/* Hero */}
      <section
        ref={hero.ref}
        className="h-[220px] md:h-[280px]"
        style={{
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          src="https://cdn.imweb.me/upload/S20260108b9005a7eb2710/41300a7a3791f.png"
          alt="병원 전경"
          fill
          unoptimized
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,22,40,0.55)" }} />
        <div
          className="relative z-10 text-center px-6"
          style={{
            opacity: hero.v ? 1 : 0,
            transform: hero.v ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-noto-serif-kr)",
              fontSize: "clamp(26px, 3vw, 40px)",
              fontWeight: 700,
              color: "white",
              marginBottom: 12,
            }}
          >
            병원둘러보기
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}>
            한사랑속편한내과의 쾌적한 진료 환경을 소개합니다
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section style={{ background: "#f8fcff" }}>
        <div className="max-w-[1280px] mx-auto px-5 lg:px-12" style={{ paddingTop: 80, paddingBottom: 100 }}>
          {sections.map((sec, i) => (
            <GallerySection key={sec.label} label={sec.label} images={sec.images} index={i} />
          ))}
        </div>
      </section>

      <Footer />
      <FloatingBanner />
    </>
  );
}
