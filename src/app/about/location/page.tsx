import SubPageHeader from "@/components/SubPageHeader";
import SubPageBanner from "@/components/SubPageBanner";
import Footer from "@/components/Footer";
import FloatingBanner from "@/components/FloatingBanner";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <SubPageHeader />
      <SubPageBanner
        category="본원소개"
        title="찾아오시는길"
        breadcrumb={["홈", "본원소개", "찾아오시는길"]}
      />
      <section style={{ background: "#f8fcff", padding: "120px 48px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 64, marginBottom: 24 }}>📍</div>
          <h2
            style={{
              fontFamily: "var(--font-noto-serif-kr)",
              fontSize: 24,
              fontWeight: 700,
              color: "#0f2a3a",
              marginBottom: 12,
            }}
          >
            찾아오시는길
          </h2>
          <p
            style={{
              fontSize: 15,
              color: "#82aabf",
              lineHeight: 1.8,
            }}
          >
            현재 페이지를 준비 중입니다.
            <br />
            더 나은 서비스로 곧 찾아뵙겠습니다.
          </p>
          <Link
            href="/"
            style={{
              display: "inline-block",
              marginTop: 32,
              background: "#1a9de0",
              color: "white",
              borderRadius: 10,
              padding: "14px 32px",
              fontWeight: 600,
              textDecoration: "none",
              fontSize: 14,
            }}
          >
            홈으로 돌아가기
          </Link>
        </div>
      </section>
      <Footer />
      <FloatingBanner />
    </>
  );
}
