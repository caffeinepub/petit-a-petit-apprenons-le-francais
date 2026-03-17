import { Heart } from "lucide-react";

export default function FooterSection() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer className="bg-foreground py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <img
              src="/assets/uploads/image-3-1.png"
              alt="Logo"
              className="w-12 h-12 object-contain brightness-200"
            />
            <div>
              <p className="font-display text-sm font-bold text-white">
                Petit à Petit Apprenons le Français
              </p>
              <p className="text-xs text-white/40">
                French Learning • Multi-curricula • India (Online)
              </p>
            </div>
          </div>

          {/* Tagline */}
          <p className="text-white/40 text-xs text-center">
            &ldquo;Petit à petit, l'oiseau fait son nid&rdquo;
          </p>

          {/* Copyright + Attribution */}
          <p className="text-white/30 text-xs text-center">
            © {year}. Built with{" "}
            <Heart className="inline w-3 h-3 text-red-400 fill-current" /> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white/70 transition-colors underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </p>
        </div>

        {/* Tricolor bar */}
        <div className="mt-8 h-0.5 tricolor-bar rounded-full opacity-40" />
      </div>
    </footer>
  );
}
