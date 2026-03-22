import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import StatsBar from "@/components/StatsBar";
import AwardSection from "@/components/AwardSection";
import EndoscopySection from "@/components/EndoscopySection";
import CheckupCenterSection from "@/components/CheckupCenterSection";
import DoctorsSection from "@/components/DoctorsSection";
import HoursMapSection from "@/components/HoursMapSection";
import Footer from "@/components/Footer";
import FloatingBanner from "@/components/FloatingBanner";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSlider />
      <StatsBar />
      <AwardSection />
      <EndoscopySection />
      <CheckupCenterSection />
      <DoctorsSection />
      <HoursMapSection />
      <Footer />
      <FloatingBanner />
    </>
  );
}
