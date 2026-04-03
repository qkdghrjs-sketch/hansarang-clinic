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
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold: 0.06 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, v };
}

const BD: React.CSSProperties = { fontWeight: 700, color: "#0f2a3a" };

function Dot() { return <span className="flex-shrink-0" style={{ width: 6, height: 6, borderRadius: "50%", background: "#1a9de0", marginTop: 7 }} />; }
function BL({ items }: { items: React.ReactNode[] }) {
  return <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>{items.map((it, i) => <li key={i} className="flex items-start gap-[10px]" style={{ marginBottom: 10 }}><Dot /><span style={{ fontSize: 14, color: "#4a7a90", lineHeight: 1.8, wordBreak: "keep-all" as const }}>{it}</span></li>)}</ul>;
}

const titleStyle: React.CSSProperties = { fontFamily: "var(--font-noto-serif-kr)", fontWeight: 700, color: "#0f2a3a", textAlign: "center", marginBottom: 48, wordBreak: "keep-all" };

const BEFORE = [
  { step: "STEP 01", title: "금식", body: "건강진단 검사 2~3일 전부터는 과로 및 음주는 피합니다.", items: ["오전 검진 : 검진 전날 저녁식사는 오후 7시에 끝내시고 밤9시 이후부터 다음날 오실 때까지 금식합니다.", "오후 검진: 전날 밤12시 이후부터 다음날 오실 때까지 금식합니다.", "금식 기간 중에는 껌, 사탕, 담배는 절대 금합니다."] },
  { step: "STEP 02", title: "약복용", body: "평소 복용하시는 약은 가급적 2~3일 전부터 중단합니다.", items: ["내시경조직검사 또는 용종을 제거할 경우 출혈의 위험이 있으므로 약 중단이 가능할 경우 항혈전제(아스피린, 플라빅스, 유유크리드, 디스그렌, 페로산친, 프레탈 등)복용을 일주일 전부터 중단합니다."] },
  { step: "STEP 03", title: "대변", body: "대변채취는 건강검진 전날 저녁 또는 당일 채변을 이용합니다.", items: ["채취하신 대변은 검사의 정확도를 높이기 위해 차고 서늘하게 보관합니다."] },
];

const DAY_OF = [
  { step: "STEP 01", title: "약복용", body: "혈압약 당뇨약 복용하시는 분은 확인부탁드립니다.", items: ["혈압약 : 건강진단 당일 새벽 5시 이전에 최소량의 물과 함께 복용합니다.", "당뇨약 : 건강검진 당일 아침 인슐린이나 당뇨약 복용을 금합니다."], color: "#1a9de0" },
  { step: "STEP 02", title: "준비사항", body: "아침 식사는 물론 담배, 껌 등 아무것도 먹지 않습니다.", items: ["건강검진 문진표, 채변통을 지참합니다.", "장신구, 귀중품은 분실의 위험이 있어 소지하지 않습니다.", "안경이나 콘택트렌즈를 지참합니다. (교정시력 측정 시 필요)"], color: "#0ea5aa" },
  { step: "STEP 03", title: "기타", body: "원활한 건강검진을 위해 간편한 복장으로 예약시간 10분전까지 내원합니다.", items: ["수면내시경 하시는 분은 당일 자가운전이 불가능하오니 대중교통을 이용해 주시길 바랍니다."], color: "#6366f1" },
];

const SUMMARY = [
  { icon: "🚫", title: "금식 필수", desc: "검진 전날 밤 9시 이후 금식" },
  { icon: "💊", title: "약 복용 주의", desc: "혈압약은 새벽 5시 이전 복용" },
  { icon: "🚗", title: "수면내시경 주의", desc: "당일 자가운전 불가" },
  { icon: "📋", title: "서류 지참", desc: "문진표·채변통·신분증 지참" },
];

function StepCard({ step, title, body, items, color, visible, delay }: { step: string; title: string; body: string; items: string[]; color?: string; visible: boolean; delay: number }) {
  const barColor = color || "#1a9de0";
  return (
    <div
      className="group relative overflow-hidden"
      style={{
        background: "white", border: "1px solid #dceef8", borderRadius: 20, padding: "36px 32px",
        transition: "all 0.3s",
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)",
        transitionDelay: visible ? `${delay}s` : "0s",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(56,178,240,0.14)"; e.currentTarget.style.borderColor = "rgba(56,178,240,0.3)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "#dceef8"; }}
    >
      <div className="absolute top-0 left-0 right-0 h-[4px] origin-left scale-x-0 transition-transform duration-400 group-hover:scale-x-100" style={{ background: `linear-gradient(90deg, ${barColor}, ${barColor}88)` }} />
      <div style={{ fontFamily: "var(--font-outfit)", fontSize: 13, fontWeight: 700, color: barColor, letterSpacing: 1, marginBottom: 10 }}>{step}</div>
      <div style={{ fontSize: 19, fontWeight: 700, color: "#0f2a3a", marginBottom: 16, wordBreak: "keep-all" }}>{title}</div>
      <p style={{ fontSize: 14, color: "#4a7a90", lineHeight: 1.8, marginBottom: 16, wordBreak: "keep-all" }}>{body}</p>
      <BL items={items} />
    </div>
  );
}

export default function CautionPage() {
  const s1 = useReveal();
  const s2 = useReveal();
  const s3 = useReveal();
  const s4 = useReveal();
  const s5 = useReveal();

  return (
    <>
      <SubPageHeader />
      <SubPageBanner category="국민건강보험공단검진" title="검진시 주의사항" breadcrumb={["홈", "국민건강보험공단검진", "검진시 주의사항"]} />

      {/* ━━━ S1: 예약 안내 2카드 ━━━ */}
      <section className="bg-white" ref={s1.ref}>
        <div className="max-w-[1280px] mx-auto px-5 lg:px-12" style={{ paddingTop: 100, paddingBottom: 100 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "예약 후 방문", html: <>검진기관 사정 (예약 집중 등)에 따라 예약이 조기에 마감될 수 있으니 <strong style={BD}>사전 확인 및 예약 후 검진하시기 바랍니다.</strong></> },
              { title: "문진표 작성", html: <>검진기관에 비치된 <strong style={BD}>문진표는 반드시 본인이 작성</strong>하며, 검진결과 통보를 위해 주소 및 전화번호는 정확하게 기재하셔야 합니다.</> },
            ].map((c, i) => (
              <div
                key={i}
                style={{
                  background: "white", border: "1px solid #dceef8", borderRadius: 16, padding: "32px 36px",
                  transition: "all 0.3s",
                  opacity: s1.v ? 1 : 0, transform: s1.v ? "translateY(0)" : "translateY(40px)",
                  transitionDelay: s1.v ? `${i * 0.1}s` : "0s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(56,178,240,0.14)"; e.currentTarget.style.borderColor = "rgba(56,178,240,0.3)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "#dceef8"; }}
              >
                <div className="flex items-center justify-center" style={{ width: 36, height: 36, background: "#1a9de0", borderRadius: "50%", color: "white", fontSize: 18, fontWeight: 700, marginBottom: 16 }}>+</div>
                <div style={{ fontSize: 19, fontWeight: 700, color: "#1a9de0", marginBottom: 14, wordBreak: "keep-all" }}>{c.title}</div>
                <p style={{ fontSize: 14.5, color: "#4a7a90", lineHeight: 1.85, wordBreak: "keep-all" }}>{c.html}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ S2: 검진 전날 ━━━ */}
      <section style={{ background: "#f8fcff" }} ref={s2.ref}>
        <div className="max-w-[1280px] mx-auto px-5 lg:px-12" style={{ paddingTop: 80, paddingBottom: 80 }}>
          <h2 style={{ ...titleStyle, fontSize: "clamp(24px,3vw,34px)" }}>건강검진 전날</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {BEFORE.map((c, i) => <StepCard key={i} {...c} visible={s2.v} delay={i * 0.1} />)}
          </div>
        </div>
      </section>

      {/* ━━━ S3: 검진 당일 ━━━ */}
      <section className="bg-white" ref={s3.ref}>
        <div className="max-w-[1280px] mx-auto px-5 lg:px-12" style={{ paddingTop: 80, paddingBottom: 80 }}>
          <h2 style={{ ...titleStyle, fontSize: "clamp(24px,3vw,34px)" }}>건강검진 당일</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {DAY_OF.map((c, i) => <StepCard key={i} {...c} visible={s3.v} delay={i * 0.1} />)}
          </div>
        </div>
      </section>

      {/* ━━━ S4: 요약 배너 ━━━ */}
      <section ref={s4.ref}>
        <div style={{ background: "linear-gradient(135deg, #0a1628, #0f2a3a)", padding: "48px 24px" }}>
          <div className="flex flex-wrap justify-center" style={{ gap: 0 }}>
            {SUMMARY.map((s, i) => (
              <div key={i} className="contents">
                {i > 0 && <div className="hidden md:block flex-shrink-0" style={{ width: 1, height: 48, background: "rgba(255,255,255,0.15)", alignSelf: "center" }} />}
                <div
                  className="flex flex-col items-center text-center"
                  style={{
                    flex: 1, minWidth: 160, padding: "0 40px",
                    opacity: s4.v ? 1 : 0, transform: s4.v ? "translateY(0)" : "translateY(20px)",
                    transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`,
                  }}
                >
                  <div style={{ fontSize: 32, marginBottom: 12 }}>{s.icon}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "white" }}>{s.title}</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", marginTop: 6, lineHeight: 1.6 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ S5: CTA ━━━ */}
      <section ref={s5.ref}>
        <div className="text-center" style={{ background: "linear-gradient(135deg, #1a9de0, #0d8fcc)", padding: "56px 24px", opacity: s5.v ? 1 : 0, transform: s5.v ? "translateY(0)" : "translateY(30px)", transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s" }}>
          <h3 className="font-bold text-white" style={{ fontFamily: "var(--font-noto-serif-kr)", fontSize: "clamp(22px,2.5vw,32px)", marginBottom: 12 }}>검진 예약 문의</h3>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", marginBottom: 36 }}>궁금하신 점이 있으시면 편하게 연락해 주세요</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:031-917-9008" className="no-underline transition-all duration-300 hover:-translate-y-[2px]" style={{ background: "white", color: "#1a9de0", borderRadius: 12, padding: "16px 36px", fontSize: 16, fontWeight: 700, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}>031-917-9008 국가건강검진</a>
            <a href="https://naver.me/FvEgeFyj" target="_blank" rel="noopener noreferrer" className="no-underline transition-all duration-300" style={{ background: "transparent", color: "white", border: "2px solid rgba(255,255,255,0.5)", borderRadius: 12, padding: "16px 36px", fontSize: 16, fontWeight: 600 }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "white"; e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; e.currentTarget.style.background = "transparent"; }}
            >네이버 예약하기 →</a>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingBanner />
    </>
  );
}
