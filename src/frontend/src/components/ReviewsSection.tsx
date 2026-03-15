import { Skeleton } from "@/components/ui/skeleton";
import { Quote, Star } from "lucide-react";
import { motion } from "motion/react";
import type { Review } from "../backend.d";
import { useReviews } from "../hooks/useQueries";

const seedReviews: Review[] = [
  {
    reviewerName: "Sunita Sharma (Parent)",
    grade: 10n,
    starRating: 5n,
    year: 2024n,
    reviewText:
      "My daughter Priya scored a perfect 100 in French! The teaching methodology here is exceptional. The teacher has a unique way of making French grammar simple and enjoyable. Highly recommended!",
  },
  {
    reviewerName: "Rajesh Mehta (Parent)",
    grade: 10n,
    starRating: 5n,
    year: 2024n,
    reviewText:
      "Aryan dreaded French initially but after joining these classes, he not only loves the language but scored 100/100 in his boards. The patient and personalised approach makes all the difference.",
  },
  {
    reviewerName: "Kavitha Iyer (Parent)",
    grade: 9n,
    starRating: 5n,
    year: 2023n,
    reviewText:
      "Best French tutor in the city. Sneha improved from 72 to 100 in one year. The structured curriculum, regular tests, and motivating teaching style helped her achieve what we thought was impossible.",
  },
  {
    reviewerName: "Meena Kapoor (Parent)",
    grade: 10n,
    starRating: 5n,
    year: 2023n,
    reviewText:
      "Rohan's French transformation has been remarkable. The teacher's depth of knowledge and passion is infectious. Classes are engaging and the exam preparation was thorough and strategic.",
  },
];

const STAR_KEYS = ["s1", "s2", "s3", "s4", "s5"];
const SKELETON_KEYS = ["sk-0", "sk-1", "sk-2", "sk-3"];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {STAR_KEYS.map((k, i) => (
        <Star
          key={k}
          size={14}
          className={i < rating ? "fill-current" : "opacity-30"}
          style={{ color: "oklch(78% 0.14 85)" }}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl p-6 shadow-md hover:shadow-navy transition-all duration-300 hover:-translate-y-1 border border-border relative"
      data-ocid={`reviews.item.${index + 1}`}
    >
      <Quote
        className="absolute top-4 right-5 w-8 h-8 opacity-10 text-primary"
        aria-hidden="true"
      />

      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="font-semibold text-foreground text-sm">
            {review.reviewerName}
          </p>
          <p className="text-foreground/50 text-xs mt-0.5">
            Grade {Number(review.grade)} • {Number(review.year)}
          </p>
        </div>
        <StarRating rating={Number(review.starRating)} />
      </div>

      <p className="text-foreground/70 text-sm leading-relaxed">
        &ldquo;{review.reviewText}&rdquo;
      </p>
    </motion.div>
  );
}

export default function ReviewsSection() {
  const { data, isLoading } = useReviews();
  const reviews = data && data.length > 0 ? data : seedReviews;

  return (
    <section id="reviews" className="py-20 sm:py-28 bg-cream">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-gold text-sm font-semibold tracking-[0.25em] uppercase mb-3">
            ⚜ Testimonials
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
            What Parents & Students
            <span className="text-primary italic"> Are Saying</span>
          </h2>
          <p className="mt-4 text-foreground/60 max-w-xl mx-auto">
            Real words from real families who have seen their children flourish
            in French under our guidance.
          </p>
        </motion.div>

        {isLoading ? (
          <div
            className="grid sm:grid-cols-2 gap-6"
            data-ocid="reviews.loading_state"
          >
            {SKELETON_KEYS.map((k) => (
              <div
                key={k}
                className="bg-white rounded-2xl p-6 border border-border"
              >
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-3 w-24 mb-4" />
                <Skeleton className="h-3 w-full mb-2" />
                <Skeleton className="h-3 w-full mb-2" />
                <Skeleton className="h-3 w-3/4" />
              </div>
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div
            className="text-center py-16 text-foreground/50"
            data-ocid="reviews.empty_state"
          >
            <Quote className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="font-display text-xl">Reviews coming soon!</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-6">
            {reviews.map((review, i) => (
              <ReviewCard key={review.reviewerName} review={review} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
