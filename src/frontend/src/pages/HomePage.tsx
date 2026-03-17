import AboutSection from "../components/AboutSection";
import AchievementsSection from "../components/AchievementsSection";
import ContactSection from "../components/ContactSection";
import FooterSection from "../components/FooterSection";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import ResourcesSection from "../components/ResourcesSection";
import ReviewsSection from "../components/ReviewsSection";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <AchievementsSection />
        <ResourcesSection />
        <ReviewsSection />
        <ContactSection />
      </main>
      <FooterSection />
    </div>
  );
}
