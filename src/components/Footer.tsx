import Image from "next/image";
import Link from "next/link";

const LINKS_CLINIC = [
  { label: "종합검진센터", href: "/checkup/intro" },
  { label: "내시경센터", href: "/endoscopy/room" },
  { label: "국민건강보험공단검진", href: "/nhis/intro" },
  { label: "진료시간표", href: "/about/hours" },
];

const LINKS_ABOUT = [
  { label: "인사말", href: "/about/greeting" },
  { label: "의료진소개", href: "/about/doctors" },
  { label: "병원둘러보기", href: "/about/tour" },
  { label: "보유장비", href: "/about/equipment" },
  { label: "찾아오시는길", href: "/about/location" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 px-5 md:px-6 lg:px-12 pt-12 md:pt-16 pb-[72px] md:pb-10">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 pb-8 md:pb-12 border-b border-white/8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-[10px] mb-4">
              <Image
                src="https://cdn.imweb.me/upload/S20260108b9005a7eb2710/409b9bd75d692.png"
                alt="한사랑속편한내과"
                width={160}
                height={42}
                style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }}
                unoptimized
              />
            </div>
            <p className="text-[13px] text-white/42 leading-[1.8] font-light">
              경기 고양시 일산서구 중앙로 1416<br />
              한사랑빌딩 5층<br />
              대표전화: 031-912-8720<br />
              국가건강검진: 031-917-9008<br />
              종합검진실: 031-916-8720
            </p>
          </div>

          {/* 진료안내 */}
          <div className="hidden md:block">
            <div className="text-xs font-bold text-white/70 tracking-[1px] uppercase mb-[18px]" style={{ fontFamily: "var(--font-outfit)" }}>
              진료안내
            </div>
            <ul className="flex flex-col gap-[10px]">
              {LINKS_CLINIC.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-[13px] text-white/38 no-underline font-light hover:text-white/80 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 본원소개 */}
          <div className="hidden md:block">
            <div className="text-xs font-bold text-white/70 tracking-[1px] uppercase mb-[18px]" style={{ fontFamily: "var(--font-outfit)" }}>
              본원소개
            </div>
            <ul className="flex flex-col gap-[10px]">
              {LINKS_ABOUT.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-[13px] text-white/38 no-underline font-light hover:text-white/80 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap justify-between items-center gap-3 text-xs text-white/28 font-light">
          <span>© 2025 한사랑속편한내과의원. All rights reserved.</span>
          <span>개인정보처리방침 · 이메일무단수집거부</span>
        </div>
      </div>
    </footer>
  );
}
