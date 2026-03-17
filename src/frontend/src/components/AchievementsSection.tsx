import { Skeleton } from "@/components/ui/skeleton";
import { Trophy } from "lucide-react";
import { motion } from "motion/react";
import { Board } from "../backend.d";
import type { Achievement } from "../backend.d";
import { useAchievements } from "../hooks/useQueries";

const seedAchievements: Achievement[] = [
  {
    studentName: "Aditya",
    board: Board.CBSE,
    grade: 10n,
    score: 99n,
    year: 2021n,
  },
  {
    studentName: "Sanjana",
    board: Board.CBSE,
    grade: 10n,
    score: 99n,
    year: 2022n,
  },
  {
    studentName: "Shishir",
    board: Board.IGCSE,
    grade: 10n,
    score: 0n,
    year: 2022n,
  },
  {
    studentName: "Aayush",
    board: Board.CBSE,
    grade: 10n,
    score: 100n,
    year: 2024n,
  },
  {
    studentName: "Aarin",
    board: Board.CBSE,
    grade: 10n,
    score: 100n,
    year: 2024n,
  },
  {
    studentName: "Neev",
    board: Board.CBSE,
    grade: 10n,
    score: 100n,
    year: 2024n,
  },
  {
    studentName: "Rishi",
    board: Board.CBSE,
    grade: 10n,
    score: 99n,
    year: 2025n,
  },
];

function scoreBadge(score: bigint): string {
  if (score === 0n) return "Grade A 🌟";
  if (score === 100n) return "100/100 🌟";
  return `${Number(score)}/100`;
}

function AchievementCard({
  achievement,
  index,
}: { achievement: Achievement; index: number }) {
  const badge = scoreBadge(achievement.score);
  const isPerfect = achievement.score === 100n || achievement.score === 0n;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="relative bg-white rounded-2xl p-6 shadow-md hover:shadow-navy transition-all duration-300 hover:-translate-y-1 text-center border border-border group"
      data-ocid={`achievements.item.${index + 1}`}
    >
      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
        <span
          className={`inline-block text-xs font-bold px-3 py-1 rounded-full shadow-gold ${
            isPerfect
              ? "bg-secondary text-secondary-foreground"
              : "bg-primary/10 text-primary"
          }`}
        >
          {badge}
        </span>
      </div>

      <div className="inline-flex items-center justify-center w-14 h-14 bg-secondary/20 rounded-full mb-4 mt-2 group-hover:bg-secondary/30 transition-colors">
        <Trophy className="w-7 h-7" style={{ color: "oklch(65% 0.18 75)" }} />
      </div>

      <h3 className="font-display text-lg font-bold text-foreground">
        {achievement.studentName}
      </h3>
      <p className="text-foreground/60 text-sm mt-1">{achievement.board}</p>
      <p className="text-foreground/40 text-xs mt-1">
        Grade {Number(achievement.grade)} • {Number(achievement.year)}
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
            <span className="text-gold italic"> — Top Scores!</span>
          </h2>
          <p className="mt-4 text-foreground/60 max-w-xl mx-auto">
            These outstanding students achieved exceptional scores in their
            French examinations — a testament to their dedication and hard work.
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
                key={`${achievement.studentName}-${i}`}
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
