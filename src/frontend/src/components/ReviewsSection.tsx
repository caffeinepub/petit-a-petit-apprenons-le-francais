import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, Quote, Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Review } from "../backend.d";
import { useActor } from "../hooks/useActor";
import { useReviews } from "../hooks/useQueries";

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

function StarPicker({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {STAR_KEYS.map((k, i) => (
        <button
          key={k}
          type="button"
          onClick={() => onChange(i + 1)}
          onMouseEnter={() => setHovered(i + 1)}
          onMouseLeave={() => setHovered(0)}
          className="focus:outline-none"
          aria-label={`Rate ${i + 1} star${i + 1 > 1 ? "s" : ""}`}
        >
          <Star
            size={22}
            className="transition-all duration-150"
            style={{
              color: "oklch(78% 0.14 85)",
              fill:
                i < (hovered || value) ? "oklch(78% 0.14 85)" : "transparent",
            }}
          />
        </button>
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
            {review.studentName}
          </p>
          <p className="text-foreground/50 text-xs mt-0.5">
            {Number(review.year)}
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

function ReviewForm() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const [studentName, setStudentName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [starRating, setStarRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!actor) return;
    setSubmitting(true);
    setError("");
    try {
      await actor.addReview({
        studentName: studentName.trim(),
        reviewText: reviewText.trim(),
        starRating: BigInt(starRating),
        year: BigInt(new Date().getFullYear()),
      });
      await queryClient.invalidateQueries({ queryKey: ["reviews"] });
      setSuccess(true);
      setStudentName("");
      setReviewText("");
      setStarRating(5);
      setTimeout(() => setSuccess(false), 5000);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-14 max-w-xl mx-auto bg-white rounded-2xl border border-border shadow-md p-8"
    >
      <h3 className="font-display text-xl font-bold text-foreground mb-1">
        Share Your Experience
      </h3>
      <p className="text-foreground/55 text-sm mb-6">
        We'd love to hear how your child has grown. Leave a review below!
      </p>

      <AnimatePresence>
        {success && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            className="mb-5 rounded-xl bg-green-50 border border-green-200 text-green-800 px-4 py-3 text-sm font-medium"
            data-ocid="reviews.success_state"
          >
            🎉 Thank you for your review! It has been submitted successfully.
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Label
            htmlFor="student-name"
            className="text-sm font-medium text-foreground/80 mb-1.5 block"
          >
            Student's Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="student-name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="e.g. Priya"
            required
            data-ocid="reviews.input"
            className="rounded-xl"
          />
        </div>

        <div>
          <Label
            htmlFor="review-text"
            className="text-sm font-medium text-foreground/80 mb-1.5 block"
          >
            Your Review <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="review-text"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Tell us about your child's progress and experience..."
            required
            rows={4}
            data-ocid="reviews.textarea"
            className="rounded-xl resize-none"
          />
        </div>

        <div>
          <Label className="text-sm font-medium text-foreground/80 mb-2 block">
            Rating
          </Label>
          <StarPicker value={starRating} onChange={setStarRating} />
        </div>

        {error && <p className="text-destructive text-sm">{error}</p>}

        <Button
          type="submit"
          disabled={submitting || !studentName.trim() || !reviewText.trim()}
          className="w-full rounded-xl"
          data-ocid="reviews.submit_button"
        >
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
            </>
          ) : (
            "Submit Review"
          )}
        </Button>
      </form>
    </motion.div>
  );
}

export default function ReviewsSection() {
  const { data, isLoading } = useReviews();
  const reviews = data ?? [];

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
            Proven Success: Authentic feedback from parents whose children
            achieved academic excellence and confidence in French under our
            guidance.
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
            <p className="font-display text-xl">
              No reviews yet — be the first!
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-6">
            {reviews.map((review, i) => (
              <ReviewCard
                key={`${review.studentName}-${i}`}
                review={review}
                index={i}
              />
            ))}
          </div>
        )}

        <ReviewForm />
      </div>
    </section>
  );
}
