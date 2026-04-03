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

export default function NoticePage() {
  const s1 = useReveal();

  return (
    <>
      <SubPageHeader />
      <SubPageBanner category="종합검진센터" title="종합검진 주의사항" breadcrumb={["홈", "종합검진센터", "종합검진 주의사항"]} />

      <section style={{ background: "#f8fcff" }} ref={s1.ref}>
        <div className="max-w-[1280px] mx-auto px-5 lg:px-12" style={{ paddingTop: 80, paddingBottom: 100 }}>
          <h2
            className="font-bold text-center"
            style={{
              fontFamily: "var(--font-noto-serif-kr)",
              fontSize: "clamp(24px, 3vw, 34px)",
              color: "#0f2a3a",
              marginBottom: 48,
              opacity: s1.v ? 1 : 0,
              transform: s1.v ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.6s, transform 0.6s",
            }}
          >
            종합검진 주의사항
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* 예약 */}
            <Card title="전화 또는 방문 예약" v={s1.v} delay={0}>
              <p style={descStyle}>VIP룸을 이용으로 미리 예약 후 검사 가능합니다.</p>
            </Card>

            {/* 검사 후 */}
            <Card title="검사 후 주의사항" v={s1.v} delay={0.1}>
              <p style={descStyle}>대장용종 절제시 검사날로부터 2주간은 비행기, 등산, 여행, 운동 등을 금지합니다.</p>
            </Card>

            {/* 금식 */}
            <Card title="금식" v={s1.v} delay={0.2}>
              <Bullets items={[
                "기본 종합검진 : 검사 전 날 저녁식사는 오후 7시 전에 끝내시고 오후 9시 이후부터 금식 하시기 바랍니다.",
                "정밀 종합검진 : 대장 내시경 진행을 하기 위해 검사하시기 7일 전까지 오셔서 장정결제를 받아가시기 바랍니다. 검사하시기 5일 전 식사주의 사항과 장정결제 복용 방법 설명을 위해 미리 방문하시기 바랍니다.",
              ]} />
            </Card>

            {/* 약복용 */}
            <Card title="약복용" v={s1.v} delay={0.3}>
              <p style={{ fontSize: 14, fontWeight: 700, color: "#0f2a3a", marginBottom: 16, wordBreak: "keep-all" }}>
                혈압약 당뇨약 복용하시는 분은 확인부탁드립니다.
              </p>
              <Bullets items={[
                "혈압약 : 건강진단 당일 새벽 5시 이전에 최소량의 물과 함께 복용합니다.",
                "당뇨약 : 건강검진 당일 아침 인슐린이나 당뇨약 복용을 금합니다.",
                "내시경조직검사 또는 용종을 제거할 경우 출혈의 위험이 있으므로 약 중단이 가능할 경우 항혈소판제(아스피린, 플라빅스, 유유크리드, 디스그렌, 프레탈 등) 복용을 일주일전부터 중단합니다.",
              ]} />
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="text-center" style={{ background: "linear-gradient(135deg, #1a9de0, #0d8fcc)", padding: "56px 24px" }}>
          <h3 className="font-bold text-white" style={{ fontFamily: "var(--font-noto-serif-kr)", fontSize: "clamp(22px,2.5vw,32px)", marginBottom: 12 }}>
            검진 예약 및 문의
          </h3>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", marginBottom: 36 }}>전문 상담원이 친절하게 안내해 드립니다</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:031-916-8720" className="no-underline transition-all hover:-translate-y-[2px]" style={{ background: "white", color: "#1a9de0", borderRadius: 12, padding: "16px 36px", fontSize: 16, fontWeight: 700, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}>
              031-916-8720 종합검진실
            </a>
            <a href="https://naver.me/FvEgeFyj" target="_blank" rel="noopener noreferrer" className="no-underline transition-all hover:-translate-y-[2px]" style={{ background: "rgba(255,255,255,0.15)", color: "white", border: "1.5px solid rgba(255,255,255,0.35)", borderRadius: 12, padding: "16px 36px", fontSize: 16, fontWeight: 600, backdropFilter: "blur(8px)" }}>
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

const descStyle: React.CSSProperties = { fontSize: 14, color: "#4a7a90", lineHeight: 1.85, wordBreak: "keep-all" };

function Card({ title, v, delay, children }: { title: string; v: boolean; delay: number; children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "white", border: "1px solid #dceef8", borderRadius: 16, padding: "36px 40px",
        transition: "all 0.3s", opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(40px)",
        transitionDelay: v ? `${delay}s` : "0s",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(56,178,240,0.12)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
    >
      <div style={{ fontSize: 20, fontWeight: 700, color: "#1a9de0", marginBottom: 16, wordBreak: "keep-all" }}>{title}</div>
      {children}
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-[10px]" style={{ marginBottom: 10 }}>
          <span className="flex-shrink-0" style={{ width: 6, height: 6, borderRadius: "50%", background: "#1a9de0", marginTop: 8 }} />
          <span style={{ fontSize: 14, color: "#4a7a90", lineHeight: 1.85, wordBreak: "keep-all" }}>{item}</span>
        </li>
      ))}
    </ul>
  );
}
