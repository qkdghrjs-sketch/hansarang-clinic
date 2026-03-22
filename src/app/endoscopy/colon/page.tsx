"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
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
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, v };
}

const DISEASES = [
  { name: "심한 내치질", img: "https://cdn.imweb.me/upload/S20260108b9005a7eb2710/5b1ea004f7d71.png" },
  { name: "결핵성 대장염", img: "https://cdn.imweb.me/upload/S20260108b9005a7eb2710/31a05bf07525d.png" },
  { name: "궤양성 대장염", img: "https://cdn.imweb.me/upload/S20260108b9005a7eb2710/d6c55128d7c5d.png" },
  { name: "허혈성 대장염", img: "https://cdn.imweb.me/upload/S20260108b9005a7eb2710/751d7204baa45.png" },
  { name: "대장 흑색증", img: "https://cdn.imweb.me/upload/S20260108b9005a7eb2710/e72dc805bf29e.png" },
  { name: "대장 용종", img: "https://cdn.imweb.me/upload/S20260108b9005a7eb2710/6043d7f093cc1.jpeg" },
  { name: "조기 대장암", img: "https://cdn.imweb.me/upload/S20260108b9005a7eb2710/24024b5858e8c.png" },
  { name: "진행성 대장암", img: "https://cdn.imweb.me/thumbnail/20240614/5c0d41d1c7e70.jpg" },
];

export default function ColonPage() {
  const s1 = useReveal();
  const s2 = useReveal();
  const s3 = useReveal();
  const s4 = useReveal();
  const s5 = useReveal();
  const s6 = useReveal();

  return (
    <>
      <SubPageHeader />
      <SubPageBanner category="내시경센터" title="대장항문 내시경" breadcrumb={["홈", "내시경센터", "대장항문 내시경"]} />

      {/* ━━━ S1: 히어로 ━━━ */}
      <section ref={s1.ref} style={{ position: "relative", height: 320, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Image src="https://cdn.imweb.me/upload/S20260108b9005a7eb2710/6043d7f093cc1.jpeg" alt="대장내시경" fill unoptimized style={{ objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,22,40,0.60)" }} />
        <div className="relative z-10 text-center px-6" style={{ opacity: s1.v ? 1 : 0, transform: s1.v ? "translateY(0)" : "translateY(30px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
          <h2 style={{ fontFamily: "var(--font-noto-serif-kr)", fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 700, color: "white", marginBottom: 20 }}>정기적인 검사가 중요! 대장내시경</h2>
          <div style={{ width: 48, height: 2, background: "#38b2f0", margin: "0 auto 20px" }} />
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.78)", lineHeight: 1.8, wordBreak: "keep-all", maxWidth: 560, margin: "0 auto" }}>
            최근 급증하고 있는 대장암의 예방과 조기 진단 및 치료를<br />위해서는 정기적인 대장 내시경 검사가 가장 유용합니다.
          </p>
        </div>
      </section>

      {/* ━━━ S2: 대장내시경이란? ━━━ */}
      <section className="bg-white" ref={s2.ref}>
        <div className="max-w-[1280px] mx-auto px-5 lg:px-12" style={{ padding: "100px 48px" }}>
          <h2 className="text-center font-bold" style={{ fontFamily: "var(--font-noto-serif-kr)", fontSize: "clamp(24px,3vw,34px)", color: "#0f2a3a", marginBottom: 56 }}>
            대장내시경은 어떤 검사일까요?
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 lg:gap-[60px] items-center">
            <div style={{ opacity: s2.v ? 1 : 0, transform: s2.v ? "translateY(0)" : "translateY(30px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
              <p style={{ fontSize: 15, color: "#4a7a90", lineHeight: 2.0, marginBottom: 20, wordBreak: "keep-all" }}>
                대장은 그림과 같이 맹장에서 시작해서{" "}
                <strong style={{ color: "#1a9de0", fontWeight: 700 }}>상행 › 횡행 › 하행 › S자결장 › 직장 › 항문</strong>에 이르는 약 1.5m 길이의 장기입니다.
              </p>
              <p style={{ fontSize: 15, color: "#4a7a90", lineHeight: 2.0, marginBottom: 20, wordBreak: "keep-all" }}>
                내시경은 긴 관 형태의 기구로 그 끝에 광학 렌즈와 불빛을 비출 수 있는 장치가 있어 인체의 내부를 관찰할 수 있게 만든 기계입니다.
              </p>
              <p style={{ fontSize: 15, color: "#4a7a90", lineHeight: 2.0, marginBottom: 20, wordBreak: "keep-all" }}>
                대장내시경 검사는 내시경 기계를 항문을 통해{" "}
                <strong style={{ color: "#1a9de0", fontWeight: 700 }}>직장 › S자 결장 › 하행 › 횡행 › 상행결장 › 맹장</strong>과 회장 끝부분까지 거꾸로 삽입하여 전 대장 내부를 정확히 관찰할 수 있는 검사로 치질, 대장염, 대장 용종, 대장암 등 다양한 대장 병변을 진단할 수 있는 가장 정확한 검사입니다.
              </p>
              <p style={{ fontSize: 15, color: "#4a7a90", lineHeight: 2.0, wordBreak: "keep-all" }}>
                최근에는 대장 내시경 기계와 내시경 수술법의 발달로 수 mm 크기의 조기 대장암도 정확히 진단이 가능하며 크기가 큰 용종도 개복 수술을 안하고 내시경 수술로 안전하게 제거할 수 있습니다. 대장 내시경 검사는 8시간 이상의 금식만 하면 되는 위 내시경과 달리 대장 내부를 정확히 관찰하기 위해서 검사 전에 미리 대장 내부를 청결히 하는 설사약을 복용 하여야 합니다.
              </p>
            </div>
            {/* SVG 해부도 */}
            <div style={{ background: "#f0f9ff", borderRadius: 20, padding: 32, textAlign: "center", opacity: s2.v ? 1 : 0, transform: s2.v ? "translateY(0)" : "translateY(30px)", transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s" }}>
              <svg width="100%" height="300" viewBox="0 0 300 300">
                {/* 맹장 원 */}
                <circle cx="240" cy="240" r="20" fill="rgba(56,178,240,0.2)" />
                {/* 상행결장 */}
                <path d="M240 240 L240 80" stroke="#38b2f0" strokeWidth="12" fill="none" strokeLinecap="round" />
                {/* 횡행결장 */}
                <path d="M240 80 Q150 50 60 80" stroke="#38b2f0" strokeWidth="12" fill="none" strokeLinecap="round" />
                {/* 하행결장 */}
                <path d="M60 80 L60 200" stroke="#38b2f0" strokeWidth="12" fill="none" strokeLinecap="round" />
                {/* S자결장 */}
                <path d="M60 200 Q40 240 80 255 Q120 270 100 290" stroke="#1a9de0" strokeWidth="12" fill="none" strokeLinecap="round" />
                {/* 직장→항문 */}
                <path d="M100 290 L130 300" stroke="#1a9de0" strokeWidth="10" fill="none" strokeLinecap="round" opacity="0.7" />
                {/* 회장 */}
                <path d="M240 240 Q270 260 260 280" stroke="#7dd3f8" strokeWidth="8" fill="none" strokeLinecap="round" />

                {/* 라벨들 */}
                <rect x="110" y="42" width="80" height="22" rx="11" fill="white" stroke="#dceef8" strokeWidth="1.5" />
                <text x="150" y="57" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0f2a3a">횡행결장</text>

                <rect x="250" y="145" width="50" height="22" rx="11" fill="white" stroke="#dceef8" strokeWidth="1.5" />
                <text x="275" y="160" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0f2a3a">상행결장</text>

                <rect x="0" y="130" width="50" height="22" rx="11" fill="white" stroke="#dceef8" strokeWidth="1.5" />
                <text x="25" y="145" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0f2a3a">하행결장</text>

                <rect x="248" y="228" width="42" height="22" rx="11" fill="white" stroke="#dceef8" strokeWidth="1.5" />
                <text x="269" y="243" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0f2a3a">맹장</text>

                <rect x="245" y="270" width="42" height="22" rx="11" fill="white" stroke="#dceef8" strokeWidth="1.5" />
                <text x="266" y="285" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0f2a3a">회장</text>

                <rect x="0" y="220" width="55" height="22" rx="11" fill="white" stroke="#dceef8" strokeWidth="1.5" />
                <text x="27" y="235" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0f2a3a">S자결장</text>

                <rect x="70" y="278" width="42" height="22" rx="11" fill="white" stroke="#dceef8" strokeWidth="1.5" />
                <text x="91" y="293" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0f2a3a">직장</text>

                <rect x="120" y="290" width="42" height="22" rx="11" fill="white" stroke="#dceef8" strokeWidth="1.5" />
                <text x="141" y="305" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0f2a3a">항문</text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ S3: 검사 시기 ━━━ */}
      <section style={{ background: "#f8fcff" }} ref={s3.ref}>
        <div className="max-w-[1280px] mx-auto px-5 lg:px-12" style={{ padding: "80px 48px" }}>
          <h2 className="text-center font-bold" style={{ fontFamily: "var(--font-noto-serif-kr)", fontSize: "clamp(22px,2.8vw,32px)", color: "#0f2a3a", marginBottom: 48 }}>
            대장내시경 검사는 언제 받아야 하나?
          </h2>
          <div style={{ maxWidth: 900, margin: "0 auto", background: "white", border: "1px solid #dceef8", borderRadius: 16, padding: "36px 40px", opacity: s3.v ? 1 : 0, transform: s3.v ? "translateY(0)" : "translateY(30px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
            <p style={{ fontSize: 15, color: "#4a7a90", lineHeight: 2.0, wordBreak: "keep-all", margin: 0 }}>
              <strong style={{ color: "#0f2a3a", fontWeight: 700 }}>최근 급증하고 있는 대장암의 예방과 조기 진단 및 치료를 위해서는 정기적인 대장 내시경 검사가 가장 유용합니다.</strong>{" "}
              대장암으로 진행할 수 있는 대장 용종이나 조기 대장암은 증상이 없기 때문에 40세가 되면 대장 증상이 없어도 대장 상태를 확인하기 위하여 3-5년 간격으로 정기적인 대장 내시경 검사를 받아야 합니다. 가족 중에 대장암이나 대장 용종이 있는 경우는 30대에 검사를 시작하는 것이 안전합니다.
            </p>
            <p style={{ fontSize: 15, color: "#4a7a90", lineHeight: 2.0, wordBreak: "keep-all", marginTop: 20 }}>
              연령에 상관 없이 만성 변비, 설사 등 대변 습관의 변화, 대변이 가늘거나 혈변 및 복부 팽만감, 복통 등의 대장증상이 있는 경우나 이유 없는 빈혈이나 체중 감소 등 위험증상이 있는 경우에는{" "}
              <strong style={{ color: "#1a9de0", fontWeight: 700 }}>반드시 대장내시경 검사를 통해 대장암 발생 여부를 판단하는 것이 중요합니다.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* ━━━ S4: 진단 가능한 질병 ━━━ */}
      <section className="bg-white" ref={s4.ref}>
        <div className="max-w-[1280px] mx-auto px-5 lg:px-12" style={{ padding: "80px 48px" }}>
          <h2 className="text-center font-bold" style={{ fontFamily: "var(--font-noto-serif-kr)", fontSize: "clamp(22px,2.8vw,32px)", color: "#0f2a3a", marginBottom: 48 }}>
            대장 내시경 검사로 진단이 가능한 질병
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {DISEASES.map((d, i) => (
              <div
                key={d.name}
                className="group overflow-hidden"
                style={{
                  background: "white", border: "1px solid #dceef8", borderRadius: 16, transition: "all 0.3s",
                  opacity: s4.v ? 1 : 0, transform: s4.v ? "translateY(0)" : "translateY(30px)",
                  transitionDelay: s4.v ? `${i * 0.08}s` : "0s",
                  transitionProperty: "opacity, transform, box-shadow, border-color",
                  transitionDuration: "0.5s, 0.5s, 0.3s, 0.3s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(56,178,240,0.14)"; e.currentTarget.style.borderColor = "rgba(56,178,240,0.3)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "#dceef8"; }}
              >
                <div className="relative overflow-hidden" style={{ height: 180 }}>
                  <Image src={d.img} alt={d.name} fill unoptimized className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div style={{ padding: "14px 18px", fontSize: 14, fontWeight: 700, color: "#0f2a3a", textAlign: "center" }}>{d.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ S5: 해상도 ━━━ */}
      <section style={{ background: "#f8fcff" }} ref={s5.ref}>
        <div className="max-w-[1280px] mx-auto px-5 lg:px-12" style={{ padding: "80px 48px" }}>
          <h2 className="text-center font-bold" style={{ fontFamily: "var(--font-noto-serif-kr)", fontSize: "clamp(22px,2.8vw,32px)", color: "#0f2a3a", marginBottom: 32 }}>
            대장 내시경의 해상도 (정확도)
          </h2>
          <div className="text-center" style={{ maxWidth: 900, margin: "0 auto 32px", fontSize: 15, color: "#4a7a90", lineHeight: 2.0, wordBreak: "keep-all", opacity: s5.v ? 1 : 0, transform: s5.v ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
            최근 대장내시경의 해상도는 아래 사진과 같이 아주 뛰어난 상태로 1mm이하의 작은 병변도 확대해서 관찰이 가능합니다. 따라서 내시경 검사는 대장 용종과 대장암 뿐만 아니라 정상과 별 차이가 없어 보이는 미세한 조기 대장암도 진단할 수 있는 가장 정확한 검사법입니다.
          </div>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div style={{ fontSize: 17, fontWeight: 700, color: "#1a9de0", marginBottom: 12, textAlign: "center" }}>대장 내시경 해상도 사진</div>
            <p className="text-center" style={{ fontSize: 14, color: "#4a7a90", lineHeight: 1.8, wordBreak: "keep-all", marginBottom: 28 }}>
              5x5 mm크기의 작은 사각형을 실제 17인치 모니터에 꽉 차 보일 만큼 정확하게 확대해서 관찰할 수 있으며 1mm 눈금보다도 작은 부분도 정확하게 관찰할 수 있을 정도로 정확합니다.
            </p>
            <div style={{ background: "white", border: "1px solid #dceef8", borderRadius: 16, padding: 28, opacity: s5.v ? 1 : 0, transform: s5.v ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s" }}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="relative overflow-hidden" style={{ height: 200, borderRadius: 10 }}>
                    <Image src="https://cdn.imweb.me/thumbnail/20240614/5c0d41d1c7e70.jpg" alt={`내시경 해상도 ${i + 1}`} fill unoptimized style={{ objectFit: "cover" }} />
                  </div>
                ))}
              </div>
              <div style={{ textAlign: "center", marginTop: 16, fontSize: 13, color: "#82aabf" }}>내시경 사진</div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ S6: CTA ━━━ */}
      <section ref={s6.ref} style={{ background: "linear-gradient(135deg, #1a9de0, #0d8fcc)", padding: "72px 48px", textAlign: "center" }}>
        <div style={{ opacity: s6.v ? 1 : 0, transform: s6.v ? "translateY(0)" : "translateY(30px)", transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s" }}>
          <h2 style={{ fontFamily: "var(--font-noto-serif-kr)", fontSize: "clamp(22px,2.8vw,36px)", fontWeight: 700, color: "white", lineHeight: 1.5, wordBreak: "keep-all", marginBottom: 12 }}>
            대장암, 조기 발견이 완치의 열쇠입니다
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", marginBottom: 36 }}>전문의가 직접 시행하는 대장내시경으로 건강을 지키세요</p>
          <div className="flex justify-center flex-wrap gap-4">
            <a href="tel:031-912-8720" className="no-underline transition-all hover:-translate-y-[2px]" style={{ background: "white", color: "#1a9de0", padding: "16px 36px", borderRadius: 14, fontSize: 15, fontWeight: 700, boxShadow: "0 8px 28px rgba(0,0,0,0.15)" }}>
              📞 031-912-8720 전화예약
            </a>
            <a href="https://naver.me/FvEgeFyj" target="_blank" rel="noopener noreferrer" className="no-underline transition-all hover:-translate-y-[2px]" style={{ background: "rgba(255,255,255,0.15)", color: "white", padding: "16px 36px", borderRadius: 14, fontSize: 15, fontWeight: 600, border: "1.5px solid rgba(255,255,255,0.35)", backdropFilter: "blur(8px)" }}>
              네이버 예약하기 →
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingBanner />
    </>
  );
}
