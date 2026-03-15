import AboutSection from "../components/AboutSection";
import AchievementsSection from "../components/AchievementsSection";
import ClassesSection from "../components/ClassesSection";
import ContactSection from "../components/ContactSection";
import FooterSection from "../components/FooterSection";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import ReviewsSection from "../components/ReviewsSection";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ClassesSection />
        <AchievementsSection />
        <ReviewsSection />
        <ContactSection />
      </main>
      <FooterSection />
    </div>
  );
}
