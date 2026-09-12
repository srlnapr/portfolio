"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Menu, X, Download } from "lucide-react";

gsap.registerPlugin(useGSAP);

const navLinks = [
  { href: "#about", label: "About", symbol: "✦" },
  { href: "#projects", label: "Projects", symbol: "✿" },
  { href: "#experience", label: "Experience", symbol: "✨" },
  { href: "#blog", label: "Blog", symbol: "✧" },
  { href: "#contact", label: "Contact", symbol: "♡" },
];

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState("#about");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isClickScrolling = useRef(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Smooth slide header entrance using fromTo to avoid React 19 strict mode opacity trap
  useGSAP(
    () => {
      if (!headerRef.current) return;
      gsap.fromTo(
        headerRef.current,
        { y: -50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          clearProps: "transform",
        }
      );
    },
    { scope: headerRef }
  );

  // Track scroll position to update active navbar section and header style
  useEffect(() => {
    const sectionIds = ["about", "projects", "experience", "blog", "contact"];

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (isClickScrolling.current) return;

      // When near bottom of page, activate contact
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100
      ) {
        setActiveSection("#contact");
        return;
      }

      // Check sections from bottom to top
      const sections = sectionIds
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null);

      for (let i = sections.length - 1; i >= 0; i--) {
        const rect = sections[i].getBoundingClientRect();
        // 140px offset accounts for fixed floating navbar
        if (rect.top <= 140) {
          setActiveSection(`#${sections[i].id}`);
          break;
        }
      }
    };

    const handleHashChange = () => {
      if (window.location.hash) {
        setActiveSection(window.location.hash);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("hashchange", handleHashChange);

    // Initial sync after mount without hydration mismatch or cascading render warning
    const frameId = requestAnimationFrame(() => {
      if (window.location.hash) {
        setActiveSection(window.location.hash);
      } else {
        handleScroll();
      }
    });

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, []);

  const handleNavClick = (href: string) => {
    setActiveSection(href);
    setMobileMenuOpen(false);

    // Keep active highlight steady during smooth scrolling
    isClickScrolling.current = true;
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 800);
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 pt-3 sm:pt-4 px-4 pointer-events-none transition-all duration-300"
    >
      <div
        className={`max-w-3xl lg:max-w-4xl mx-auto flex items-center justify-between pointer-events-auto rounded-full p-1.5 sm:p-2 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-xl border border-pink-200/80 shadow-lg shadow-pink-150/40"
            : "bg-white/70 backdrop-blur-xl border border-pink-200/60 shadow-sm shadow-pink-100/25"
        }`}
      >
        {/* Left: Minimalist Initial Monogram Logo "S." */}
        <a
          href="#about"
          onClick={() => handleNavClick("#about")}
          className="group flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-pink-50/90 hover:bg-pink-100/80 border border-pink-200/80 text-[#333333] transition-all duration-200 hover:scale-105 shrink-0 ml-1 cursor-pointer"
          aria-label="Home"
          title="Serlin"
        >
          <span className="font-extrabold text-sm sm:text-base tracking-tight group-hover:text-pink-600 transition-colors">
            S<span className="text-pink-500 font-black">.</span>
          </span>
        </a>

        {/* Center: Desktop Nav Links Pill Group */}
        <nav className="hidden md:flex items-center gap-1 bg-pink-50/50 p-1 rounded-full border border-pink-100/70">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer select-none flex items-center gap-1.5 ${
                  isActive
                    ? "bg-pink-500 text-white shadow-xs shadow-pink-300 font-bold scale-[1.02]"
                    : "text-[#4b5563] hover:text-pink-600 hover:bg-pink-100/50 font-medium"
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="text-[10px] text-pink-200 font-bold">
                    {link.symbol}
                  </span>
                )}
              </a>
            );
          })}
        </nav>

        {/* Right: Action Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-2 shrink-0 mr-1">
          <a
            href="#contact"
            onClick={() => handleNavClick("#contact")}
            className="hidden md:flex items-center gap-2 bg-pink-500 hover:bg-pink-600 active:scale-95 text-white font-semibold text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-md shadow-pink-200 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Resume</span>
            <span className="text-xs">✨</span>
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-full bg-pink-50 border border-pink-200/80 text-[#333333] hover:text-pink-600 hover:bg-pink-100/70 transition-all cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="w-4 h-4 text-pink-600" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu Dropdown - Floating Card */}
      {mobileMenuOpen && (
        <div className="md:hidden max-w-3xl mx-auto mt-2 pointer-events-auto bg-white/95 backdrop-blur-2xl border border-pink-200 rounded-3xl p-4 shadow-xl shadow-pink-150/40 transition-all animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`flex items-center justify-between text-sm font-semibold py-2.5 px-4 rounded-xl transition-all cursor-pointer ${
                    isActive
                      ? "text-pink-600 bg-pink-50 font-bold border border-pink-200"
                      : "text-[#333333] hover:text-pink-600 hover:bg-pink-50/60"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-pink-400 text-xs">{link.symbol}</span>
                    <span>{link.label}</span>
                  </div>
                  {isActive && (
                    <span className="text-xs text-pink-500 font-bold bg-white px-2 py-0.5 rounded-full border border-pink-200 shadow-2xs">
                      Active
                    </span>
                  )}
                </a>
              );
            })}
            <div className="pt-3 mt-2 border-t border-pink-100 flex flex-col gap-2">
              <a
                href="#contact"
                onClick={() => handleNavClick("#contact")}
                className="w-full flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold text-sm px-5 py-3 rounded-full shadow-md shadow-pink-200 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
                <span className="text-xs">✨</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
