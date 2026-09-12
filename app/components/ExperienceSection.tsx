"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const timelineItems = [
  {
    period: "2022 - Present",
    title: "Senior Creative Technologist / Frontend Lead",
    company: "TechNova Studio",
    companyColor: "text-pink-500",
    dotColor: "bg-pink-500",
    description:
      "Led frontend architecture and integrated AI-driven design systems into core application stacks, slashing developer prototyping cycles by 40%.",
  },
  {
    period: "2019 - 2022",
    title: "Data & Machine Learning Engineer",
    company: "DataSync Inc.",
    companyColor: "text-pink-400",
    dotColor: "bg-pink-400",
    description:
      "Engineered scalable data extraction pipelines, fine-tuned sentiment NLP models, and published low-latency inference services serving 500K+ monthly queries.",
  },
];

const achievements = [
  { emoji: "🏆", label: "AWS Certified Machine Learning", symbol: "✦" },
  { emoji: "🥇", label: "1st Place Hackathon 2023", symbol: "✨" },
  { emoji: "🎨", label: "Best UX Design Award", symbol: "♡" },
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Left sticky header entrance
      gsap.from(".exp-header", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".exp-header",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Timeline items slide in from right
      gsap.from(".timeline-item", {
        x: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.25,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Timeline line draws down
      gsap.from(".timeline-line", {
        scaleY: 0,
        transformOrigin: "top",
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Achievement badges pop in
      gsap.from(".achievement-badge", {
        y: 20,
        opacity: 0,
        scale: 0.85,
        stagger: 0.12,
        duration: 0.5,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: ".achievements-container",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Hover on achievement badges
      const badges = sectionRef.current?.querySelectorAll(".achievement-badge");
      badges?.forEach((badge) => {
        const onEnter = () =>
          gsap.to(badge, { scale: 1.08, duration: 0.25, ease: "power2.out" });
        const onLeave = () =>
          gsap.to(badge, { scale: 1, duration: 0.25, ease: "power2.out" });
        badge.addEventListener("mouseenter", onEnter);
        badge.addEventListener("mouseleave", onLeave);
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24"
    >
      {/* Left sticky header */}
      <div className="lg:col-span-4">
        <div className="sticky top-32">
          <div className="exp-header">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-pink-50 border border-pink-100 shadow-sm">
              <span className="text-pink-400">✧</span>
              <span className="font-semibold text-[12px] text-pink-600 uppercase tracking-wider">
                03. Career
              </span>
              <span className="text-pink-400">✦</span>
            </div>
            <h2 className="font-extrabold text-4xl lg:text-5xl text-[#333333] mb-6 relative leading-[1.1] tracking-tight">
              Experience &amp;
              <br />
              <span className="relative inline-block text-pink-600">
                Milestones
                <svg
                  className="absolute -bottom-1 left-0 w-full h-3 text-pink-300"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 160 12"
                >
                  <path
                    d="M3 8C45 2 95 10 157 5"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="3.5"
                  />
                </svg>
              </span>
              <span className="inline-block text-pink-400 text-2xl ml-2">✿</span>
            </h2>
            <p className="text-lg text-gray-500 mb-8 leading-relaxed">
              A timeline of my professional journey in engineering and machine
              learning.
            </p>
            <div className="hidden lg:flex flex-col gap-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-50 border border-pink-100 text-pink-600 font-semibold text-[11px] w-fit -rotate-2 shadow-sm">
                <span>🌱</span> constantly growing
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-pink-200 text-pink-500 font-semibold text-[11px] w-fit rotate-2 shadow-sm">
                <span>💖</span> built with care
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right timeline */}
      <div className="lg:col-span-8 space-y-16">
        <div className="timeline-container relative">
          <div className="timeline-line absolute left-[15px] top-2 bottom-2 w-[2px] bg-pink-100" />
          <div className="space-y-12">
            {timelineItems.map((item) => (
              <div
                key={item.period}
                className="timeline-item relative flex gap-8 items-start"
              >
                <div className="flex flex-col items-center mt-1 relative z-10">
                  <div className="w-8 h-8 rounded-full bg-pink-100 border-4 border-white shadow-sm flex items-center justify-center">
                    <div className={`w-2 h-2 rounded-full ${item.dotColor}`} />
                  </div>
                </div>
                <div className="flex-1 bg-white rounded-2xl p-6 border border-pink-100 shadow-[0_4px_20px_rgb(244,114,182,0.05)]">
                  <div className="inline-block px-3 py-1 rounded-full bg-gray-50 text-gray-500 font-semibold text-[12px] mb-2 border border-gray-200">
                    {item.period}
                  </div>
                  <h3 className="font-semibold text-xl leading-[1.4] text-[#333333]">
                    {item.title}
                  </h3>
                  <div
                    className={`font-semibold ${item.companyColor} mt-1 mb-3`}
                  >
                    {item.company}
                  </div>
                  <p className="text-base leading-relaxed text-gray-500">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="achievements-container">
          <h3 className="font-semibold text-xl leading-[1.4] text-[#333333] mb-6">
            Key Achievements &amp; Certifications
          </h3>
          <div className="flex flex-wrap gap-3">
            {achievements.map((a) => (
              <span
                key={a.label}
                className="achievement-badge px-4 py-2 bg-pink-50 text-pink-600 rounded-full font-semibold border border-pink-100 flex items-center gap-2 shadow-sm"
              >
                <span className="text-xs">{a.emoji}</span> {a.label}{" "}
                <span className="text-pink-400 text-xs">{a.symbol}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
