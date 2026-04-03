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
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold: 0.06 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, v };
}

const B: React.CSSProperties = { fontWeight: 700, color: "#0f2a3a" };
const txt: React.CSSProperties = { fontSize: 15, color: "#4a7a90", lineHeight: 1.85, wordBreak: "keep-all" };

function Dot() { return <span className="flex-shrink-0" style={{ width: 6, height: 6, borderRadius: "50%", background: "#1a9de0", marginTop: 7 }} />; }
function BL({ items }: { items: React.ReactNode[] }) {
  return <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>{items.map((it, i) => <li key={i} className="flex items-start gap-[10px]" style={{ marginBottom: 10 }}><Dot /><span style={txt}>{it}</span></li>)}</ul>;
}

function DetailRow({ title, org, visible, delay, children }: { title: string; org?: string; visible: boolean; delay: number; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr]" style={{ borderTop: "1px solid #dceef8", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s` }}>
      <div className="flex flex-col justify-start bg-white lg:border-r lg:border-[#dceef8]" style={{ padding: "32px 28px" }}>
        <div style={{ fontSize: 17, fontWeight: 700, color: "#1a9de0", marginBottom: 6, wordBreak: "keep-all" }}>{title}</div>
        {org && <div style={{ fontSize: 13, color: "#82aabf" }}>{org}</div>}
      </div>
      <div className="bg-white" style={{ padding: "32px 36px" }}>{children}</div>
    </div>
  );
}

const STEPS = [
  { num: "Step 1", name: "우편발송", org: "(국민건강보험공단)" },
  { num: "Step 2", name: "암검진 예약 및\n검진기관 방문", org: "(국민건강보험공단)" },
  { num: "Step 3", name: "위암검진", org: "(검진기관)" },
  { num: "Step 4", name: "대장암검진", org: "(검진기관)" },
  { num: "Step 5", name: "간암검진", org: "(검진기관)" },
  { num: "Step 6", name: "유방암검진", org: "(검진기관)" },
];

const CANCER_CARDS = [
  { tag: "STOMACH", tagColor: "#1a9de0", barColor: "#1a9de0", title: "위암검진", desc: "만 40세 이상 남녀\n2년마다 위장조영검사 또는 위내시경검사\n(본원은 위내시경검사만 가능)" },
  { tag: "COLON", tagColor: "#0ea5aa", barColor: "#0ea5aa", title: "대장암검진", desc: "만 50세 이상 남녀\n분변잠혈반응검사(FOBT) 후 유소견자\n대장내시경 또는 대장이중조영검사\n(본원은 대장내시경만 가능)" },
  { tag: "LIVER", tagColor: "#f59e0b", barColor: "#f59e0b", title: "간암검진", desc: "만 40세 이상 남녀 중\nB·C형 간염 바이러스 보유자\n간 초음파검사 + 혈액검사" },
  { tag: "BREAST", tagColor: "#ec4899", barColor: "#ec4899", title: "유방암검진", desc: "만 40세 이상 여성\n2년마다 유방촬영검사" },
];

export default function NhisCancerPage() {
  const s1 = useReveal();
  const s2 = useReveal();
  const s3 = useReveal();
  const s4 = useReveal();
  const s5 = useReveal();

  return (
    <>
      <SubPageHeader />
      <SubPageBanner category="국민건강보험공단검진" title="암검진" breadcrumb={["홈", "국민건강보험공단검진", "암검진"]} />

      {/* ━━━ S1: Hero ━━━ */}
      <section ref={s1.ref}>
        <div className="relative overflow-hidden" style={{ height: 300 }}>
          <Image src="https://cdn.imweb.me/upload/S20260108b9005a7eb2710/d6c55128d7c5d.png" alt="" fill unoptimized className="object-cover object-center" />
          <div className="absolute inset-0" style={{ background: "rgba(10,22,40,0.62)" }} />
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6" style={{ opacity: s1.v ? 1 : 0, transform: s1.v ? "translateY(0)" : "translateY(30px)", transition: "opacity 0.6s, transform 0.6s" }}>
            <h2 className="font-bold text-white mb-2" style={{ fontFamily: "var(--font-noto-serif-kr)", fontSize: "clamp(28px,3.5vw,44px)" }}>국가건강검진</h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.65)", marginBottom: 20 }}>(위암, 간암, 대장암, 유방암)</p>
            <div style={{ width: 48, height: 2, background: "#38b2f0", margin: "0 auto 20px" }} />
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)" }}>암 조기검진을 통한 조기발견은 암을 대처하는 가장 좋은 방법입니다.</p>
          </div>
        </div>
      </section>

      {/* ━━━ S2: Process ━━━ */}
      <section className="bg-white" ref={s2.ref}>
        <div className="max-w-[1280px] mx-auto px-5 lg:px-12" style={{ paddingTop: 100, paddingBottom: 100 }}>
          <h2 className="text-center font-bold" style={{ fontFamily: "var(--font-noto-serif-kr)", fontSize: "clamp(24px,3vw,34px)", color: "#0f2a3a", marginBottom: 60, opacity: s2.v ? 1 : 0, transform: s2.v ? "translateY(0)" : "translateY(40px)", transition: "opacity 0.6s, transform 0.6s" }}>
            암검진 프로세스
          </h2>
          {/* Desktop */}
          <div className="hidden md:flex flex-wrap items-start justify-center gap-y-6">
            {STEPS.map((s, i) => (
              <div key={i} className="contents">
                {i > 0 && <div className="flex-shrink-0 text-[18px] mt-[38px]" style={{ color: "#dceef8", margin: "0 -4px" }}>→</div>}
                <div className="flex flex-col items-center text-center" style={{ width: "14%", minWidth: 100, opacity: s2.v ? 1 : 0, transform: s2.v ? "translateY(0)" : "translateY(30px)", transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s` }}>
                  <div className="w-[100px] h-[100px] rounded-full flex flex-col items-center justify-center gap-1 transition-all duration-300 cursor-default hover:-translate-y-1 hover:border-[#1a9de0] hover:bg-[#f0f9ff] hover:shadow-[0_8px_24px_rgba(56,178,240,0.18)]" style={{ border: "2px solid #dceef8", background: "white", boxShadow: "0 4px 16px rgba(56,178,240,0.08)" }}>
                    <span style={{ fontFamily: "var(--font-outfit)", fontSize: 11, fontWeight: 700, color: "#1a9de0" }}>{s.num}</span>
                    <span className="whitespace-pre-line" style={{ fontSize: 12, fontWeight: 600, color: "#0f2a3a", padding: "0 6px", wordBreak: "keep-all", lineHeight: 1.3, textAlign: "center" }}>{s.name}</span>
                  </div>
                  <div style={{ marginTop: 10, fontSize: 11, color: "#82aabf" }}>{s.org}</div>
                </div>
              </div>
            ))}
          </div>
          {/* Mobile */}
          <div className="flex md:hidden flex-wrap justify-center gap-4">
            {STEPS.map((s, i) => (
              <div key={i} className="flex flex-col items-center" style={{ width: "30%" }}>
                <div className="w-[90px] h-[90px] rounded-full flex flex-col items-center justify-center gap-1" style={{ border: "2px solid #dceef8", background: "white" }}>
                  <span style={{ fontFamily: "var(--font-outfit)", fontSize: 11, fontWeight: 700, color: "#1a9de0" }}>{s.num}</span>
                  <span className="whitespace-pre-line text-center" style={{ fontSize: 11, fontWeight: 600, color: "#0f2a3a", padding: "0 4px", lineHeight: 1.3 }}>{s.name}</span>
                </div>
                <div style={{ marginTop: 6, fontSize: 10, color: "#82aabf" }}>{s.org}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ S3: Detail rows ━━━ */}
      <section style={{ background: "#f8fcff" }} ref={s3.ref}>
        <div className="max-w-[1280px] mx-auto px-5 lg:px-12" style={{ paddingTop: 80, paddingBottom: 80 }}>
          <DetailRow title="우편발송" visible={s3.v} delay={0}>
            <p style={txt}>검진표를 분실 또는 수령치 못한 경우에는 가까운 지사에서 재발급을 받을 수 있습니다. 직장가입자의 경우 해당 사업장으로 통보됩니다.</p>
          </DetailRow>
          <DetailRow title="암검진 예약 및 검진기관 방문" visible={s3.v} delay={0.1}>
            <p style={txt}>해당 검진기관을 확인한 뒤 사전 예약을 하시고, 암검진표와 신분증을 가지고 검진기관을 방문하여 암검진 실시</p>
          </DetailRow>
          <DetailRow title="위암검진" visible={s3.v} delay={0.2}>
            <p style={txt}>만 40세 이상 남녀는 증상이 없어도 <strong style={B}>2년마다 위장조영검사와 위내시경검사</strong> 중 원하는 한가지 방법을 선택하여 받습니다. (본원은 위내시경검사만 가능합니다)</p>
          </DetailRow>
          <DetailRow title="대장암검진" visible={s3.v} delay={0.3}>
            <p style={txt}>만 50세 이상 남녀는 <strong style={B}>분변잠혈반응검사(FOBT)</strong>를 받은 후 유소견자는 <strong style={B}>대장내시경 또는 대장이중조영검사</strong>를 선택하여 받습니다. (본원은 대장내시경검사만 가능합니다)</p>
          </DetailRow>
          <DetailRow title="간암검진" visible={s3.v} delay={0.4}>
            <p style={{ ...txt, marginBottom: 16 }}>만 40세 이상 남녀 중 아래 대상자는 <strong style={B}>간 초음파검사와 혈액검사(혈청알파태아단백검사)</strong>를 받습니다.</p>
            <BL items={[
              "간합병증",
              "B형 간염바이러스 표면 항원 양성",
              "C형 간염바이러스 항체 양성",
              "B형 또는 C형 간염 바이러스에 의한 만성 간질환 환자",
              "과년도 일반건강검진 결과 B형 간염 바이러스 표면 항원 양성자 또는 C형 간염 바이러스 항체 양성자",
            ]} />
          </DetailRow>
          <DetailRow title="유방암검진" visible={s3.v} delay={0.5}>
            <p style={txt}>만 40세 이상 여성은 <strong style={B}>2년마다 유방촬영검사</strong>를 받습니다.</p>
          </DetailRow>
          <DetailRow title="결과통보" org="(검진기관)" visible={s3.v} delay={0.6}>
            <p style={txt}>해당 검진기관을 확인한 뒤 사전 예약을 하시고, 암검진표와 신분증을 가지고 검진기관을 방문하여 암검진 실시</p>
          </DetailRow>
          <div style={{ borderTop: "1px solid #dceef8" }} />
        </div>
      </section>

      {/* ━━━ S4: Cancer cards ━━━ */}
      <section className="bg-white" ref={s4.ref}>
        <div className="max-w-[1280px] mx-auto px-5 lg:px-12" style={{ paddingTop: 80, paddingBottom: 80 }}>
          <h2 className="text-center font-bold" style={{ fontFamily: "var(--font-noto-serif-kr)", fontSize: "clamp(22px,2.8vw,32px)", color: "#0f2a3a", marginBottom: 48, opacity: s4.v ? 1 : 0, transform: s4.v ? "translateY(0)" : "translateY(40px)", transition: "opacity 0.6s, transform 0.6s" }}>
            암검진 종류별 안내
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {CANCER_CARDS.map((c, i) => (
              <div
                key={c.tag}
                className="group overflow-hidden"
                style={{
                  background: "white", borderRadius: 20, border: "1px solid #dceef8",
                  transition: "all 0.3s",
                  opacity: s4.v ? 1 : 0, transform: s4.v ? "translateY(0)" : "translateY(40px)",
                  transitionDelay: s4.v ? `${i * 0.1}s` : "0s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(56,178,240,0.14)"; e.currentTarget.style.borderColor = "rgba(56,178,240,0.3)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "#dceef8"; }}
              >
                <div style={{ height: 6, background: c.barColor }} />
                <div style={{ padding: "28px 24px" }}>
                  <div style={{ fontFamily: "var(--font-outfit)", fontSize: 12, fontWeight: 700, letterSpacing: 2, color: c.tagColor, marginBottom: 12 }}>{c.tag}</div>
                  <div className="font-bold" style={{ fontFamily: "var(--font-noto-serif-kr)", fontSize: 18, color: "#0f2a3a", marginBottom: 16 }}>{c.title}</div>
                  <div className="whitespace-pre-line" style={{ background: `${c.tagColor}18`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: "#4a7a90", lineHeight: 1.7, wordBreak: "keep-all" }}>
                    {c.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ S5: CTA ━━━ */}
      <section ref={s5.ref}>
        <div className="text-center" style={{ background: "linear-gradient(135deg, #1a9de0, #0d8fcc)", padding: "56px 24px", opacity: s5.v ? 1 : 0, transform: s5.v ? "translateY(0)" : "translateY(30px)", transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s" }}>
          <h3 className="font-bold text-white" style={{ fontFamily: "var(--font-noto-serif-kr)", fontSize: "clamp(22px,2.5vw,32px)", marginBottom: 12 }}>암검진 대상자이신가요?</h3>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", marginBottom: 36 }}>지금 바로 한사랑속편한내과에서 편안하게 검진받으세요</p>
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
