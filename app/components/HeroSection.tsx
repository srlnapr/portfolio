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

const socialLinks = [
  { icon: Code, title: "GitHub", href: "#" },
  { icon: BadgeCheck, title: "LinkedIn", href: "#" },
  { icon: FileText, title: "Medium", href: "#" },
  { icon: Mail, title: "Email", href: "mailto:serlinaprilia32@gmail.com" },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewWorkBtnRef = useRef<HTMLAnchorElement>(null);
  const contactBtnRef = useRef<HTMLAnchorElement>(null);

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

        {/* Tech Badges */}
        <div className="flex flex-wrap gap-2 pt-1 items-center">
          {techBadges.map((badge) => (
            <span
              key={badge.label}
              className="hero-badge px-3.5 py-1.5 rounded-full bg-pink-50 text-pink-600 border border-pink-200 font-semibold text-[12px] flex items-center gap-1.5 shadow-sm hover:scale-105 transition-transform"
            >
              <span>{badge.emoji}</span> {badge.label}{" "}
              <span className="text-[10px] text-pink-400">✦</span>
            </span>
          ))}
        </div>

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

        {/* Social Icons */}
        <div className="flex items-center gap-4 pt-4">
          {socialLinks.map((link) => (
            <a
              key={link.title}
              href={link.href}
              title={link.title}
              className="hero-social w-10 h-10 rounded-full bg-white border border-pink-200 shadow-sm flex items-center justify-center text-gray-500 hover:text-pink-500 hover:border-pink-300 hover:scale-110 transition-all"
            >
              <link.icon className="w-[18px] h-[18px]" />
            </a>
          ))}
          <div className="hero-social ml-2 hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 text-pink-500 border border-pink-200 font-semibold text-[11px] shadow-sm">
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
              src="/profile.jpg"
              alt="Serlin - Developer & Data Practitioner"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
