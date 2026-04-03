"use client";

import { useEffect, useRef, useState } from "react";

/* ━━━ Data ━━━ */
const HOURS = [
  { day: "월", dayEn: "MON", open: "08:30", close: "18:00", lunch: "13:00 - 14:00", closed: false },
  { day: "화", dayEn: "TUE", open: "08:30", close: "18:00", lunch: "13:00 - 14:00", closed: false },
  { day: "수", dayEn: "WED", open: "08:30", close: "18:00", lunch: "13:00 - 14:00", closed: false },
  { day: "목", dayEn: "THU", open: "08:30", close: "18:00", lunch: "13:00 - 14:00", closed: false },
  { day: "금", dayEn: "FRI", open: "08:30", close: "18:00", lunch: "13:00 - 14:00", closed: false },
  { day: "토", dayEn: "SAT", open: "08:00", close: "13:00", lunch: null, closed: false },
  { day: "일", dayEn: "SUN", open: null, close: null, lunch: null, closed: true },
];

const DOCTORS = [
  { name: "오성남", am: [1, 1, 0, 1, 0, 1], pm: [1, 0, 0, 1, 1, 0] },
  { name: "김두랑", am: [1, 0, 1, 0, 1, 1], pm: [1, 1, 1, 0, 0, 0] },
  { name: "김영진", am: [1, 1, 1, 0, 0, 1], pm: [0, 1, 0, 1, 0, 0] },
  { name: "장윤정", am: [0, 1, 0, 1, 1, 0], pm: [0, 0, 1, 1, 0, 0] },
  { name: "최영균", am: [0, 0, 1, 1, 0, 0], pm: [0, 1, 0, 0, 1, 0] },
  { name: "김수지", am: [0, 0, 1, 0, 1, 0], pm: [0, 1, 1, 0, 0, 0] },
  { name: "현보라", am: [1, 0, 0, 1, 0, 0], pm: [1, 0, 1, 1, 1, 0] },
  { name: "박상운", am: [0, 1, 0, 0, 1, 1], pm: [1, 0, 0, 0, 1, 0] },
];

const DAYS_SHORT = ["월", "화", "수", "목", "금", "토"];

type StatusType = "open" | "lunch" | "closed";

function getStatus(todayIndex: number): { type: StatusType; label: string } {
  const h = HOURS[todayIndex];
  if (h.closed) return { type: "closed", label: "오늘은 휴무입니다" };
  const now = new Date();
  const mins = now.getHours() * 60 + now.getMinutes();
  const toMins = (s: string) => { const [hh, mm] = s.split(":").map(Number); return hh * 60 + mm; };
  const openMin = toMins(h.open!);
  const closeMin = toMins(h.close!);
  if (mins < openMin || mins >= closeMin) return { type: "closed", label: "영업종료" };
  if (h.lunch) {
    const [ls, le] = h.lunch.split(" - ");
    if (mins >= toMins(ls) && mins < toMins(le)) return { type: "lunch", label: "휴게시간" };
  }
  return { type: "open", label: "현재 영업중" };
}

const statusMeta: Record<StatusType, { dot: string; bg: string; border: string; text: string }> = {
  open: { dot: "#22c55e", bg: "rgba(34,197,94,0.1)", border: "rgba(34,197,94,0.3)", text: "#16a34a" },
  lunch: { dot: "#eab308", bg: "rgba(234,179,8,0.1)", border: "rgba(234,179,8,0.3)", text: "#a16207" },
  closed: { dot: "#ef4444", bg: "rgba(239,68,68,0.1)", border: "rgba(239,68,68,0.3)", text: "#dc2626" },
};

/* ━━━ Component ━━━ */
export default function HoursMapSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [todayIndex, setTodayIndex] = useState(-1);
  const [status, setStatus] = useState<{ type: StatusType; label: string }>({ type: "closed", label: "" });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const today = new Date().getDay();
    const idx = today === 0 ? 6 : today - 1;
    setTodayIndex(idx);
    setStatus(getStatus(idx));
    const interval = setInterval(() => setStatus(getStatus(idx)), 60000);
    return () => clearInterval(interval);
  }, []);

  const sc = statusMeta[status.type];
  const todayData = todayIndex >= 0 ? HOURS[todayIndex] : null;

  // Today column index in 6-day array (월=0..토=5). Sunday → -1 (no highlight)
  const todayColIdx = todayIndex >= 0 && todayIndex <= 5 ? todayIndex : -1;

  return (
    <section ref={sectionRef} id="hours" className="relative overflow-hidden" style={{ background: "#f8fcff" }}>
      <div className="max-w-[1280px] mx-auto px-5 md:px-6 lg:px-12 py-[60px] md:py-[100px]">

        {/* ━━━ [A] Header ━━━ */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}>
          <div
            className="inline-flex items-center gap-[10px] text-xs font-semibold tracking-[2.5px] uppercase mb-4"
            style={{ fontFamily: "var(--font-outfit)", color: "#1a9de0" }}
          >
            <span className="w-5 h-[2px] rounded-sm" style={{ background: "#38b2f0" }} />
            진료시간 · 오시는 길
          </div>
          <h2
            className="text-[clamp(28px,3vw,44px)] font-bold leading-[1.3] tracking-tight mb-5"
            style={{ fontFamily: "var(--font-noto-serif-kr)", color: "#0f2a3a" }}
          >
            언제든지 편하게 방문하세요
          </h2>

          {todayData && (
            <div
              className="inline-flex items-center gap-[10px] px-5 py-[10px] rounded-full text-[13px] font-semibold"
              style={{ background: sc.bg, border: `1.5px solid ${sc.border}`, color: sc.text }}
            >
              <span
                className="w-[9px] h-[9px] rounded-full flex-shrink-0"
                style={{
                  background: sc.dot,
                  boxShadow: status.type === "open" ? `0 0 0 4px ${sc.bg}` : "none",
                  animation: status.type === "open" ? "blink 2s infinite" : "none",
                }}
              />
              {status.type === "closed" && todayData.closed
                ? "오늘은 휴무입니다"
                : status.type === "open"
                ? `${status.label} · ${todayData.open} - ${todayData.close}${todayData.lunch ? ` (휴게 ${todayData.lunch})` : ""}`
                : status.type === "lunch"
                ? `${status.label} · ${todayData.lunch}`
                : status.label}
            </div>
          )}
        </div>

        {/* ━━━ [B] Operating hours — 7 column cards ━━━ */}
        <div className="md:hidden text-center text-[12px] text-[#82aabf] mt-10 mb-2">← 좌우로 스크롤하세요 →</div>
        <div
          className="mt-2 md:mt-10 rounded-[20px] overflow-x-auto bg-white"
          style={{
            WebkitOverflowScrolling: "touch" as const,
            border: "1px solid #dceef8",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
          }}
        >
          <div className="grid grid-cols-7" style={{ minWidth: 600 }}>
            {HOURS.map((h, i) => {
              const isToday = i === todayIndex;
              return (
                <div
                  key={h.dayEn}
                  className="text-center relative"
                  style={{
                    padding: "24px 8px",
                    borderRight: i < 6 ? "1px solid #f0f7fc" : "none",
                    background: isToday
                      ? "linear-gradient(180deg, rgba(56,178,240,0.06), rgba(56,178,240,0.02))"
                      : "white",
                    borderTop: isToday ? "3px solid #1a9de0" : "3px solid transparent",
                  }}
                >
                  {isToday && (
                    <span
                      className="block text-[10px] font-bold text-white mx-auto mb-2 w-fit"
                      style={{ background: "#1a9de0", padding: "2px 8px", borderRadius: 100 }}
                    >
                      오늘
                    </span>
                  )}
                  <div className="text-[16px] font-bold mb-1" style={{ color: h.closed ? "#ef4444" : "#0f2a3a" }}>
                    {h.day}
                  </div>
                  <div
                    className="text-[11px] mb-4"
                    style={{ fontFamily: "var(--font-outfit)", color: "#82aabf", letterSpacing: "1px" }}
                  >
                    {h.dayEn}
                  </div>
                  {h.closed ? (
                    <div className="text-[14px] font-bold" style={{ color: "#ef4444" }}>휴무</div>
                  ) : (
                    <>
                      <div
                        className="text-[14px] font-bold mb-[6px]"
                        style={{ fontFamily: "var(--font-outfit)", color: "#1a9de0" }}
                      >
                        {h.open} - {h.close}
                      </div>
                      {h.lunch && (
                        <span
                          className="inline-block text-[11px]"
                          style={{
                            color: "#82aabf",
                            background: "#f0f9ff",
                            borderRadius: 6,
                            padding: "3px 8px",
                          }}
                        >
                          휴게 {h.lunch.replace(" - ", "-")}
                        </span>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ━━━ [C] Doctor schedule ━━━ */}
        <div className="md:hidden text-center text-[12px] text-[#82aabf] mt-6 mb-2">← 좌우로 스크롤하세요 →</div>
        <div
          className="mt-2 md:mt-6 overflow-x-auto"
          style={{
            WebkitOverflowScrolling: "touch" as const,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s",
          }}
        >
          {/* Title bar */}
          <div
            className="flex items-center justify-between"
            style={{ background: "linear-gradient(135deg, #0f2a3a, #1a3a4a)", padding: "14px 24px", borderRadius: "16px 16px 0 0" }}
          >
            <span className="text-[15px] font-bold text-white">의료진별 진료 일정</span>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-[6px] text-[12px]" style={{ color: "rgba(255,255,255,0.65)" }}>
                <span className="inline-block" style={{ width: 14, height: 14, borderRadius: 3, background: "rgba(56,178,240,0.85)" }} />
                오전
              </span>
              <span className="flex items-center gap-[6px] text-[12px]" style={{ color: "rgba(255,255,255,0.65)" }}>
                <span className="inline-block" style={{ width: 14, height: 14, borderRadius: 3, background: "rgba(14,165,170,0.75)" }} />
                오후
              </span>
            </div>
          </div>

          {/* Table */}
          <table style={{ width: "100%", borderCollapse: "collapse", borderRadius: "0 0 16px 16px", overflow: "hidden" }}>
            {/* Table header */}
            <thead>
              <tr style={{ background: "#1a3a4a" }}>
                <th style={{ width: 100, padding: "10px 8px", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.7)", textAlign: "center" }}>의료진</th>
                {DAYS_SHORT.map((d, ci) => (
                  <th
                    key={d}
                    style={{
                      padding: "10px 8px",
                      fontSize: 12,
                      fontWeight: ci === todayColIdx ? 700 : 600,
                      color: ci === todayColIdx ? "white" : "rgba(255,255,255,0.7)",
                      textAlign: "center",
                      background: ci === todayColIdx ? "#1a9de0" : "transparent",
                    }}
                  >
                    {d}
                  </th>
                ))}
              </tr>
            </thead>
            {/* Doctor rows */}
            <tbody>
              {DOCTORS.map((doc, di) => (
                <tr key={doc.name} style={{ background: di % 2 === 0 ? "white" : "#fafcff" }}>
                  <td style={{ padding: "12px 8px", fontWeight: 700, color: "#0f2a3a", fontSize: 14, textAlign: "center", borderBottom: "1px solid #f0f7fc" }}>
                    {doc.name}
                  </td>
                  {DAYS_SHORT.map((_, ci) => {
                    const amOn = doc.am[ci];
                    const pmOn = doc.pm[ci];
                    const isToday = ci === todayColIdx;
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
          <div style={{ padding: "10px 16px", fontSize: 12, color: "#82aabf", background: "#f8fcff", borderTop: "1px solid #f0f7fc", borderRadius: "0 0 16px 16px" }}>
            ※ 진료 일정은 변경될 수 있습니다. 방문 전 전화 확인(031-912-8720) 부탁드립니다.
          </div>
        </div>

        {/* ━━━ [D] Map + Info Cards ━━━ */}
        <div
          className="mt-6"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
          }}
        >
          {/* Map - full width */}
          <div className="w-full overflow-hidden h-[240px] md:h-[400px]" style={{ borderRadius: 16 }}>
            <iframe
              src="/kakaomap.html"
              className="border-0"
              style={{ width: "100%", height: "100%", display: "block" }}
              loading="lazy"
              title="한사랑속편한내과의원 약도"
            />
          </div>

          {/* Info cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {/* 전화번호 */}
            <div
              className="flex flex-col gap-3 bg-white"
              style={{ border: "1.5px solid #dceef8", borderRadius: 16, padding: "20px 24px" }}
            >
              <a href="tel:031-912-8720" className="flex items-center gap-[14px] no-underline">
                <div className="flex items-center justify-center flex-shrink-0" style={{ width: 46, height: 46, background: "#f0f9ff", borderRadius: 12 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#1a9de0">
                    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.58a1 1 0 01-.24 1.01l-2.21 2.2z" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "#82aabf", marginBottom: 3 }}>대표전화</div>
                  <div style={{ fontSize: 17, fontWeight: 800, color: "#0f2a3a", fontFamily: "var(--font-outfit)", letterSpacing: "-0.3px" }}>031-912-8720</div>
                </div>
              </a>
              <div style={{ borderTop: "1px solid #f0f7fc", paddingTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
                <a href="tel:031-917-9008" className="flex items-center justify-between no-underline" style={{ fontSize: 13 }}>
                  <span style={{ color: "#4a7a90" }}>국가건강검진</span>
                  <span style={{ fontFamily: "var(--font-outfit)", fontWeight: 700, color: "#0f2a3a" }}>031-917-9008</span>
                </a>
                <a href="tel:031-916-8720" className="flex items-center justify-between no-underline" style={{ fontSize: 13 }}>
                  <span style={{ color: "#4a7a90" }}>종합검진실</span>
                  <span style={{ fontFamily: "var(--font-outfit)", fontWeight: 700, color: "#0f2a3a" }}>031-916-8720</span>
                </a>
              </div>
            </div>

            {/* 주차안내 */}
            <div
              className="flex items-center gap-[14px] bg-white"
              style={{ border: "1.5px solid #dceef8", borderRadius: 16, padding: "20px 24px" }}
            >
              <div className="flex items-center justify-center flex-shrink-0" style={{ width: 46, height: 46, background: "#f0f9ff", borderRadius: 12 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#1a9de0">
                  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "#82aabf", marginBottom: 3 }}>주차안내</div>
                <div style={{ fontSize: 15, fontWeight: 800, color: "#0f2a3a" }}>건물 뒷편 주차장</div>
                <div style={{ fontSize: 12, color: "#4a7a90", marginTop: 2, lineHeight: 1.5 }}>주차장 협소 시 노상주차장 이용<br />(주차권 1시간 지원 · 주차권 지참 필수)</div>
              </div>
            </div>

            {/* 주소 */}
            <div
              className="flex items-center gap-[14px] bg-white"
              style={{ border: "1.5px solid #dceef8", borderRadius: 16, padding: "20px 24px" }}
            >
              <div className="flex items-center justify-center flex-shrink-0" style={{ width: 46, height: 46, background: "#f0f9ff", borderRadius: 12 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#1a9de0">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "#82aabf", marginBottom: 3 }}>주소</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#0f2a3a", lineHeight: 1.4 }}>경기 고양시 일산서구 중앙로 1416</div>
                <div style={{ fontSize: 13, color: "#4a7a90" }}>한사랑빌딩 5층</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
