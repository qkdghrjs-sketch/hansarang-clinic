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

const BD: React.CSSProperties = { fontWeight: 700, color: "#0f2a3a" };
const tx: React.CSSProperties = { fontSize: 15, color: "#4a7a90", lineHeight: 1.85, wordBreak: "keep-all" };

function Dot() { return <span className="flex-shrink-0" style={{ width: 6, height: 6, borderRadius: "50%", background: "#1a9de0", marginTop: 7 }} />; }
function BL({ items }: { items: React.ReactNode[] }) {
  return <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>{items.map((it, i) => <li key={i} className="flex items-start gap-[10px]" style={{ marginBottom: 10 }}><Dot /><span style={tx}>{it}</span></li>)}</ul>;
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
    <div style={{ background: "#f0f9ff", borderLeft: "3px solid #1a9de0", borderRadius: "0 12px 12px 0", padding: "20px 24px", marginTop: 20, fontSize: 13.5, color: "#4a7a90", lineHeight: 1.8, wordBreak: "keep-all" }}>
      {children}
    </div>
  );
}

function BorderBox({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ border: "1px solid #dceef8", borderRadius: 12, padding: "20px 24px", marginTop: 16, fontSize: 13.5, color: "#4a7a90", lineHeight: 1.8, wordBreak: "keep-all" }}>
      {children}
    </div>
  );
}

const STEPS = [
  { num: "Step 1", name: "대상자 선정", org: "(국민건강보험공단)" },
  { num: "Step 2", name: "건강검진표\n발송 및 수령", org: "(국민건강보험공단)" },
  { num: "Step 3", name: "위암검진", org: "(검진기관)" },
  { num: "Step 4", name: "1차 건강검진\n결과 통보", org: "(검진기관)" },
  { num: "Step 5", name: "2차 건강진단", org: "(검진기관)" },
  { num: "Step 6", name: "2차 건강진단\n결과 통보", org: "(검진기관)" },
];

const HABIT_ROWS = [
  { cat: "흡 연", val: "현재 흡연자" },
  { cat: "음 주", val: "위험 음주 해당자(적정 음주가 아닌 사람)" },
  { cat: "운 동", val: "신체활동량이 부족한 자" },
  { cat: "영 양", val: "저체중, 비만 또는 복부비만, 빈혈, 위험음주, 운동부족, 고지혈증, 고혈압, 66세 이상이면서 일상기능 저하" },
  { cat: "비 만", val: "비만, 복부비만" },
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
            <h2 className="font-bold text-white mb-5" style={{ fontFamily: "var(--font-noto-serif-kr)", fontSize: "clamp(26px,3.5vw,42px)" }}>만 44세, 만66세 생애전환기검진</h2>
            <div style={{ width: 48, height: 2, background: "#38b2f0", margin: "0 auto 20px" }} />
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.8, maxWidth: 560 }}>우리나라 국민이라면 누구든 꼭 두 번씩 받는 생애전환기 건강검진은 한사랑속편한내과에서 실시하고 있습니다.</p>
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
                <div className="flex flex-col items-center text-center" style={{ width: "14%", minWidth: 100, opacity: s2.v ? 1 : 0, transform: s2.v ? "translateY(0)" : "translateY(30px)", transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s` }}>
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

          {/* Row 1 */}
          <DetailRow title="대상자 선정" org="(국민건강보험공단)" visible={s3.v} delay={0}>
            <p style={tx}>생애전환기 건강진단 대상자는 <strong style={BD}>건강보험가입자 또는 피부양자 및 의료급여수급자 만 40세와 만 66세</strong> 입니다.</p>
            <p style={{ ...tx, marginTop: 12 }}>의료 급여 수급자에 대한 사업 수행주체는 지방자치단체(보건소)이며 공단에서 수탁 운영 중입니다.</p>
          </DetailRow>

          {/* Row 2 */}
          <DetailRow title="건강검진표 발송 및 수령" org="(국민건강보험공단)" visible={s3.v} delay={0.1}>
            <p style={tx}>검진표는 가입자 주소지로 우편 발송해 드립니다. 분실 또는 수령치 못한 경우에는 가까운 공단지사에서 재발급을 받을 수 있으며 직장가입자의 경우 해당 사업장으로 통보됩니다. <strong style={BD}>수령하신 검진표를 지참하시고, 가까운 검진기관에 접수</strong> 하십시오.</p>
          </DetailRow>

          {/* Row 3 */}
          <DetailRow title="위암검진" org="(검진기관)" visible={s3.v} delay={0.2}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0">
              <BL items={["신장 및 체중", "허리둘레", "혈압측정", "시력, 청력 진찰 및 상담", "흉부방사선 촬영"]} />
              <BL items={["암검진", "골밀도검사 (만 66세 여성)", "노인신체기능검사 (만 66세)", "낙상검사 (하지기능, 평형성)", "요검사"]} />
            </div>
            <InfoBox>
              간염검사 : 만 40세 해당되는 자에 한하여 B형 간연표면항원, 항체 검사 실시<br />
              골밀도 검사 : 만 66세의 여성에게만 실시<br />
              인지기능장애검사(치매)<br />
              * 1차 치매선별검사는 만 66세, 70세, 74세에 해당되는 자에 한정하여 KDSQ-P 선별검사 및 상담<br />
              * 건강검진 공동 문진표(실시기준 별지 제 1호 서식) 7번 문항 (인지기능 답변내용에 따라 검사)<br />
              * 2차 치매선별검사는 1차 치매선별검사에 추가적인 설문과 상담필요자(4~10점)에 해당하는 자에게 실시
            </InfoBox>
          </DetailRow>

          {/* Row 4 */}
          <DetailRow title="1차 건강검진 결과 통보" org="(검진기관)" visible={s3.v} delay={0.3}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0">
              <BL items={["1차 건강진단", "암검진"]} />
              <BL items={["건강위험평가 및 정신건강검진", "노인기능평가(만 66세)"]} />
            </div>
          </DetailRow>

          {/* Row 5 */}
          <DetailRow title="2차 건강진단" org="(검진기관)" visible={s3.v} delay={0.4}>
            <p style={{ ...tx, marginBottom: 16 }}>만 40세 이상 남녀 중 아래 대상자는 간 초음파검사와 혈액검사(혈청알파태아단백검사)를 받습니다.</p>
            <BL items={[
              "1차 건강진단 결과 통보서 확인",
              "2차 건강진단은 1차 진단 결과와 관계없이 대상자 전체(정상포함)가 2차 건강진단을 받을 수 있습니다.",
              "1차 건강진단 결과 및 HRA 상담",
              "생활습관검사 : 생활 습관 평가 및 처방 도구",
            ]} />

            {/* Habit table */}
            <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: "touch", marginTop: 20 }}>
              <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #dceef8", borderRadius: 12, overflow: "hidden", minWidth: 400 }}>
                <tbody>
                  {HABIT_ROWS.map((r, i) => (
                    <tr key={i} style={{ borderBottom: i < HABIT_ROWS.length - 1 ? "1px solid #dceef8" : "none" }}>
                      <td style={{ width: 60, background: "#f0f9ff", fontWeight: 700, color: "#0f2a3a", fontSize: 13, textAlign: "center", padding: "14px 8px", borderRight: "1px solid #dceef8", letterSpacing: 2 }}>{r.cat}</td>
                      <td style={{ padding: "14px 20px", fontSize: 13.5, color: "#4a7a90", lineHeight: 1.6, wordBreak: "keep-all" }}>{r.val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p style={{ fontSize: 13, color: "#1a9de0", marginTop: 12 }}>* 비흡연자, 비음주자는 평가(흡연, 음주) 비대상임</p>

            <div style={{ fontSize: 16, fontWeight: 700, color: "#0f2a3a", margin: "24px 0 12px" }}>정신건강검사</div>
            <BL items={[
              <>우울증 검진 대상자<br /><span style={{ fontSize: 13, color: "#82aabf", paddingLeft: 16, display: "block", marginTop: 4 }}>- 만 40세 : 공통문진표8번 항목의 4개 질문 중 3, 4번에 대한 답변이 1개 이상 해당<br />- 만 66세 : 추가문진표3번 항목의 3개 질문 중 1번 답변이 1개 이상 해당</span></>,
              <>인공기능장애 선별검사 대상자<br /><span style={{ fontSize: 13, color: "#82aabf", paddingLeft: 16, display: "block", marginTop: 4 }}>- 인지기능에 대한 7번 항목의 5개 질문 중 답변에 대한 합산 점수가 4점 이상인 경우<br />- 고혈압, 당뇨 2차 확진검사</span></>,
            ]} />

            <BorderBox>
              1차 생애전환기 건강진단 수검자가 검진기관을 달리하여 2차 검진기관에서 1차 검진결과 및 건강위험평가 결과 상담을 받고자 하는 경우에는 1차 건강진단기관에서 통보 받은 &apos;생애전환기 건강진단 1차 결과 통보서&apos;와 &apos;건강위험평가 결과통보서&apos;를 반드시 지참하여야 하며 1차 건강진단 결과통보서를 분실 또는 수령치 못한 경우에는 1차 검진기관에 재발급을 요청할 수 있습니다.
            </BorderBox>
          </DetailRow>

          {/* Row 6 */}
          <DetailRow title="2차 건강진단결과 통보서 작성 및 발송" org="(검진기관)" visible={s3.v} delay={0.5}>
            <p style={tx}>2차 건강검진 후 15일 이내 검진기관에서 주소지로 발송해 드립니다.</p>
            <p style={{ fontSize: 13, color: "#1a9de0", marginTop: 12 }}>* 직장가입자의 경우 기입하신 주소로 통보됩니다.</p>
          </DetailRow>

          <div style={{ borderTop: "1px solid #dceef8" }} />
        </div>
      </section>

      {/* ━━━ S4: CTA ━━━ */}
      <section ref={s4.ref}>
        <div className="text-center" style={{ background: "linear-gradient(135deg, #1a9de0, #0d8fcc)", padding: "56px 24px", opacity: s4.v ? 1 : 0, transform: s4.v ? "translateY(0)" : "translateY(30px)", transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s" }}>
          <h3 className="font-bold text-white" style={{ fontFamily: "var(--font-noto-serif-kr)", fontSize: "clamp(22px,2.5vw,32px)", marginBottom: 12 }}>생애전환기검진 대상자이신가요?</h3>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", marginBottom: 36 }}>만 44세, 만 66세라면 지금 바로 한사랑속편한내과에서 검진받으세요</p>
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
