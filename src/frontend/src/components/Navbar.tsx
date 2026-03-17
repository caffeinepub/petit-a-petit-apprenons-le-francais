import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Hall of Fame", href: "#achievements" },
  { label: "Resources", href: "#resources" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-md backdrop-blur-sm py-2"
          : "bg-transparent py-4"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo + Brand */}
        <a
          href="#hero"
          className="flex items-center gap-3 group"
          data-ocid="nav.link"
        >
          <img
            src="/assets/uploads/image-3-1.png"
            alt="Petit à Petit Logo"
            className="w-12 h-12 object-contain"
          />
          <div>
            <p className="font-display text-sm font-bold text-foreground leading-tight">
              Petit à Petit
            </p>
            <p className="text-xs text-gold leading-tight hidden sm:block">
              Apprenons le Français
            </p>
          </div>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="px-4 py-2 text-sm text-foreground/70 hover:text-gold transition-colors duration-200 font-medium rounded-md hover:bg-black/5"
                data-ocid={`nav.${link.label.toLowerCase().replace(/\s+/g, "-")}.link`}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="ml-2 px-5 py-2 bg-secondary text-secondary-foreground text-sm font-semibold rounded-full hover:brightness-110 transition-all duration-200 shadow-gold"
              data-ocid="nav.enroll.button"
            >
              Enroll Now
            </a>
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          className="md:hidden p-2 text-foreground/80 rounded-md hover:bg-black/5"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          data-ocid="nav.menu.toggle"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-border"
          >
            <ul className="px-4 py-3 flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className="block px-4 py-2.5 text-foreground/70 hover:text-gold transition-colors font-medium"
                    data-ocid={`nav.mobile.${link.label.toLowerCase().replace(/\s+/g, "-")}.link`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    closeMenu();
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full text-center px-5 py-2.5 bg-secondary text-secondary-foreground font-semibold rounded-full"
                  data-ocid="nav.mobile.enroll.button"
                >
                  Enroll Now
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
