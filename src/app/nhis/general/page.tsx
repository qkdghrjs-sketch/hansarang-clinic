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

/* ━━━ Data ━━━ */
const STEPS = [
  { num: "Step 1", name: "대상자 선정", org: "(국민건강보험공단)" },
  { num: "Step 2", name: "건강검진표\n발송 및 수령", org: "(국민건강보험공단)" },
  { num: "Step 3", name: "일반 건강진단", org: "(검진기관)" },
  { num: "Step 4", name: "일반 건강진단\n결과 통보", org: "(검진기관)" },
  { num: "Step 5", name: "확진검사", org: "(검진기관)" },
];

function Dot() {
  return <span className="flex-shrink-0" style={{ width: 6, height: 6, borderRadius: "50%", background: "#1a9de0", marginTop: 7 }} />;
}

function BL({ items }: { items: React.ReactNode[] }) {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-[10px]" style={{ marginBottom: 10 }}>
          <Dot />
          <span style={{ fontSize: 15, color: "#4a7a90", lineHeight: 1.85, wordBreak: "keep-all" }}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function SubTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 16, fontWeight: 700, color: "#0f2a3a", padding: "12px 0 8px", borderBottom: "2px solid #dceef8", marginBottom: 12 }}>
      {children}
    </div>
  );
}

function Accent({ children }: { children: React.ReactNode }) {
  return <span style={{ color: "#1a9de0", fontWeight: 600 }}>{children}</span>;
}

export default function NhisGeneralPage() {
  const s1 = useReveal();
  const s2 = useReveal();
  const s3 = useReveal();
  const s4 = useReveal();

  return (
    <>
      <SubPageHeader />
      <SubPageBanner category="국민건강보험공단검진" title="일반검진" breadcrumb={["홈", "국민건강보험공단검진", "일반검진"]} />

      {/* ━━━ S1: Hero ━━━ */}
      <section ref={s1.ref}>
        <div className="relative overflow-hidden" style={{ height: 300 }}>
          <Image src="https://cdn.imweb.me/upload/S20260108b9005a7eb2710/751d7204baa45.png" alt="" fill unoptimized className="object-cover object-center" />
          <div className="absolute inset-0" style={{ background: "rgba(10,22,40,0.60)" }} />
          <div
            className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6"
            style={{ opacity: s1.v ? 1 : 0, transform: s1.v ? "translateY(0)" : "translateY(30px)", transition: "opacity 0.6s, transform 0.6s" }}
          >
            <h2 className="font-bold text-white mb-5" style={{ fontFamily: "var(--font-noto-serif-kr)", fontSize: "clamp(26px,3.5vw,42px)" }}>
              미리 대비하는 일반검진
            </h2>
            <div style={{ width: 48, height: 2, background: "#38b2f0", margin: "0 auto 20px" }} />
            <p className="whitespace-pre-line" style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.8 }}>
              {"미리챙기는 건강습관!\n한사랑속편한내과가 함께합니다."}
            </p>
          </div>
        </div>
      </section>

      {/* ━━━ S2: Process steps ━━━ */}
      <section className="bg-white" ref={s2.ref}>
        <div className="max-w-[1280px] mx-auto px-5 lg:px-12" style={{ paddingTop: 100, paddingBottom: 100 }}>
          <h2 className="text-center font-bold" style={{
            fontFamily: "var(--font-noto-serif-kr)", fontSize: "clamp(24px,3vw,34px)", color: "#0f2a3a", marginBottom: 60,
            opacity: s2.v ? 1 : 0, transform: s2.v ? "translateY(0)" : "translateY(40px)", transition: "opacity 0.6s, transform 0.6s",
          }}>
            일반검진 프로세스
          </h2>

          {/* Desktop: horizontal */}
          <div className="hidden md:flex items-start justify-center">
            {STEPS.map((s, i) => (
              <div key={i} className="contents">
                {i > 0 && (
                  <div className="flex-shrink-0 text-[20px] mt-[48px]" style={{ color: "#dceef8", margin: "0 -8px" }}>→</div>
                )}
                <div
                  className="flex flex-col items-center text-center flex-1"
                  style={{
                    opacity: s2.v ? 1 : 0, transform: s2.v ? "translateY(0)" : "translateY(30px)",
                    transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`,
                  }}
                >
                  <div
                    className="group w-[120px] h-[120px] rounded-full flex flex-col items-center justify-center gap-2 transition-all duration-300 cursor-default hover:-translate-y-1 hover:border-[#1a9de0] hover:bg-[#f0f9ff] hover:shadow-[0_8px_24px_rgba(56,178,240,0.18)]"
                    style={{ border: "2px solid #dceef8", background: "white", boxShadow: "0 4px 16px rgba(56,178,240,0.08)" }}
                  >
                    <span style={{ fontFamily: "var(--font-outfit)", fontSize: 13, fontWeight: 700, color: "#1a9de0", letterSpacing: "0.5px" }}>{s.num}</span>
                    <span className="whitespace-pre-line text-center" style={{ fontSize: 14, fontWeight: 600, color: "#0f2a3a", padding: "0 8px", wordBreak: "keep-all" }}>{s.name}</span>
                  </div>
                  <div style={{ marginTop: 12, fontSize: 12, color: "#82aabf" }}>{s.org}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: vertical */}
          <div className="flex md:hidden flex-col items-center gap-0">
            {STEPS.map((s, i) => (
              <div key={i} className="flex flex-col items-center">
                {i > 0 && <div className="text-[20px] my-2" style={{ color: "#dceef8" }}>↓</div>}
                <div
                  className="w-[120px] h-[120px] rounded-full flex flex-col items-center justify-center gap-2"
                  style={{ border: "2px solid #dceef8", background: "white", boxShadow: "0 4px 16px rgba(56,178,240,0.08)" }}
                >
                  <span style={{ fontFamily: "var(--font-outfit)", fontSize: 13, fontWeight: 700, color: "#1a9de0" }}>{s.num}</span>
                  <span className="whitespace-pre-line text-center" style={{ fontSize: 14, fontWeight: 600, color: "#0f2a3a", padding: "0 8px" }}>{s.name}</span>
                </div>
                <div style={{ marginTop: 8, fontSize: 12, color: "#82aabf" }}>{s.org}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ S3: Detail rows ━━━ */}
      <section style={{ background: "#f8fcff" }} ref={s3.ref}>
        <div className="max-w-[1280px] mx-auto px-5 lg:px-12" style={{ paddingTop: 80, paddingBottom: 80 }}>

          {/* Row 1 */}
          <DetailRow title="대상자 선정" org="(국민건강보험공단)" visible={s3.v} delay={0}>
            <p style={{ ...txtStyle }}>
              일반건강검진 대상자는 지역세대주, 직장가입자 및 만40세 이상 세대원과 피부양자, 만 20세 이상 청년검진
            </p>
            <p style={{ marginTop: 12 }}><Accent>* 매 2년마다 1회, 비사무직은 매년 실시</Accent></p>
          </DetailRow>

          {/* Row 2 */}
          <DetailRow title="건강검진표 발송 및 수령" org="(국민건강보험공단)" visible={s3.v} delay={0.1}>
            <p style={{ ...txtStyle }}>
              검진표는 가입자 주소지로 우편 발송해 드립니다. 분실 또는 수령치 못한 경우에는 가까운 공단지사에서 재발급을 받을 수 있으며 직장가입자의 경우 해당 사업장으로 통보됩니다. 수령하신 검진표를 지참하시고, 가까운 검진기관에 예약 접수 하십시오.
            </p>
          </DetailRow>

          {/* Row 3 */}
          <DetailRow title="일반 건강 진단" org="(검진기관)" visible={s3.v} delay={0.2}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0">
              <BL items={["진찰 및 상담", "신장 및 체중, 비만도", "시력, 청력", "혈압측정"]} />
              <BL items={["허리둘레", "흉부방사선 촬영", "요검사(요단백)", "혈액검사(빈혈, 당뇨, 간기능, 신장기능, 4년에 한번 고지혈증)"]} />
            </div>
          </DetailRow>

          {/* Row 4 */}
          <DetailRow title="일반 건강검진 결과 통보" org="(검진기관)" visible={s3.v} delay={0.3}>
            <BL items={[
              "일반 건강검진 후 15일 이내 검진기관에서 주소지로 발송",
              "일반 검진 결과 질환의심자에게 확진 실시",
            ]} />
            <p style={{ marginTop: 12 }}><Accent>* 직장가입자의 경우 기입하신 주소로 통보됩니다.</Accent></p>
          </DetailRow>

          {/* Row 5 */}
          <DetailRow title="확진 검사" org="(검진기관)" visible={s3.v} delay={0.4}>
            <BL items={[
              "일반 건강검진 결과 통보서 확인",
              "확진 건강검진은 일반 건강검진 결과 고혈압, 당뇨 의심환자에 한해서 받을 수 있습니다",
              "신분증과 통보서를 필히 지참",
            ]} />
            <SubTitle>공통검진</SubTitle>
            <BL items={["건강검진 진찰, 상담"]} />
            <SubTitle>고혈압성질환</SubTitle>
            <BL items={["일반 건강검진 질환의심자 중 희망자 : 혈압 측정"]} />
            <SubTitle>당뇨병</SubTitle>
            <BL items={["일반 검진결과 질환의심자 중 희망자 : 공복혈당 측정"]} />
          </DetailRow>

        </div>
      </section>

      {/* ━━━ S4: CTA ━━━ */}
      <section ref={s4.ref}>
        <div className="text-center" style={{
          background: "linear-gradient(135deg, #1a9de0, #0d8fcc)", padding: "56px 24px",
          opacity: s4.v ? 1 : 0, transform: s4.v ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
        }}>
          <h3 className="font-bold text-white" style={{ fontFamily: "var(--font-noto-serif-kr)", fontSize: "clamp(22px,2.5vw,32px)", marginBottom: 12 }}>
            일반검진 대상자이신가요?
          </h3>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", marginBottom: 36 }}>지금 바로 한사랑속편한내과에서 편안하게 검진받으세요</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:031-917-9008" className="no-underline transition-all duration-300 hover:-translate-y-[2px]" style={{ background: "white", color: "#1a9de0", borderRadius: 12, padding: "16px 36px", fontSize: 16, fontWeight: 700, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}>
              031-917-9008 국가건강검진
            </a>
            <a href="https://naver.me/FvEgeFyj" target="_blank" rel="noopener noreferrer" className="no-underline transition-all duration-300" style={{ background: "transparent", color: "white", border: "2px solid rgba(255,255,255,0.5)", borderRadius: 12, padding: "16px 36px", fontSize: 16, fontWeight: 600 }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "white"; e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; e.currentTarget.style.background = "transparent"; }}
            >
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

/* ━━━ Sub-components ━━━ */
const txtStyle: React.CSSProperties = { fontSize: 15, color: "#4a7a90", lineHeight: 1.85, wordBreak: "keep-all" };

function DetailRow({ title, org, visible, delay, children }: {
  title: string; org: string; visible: boolean; delay: number; children: React.ReactNode;
}) {
  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-[260px_1fr]"
      style={{
        borderTop: "1px solid #dceef8",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
      }}
    >
      <div className="flex flex-col justify-start bg-white lg:border-r lg:border-[#dceef8]" style={{ padding: "32px 28px" }}>
        <div style={{ fontSize: 17, fontWeight: 700, color: "#1a9de0", marginBottom: 6, wordBreak: "keep-all" }}>{title}</div>
        <div style={{ fontSize: 13, color: "#82aabf" }}>{org}</div>
      </div>
      <div className="bg-white" style={{ padding: "32px 36px" }}>
        {children}
      </div>
    </div>
  );
}
