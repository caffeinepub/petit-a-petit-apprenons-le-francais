import { Skeleton } from "@/components/ui/skeleton";
import { Trophy } from "lucide-react";
import { motion } from "motion/react";
import type { Achievement } from "../backend.d";
import { useAchievements } from "../hooks/useQueries";

const seedAchievements: Achievement[] = [
  {
    studentName: "Priya Sharma",
    subject: "French",
    year: 2024n,
    score: 100n,
    grade: 10n,
  },
  {
    studentName: "Aryan Mehta",
    subject: "French",
    year: 2024n,
    score: 100n,
    grade: 10n,
  },
  {
    studentName: "Sneha Iyer",
    subject: "French",
    year: 2023n,
    score: 100n,
    grade: 9n,
  },
  {
    studentName: "Rohan Kapoor",
    subject: "French",
    year: 2023n,
    score: 100n,
    grade: 10n,
  },
  {
    studentName: "Ananya Singh",
    subject: "French",
    year: 2022n,
    score: 100n,
    grade: 10n,
  },
  {
    studentName: "Vikram Nair",
    subject: "French",
    year: 2022n,
    score: 100n,
    grade: 9n,
  },
];

function AchievementCard({
  achievement,
  index,
}: { achievement: Achievement; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="relative bg-white rounded-2xl p-6 shadow-md hover:shadow-navy transition-all duration-300 hover:-translate-y-1 text-center border border-border group"
      data-ocid={`achievements.item.${index + 1}`}
    >
      <div className="inline-flex items-center justify-center w-14 h-14 bg-secondary/20 rounded-full mb-4 group-hover:bg-secondary/30 transition-colors">
        <Trophy className="w-7 h-7" style={{ color: "oklch(65% 0.18 75)" }} />
      </div>

      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
        <span className="inline-block bg-secondary text-secondary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-gold">
          {Number(achievement.score)}/
          {Number(achievement.score) === 100 ? "100 🌟" : "100"}
        </span>
      </div>

      <h3 className="font-display text-lg font-bold text-foreground">
        {achievement.studentName}
      </h3>
      <p className="text-foreground/60 text-sm mt-1">
        {achievement.subject} • Grade {Number(achievement.grade)}
      </p>
      <p className="text-foreground/40 text-xs mt-1">
        Year {Number(achievement.year)}
      </p>
    </motion.div>
  );
}

const SKELETON_KEYS = ["sk-0", "sk-1", "sk-2", "sk-3", "sk-4", "sk-5"];

export default function AchievementsSection() {
  const { data, isLoading } = useAchievements();
  const achievements = data && data.length > 0 ? data : seedAchievements;

  return (
    <section id="achievements" className="py-20 sm:py-28 bg-cream">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-gold text-sm font-semibold tracking-[0.25em] uppercase mb-3">
            ⚜ Wall of Fame
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
            Our Star Students
            <span className="text-gold italic"> — Perfect 100!</span>
          </h2>
          <p className="mt-4 text-foreground/60 max-w-xl mx-auto">
            These brilliant students achieved the perfect score of 100/100 in
            their French examinations — a testament to their dedication and hard
            work.
          </p>
        </motion.div>

        {isLoading ? (
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            data-ocid="achievements.loading_state"
          >
            {SKELETON_KEYS.map((k) => (
              <div
                key={k}
                className="bg-white rounded-2xl p-6 border border-border"
              >
                <Skeleton className="w-14 h-14 rounded-full mx-auto mb-4" />
                <Skeleton className="h-5 w-32 mx-auto mb-2" />
                <Skeleton className="h-4 w-24 mx-auto" />
              </div>
            ))}
          </div>
        ) : achievements.length === 0 ? (
          <div
            className="text-center py-16 text-foreground/50"
            data-ocid="achievements.empty_state"
          >
            <Trophy className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="font-display text-xl">Achievements coming soon!</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, i) => (
              <AchievementCard
                key={achievement.studentName}
                achievement={achievement}
                index={i}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
