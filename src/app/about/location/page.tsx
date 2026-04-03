"use client";

import { useEffect, useRef, useState } from "react";
import SubPageHeader from "@/components/SubPageHeader";
import SubPageBanner from "@/components/SubPageBanner";
import Footer from "@/components/Footer";
import FloatingBanner from "@/components/FloatingBanner";

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

export default function LocationPage() {
  const s1 = useReveal();

  return (
    <>
      <SubPageHeader />
      <SubPageBanner
        category="본원소개"
        title="찾아오시는길"
        breadcrumb={["홈", "본원소개", "찾아오시는길"]}
      />

      <section style={{ background: "#f8fcff" }} ref={s1.ref}>
        <div className="max-w-[1280px] mx-auto px-5 lg:px-12" style={{ paddingTop: 80, paddingBottom: 100 }}>

          {/* 지도 */}
          <div
            className="w-full overflow-hidden h-[300px] md:h-[480px]"
            style={{
              borderRadius: 16,
              opacity: s1.v ? 1 : 0,
              transform: s1.v ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <iframe
              src="/kakaomap.html"
              className="border-0"
              style={{ width: "100%", height: "100%", display: "block" }}
              loading="lazy"
              title="한사랑속편한내과의원 약도"
            />
          </div>

          {/* Info cards */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5"
            style={{
              opacity: s1.v ? 1 : 0,
              transform: s1.v ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s",
            }}
          >
            {/* 전화번호 */}
            <div
              className="flex flex-col gap-3 bg-white"
              style={{ border: "1.5px solid #dceef8", borderRadius: 16, padding: "20px 24px" }}
            >
              <a href="tel:031-912-8720" className="flex items-center gap-[14px] no-underline">
                <div className="flex items-center justify-center flex-shrink-0" style={{ width: 46, height: 46, background: "#f0f9ff", borderRadius: 12 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#1a9de0">
                    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.58a1 1 0 01-.24 1.01l-2.21 2.2z" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "#82aabf", marginBottom: 3 }}>대표전화</div>
                  <div style={{ fontSize: 17, fontWeight: 800, color: "#0f2a3a", fontFamily: "var(--font-outfit)", letterSpacing: "-0.3px" }}>031-912-8720</div>
                </div>
              </a>
              <div style={{ borderTop: "1px solid #f0f7fc", paddingTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
                <a href="tel:031-917-9008" className="flex items-center justify-between no-underline" style={{ fontSize: 13 }}>
                  <span style={{ color: "#4a7a90" }}>국가건강검진</span>
                  <span style={{ fontFamily: "var(--font-outfit)", fontWeight: 700, color: "#0f2a3a" }}>031-917-9008</span>
                </a>
                <a href="tel:031-916-8720" className="flex items-center justify-between no-underline" style={{ fontSize: 13 }}>
                  <span style={{ color: "#4a7a90" }}>종합검진실</span>
                  <span style={{ fontFamily: "var(--font-outfit)", fontWeight: 700, color: "#0f2a3a" }}>031-916-8720</span>
                </a>
              </div>
            </div>

            {/* 주차안내 */}
            <div
              className="flex items-center gap-[14px] bg-white"
              style={{ border: "1.5px solid #dceef8", borderRadius: 16, padding: "20px 24px" }}
            >
              <div className="flex items-center justify-center flex-shrink-0" style={{ width: 46, height: 46, background: "#f0f9ff", borderRadius: 12 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#1a9de0">
                  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "#82aabf", marginBottom: 3 }}>주차안내</div>
                <div style={{ fontSize: 15, fontWeight: 800, color: "#0f2a3a" }}>건물 뒷편 주차장</div>
                <div style={{ fontSize: 12, color: "#4a7a90", marginTop: 2, lineHeight: 1.5 }}>주차장 협소 시 노상주차장 이용<br />(주차권 1시간 지원 · 주차권 지참 필수)</div>
              </div>
            </div>

            {/* 주소 */}
            <div
              className="flex items-center gap-[14px] bg-white"
              style={{ border: "1.5px solid #dceef8", borderRadius: 16, padding: "20px 24px" }}
            >
              <div className="flex items-center justify-center flex-shrink-0" style={{ width: 46, height: 46, background: "#f0f9ff", borderRadius: 12 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#1a9de0">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "#82aabf", marginBottom: 3 }}>주소</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#0f2a3a", lineHeight: 1.4 }}>경기 고양시 일산서구 중앙로 1416</div>
                <div style={{ fontSize: 13, color: "#4a7a90" }}>한사랑빌딩 5층</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer />
      <FloatingBanner />
    </>
  );
}
