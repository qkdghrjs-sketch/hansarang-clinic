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

const EMPLOY_ROWS = [
  { label: "검사시간", value: "평일 : 08:30 ~ 17:00 / 토요일 : 08:00 ~ 12:00" },
  { label: "검사 소요시간", value: "약 30분 ~ 1시간 소요" },
  { label: "검사 전 준비사항", value: "서류에 필요시(회사요청시) 부착 증명사진 1매\n금식(8시간 이상 금식)" },
  { label: "건강진단서 발급소요시간", value: "검사 당일로부터 2일 소요(오후 2시 이후부터 발급 가능)" },
  { label: "검사항목", value: "기초신체계측 (신장,체중,청력,시력,색신,흉위,혈압)\n소변검사 (요PH, 요단백, 요잠혈, 요당)\n혈액검사 (간기능, 빈혈, B형간염항원/항체, 총콜레스테롤, 혈당, 혈구용적치 Hematocrit)\n흉부 X선검사\n의사문진 및 진찰" },
  { label: "검사비용", value: "일반회사채용 : 3만원" },
];

export default function EmploymentPage() {
  const s1 = useReveal();
  const s2 = useReveal();

  return (
    <>
      <SubPageHeader />
      <SubPageBanner category="종합검진센터" title="채용검진프로그램" breadcrumb={["홈", "종합검진센터", "채용검진프로그램"]} />

      {/* 히어로 배너 */}
      <section className="bg-white" ref={s1.ref}>
        <div className="max-w-[1280px] mx-auto px-5 lg:px-12" style={{ paddingTop: 80, paddingBottom: 80 }}>
          <div
            className="text-center"
            style={{
              background: "linear-gradient(135deg, #0a1628, #0f2a3a)",
              borderRadius: 20,
              padding: "48px 24px",
              opacity: s1.v ? 1 : 0,
              transform: s1.v ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.6s, transform 0.6s",
            }}
          >
            <h3 className="font-bold text-white" style={{ fontFamily: "var(--font-noto-serif-kr)", fontSize: "clamp(22px,2.5vw,32px)", marginBottom: 16 }}>
              빠르고 정확한 채용검진 프로그램
            </h3>
            <div style={{ width: 60, height: 2, background: "#1a9de0", margin: "0 auto 16px" }} />
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.65)" }}>합리적인 비용으로 빠르고 정확하며 간편하게 진단해 드립니다.</p>
          </div>
        </div>
      </section>

      {/* 검사 안내 테이블 */}
      <section style={{ background: "#f8fcff" }} ref={s2.ref}>
        <div className="max-w-[1280px] mx-auto px-5 lg:px-12" style={{ paddingTop: 80, paddingBottom: 100 }}>
          <h3
            className="font-bold text-center"
            style={{
              fontFamily: "var(--font-noto-serif-kr)",
              fontSize: 26,
              color: "#0f2a3a",
              marginBottom: 32,
              opacity: s2.v ? 1 : 0,
              transform: s2.v ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.6s, transform 0.6s",
            }}
          >
            채용검진프로그램 검사안내
          </h3>

          <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: "touch" }}>
            <table className="w-full" style={{ borderCollapse: "collapse", minWidth: 600 }}>
              <tbody style={{ borderTop: "2px solid #0f2a3a" }}>
                {EMPLOY_ROWS.map((r, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #dceef8" }}>
                    <td style={{ background: "#f8fcff", width: 200, padding: "16px 24px", fontWeight: 700, color: "#0f2a3a", fontSize: 14, verticalAlign: "top" }}>{r.label}</td>
                    <td style={{ padding: "16px 24px", color: "#4a7a90", fontSize: 14, lineHeight: 1.75, whiteSpace: "pre-line" }}>{r.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ background: "#fff8e1", borderLeft: "4px solid #f59e0b", borderRadius: "0 8px 8px 0", padding: "16px 20px", marginTop: 24 }}>
            <p style={{ fontSize: 13, color: "#92400e", lineHeight: 1.75 }}>
              * 주의사항 : 신체검사 결과를 제출하게 될 기관에서 요구하는 특정검사항목 있다면 미리 의료진에게 말씀하여 주셔야 합니다.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="text-center" style={{ background: "linear-gradient(135deg, #1a9de0, #0d8fcc)", padding: "56px 24px" }}>
          <h3 className="font-bold text-white" style={{ fontFamily: "var(--font-noto-serif-kr)", fontSize: "clamp(22px,2.5vw,32px)", marginBottom: 12 }}>
            채용검진 예약 및 문의
          </h3>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", marginBottom: 36 }}>전문 상담원이 친절하게 안내해 드립니다</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:031-916-8720" className="no-underline transition-all hover:-translate-y-[2px]" style={{ background: "white", color: "#1a9de0", borderRadius: 12, padding: "16px 36px", fontSize: 16, fontWeight: 700, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}>
              031-916-8720 종합검진실
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingBanner />
    </>
  );
}
