import type { Metadata } from "next";
import { Noto_Sans_KR, Noto_Serif_KR, Outfit } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import MobileBottomBar from "@/components/MobileBottomBar";

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

const notoSerifKR = Noto_Serif_KR({
  variable: "--font-noto-serif-kr",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "한사랑속편한내과의원 | 일산",
  description:
    "경기 고양시 일산서구 중앙로 1416 한사랑빌딩 5층. 내시경, 건강검진, 종합검진 전문. 031-912-8720",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${notoSansKR.variable} ${notoSerifKR.variable} ${outfit.variable}`}
    >
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <MobileBottomBar />
      </body>
    </html>
  );
}
