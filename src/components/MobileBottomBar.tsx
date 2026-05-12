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
          gap: 8,
          textDecoration: "none",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
        </svg>
        <span>전화</span>
      </a>

    </div>
  );
}
