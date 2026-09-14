"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Code, BadgeCheck, FileText, Mail } from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(useGSAP);

const techBadges = [
  { emoji: "⚛️", label: "React" },
  { emoji: "🔷", label: "TypeScript" },
  { emoji: "🐍", label: "Python" },
  { emoji: "🔥", label: "PyTorch" },
  { emoji: "📊", label: "SQL" },
  { emoji: "🎨", label: "Tailwind" },
];

// Social sticker data — real links
interface SocialSticker {
  platform: string;
  href: string;
  bg: string;        // pill background
  border: string;    // pill border
  text: string;      // text / icon color
  glow: string;      // box-shadow on hover
  rotate: string;    // initial tilt
  floatDelay: number;
  icon: React.ReactNode;
}

const socialStickers: SocialSticker[] = [
  {
    platform: "Instagram",
    href: "https://instagram.com/serlinaprilia",
    bg: "bg-gradient-to-br from-fuchsia-50 to-pink-50",
    border: "border-pink-200",
    text: "text-pink-600",
    glow: "0 0 18px 4px rgba(236,72,153,0.22)",
    rotate: "-3deg",
    floatDelay: 0,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
  {
    platform: "LinkedIn",
    href: "https://linkedin.com/in/serlinaprilia",
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-600",
    glow: "0 0 18px 4px rgba(59,130,246,0.22)",
    rotate: "2deg",
    floatDelay: 0.4,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    platform: "GitHub",
    href: "https://github.com/serlinaprilia",
    bg: "bg-gray-50",
    border: "border-gray-200",
    text: "text-gray-700",
    glow: "0 0 18px 4px rgba(107,114,128,0.22)",
    rotate: "-1.5deg",
    floatDelay: 0.7,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
      </svg>
    ),
  },
];

// ─── SocialStickerBadge ────────────────────────────────────────────────────
function SocialStickerBadge({ sticker }: { sticker: SocialSticker }) {
  const ref = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    // Continuous float: each sticker has its own phase via floatDelay
    gsap.to(ref.current, {
      y: -8,
      duration: 2.2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: sticker.floatDelay,
    });

    // Hover: scale up + slight tilt + glow
    const el = ref.current;
    const onEnter = () =>
      gsap.to(el, {
        scale: 1.12,
        rotate: 4,
        duration: 0.25,
        ease: "power2.out",
        overwrite: "auto",
      });
    const onLeave = () =>
      gsap.to(el, {
        scale: 1,
        rotate: 0,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
  }, { scope: ref });

  return (
    <a
      ref={ref}
      href={sticker.href}
      target="_blank"
      rel="noopener noreferrer"
      title={sticker.platform}
      style={{
        transform: `rotate(${sticker.rotate})`,
        willChange: "transform",
      }}
      className={`
        hero-social inline-flex items-center gap-2
        px-4 py-2 rounded-full
        ${sticker.bg} ${sticker.border} border-2
        ${sticker.text}
        font-semibold text-[13px]
        shadow-md
        cursor-none
        transition-shadow duration-200
        hover:[box-shadow:var(--glow)]
      `}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = sticker.glow)}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "")}
    >
      {sticker.icon}
      <span>{sticker.platform}</span>
    </a>
  );
}

// ─── HeroSection ────────────────────────────────────────────────────────────
export default function HeroSection() {
  const sectionRef    = useRef<HTMLElement>(null);
  const viewWorkBtnRef = useRef<HTMLAnchorElement>(null);
  const contactBtnRef  = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.8 },
      });

      // 1) Section badge tags slide in
      tl.from(".hero-tags", {
        y: 30,
        opacity: 0,
        duration: 0.6,
      });

      // 2) Main heading slides up with a slight bounce
      tl.from(
        ".hero-heading",
        {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power4.out",
        },
        "-=0.3"
      );

      // 3) Bio paragraph
      tl.from(
        ".hero-bio",
        {
          y: 40,
          opacity: 0,
          duration: 0.7,
        },
        "-=0.5"
      );

      // 4) Tech badges stagger
      tl.from(
        ".hero-badge",
        {
          y: 20,
          opacity: 0,
          scale: 0.8,
          stagger: 0.06,
          duration: 0.5,
        },
        "-=0.4"
      );

      // 5) CTA buttons
      tl.from(
        ".hero-cta",
        {
          y: 30,
          opacity: 0,
          stagger: 0.12,
          duration: 0.6,
        },
        "-=0.3"
      );

      // 6) Social icons
      tl.from(
        ".hero-social",
        {
          y: 20,
          opacity: 0,
          stagger: 0.08,
          duration: 0.5,
        },
        "-=0.3"
      );

      // 7) Profile image — scale + rotation entrance
      tl.from(
        ".hero-profile",
        {
          scale: 0.85,
          rotate: -5,
          opacity: 0,
          duration: 1.2,
          ease: "power4.out",
        },
        "-=1.0"
      );

      // Floating decorations — continuous subtle animations
      gsap.to(".hero-sparkle", {
        y: -8,
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.3, from: "random" },
      });

      // Hover effects for CTA buttons
      const buttons = [viewWorkBtnRef.current, contactBtnRef.current];
      buttons.forEach((btn) => {
        if (!btn) return;
        const onEnter = () =>
          gsap.to(btn, {
            scale: 1.06,
            y: -2,
            duration: 0.3,
            ease: "power2.out",
          });
        const onLeave = () =>
          gsap.to(btn, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        btn.addEventListener("mouseenter", onEnter);
        btn.addEventListener("mouseleave", onLeave);
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mt-8"
    >
      {/* Text Content */}
      <div className="lg:col-span-7 space-y-8 order-2 lg:order-1 relative">
        {/* Tags Row */}
        <div className="hero-tags flex flex-wrap items-center gap-2.5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/70 border-2 border-pink-200 shadow-sm text-pink-600 font-semibold text-[12px] uppercase tracking-wider">
            <span>✨</span> 01. About Me <span>💖</span>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-pink-600 font-semibold text-[11px] font-bold -rotate-3 shadow-sm hover:scale-105 transition-transform">
            <span>🌸</span> <span>hello world!</span>{" "}
            <span className="text-xs text-pink-400">(੭˃ᴗ˂)੭</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-pink-200 text-pink-500 font-semibold text-[11px] rotate-2 shadow-sm hover:scale-105 transition-transform">
            <span>✨</span> available now{" "}
            <span className="text-[10px] text-pink-400">૮꒰ ˶• ༝ •˶꒱ა</span>
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100/50 border border-pink-200 text-pink-600 font-semibold text-[11px] -rotate-12 shadow-sm">
            <span>🧋</span> boba powered
          </span>
        </div>

        {/* Heading */}
        <div className="hero-heading relative">
          <div className="hero-sparkle absolute -top-7 -left-5 text-pink-400 text-2xl font-bold select-none">
            ✦
          </div>
          <div className="hero-sparkle absolute -top-4 right-8 text-pink-300 text-xl font-bold select-none">
            ✧
          </div>
          <div className="hero-sparkle absolute top-1/2 -right-6 text-pink-300 text-2xl select-none rotate-12 hidden md:block">
            🌸
          </div>
          <h1 className="text-[3rem] sm:text-[3.5rem] lg:text-[4.5rem] leading-[1.1] tracking-tight text-[#333333] font-extrabold relative">
            Serlin,{" "}
            <span className="relative inline-block text-pink-600">
              Multidisciplinary
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 text-pink-300"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 250 12"
              >
                <path
                  d="M3 8.5C50 2 100 11 150 4C200 11 230 5 247 7"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="3.5"
                />
              </svg>
            </span>{" "}
            Developer &amp; Data Practitioner.
            <span className="hero-sparkle inline-block text-pink-400 ml-2">♡</span>
          </h1>
        </div>

        {/* Bio */}
        <p className="hero-bio text-lg text-gray-600 max-w-2xl leading-relaxed">
          I design and develop responsive web platforms and robust machine learning
          pipelines. Bridging user-centric interfaces with deep data systems to
          solve real-world problems with elegance and precision.
        </p>


        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <a
            ref={viewWorkBtnRef}
            href="#projects"
            className="hero-cta inline-block bg-[#333333] text-white font-semibold text-sm px-8 py-4 rounded-full shadow-lg shadow-pink-100 items-center gap-2 border-2 border-transparent hover:border-pink-300 inline-flex"
          >
            View My Work <span className="text-pink-300">✦</span>{" "}
            <span className="text-xs">✨</span>
          </a>
          <a
            ref={contactBtnRef}
            href="#contact"
            className="hero-cta bg-pink-50 text-pink-600 border-2 border-pink-200 font-semibold text-sm px-8 py-4 rounded-full hover:bg-pink-100 flex items-center gap-2 shadow-sm shadow-pink-100"
          >
            Contact Me <span className="text-sm">💌 ⸝⸝</span>
          </a>
          <span className="hero-cta hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-pink-500 font-semibold text-[11px] rotate-2">
            <span>🎀</span> aesthetic coder
          </span>
        </div>

        {/* Social Sticker Badges */}
        <div className="flex flex-wrap items-center gap-3 pt-4">
          {socialStickers.map((s) => (
            <SocialStickerBadge key={s.platform} sticker={s} />
          ))}
          <div className="hero-social hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 text-pink-500 border border-pink-200 font-semibold text-[11px] shadow-sm">
            <span>(｡♥‿♥｡)</span> crafted with care <span>🌸</span>
          </div>
        </div>
      </div>

      {/* Profile Image */}
      <div className="hero-profile lg:col-span-5 order-1 lg:order-2">
        <div className="relative w-full aspect-square md:w-[450px] md:h-[450px] mx-auto">
          {/* Background shapes */}
          <div className="absolute inset-0 bg-pink-100 rounded-[2.5rem] transform rotate-3 scale-105 opacity-60 border-2 border-pink-200/50" />
          <div className="absolute inset-0 bg-pink-50 rounded-[2.5rem] transform -rotate-2 scale-100 opacity-70" />

          {/* Decorative washi tape */}
          <div className="absolute -top-3 left-12 z-30 w-24 h-6 bg-pink-200/80 backdrop-blur-sm border-t border-b border-pink-300 -rotate-6 shadow-sm rounded-sm flex items-center justify-center text-[10px] text-pink-600 font-bold uppercase tracking-wider">
            washi tape ♡
          </div>

          {/* Floating labels */}
          <div className="absolute -top-3 -right-3 z-30 bg-pink-500 text-white rounded-full px-3.5 py-1.5 font-semibold text-[11px] shadow-md flex items-center gap-1.5 rotate-6 hover:scale-105 transition-transform">
            <span>🎀</span> <span>creator</span>{" "}
            <span className="text-[10px]">✨</span>
          </div>
          <div className="absolute -bottom-4 -left-4 z-30 bg-white border-2 border-pink-200 text-pink-600 rounded-2xl px-4 py-2 shadow-lg flex items-center gap-2 -rotate-3 hover:scale-105 transition-transform">
            <span>🪄</span>{" "}
            <span className="font-semibold text-[12px] font-bold">
              creative mind
            </span>{" "}
            <span className="text-pink-400">✦</span>
          </div>
          <div className="absolute bottom-2 -right-2 z-30 bg-white border border-pink-200 text-pink-500 rounded-full px-3 py-1 shadow-md flex items-center gap-1 text-[11px] font-semibold -rotate-2">
            <span>🌸</span> <span>100% happy vibes</span>
          </div>

          {/* Sparkle decorations */}
          <div className="hero-sparkle absolute -top-6 -right-6 text-pink-300 text-2xl select-none">
            ⭐
          </div>
          <div className="hero-sparkle absolute -top-5 left-4 z-30 text-pink-400 text-2xl select-none">
            ✧
          </div>

          {/* Main image */}
          <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden bg-pink-50 z-10 shadow-[0_20px_50px_rgba(244,114,182,0.2)] border-4 border-white">
            <Image
              src="/serlin-profile.jpg"
              alt="Serlin - Developer & Data Practitioner"
              fill
              className="object-cover object-center scale-[1.5] origin-[53%_58%] transition-transform duration-500"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
