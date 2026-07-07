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

const tx: React.CSSProperties = { fontSize: 15, color: "#4a7a90", lineHeight: 1.85, wordBreak: "keep-all" };
const BD: React.CSSProperties = { fontWeight: 700, color: "#0f2a3a" };

function Dot() {
  return <span className="flex-shrink-0" style={{ width: 6, height: 6, borderRadius: "50%", background: "#1a9de0", marginTop: 7 }} />;
}

function BL({ items }: { items: React.ReactNode[] }) {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {items.map((it, i) => (
        <li key={i} className="flex items-start gap-[10px]" style={{ marginBottom: 10 }}>
          <Dot />
          <span style={tx}>{it}</span>
        </li>
      ))}
    </ul>
  );
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

function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "#f0f9ff", borderLeft: "3px solid #1a9de0", borderRadius: "0 12px 12px 0", padding: "20px 24px", marginTop: 20 }}>
      {children}
    </div>
  );
}

const STEPS = [
  { num: "Step 1", name: "대상자 선정", org: "(국민건강보험공단)" },
  { num: "Step 2", name: "건강검진표\n발송 및 수령", org: "(국민건강보험공단)" },
  { num: "Step 3", name: "검진항목", org: "(검진기관)" },
  { num: "Step 4", name: "의료급여\n생애전환기 검진", org: "(검진기관)" },
  { num: "Step 5", name: "결과통보", org: "(검진기관)" },
];

const MEDICAL_AID_ROWS = [
  { item: "골밀도 검사", target: "만 66세 여성" },
  { item: "인지기능장애", target: "만 66세 이상 2년마다" },
  { item: "정신건강검사(우울증)", target: "만 70세" },
  { item: "생활습관평가", target: "만 70세" },
  { item: "노인신체기능검사", target: "만 66, 70, 80세" },
];

export default function LifecyclePage() {
  const s1 = useReveal();
  const s2 = useReveal();
  const s3 = useReveal();
  const s4 = useReveal();

  return (
    <>
      <SubPageHeader />
      <SubPageBanner category="국민건강보험공단검진" title="생애전환기검진" breadcrumb={["홈", "국민건강보험공단검진", "생애전환기검진"]} />

      {/* ━━━ S1: Hero ━━━ */}
      <section ref={s1.ref}>
        <div className="relative overflow-hidden" style={{ height: 300 }}>
          <Image src="https://cdn.imweb.me/upload/S20260108b9005a7eb2710/e72dc805bf29e.png" alt="" fill unoptimized className="object-cover object-center" />
          <div className="absolute inset-0" style={{ background: "rgba(10,22,40,0.62)" }} />
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6" style={{ opacity: s1.v ? 1 : 0, transform: s1.v ? "translateY(0)" : "translateY(30px)", transition: "opacity 0.6s, transform 0.6s" }}>
            <h2 className="font-bold text-white mb-5" style={{ fontFamily: "var(--font-noto-serif-kr)", fontSize: "clamp(26px,3.5vw,42px)" }}>생애전환기검진</h2>
            <div style={{ width: 48, height: 2, background: "#38b2f0", margin: "0 auto 20px" }} />
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.8, maxWidth: 620 }}>생애 주기별 건강위험요인을 확인하고 필요한 건강관리를 안내합니다.</p>
          </div>
        </div>
      </section>

      {/* ━━━ S2: Steps ━━━ */}
      <section className="bg-white" ref={s2.ref}>
        <div className="max-w-[1280px] mx-auto px-5 lg:px-12" style={{ paddingTop: 100, paddingBottom: 100 }}>
          <h2 className="text-center font-bold" style={{ fontFamily: "var(--font-noto-serif-kr)", fontSize: "clamp(24px,3vw,34px)", color: "#0f2a3a", marginBottom: 60, opacity: s2.v ? 1 : 0, transform: s2.v ? "translateY(0)" : "translateY(40px)", transition: "opacity 0.6s, transform 0.6s" }}>
            생애전환기검진 프로세스
          </h2>
          <div className="hidden md:flex flex-wrap items-start justify-center gap-y-6">
            {STEPS.map((s, i) => (
              <div key={i} className="contents">
                {i > 0 && <div className="flex-shrink-0 text-[18px] mt-[38px]" style={{ color: "#dceef8", margin: "0 -4px" }}>→</div>}
                <div className="flex flex-col items-center text-center" style={{ width: "17%", minWidth: 110, opacity: s2.v ? 1 : 0, transform: s2.v ? "translateY(0)" : "translateY(30px)", transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s` }}>
                  <div className="w-[100px] h-[100px] rounded-full flex flex-col items-center justify-center gap-1 transition-all duration-300 hover:-translate-y-1 hover:border-[#1a9de0] hover:bg-[#f0f9ff] hover:shadow-[0_8px_24px_rgba(56,178,240,0.18)]" style={{ border: "2px solid #dceef8", background: "white", boxShadow: "0 4px 16px rgba(56,178,240,0.08)" }}>
                    <span style={{ fontFamily: "var(--font-outfit)", fontSize: 11, fontWeight: 700, color: "#1a9de0" }}>{s.num}</span>
                    <span className="whitespace-pre-line" style={{ fontSize: 12, fontWeight: 600, color: "#0f2a3a", padding: "0 6px", lineHeight: 1.3, textAlign: "center" }}>{s.name}</span>
                  </div>
                  <div style={{ marginTop: 10, fontSize: 11, color: "#82aabf" }}>{s.org}</div>
                </div>
              </div>
            ))}
          </div>
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

          <DetailRow title="대상자 선정" org="(국민건강보험공단)" visible={s3.v} delay={0}>
            <p style={tx}>생애전환기 건강진단 대상자는 <strong style={BD}>건강보험가입자 또는 피부양자 및 의료급여수급자</strong> 입니다.</p>
            <p style={{ ...tx, marginTop: 12 }}>의료급여 수급자에 대한 사업 수행주체는 지방자치단체이며 공단에서 수탁 운영 중입니다.</p>
          </DetailRow>

          <DetailRow title="건강검진표 발송 및 수령" org="(국민건강보험공단)" visible={s3.v} delay={0.1}>
            <p style={tx}>검진표는 가입자 주소지로 우편 발송해 드립니다. 분실 또는 수령치 못한 경우에는 가까운 공단지사에서 재발급을 받을 수 있으며 직장가입자의 경우 해당 사업장으로 통보됩니다. <strong style={BD}>수령하신 검진표를 지참하시고, 가까운 검진기관에 접수</strong> 하십시오.</p>
          </DetailRow>

          <DetailRow title="검진항목" org="(검진기관)" visible={s3.v} delay={0.2}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0">
              <BL items={["신장 및 체중", "허리둘레", "시력, 청력 진찰 및 상담"]} />
              <BL items={["암검진", "골밀도검사 (만 66세 여성)", "노인신체기능검사", "낙상검사 (하지기능, 평형성)", "인지기능장애 검사"]} />
            </div>
            <InfoBox>
              <BL items={[
                "생활습관평가(생활습관 관련된 흡연, 음주, 영양, 비만 건강위험요인을 평가하고 평가결과에 따라 생활습관 개선을 위한 상담 및 처방 등을 실시하는 것을 말합니다.",
                "정신건강검사는 우울증에 대한 선별검사를 실시하는 것을 말합니다.",
              ]} />
            </InfoBox>
          </DetailRow>

          <DetailRow title="의료급여 생애 전환기 검진" org="(검진기관)" visible={s3.v} delay={0.3}>
            <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: "touch" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #dceef8", borderRadius: 12, overflow: "hidden", minWidth: 420 }}>
                <thead>
                  <tr>
                    <th style={{ background: "#f0f9ff", color: "#0f2a3a", padding: "14px 16px", borderBottom: "1px solid #dceef8", fontSize: 13 }}>검진항목</th>
                    <th style={{ background: "#f0f9ff", color: "#0f2a3a", padding: "14px 16px", borderBottom: "1px solid #dceef8", fontSize: 13 }}>실시대상 및 주기</th>
                  </tr>
                </thead>
                <tbody>
                  {MEDICAL_AID_ROWS.map((row, i) => (
                    <tr key={row.item} style={{ borderBottom: i < MEDICAL_AID_ROWS.length - 1 ? "1px solid #dceef8" : "none" }}>
                      <td style={{ padding: "13px 16px", color: "#4a7a90", fontSize: 13.5, textAlign: "center", fontWeight: 600 }}>{row.item}</td>
                      <td style={{ padding: "13px 16px", color: "#4a7a90", fontSize: 13.5, textAlign: "center", borderLeft: "1px solid #dceef8" }}>{row.target}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DetailRow>

          <DetailRow title="결과통보" org="(검진기관)" visible={s3.v} delay={0.4}>
            <p style={tx}>건강검진 후 3~4주 이내 검진기관에서 일반우편으로 발송해 드립니다.</p>
            <p style={{ fontSize: 13, color: "#1a9de0", marginTop: 12 }}>* 직장가입자의 경우 기입하신 주소로 통보됩니다.</p>
          </DetailRow>

          <div style={{ borderTop: "1px solid #dceef8" }} />
        </div>
      </section>

      {/* ━━━ S4: CTA ━━━ */}
      <section ref={s4.ref}>
        <div className="text-center" style={{ background: "linear-gradient(135deg, #1a9de0, #0d8fcc)", padding: "56px 24px", opacity: s4.v ? 1 : 0, transform: s4.v ? "translateY(0)" : "translateY(30px)", transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s" }}>
          <h3 className="font-bold text-white" style={{ fontFamily: "var(--font-noto-serif-kr)", fontSize: "clamp(22px,2.5vw,32px)", marginBottom: 12 }}>생애전환기검진 대상자이신가요?</h3>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", marginBottom: 36 }}>지금 바로 한사랑속편한내과에서 편안하게 검진받으세요</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:031-924-9008" className="no-underline transition-all duration-300 hover:-translate-y-[2px]" style={{ background: "white", color: "#1a9de0", borderRadius: 12, padding: "16px 36px", fontSize: 16, fontWeight: 700, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}>031-924-9008 국가건강검진</a>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingBanner />
    </>
  );
}
