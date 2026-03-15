import { Award, BookOpen, Star, Users } from "lucide-react";
import { motion } from "motion/react";

const stats = [
  { icon: Users, value: "100+", label: "Students Taught" },
  { icon: Award, value: "100/100", label: "Perfect Scores Achieved" },
  { icon: BookOpen, value: "5 Grades", label: "Grades 6–10" },
  { icon: Star, value: "5★", label: "Average Rating" },
];

export default function AboutSection() {
  return (
    <section id="about" className="bg-cream py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-gold text-sm font-semibold tracking-[0.25em] uppercase mb-3">
              ⚜ About the Teacher
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-6 leading-tight">
              Passionate About the{" "}
              <span className="text-primary italic">Art of French</span>
            </h2>
            <div className="space-y-4 text-foreground/70 leading-relaxed">
              <p>
                With years of dedicated experience teaching French to students
                across Grades 6–10, I bring the beauty of the French language
                alive in every classroom. My teaching philosophy is rooted in
                the French proverb:{" "}
                <em>"Petit à petit, l'oiseau fait son nid"</em>— little by
                little, the bird builds its nest.
              </p>
              <p>
                Specialising in school curriculum French across CBSE, ICSE, and
                state boards in India, I tailor my approach to each student's
                learning pace and style. The result? A proven track record of
                students achieving perfect 100/100 marks in board examinations.
              </p>
              <p>
                Beyond scores, my goal is to instil a genuine love for the
                French language and culture — a skill that opens doors
                worldwide.
              </p>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="bg-white rounded-2xl p-6 shadow-navy text-center group hover:-translate-y-1 transition-transform duration-200"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-3 group-hover:bg-secondary/20 transition-colors">
                  <stat.icon className="text-primary w-6 h-6" />
                </div>
                <p className="font-display text-2xl font-bold text-primary">
                  {stat.value}
                </p>
                <p className="text-xs text-foreground/60 mt-1 font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
