import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { motion } from "motion/react";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="py-20 sm:py-28 bg-navy relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 fleur-pattern opacity-40" />
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
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Begin Your
            <span className="text-gold italic"> French Journey?</span>
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto mb-10">
            Enroll today and take the first step towards mastering French.
            Limited seats available for each batch.
          </p>

          {/* Contact Cards */}
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            <div className="bg-white/10 rounded-2xl p-5 backdrop-blur-sm border border-white/10">
              <MapPin className="w-6 h-6 text-gold mx-auto mb-2" />
              <p className="text-white text-sm font-semibold">Location</p>
              <p className="text-white/60 text-xs mt-1">
                India (Online & Offline)
              </p>
            </div>
            <div className="bg-white/10 rounded-2xl p-5 backdrop-blur-sm border border-white/10">
              <Phone className="w-6 h-6 text-gold mx-auto mb-2" />
              <p className="text-white text-sm font-semibold">
                Phone / WhatsApp
              </p>
              <p className="text-white/60 text-xs mt-1">Contact for details</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-5 backdrop-blur-sm border border-white/10">
              <Mail className="w-6 h-6 text-gold mx-auto mb-2" />
              <p className="text-white text-sm font-semibold">Email</p>
              <p className="text-white/60 text-xs mt-1">Send an enquiry</p>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/?text=Hello!%20I%20am%20interested%20in%20enrolling%20for%20French%20tuition%20at%20Petit%20à%20Petit%20Apprenons%20le%20Français."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] text-white font-bold text-base rounded-full hover:brightness-110 transition-all duration-200 hover:-translate-y-0.5 shadow-lg"
              data-ocid="contact.whatsapp.primary_button"
            >
              <MessageCircle size={20} />
              Enquire on WhatsApp
            </a>
            <a
              href="mailto:?subject=Enquiry%20-%20Petit%20à%20Petit%20Apprenons%20le%20Français&body=Hello!%20I%20am%20interested%20in%20enrolling%20for%20French%20tuition."
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gold text-gold font-bold text-base rounded-full hover:bg-gold/10 transition-all duration-200 hover:-translate-y-0.5"
              data-ocid="contact.email.secondary_button"
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
