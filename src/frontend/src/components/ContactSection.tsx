import { Mail, MapPin } from "lucide-react";
import { motion } from "motion/react";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="py-20 sm:py-28 bg-cream relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 fleur-pattern opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-1 tricolor-bar" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div
            className="text-gold text-4xl mb-4 select-none"
            aria-hidden="true"
          >
            ⚜
          </div>
          <p className="text-gold text-sm font-semibold tracking-[0.25em] uppercase mb-3">
            Get in Touch
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Ready to Begin Your
            <span className="text-gold italic"> French Journey?</span>
          </h2>
          <p className="text-foreground/60 text-lg max-w-xl mx-auto mb-10">
            Enroll today and take the first step towards mastering French.
            Limited seats available for each batch.
          </p>

          {/* Contact Cards */}
          <div className="grid sm:grid-cols-2 gap-4 max-w-sm sm:max-w-md mx-auto mb-10">
            <div className="bg-white rounded-2xl p-5 border border-border shadow-sm">
              <MapPin className="w-6 h-6 text-gold mx-auto mb-2" />
              <p className="text-foreground text-sm font-semibold">Location</p>
              <p className="text-foreground/60 text-xs mt-1">India (Online)</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-border shadow-sm">
              <Mail className="w-6 h-6 text-gold mx-auto mb-2" />
              <p className="text-foreground text-sm font-semibold">Email</p>
              <p className="text-foreground/60 text-xs mt-1">
                petit.a.petit.ALF@gmail.com
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="flex justify-center">
            <a
              href="mailto:petit.a.petit.ALF@gmail.com?subject=Enquiry%20-%20Petit%20à%20Petit%20Apprenons%20le%20Français&body=Hello!%20I%20am%20interested%20in%20enrolling%20for%20French%20learning."
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gold text-gold font-bold text-base rounded-full hover:bg-gold/10 transition-all duration-200 hover:-translate-y-0.5"
              data-ocid="contact.email.primary_button"
            >
              <Mail size={20} />
              Send Email Enquiry
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
