import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#faf8f3" }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-banner.dim_1200x600.jpg')",
          opacity: 0.25,
        }}
      />

      {/* Light overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(250, 248, 243, 0.70)" }}
      />

      {/* Fleur-de-lis dot pattern overlay */}
      <div className="absolute inset-0 fleur-pattern opacity-20" />

      {/* Tricolor stripe at top */}
      <div className="absolute top-0 left-0 right-0 h-1 tricolor-bar" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Fleur-de-lis decorative */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl mb-6 select-none"
          style={{ color: "#d4a843" }}
          aria-hidden="true"
        >
          ⚜
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm font-semibold tracking-[0.3em] uppercase mb-4"
          style={{ color: "#d4a843" }}
        >
          French Tuition • Grades 5–12 • India
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-display font-bold leading-tight mb-4"
          style={{ color: "#0d1b3e" }}
        >
          <span className="text-4xl sm:text-5xl md:text-7xl block">
            Petit à Petit
          </span>
          <span
            className="text-2xl sm:text-3xl md:text-5xl italic"
            style={{ color: "#d4a843" }}
          >
            Apprenons le Français
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg sm:text-xl max-w-2xl mx-auto mb-4"
          style={{ color: "rgba(13,27,62,0.85)" }}
        >
          &ldquo;Little by little, let&apos;s learn French&rdquo;
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-base sm:text-lg max-w-xl mx-auto mb-10"
          style={{ color: "rgba(13,27,62,0.75)" }}
        >
          To empower students with a strategic and simplified approach to
          French, transforming linguistic challenges into academic excellence
          and global certification success.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-4 font-bold text-base rounded-full transition-all duration-200 hover:-translate-y-0.5"
            style={{ backgroundColor: "#d4a843", color: "#0d1b3e" }}
            data-ocid="hero.enroll.primary_button"
          >
            Enroll Now
          </a>
          <a
            href="#achievements"
            className="inline-flex items-center justify-center px-8 py-4 font-semibold text-base rounded-full transition-all duration-200"
            style={{
              border: "2px solid rgba(13,27,62,0.3)",
              color: "#0d1b3e",
            }}
            data-ocid="hero.achievements.secondary_button"
          >
            See Our Results
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        style={{ color: "rgba(13,27,62,0.4)" }}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown size={16} className="animate-bounce" />
      </motion.div>
    </section>
  );
}
