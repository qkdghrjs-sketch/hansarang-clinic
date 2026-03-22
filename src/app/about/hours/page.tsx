"use client";

import { useEffect, useRef, useState } from "react";
import SubPageHeader from "@/components/SubPageHeader";
import SubPageBanner from "@/components/SubPageBanner";
import Footer from "@/components/Footer";
import FloatingBanner from "@/components/FloatingBanner";

/* ━━━ Reveal hook ━━━ */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, v };
}

/* ━━━ Data ━━━ */
const DAYS = ["월", "화", "수", "목", "금", "토"];

const OUTPATIENT = [
  { name: "오성남", am: [1, 1, 0, 1, 0, 1], pm: [1, 0, 0, 1, 1, 0] },
  { name: "김두랑", am: [1, 0, 1, 0, 1, 1], pm: [1, 1, 1, 0, 0, 0] },
  { name: "김영진", am: [1, 1, 1, 0, 0, 1], pm: [0, 1, 0, 1, 0, 0] },
  { name: "장윤경", am: [0, 1, 0, 1, 1, 0], pm: [0, 0, 1, 1, 0, 0] },
  { name: "최영균", am: [0, 0, 1, 1, 0, 0], pm: [0, 1, 0, 0, 1, 0] },
  { name: "김수지", am: [0, 0, 1, 0, 1, 0], pm: [0, 1, 1, 0, 0, 0] },
  { name: "현보라", am: [1, 0, 0, 1, 0, 0], pm: [1, 0, 1, 1, 1, 0] },
  { name: "박상윤", am: [0, 1, 0, 0, 1, 1], pm: [1, 0, 0, 0, 1, 0] },
];

const ENDO_AM = [
  ["장윤경", "박상윤", "최영균"],
  ["김두랑", "김수지", "최영균"],
  ["장윤경", "박상윤", "현보라(검진진료)"],
  ["김영진", "박상윤", "김수지"],
  ["오성남", "최영균", "현보라(검진진료)"],
  ["김수지", "최영균", "현보라(검진진료)"],
];

const ENDO_PM = [
  ["김영진", "최영균"],
  ["오성남", "박상윤"],
  ["김영진", "최영균"],
  ["김수지", "박상윤"],
  ["김두랑", "김수지"],
  [],
];

const FEATURES = [
  { title: "환자분들의 만족을 최우선으로 합니다.", desc: "전 직원과 의료진은 내원하신 모든 분들을 항상 가족과 같이 생각하여 모시고 있습니다." },
  { title: "넓고 쾌적합니다.", desc: "일산 최대 규모 내과의원으로 250평의 넓고 쾌적한 공간에서 동선을 최소화하여 one-stop으로 진료 및 검사가 가능합니다." },
  { title: "최첨단 의료장비시설과 서비스를 제공합니다.", desc: "최신 의료 장비를 구비하여 대학병원에 가지 않고도 최신검사를 받을 수 있습니다." },
  { title: "풍부한 경험의 의료진이 있습니다.", desc: "대학병원 외래교수 출신의 6명의 내과 전문의가 진료를 담당하여 대학병원에 가지 않고도 편리하게 대학병원 수준의 진료를 받으실 수 있습니다." },
  { title: "지역사회와 함께하는 병원입니다.", desc: "20년 이상 고양일산파주김포 주민의 건강을 책임지고 있는 만성질환, 소화기내과 전문의원입니다." },
];

/* ━━━ Shared title style ━━━ */
const titleStyle: React.CSSProperties = {
  fontFamily: "var(--font-noto-serif-kr)",
  fontSize: "clamp(24px, 2.8vw, 32px)",
  fontWeight: 700,
  color: "#0f2a3a",
  textAlign: "center",
  marginBottom: 48,
  wordBreak: "keep-all",
};

/* ━━━ Component ━━━ */
export default function HoursPage() {
  const [todayCol, setTodayCol] = useState(-1);
  const s1 = useReveal();
  const s2 = useReveal();
  const s3 = useReveal();
  const s4 = useReveal();

  useEffect(() => {
    const d = new Date().getDay();
    setTodayCol(d >= 1 && d <= 6 ? d - 1 : -1);
  }, []);

  return (
    <>
      <SubPageHeader />
      <SubPageBanner category="본원소개" title="진료시간표" breadcrumb={["홈", "본원소개", "진료시간표"]} />

      {/* ━━━ S1: Operating hours card (no bg image) ━━━ */}
      <section ref={s1.ref} style={{ background: "linear-gradient(135deg, #f0f9ff, #e8f4fd)" }}>
        <div className="max-w-[1280px] mx-auto px-5 lg:px-12" style={{ padding: "60px 48px" }}>
          <div
            style={{
              background: "white",
              borderRadius: 20,
              border: "1px solid #dceef8",
              boxShadow: "0 8px 40px rgba(56,178,240,0.10)",
              padding: "40px 48px",
              maxWidth: 560,
              margin: "0 auto",
              opacity: s1.v ? 1 : 0,
              transform: s1.v ? "translateY(0) scale(1)" : "translateY(30px) scale(0.97)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            {[
              { badge: "평  일", bg: "#1a9de0", time: "AM 08:30 ~ PM 06:00" },
              { badge: "토 요 일", bg: "#38b2f0", time: "AM 08:00 ~ PM 01:00" },
              { badge: "점심시간", bg: "#82aabf", time: "PM 01:00 ~ PM 02:00" },
              { badge: "휴   진", bg: "#ef4444", time: "공휴일 및 일요일" },
            ].map((r, i) => (
              <div
                key={i}
                className="flex items-center gap-5"
                style={{ padding: "16px 0", borderBottom: i < 3 ? "1px solid #f0f7fc" : "none" }}
              >
                <span
                  className="font-bold text-white text-center whitespace-nowrap"
                  style={{ background: r.bg, padding: "7px 14px", borderRadius: 8, minWidth: 72, fontSize: 13 }}
                >
                  {r.badge}
                </span>
                <span
                  className="font-bold tracking-tight"
                  style={{ fontFamily: "var(--font-outfit)", fontSize: 20, color: "#0f2a3a" }}
                >
                  {r.time}
                </span>
              </div>
            ))}

            <a
              href="tel:031-912-8720"
              className="block no-underline text-center"
              style={{
                marginTop: 28,
                background: "linear-gradient(135deg, #1a9de0, #0d8fcc)",
                borderRadius: 14,
                padding: "20px 24px",
              }}
            >
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)" }}>예약 및 상담전화</div>
              <div
                className="font-extrabold text-white"
                style={{ fontFamily: "var(--font-outfit)", fontSize: 32, letterSpacing: "1px" }}
              >
                031.912.8720
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ━━━ S2: Outpatient table ━━━ */}
      <section className="bg-white overflow-visible" ref={s2.ref}>
        <div
          className="max-w-[1280px] mx-auto px-5 lg:px-12"
          style={{
            padding: "80px 48px",
            opacity: s2.v ? 1 : 0,
            transform: s2.v ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <h2 style={titleStyle}>외래 진료</h2>

          <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: "touch" }}>
            {/* Title bar */}
            <div
              className="flex items-center justify-between"
              style={{ background: "linear-gradient(135deg, #0f2a3a, #1a3a4a)", padding: "14px 24px", borderRadius: "16px 16px 0 0", minWidth: 700 }}
            >
              <span style={{ color: "white", fontSize: 15, fontWeight: 700 }}>외래 진료 일정</span>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-[6px]" style={{ fontSize: 12, color: "rgba(255,255,255,0.65)" }}>
                  <span style={{ display: "inline-block", width: 14, height: 14, borderRadius: 3, background: "rgba(56,178,240,0.85)" }} />
                  오전
                </span>
                <span className="flex items-center gap-[6px]" style={{ fontSize: 12, color: "rgba(255,255,255,0.65)" }}>
                  <span style={{ display: "inline-block", width: 14, height: 14, borderRadius: 3, background: "rgba(14,165,170,0.75)" }} />
                  오후
                </span>
              </div>
            </div>

            {/* Table */}
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
              <thead>
                <tr style={{ background: "#1a3a4a" }}>
                  <th style={{ width: 100, padding: "10px 8px", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.7)", textAlign: "center" }}>의료진</th>
                  {DAYS.map((d, ci) => (
                    <th
                      key={d}
                      style={{
                        padding: "10px 8px",
                        fontSize: 12,
                        fontWeight: ci === todayCol ? 700 : 600,
                        color: ci === todayCol ? "white" : "rgba(255,255,255,0.7)",
                        textAlign: "center",
                        background: ci === todayCol ? "#1a9de0" : "transparent",
                      }}
                    >
                      {d}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {OUTPATIENT.map((doc, di) => (
                  <tr key={doc.name} style={{ background: di % 2 === 0 ? "white" : "#fafcff" }}>
                    <td style={{ padding: "12px 8px", fontWeight: 700, color: "#0f2a3a", fontSize: 14, textAlign: "center", borderBottom: "1px solid #f0f7fc" }}>
                      {doc.name}
                    </td>
                    {DAYS.map((_, ci) => {
                      const amOn = doc.am[ci];
                      const pmOn = doc.pm[ci];
                      const isToday = ci === todayCol;
                      return (
                        <td
                          key={ci}
                          style={{
                            padding: "8px 6px",
                            borderBottom: "1px solid #f0f7fc",
                            borderLeft: "1px solid #f0f7fc",
                            background: isToday ? "rgba(56,178,240,0.04)" : "transparent",
                          }}
                        >
                          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                            <div style={{
                              height: 20,
                              borderRadius: 4,
                              background: amOn
                                ? (isToday ? "rgba(56,178,240,1)" : "rgba(56,178,240,0.85)")
                                : "#f0f7fc",
                            }} />
                            <div style={{
                              height: 20,
                              borderRadius: 4,
                              background: pmOn
                                ? (isToday ? "rgba(14,165,170,1)" : "rgba(14,165,170,0.75)")
                                : "#f0f7fc",
                            }} />
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Notice */}
            <div style={{ padding: "10px 16px", fontSize: 12, color: "#82aabf", background: "#f8fcff", borderTop: "1px solid #f0f7fc", borderRadius: "0 0 16px 16px", minWidth: 700 }}>
              ※ 진료 일정은 변경될 수 있습니다. 방문 전 전화 확인(031-912-8720) 부탁드립니다.
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ S3: Endoscopy table ━━━ */}
      <section style={{ background: "#f8fcff" }} ref={s3.ref}>
        <div
          className="max-w-[1280px] mx-auto px-5 lg:px-12"
          style={{
            padding: "80px 48px",
            opacity: s3.v ? 1 : 0,
            transform: s3.v ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <h2 style={titleStyle}>내시경</h2>

          <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: "touch" }}>
            <table
              className="w-full"
              style={{
                borderCollapse: "separate",
                borderSpacing: 0,
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "0 4px 24px rgba(56,178,240,0.08)",
                minWidth: 700,
              }}
            >
              <thead>
                <tr>
                  <th style={{ background: "#0f2a3a", color: "white", padding: 14, width: 80, fontSize: 14, fontWeight: 600 }}>시간</th>
                  {DAYS.map((d, ci) => (
                    <th
                      key={d}
                      style={{
                        background: ci === todayCol ? "#1a9de0" : "#0f2a3a",
                        color: "white",
                        padding: 14,
                        fontSize: 14,
                        fontWeight: ci === todayCol ? 700 : 600,
                        textAlign: "center",
                      }}
                    >
                      {d}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* AM rows */}
                {[0, 1, 2].map((row) => (
                  <tr key={`am-${row}`} style={{ background: "white" }}>
                    {row === 0 && (
                      <td
                        rowSpan={3}
                        style={{
                          background: "#0f2a3a", color: "white",
                          fontWeight: 700, fontSize: 14, textAlign: "center",
                          verticalAlign: "middle", padding: 12,
                        }}
                      >
                        오전
                      </td>
                    )}
                    {ENDO_AM.map((dayNames, ci) => {
                      const name = dayNames[row] || "";
                      const isTag = name.includes("(검진진료)");
                      const cleanName = name.replace("(검진진료)", "");
                      return (
                        <td
                          key={ci}
                          style={{
                            textAlign: "center", padding: "10px 8px",
                            fontSize: 13, color: "#0f2a3a",
                            border: "1px solid #f0f7fc",
                            background: ci === todayCol ? "rgba(56,178,240,0.06)" : "transparent",
                          }}
                        >
                          <div className="flex flex-col items-center gap-1">
                            {cleanName && <span>{cleanName}</span>}
                            {isTag && <span style={{ fontSize: 11, color: "#82aabf", marginTop: 2 }}>(검진진료)</span>}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
                {/* PM rows */}
                {[0, 1].map((row) => (
                  <tr key={`pm-${row}`} style={{ background: "#fafcff" }}>
                    {row === 0 && (
                      <td
                        rowSpan={2}
                        style={{
                          background: "#0f2a3a", color: "white",
                          fontWeight: 700, fontSize: 14, textAlign: "center",
                          verticalAlign: "middle", padding: 12,
                        }}
                      >
                        오후
                      </td>
                    )}
                    {ENDO_PM.map((dayNames, ci) => {
                      const name = dayNames[row] || "";
                      return (
                        <td
                          key={ci}
                          style={{
                            textAlign: "center", padding: "10px 8px",
                            fontSize: 13, color: name ? "#0f2a3a" : "#82aabf",
                            border: "1px solid #f0f7fc",
                            background: ci === todayCol ? "rgba(56,178,240,0.06)" : "transparent",
                          }}
                        >
                          <div className="flex flex-col items-center gap-1">
                            {name || (ci === 5 && row === 0 ? "—" : "")}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ━━━ S4: Features ━━━ */}
      <section className="bg-white" ref={s4.ref}>
        <div className="max-w-[1280px] mx-auto px-5 lg:px-12" style={{ padding: "80px 48px" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className={`flex items-start gap-4 bg-white transition-all duration-300 cursor-default hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(56,178,240,0.12)]`}
                style={{
                  border: "1px solid #dceef8",
                  borderRadius: 16,
                  padding: "32px 36px",
                  gridColumn: i === 4 ? "1 / -1" : undefined,
                  wordBreak: "keep-all",
                  overflowWrap: "break-word",
                  opacity: s4.v ? 1 : 0,
                  transform: s4.v ? "translateY(0)" : "translateY(30px)",
                  transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s, box-shadow 0.3s`,
                }}
              >
                <span
                  className="flex-shrink-0"
                  style={{
                    width: 10, height: 10, borderRadius: "50%",
                    background: "#1a9de0", marginTop: 8,
                    boxShadow: "0 0 0 4px rgba(56,178,240,0.15)",
                  }}
                />
                <div style={{ maxWidth: i === 4 ? 720 : undefined, margin: i === 4 ? "0 auto" : undefined }}>
                  <div className="text-[12px] mb-1" style={{ color: "#82aabf" }}>한사랑속편한내과는</div>
                  <div className="font-bold mb-[10px]" style={{ color: "#1a9de0", fontSize: 17, lineHeight: 1.5 }}>{f.title}</div>
                  <p className="font-light" style={{ color: "#4a7a90", fontSize: 15, lineHeight: 1.85 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingBanner />
    </>
  );
}
