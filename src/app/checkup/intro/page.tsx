"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import SubPageHeader from "@/components/SubPageHeader";
import SubPageBanner from "@/components/SubPageBanner";
import Footer from "@/components/Footer";
import FloatingBanner from "@/components/FloatingBanner";

/* ━━━ Reveal ━━━ */
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

/* ━━━ Constants ━━━ */
const IMG = "https://cdn.imweb.me/upload/S20260108b9005a7eb2710/";

const TABS = [
  { label: "센터소개", id: "section-intro" },
  { label: "종합검진프로그램", id: "section-program" },
  { label: "채용검진프로그램", id: "section-employment" },
  { label: "종합검진 주의사항", id: "section-caution" },
];

const ICONS = [
  { icon: "⏱️", text: "신속한 (검사 당일)\n결과 확인 가능" },
  { icon: "🍽️", text: "식사 및 편안한\n휴식 공간 제공" },
  { icon: "👔", text: "대학병원에서 제공하지 못하는\nVIP전용실 제공\n및 버틀러 서비스" },
  { icon: "📋", text: "개개인의 질환이나\n가족력에 맞춘\n다양하고 정밀한\n건강검진 프로그램" },
];

interface Card { img: string; title: string; desc: string }

const CARDS_A: Card[] = [
  { img: `${IMG}5b1ea004f7d71.png`, title: "편안하고 안락한 공간", desc: "개인 VIP룸을 제공하여 안락한 공간에서 편안한 휴식과 최상의 의료서비스를 제공해드립니다." },
  { img: `${IMG}31a05bf07525d.png`, title: "특화된 전문의", desc: "8명의 풍부한 경험을 가진 내과전문의들의 노하우로 최상의 검진서비스를 제공해드립니다." },
  { img: `${IMG}d6c55128d7c5d.png`, title: "대학병원급 최신 장비보유", desc: "대학병원급 내시경장비, 초음파, 임상병리장비를 도입하여 신속하고 정확한 진단이 가능합니다." },
  { img: `${IMG}751d7204baa45.png`, title: "특화 건강검진 프로그램", desc: "다양한 건강검진 프로그램으로 성별, 연령에 따른 최적의 프로그램을 제공해 드립니다." },
];

const CARDS_B: Card[] = [
  { img: `${IMG}24024b5858e8c.png`, title: "VIP 서비스", desc: "검진특화담당직원이 개인별로 안내하여 검사대기시간을 최소화하여 보다 편한 검진을 진행해 드립니다" },
  { img: `${IMG}e72dc805bf29e.png`, title: "당일검사 당일결과 원데이 서비스", desc: "당일검사 당일결과로 불안한 기다림 없이 최고의 원데이 서비스를 제공해드립니다.(일부 수탁검사 제외)" },
  { img: `${IMG}6043d7f093cc1.jpeg`, title: "사후관리 시스템", desc: "체계적이고 전문적인 사후관리 시스템으로 평생 건강파트너 서비스를 제공해드립니다." },
  { img: `${IMG}5b1ea004f7d71.png`, title: "대학병원 및 전문의원과 긴밀한 협력의료체계", desc: "건강진단후 이상 발견시 대학병원과 연결하여 빠르고 정확한 치료를 받으실 수 있도록 연계해드리며 산부인과, 방사선과 등 전문의원과 긴밀한 협력시스템으로 원스탑의료서비스를 제공합니다." },
];

const PROGRAMS = [
  {
    name: "혈액종합검진",
    sub: "(80여종의 혈액, 소변 검사를 통해 전반적인 건강상태를 확인)",
    items: [
      "일반혈액검사(16종)", "간기능검사(9종)", "신장질환검사(2종)",
      "전해질검사(3종)", "순환기검사(5종)", "빈혈검사(2종)",
      "당뇨검사(4종)", "혈액형검사(2종)", "부갑상선검사(2종)",
      "갑상선검사(2종)", "간염검사(4종)", "혈청면역검사",
      "췌장검사", "염증검사", "성병검사(2종)",
      "관절염검사(2종)", "소변검사(13종)", "A,B,C형 간염검사",
      "종양(암)표지자: 간, 대장, 췌장/담도, 전립선(남)/난소(여)",
    ],
  },
  {
    name: "기본종합검진",
    sub: "(20대-30대 초반의 젊은 연령층에 맞춘 기본종합검진 프로그램)",
    items: [
      "기본: 문진, 혈압, 신장, 체중, 허리둘레, 시력, 청력",
      "혈액종합검사(혈액 및 소변 80여종 검사)",
      "종양(암)표지자: 간, 대장, 췌장/담도, 전립선(남)/난소(여)",
      "A,B,C 형 간염검사", "종합판정", "영양상담",
      "심전도검사", "흉부 X-RAY", "폐기능검사",
      "복부초음파", "갑상선초음파", "유방초음파",
      "수면위내시경",
    ],
  },
  {
    name: "정밀 종합검진 프로그램",
    sub: "(모든 성인을 위한 주요암 조기 진단을 위한 심층 프로그램)",
    items: [
      "기본: 문진, 혈압, 신장, 체중, 허리둘레, 시력, 청력",
      "혈액종합검사(혈액 및 소변 80여종 검사)",
      "종양(암)표지자: 간, 대장, 췌장/담도, 전립선(남)/난소(여)",
      "A,B,C 형 간염검사", "종합판정", "영양상담",
      "심전도검사", "안저촬영", "흉부 X-RAY",
      "골밀도검사", "폐기능검사", "복부초음파",
      "갑상선초음파", "전립선 초음파", "수면위내시경",
      "수면대장내시경", "자궁경부암검사(여성)",
      "유방초음파, 유방촬영", "경동맥초음파, 동맥 경화",
    ],
  },
];

const EMPLOY_ROWS = [
  { label: "검사시간", value: "평일 : 08:30 ~ 17:00 / 토요일 : 08:00 ~ 12:00" },
  { label: "검사 소요시간", value: "약 30분 ~ 1시간 소요" },
  { label: "검사 전 준비사항", value: "서류에 필요시(회사요청시) 부착 증명사진 1매\n금식(8시간 이상 금식)" },
  { label: "건강진단서 발급소요시간", value: "검사 당일로부터 2일 소요(오후 2시 이후부터 발급 가능)" },
  { label: "검사항목", value: "기초신체계측 (신장,체중,청력,시력,색신,흉위,혈압)\n소변검사 (요PH, 요단백, 요잠혈, 요당)\n혈액검사 (간기능, 빈혈, B형간염항원/항체, 총콜레스테롤, 혈당, 혈구용적치 Hematocrit)\n흉부 X선검사\n의사문진 및 진찰" },
  { label: "검사비용", value: "일반회사채용 : 3만원" },
];

/* ━━━ Card Grid ━━━ */
function CardGrid({ cards, visible }: { cards: Card[]; visible: boolean }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {cards.map((c, i) => (
        <div
          key={i}
          className="group flex flex-col sm:flex-row overflow-hidden"
          style={{
            background: "white", border: "1px solid #dceef8", borderRadius: 16,
            transition: "all 0.3s",
            opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)",
            transitionDelay: visible ? `${i * 0.1}s` : "0s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(56,178,240,0.14)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
        >
          <div className="relative w-full sm:w-[240px] h-[200px] sm:h-auto flex-shrink-0 overflow-hidden">
            <Image src={c.img} alt={c.title} fill unoptimized className="object-cover transition-transform duration-500 group-hover:scale-[1.05]" />
          </div>
          <div className="flex flex-col justify-center" style={{ padding: "28px 32px", wordBreak: "keep-all" }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#1a9de0", marginBottom: 12 }}>{c.title}</div>
            <p className="font-light" style={{ fontSize: 14, color: "#4a7a90", lineHeight: 1.85 }}>{c.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ━━━ Divider ━━━ */
function SectionDivider({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0a1628, #0f2a3a)", height: 80 }}>
      <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, letterSpacing: 3, fontFamily: "var(--font-outfit)", textTransform: "uppercase" }}>{text}</span>
    </div>
  );
}

/* ━━━ Page ━━━ */
export default function CheckupIntroPage() {
  const [activeTab, setActiveTab] = useState("section-intro");
  const s1 = useReveal();
  const s2 = useReveal();
  const s3 = useReveal();
  const s4 = useReveal();

  // Scroll spy
  useEffect(() => {
    const ids = TABS.map((t) => t.id);
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActiveTab(e.target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const scrollTo = useCallback((id: string) => {
    setActiveTab(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const titleStyle: React.CSSProperties = {
    fontFamily: "var(--font-noto-serif-kr)", fontWeight: 700, color: "#0f2a3a",
    textAlign: "center", wordBreak: "keep-all",
  };

  return (
    <>
      <SubPageHeader />
      <SubPageBanner category="종합검진센터" title="종합검진센터" breadcrumb={["홈", "종합검진센터"]} />

      {/* ━━━ Sticky Tabs ━━━ */}
      <div
        className="sticky z-[100] bg-white overflow-x-auto"
        style={{ top: 76, borderBottom: "2px solid #dceef8", boxShadow: "0 4px 16px rgba(56,178,240,0.08)", WebkitOverflowScrolling: "touch" }}
      >
        <div className="flex justify-center gap-0 max-w-[1280px] mx-auto">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => scrollTo(t.id)}
              className="whitespace-nowrap cursor-pointer transition-all duration-200"
              style={{
                padding: "18px 36px", fontSize: 15,
                fontWeight: activeTab === t.id ? 700 : 500,
                color: activeTab === t.id ? "#1a9de0" : "#4a7a90",
                borderBottom: `3px solid ${activeTab === t.id ? "#1a9de0" : "transparent"}`,
                background: "transparent",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ━━━ S1: 센터소개 ━━━ */}
      <section id="section-intro" className="bg-white" style={{ scrollMarginTop: 140 }} ref={s1.ref}>
        <div className="max-w-[1280px] mx-auto px-5 lg:px-12" style={{ padding: "100px 48px 80px" }}>
          {/* A. Icons */}
          <h2 style={{ ...titleStyle, fontSize: "clamp(24px,3vw,34px)", marginBottom: 56, opacity: s1.v ? 1 : 0, transform: s1.v ? "translateY(0)" : "translateY(40px)", transition: "opacity 0.6s, transform 0.6s" }}>
            한사랑속편한내과 종합검진센터 소개
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 overflow-hidden" style={{ border: "1px solid #dceef8", borderRadius: 20 }}>
            {ICONS.map((item, i) => (
              <div key={i} className="group text-center transition-colors duration-300 hover:bg-[#f0f9ff]" style={{
                padding: "40px 24px", borderRight: i < 3 ? "1px solid #dceef8" : "none",
                opacity: s1.v ? 1 : 0, transform: s1.v ? "translateY(0)" : "translateY(30px)",
                transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s, background 0.3s`,
              }}>
                <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center text-[28px] mx-auto mb-5 transition-all duration-300 group-hover:bg-[#1a9de0] group-hover:border-[#1a9de0]" style={{ background: "#f0f9ff", border: "2px solid #dceef8" }}>
                  {item.icon}
                </div>
                <p className="whitespace-pre-line" style={{ fontSize: 14, color: "#4a7a90", lineHeight: 1.75, wordBreak: "keep-all" }}>{item.text}</p>
              </div>
            ))}
          </div>

          {/* B. 특별함 */}
          <div style={{ marginTop: 80 }}>
            <h3 style={{ ...titleStyle, fontSize: "clamp(22px,2.8vw,32px)", marginBottom: 48 }}>한사랑속편한내과 건강검진의 특별함</h3>
            <CardGrid cards={CARDS_A} visible={s1.v} />
          </div>

          {/* C. 서비스 */}
          <div style={{ marginTop: 80 }}>
            <CardGrid cards={CARDS_B} visible={s1.v} />
          </div>
        </div>
      </section>

      <SectionDivider text="checkup program" />

      {/* ━━━ S2: 종합검진프로그램 ━━━ */}
      <section id="section-program" style={{ background: "#f8fcff", scrollMarginTop: 140 }} ref={s2.ref}>
        <div className="max-w-[1280px] mx-auto px-5 lg:px-12" style={{ padding: "100px 48px" }}>
          <h2 style={{ ...titleStyle, fontSize: "clamp(24px,3vw,34px)", marginBottom: 48, opacity: s2.v ? 1 : 0, transform: s2.v ? "translateY(0)" : "translateY(40px)", transition: "opacity 0.6s, transform 0.6s" }}>
            종합검진프로그램
          </h2>

          <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: "touch" }}>
            <table className="w-full" style={{ borderCollapse: "separate", borderSpacing: 0, borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 24px rgba(56,178,240,0.08)", minWidth: 700 }}>
              <thead>
                <tr>
                  <th style={{ background: "#0f2a3a", color: "white", padding: "16px 24px", fontWeight: 700, textAlign: "left", width: 280 }}>검진종류</th>
                  <th style={{ background: "#0f2a3a", color: "white", padding: "16px 24px", fontWeight: 700, textAlign: "left" }}>주요검사 항목</th>
                  <th style={{ background: "#0f2a3a", color: "white", padding: "16px 24px", fontWeight: 700, textAlign: "center", width: 120 }}>검진비용</th>
                </tr>
              </thead>
              <tbody>
                {PROGRAMS.map((p) => (
                  <tr key={p.name}>
                    <td style={{ background: "#f0f9ff", padding: "24px 28px", verticalAlign: "top", borderRight: "2px solid #dceef8", borderBottom: "2px solid #dceef8" }}>
                      <div style={{ fontWeight: 700, color: "#0f2a3a", fontSize: 16 }}>{p.name}</div>
                      <div style={{ fontSize: 13, color: "#82aabf", marginTop: 8, lineHeight: 1.5 }}>{p.sub}</div>
                    </td>
                    <td style={{ padding: 0, verticalAlign: "top", borderBottom: "2px solid #dceef8" }}>
                      {p.items.map((item, j) => (
                        <div key={j} style={{ padding: "11px 20px", borderBottom: j < p.items.length - 1 ? "1px solid #f0f7fc" : "none", fontSize: 14, color: "#4a7a90", background: j % 2 === 0 ? "white" : "#fafcff" }}>
                          {item}
                        </div>
                      ))}
                    </td>
                    <td style={{ textAlign: "center", verticalAlign: "middle", fontSize: 13, color: "#82aabf", borderBottom: "2px solid #dceef8" }}>문의</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <SectionDivider text="employment checkup" />

      {/* ━━━ S3: 채용검진 ━━━ */}
      <section id="section-employment" className="bg-white" style={{ scrollMarginTop: 140 }} ref={s3.ref}>
        <div className="max-w-[1280px] mx-auto px-5 lg:px-12" style={{ padding: "100px 48px" }}>
          {/* Hero banner */}
          <div className="text-center" style={{
            background: "linear-gradient(135deg, #0a1628, #0f2a3a)", borderRadius: 20, padding: "60px 48px", marginBottom: 60,
            opacity: s3.v ? 1 : 0, transform: s3.v ? "translateY(0)" : "translateY(40px)", transition: "opacity 0.6s, transform 0.6s",
          }}>
            <h3 className="font-bold text-white" style={{ fontFamily: "var(--font-noto-serif-kr)", fontSize: "clamp(22px,2.5vw,32px)", marginBottom: 16 }}>
              빠르고 정확한 진단채용검진 프로그램
            </h3>
            <div style={{ width: 60, height: 2, background: "#1a9de0", margin: "0 auto 16px" }} />
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.65)" }}>합리적인 비용으로 빠르고 정확하며 간편하게 진단해 드립니다.</p>
          </div>

          <h3 className="font-bold text-center" style={{ fontFamily: "var(--font-noto-serif-kr)", fontSize: 26, color: "#0f2a3a", marginBottom: 32 }}>
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

      <SectionDivider text="caution" />

      {/* ━━━ S4: 주의사항 ━━━ */}
      <section id="section-caution" style={{ background: "#f8fcff", scrollMarginTop: 140 }} ref={s4.ref}>
        <div className="max-w-[1280px] mx-auto px-5 lg:px-12" style={{ padding: "100px 48px" }}>
          <h2 style={{ ...titleStyle, fontSize: "clamp(24px,3vw,34px)", marginBottom: 48, opacity: s4.v ? 1 : 0, transform: s4.v ? "translateY(0)" : "translateY(40px)", transition: "opacity 0.6s, transform 0.6s" }}>
            종합검진 주의사항
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Card 1 */}
            <CautionCard title="전화 또는 방문 예약" visible={s4.v} delay={0}>
              <p style={descStyle}>VIP룸을 이용으로 미리 예약 후 검사 가능합니다.</p>
            </CautionCard>

            {/* Card 2 */}
            <CautionCard title="검사 후 주의사항" visible={s4.v} delay={0.1}>
              <p style={descStyle}>대장용종 절제시 검사날로부터 2주간은 비행기, 등산, 여행, 운동 등을 금지합니다.</p>
            </CautionCard>

            {/* Card 3 */}
            <CautionCard title="금식" visible={s4.v} delay={0.2}>
              <BulletList items={[
                "기본 종합검진 : 검사 전 날 저녁식사는 오후 7시 전에 끝내시고 오후 9시 이후부터 금식 하시기 바랍니다.",
                "정밀 종합검진 : 대장 내시경 진행을 하기 위해 검사하시기 7일 전까지 오셔서 장정결제를 받아가시기 바랍니다. 검사하시기 5일 전 식사주의 사항과 장정결제 복용 방법 설명을 위해 미리 방문하시기 바랍니다.",
              ]} />
            </CautionCard>

            {/* Card 4 */}
            <CautionCard title="약복용" visible={s4.v} delay={0.3}>
              <p style={{ fontSize: 14, fontWeight: 700, color: "#0f2a3a", marginBottom: 16, wordBreak: "keep-all" }}>
                혈압약 당뇨약 복용하시는 분은 확인부탁드립니다.
              </p>
              <BulletList items={[
                "혈압약 : 건강진단 당일 새벽 5시 이전에 최소량의 물과 함께 복용합니다.",
                "당뇨약 : 건강검진 당일 아침 인슐린이나 당뇨약 복용을 금합니다.",
                "내시경조직검사 또는 용종을 제거할 경우 출혈의 위험이 있으므로 약 중단이 가능할 경우 항혈소판제(아스피린, 플라빅스, 유유크리드, 디스그렌, 프레탈 등) 복용을 일주일전부터 중단합니다",
              ]} />
            </CautionCard>
          </div>
        </div>
      </section>

      {/* ━━━ CTA ━━━ */}
      <section>
        <div className="text-center" style={{ background: "linear-gradient(135deg, #1a9de0, #0d8fcc)", padding: "72px 48px" }}>
          <h3 className="font-bold text-white" style={{ fontFamily: "var(--font-noto-serif-kr)", fontSize: "clamp(22px,2.5vw,32px)", marginBottom: 12 }}>
            지금 바로 건강검진을 예약하세요
          </h3>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", marginBottom: 36 }}>전문 상담원이 친절하게 안내해 드립니다</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:031-912-8720" className="no-underline transition-all duration-300 hover:-translate-y-[2px]" style={{ background: "white", color: "#1a9de0", borderRadius: 12, padding: "16px 36px", fontSize: 16, fontWeight: 700, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}>
              📞 031-912-8720 전화예약
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
const descStyle: React.CSSProperties = { fontSize: 14, color: "#4a7a90", lineHeight: 1.85, wordBreak: "keep-all" };

function CautionCard({ title, visible, delay, children }: { title: string; visible: boolean; delay: number; children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "white", border: "1px solid #dceef8", borderRadius: 16, padding: "36px 40px",
        transition: "all 0.3s", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)",
        transitionDelay: visible ? `${delay}s` : "0s",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(56,178,240,0.12)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
    >
      <div style={{ fontSize: 20, fontWeight: 700, color: "#1a9de0", marginBottom: 16, wordBreak: "keep-all" }}>{title}</div>
      {children}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
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
