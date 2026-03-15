import { motion } from "motion/react";

const classes = [
  {
    grade: 6,
    title: "Grade 6 — Les Débuts",
    subtitle: "The Beginnings",
    topics: [
      "Introduction to French alphabet & phonetics",
      "Greetings and basic conversational phrases",
      "Numbers, colors, and everyday vocabulary",
      "Simple present tense & subject pronouns",
      "Introduction to French culture",
    ],
  },
  {
    grade: 7,
    title: "Grade 7 — En Avant",
    subtitle: "Moving Forward",
    topics: [
      "Expanding vocabulary and grammar",
      "Describing people, places, and things",
      "Past tense (Passé Composé) fundamentals",
      "Reading comprehension passages",
      "Writing simple paragraphs",
    ],
  },
  {
    grade: 8,
    title: "Grade 8 — En Progrès",
    subtitle: "Making Progress",
    topics: [
      "Complex sentence structures",
      "Multiple tenses: present, past, future",
      "Dialogue writing and conversation practice",
      "French literature excerpts",
      "Exam strategy & comprehension skills",
    ],
  },
  {
    grade: 9,
    title: "Grade 9 — Vers l'Excellence",
    subtitle: "Towards Excellence",
    topics: [
      "Advanced grammar: subjunctive & conditionals",
      "Essay and letter writing",
      "Oral expression and pronunciation",
      "Board exam preparation begins",
      "Cultural topics: France, Francophone world",
    ],
  },
  {
    grade: 10,
    title: "Grade 10 — La Réussite",
    subtitle: "Success",
    topics: [
      "Complete board curriculum mastery",
      "Full-length mock examinations",
      "Intensive revision sessions",
      "Scoring strategies for 100/100",
      "Confidence-building oral practice",
    ],
  },
];

export default function ClassesSection() {
  return (
    <section id="classes" className="py-20 sm:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-gold text-sm font-semibold tracking-[0.25em] uppercase mb-3">
            ⚜ Our Classes
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
            French for Every Grade
            <span className="text-primary italic"> Tailored Curriculum</span>
          </h2>
          <p className="mt-4 text-foreground/60 max-w-xl mx-auto">
            Each grade has a carefully crafted curriculum that builds on the
            previous year, ensuring students progress confidently toward exam
            excellence.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls, i) => (
            <motion.div
              key={cls.grade}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative bg-cream rounded-2xl p-6 hover:shadow-navy transition-all duration-300 hover:-translate-y-1 border border-border"
              data-ocid={`class.grade${cls.grade}.card`}
            >
              {/* Grade badge */}
              <div className="absolute -top-3 left-6">
                <span className="inline-block bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full tracking-wide">
                  Grade {cls.grade}
                </span>
              </div>

              <div className="mt-2">
                <h3 className="font-display text-lg font-bold text-foreground mb-0.5">
                  {cls.title}
                </h3>
                <p className="text-gold text-xs font-semibold italic mb-4">
                  {cls.subtitle}
                </p>

                <ul className="space-y-2">
                  {cls.topics.map((topic) => (
                    <li
                      key={topic}
                      className="flex items-start gap-2 text-sm text-foreground/70"
                    >
                      <span className="text-gold mt-0.5 flex-shrink-0">✦</span>
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hover accent */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}

          {/* 5th card takes 3 columns on lg — handled by flex fallback */}
        </div>
      </div>
    </section>
  );
}
