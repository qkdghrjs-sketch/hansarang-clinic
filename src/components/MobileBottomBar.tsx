"use client";

export default function MobileBottomBar() {
  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 flex"
      style={{
        height: 56,
        zIndex: 8000,
        background: "#fff",
        borderTop: "1px solid #dceef8",
      }}
    >
      {/* 전화 */}
      <a
        href="tel:031-912-8720"
        className="flex items-center justify-center no-underline"
        style={{
          flex: 1,
          background: "#1a9de0",
          color: "#fff",
          fontSize: 13,
          fontWeight: 700,
          gap: 6,
          textDecoration: "none",
        }}
      >
        <span>📞</span>
        <span>전화</span>
      </a>

      {/* 카카오 */}
      <a
        href="https://place.map.kakao.com/9589940"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center no-underline"
        style={{
          flex: 1,
          background: "#FEE500",
          color: "#3A1D1D",
          fontSize: 13,
          fontWeight: 600,
          gap: 6,
          textDecoration: "none",
        }}
      >
        <span>💬</span>
        <span>카카오</span>
      </a>

      {/* 네이버 */}
      <a
        href="https://naver.me/FvEgeFyj"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center no-underline"
        style={{
          flex: 1,
          background: "#03C75A",
          color: "#fff",
          fontSize: 13,
          fontWeight: 600,
          gap: 6,
          textDecoration: "none",
        }}
      >
        <span>🟢</span>
        <span>네이버</span>
      </a>
    </div>
  );
}
