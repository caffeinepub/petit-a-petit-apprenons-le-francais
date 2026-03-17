import { Award, BookOpen, GraduationCap, Users } from "lucide-react";
import { motion } from "motion/react";

const stats = [
  { icon: Users, value: "70+", label: "Students Taught" },
  { icon: Award, value: "95%+", label: "Average Score in Boards" },
  { icon: BookOpen, value: "Multi-curricula", label: "CBSE/ICSE/IGCSE/IB" },
  {
    icon: GraduationCap,
    value: "DELF A1/A2/B1",
    label: "Certification Classes",
  },
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
                I am a DALF C1 qualified French instructor with five years of
                experience dedicated to helping students master the language. My
                teaching philosophy is built on the belief that French grammar
                doesn't have to be daunting; I strive to simplify complex
                concepts, making them intuitive and accessible for every
                learner.
              </p>
              <p>
                Over the past five years, I have mentored more than 70 students,
                all of whom achieved an average score of more than 95% in their
                board exams. This success is the result of a highly personalized
                approach: I begin by identifying each student's unique strengths
                and weaknesses to design bespoke lessons. By constantly
                reviewing progress and adjusting my strategy, I ensure that my
                teaching evolves alongside the student's needs to maximize their
                scores.
              </p>
              <p>
                Beyond school boards, I actively nudge and prepare my students
                for DELF certifications, bridging the gap between classroom
                excellence and global linguistic proficiency. My goal is to
                provide the strategic tools and confidence every student needs
                to truly excel.
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
                <p className="font-display text-xl font-bold text-primary">
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
