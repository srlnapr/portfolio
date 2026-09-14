"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface TimelineItem {
  period: string;
  title: string;
  company: string;
  companyColor: string;
  dotColor: string;
  dotBg: string;
  icon: string;
  type: "work" | "education";
  bullets: string[];
}

const timelineItems: TimelineItem[] = [
  {
    period: "Aug 2026 – Present",
    title: "SPARK ShopeePay Ambassador",
    company: "ShopeePay",
    companyColor: "text-orange-500",
    dotColor: "bg-orange-400",
    dotBg: "bg-orange-50",
    icon: "🛍️",
    type: "work",
    bullets: [
      "Representing the brand on campus, driving community engagement, and executing strategic promotional campaigns for digital payments.",
      "Collaborating with teams to organize on-ground activities and boost active platform adoption among students.",
    ],
  },
  {
    period: "Jun 2026 – Present",
    title: "Student Staff Akademik TUP",
    company: "Universitas Telkom Purwokerto",
    companyColor: "text-blue-500",
    dotColor: "bg-blue-400",
    dotBg: "bg-blue-50",
    icon: "🏫",
    type: "work",
    bullets: [
      "Assisting academic administration tasks, data management, and student service operations efficiently.",
      "Coordinating communication channels between students and academic faculty to ensure smooth workflow.",
    ],
  },
  {
    period: "Apr 2026 – Present",
    title: "MarketDay 4.0 – Staff Divisi Media Creative",
    company: "MarketDay Telkom University Purwokerto",
    companyColor: "text-purple-500",
    dotColor: "bg-purple-400",
    dotBg: "bg-purple-50",
    icon: "🎨",
    type: "work",
    bullets: [
      "Designing promotional and publication content for social media.",
      "Collaborating on visual identity and branding development.",
      "Creating engaging creative designs to boost participant awareness.",
    ],
  },
  {
    period: "Oct 2025 – Present",
    title: "Education AI",
    company: "Google Developer Groups On Campus – Telkom University Purwokerto",
    companyColor: "text-green-600",
    dotColor: "bg-green-400",
    dotBg: "bg-green-50",
    icon: "🤖",
    type: "work",
    bullets: [
      "Curriculum Development: Structuring modules and learning materials regarding Artificial Intelligence.",
      "Technical Mentoring: Facilitating learning sessions and breaking down complex AI concepts for members.",
      "Knowledge Sharing: Driving active interaction and enthusiasm among IT community members.",
    ],
  },
  {
    period: "Jul 2025 – Nov 2025",
    title: "Telu Leadermind Competition – Staff PDD",
    company: "Telu Leadermind Competition",
    companyColor: "text-pink-500",
    dotColor: "bg-pink-500",
    dotBg: "bg-pink-50",
    icon: "🏆",
    type: "work",
    bullets: [
      "Brand Identity: Developing official event logos reflecting the competition's core essence.",
      "Content Creation: Designing informative and engaging social media feed assets to maximize event awareness.",
    ],
  },
  {
    period: "Jul 2024 – Nov 2024",
    title: "Magang Digital Marketing",
    company: "Campus Digital",
    companyColor: "text-sky-500",
    dotColor: "bg-sky-400",
    dotBg: "bg-sky-50",
    icon: "📣",
    type: "work",
    bullets: [
      "Acting as social media content talent and managing digital marketing campaigns.",
      "Utilizing collaboration and design tools like Canva and Google Workspace.",
      "Performing content analytics and preparing evaluation reports.",
    ],
  },
  {
    period: "2025 – Present",
    title: "S1 Teknik Informatika",
    company: "Universitas Telkom Purwokerto",
    companyColor: "text-indigo-500",
    dotColor: "bg-indigo-400",
    dotBg: "bg-indigo-50",
    icon: "🎓",
    type: "education",
    bullets: [
      "Excellence Scholarship Recipient: Successfully secured a full merit-based scholarship.",
      "Focus: Actively expanding capacity in artificial intelligence, software engineering, and modern web development.",
    ],
  },
];

const achievements = [
  { emoji: "🎓", label: "Excellence Scholarship Recipient", symbol: "✦" },
  { emoji: "🤖", label: "GDGoC Education AI Member", symbol: "✨" },
  { emoji: "🛍️", label: "ShopeePay Campus Ambassador", symbol: "♡" },
  { emoji: "🎨", label: "Creative Media & Design", symbol: "✧" },
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // ── Left sticky header entrance ──────────────────────────────────────
      gsap.fromTo(
        ".exp-header",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".exp-header",
            // end is anchored to the BOTTOM of the whole section so the
            // text only reverses after the last card has left the screen
            endTrigger: sectionRef.current,
            start: "top 87%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // ── Timeline line: grows with scroll (scrub) ─────────────────────────
      // Set initial state
      gsap.set(".timeline-line", { scaleY: 0, transformOrigin: "top center" });
      gsap.to(".timeline-line", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top 80%",
          end: "bottom 60%",
          scrub: 0.6,
        },
      });

      // ── Per-card fade-up on scroll ───────────────────────────────────────
      // Each card gets its own ScrollTrigger so they reveal one-by-one
      const cards = gsap.utils.toArray<HTMLElement>(".timeline-item");
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 48, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              end: "top 20%",
              toggleActions: "play reverse play reverse",
            },
            delay: i === 0 ? 0.1 : 0,
          }
        );
      });

      // ── Achievement badges pop in ────────────────────────────────────────
      gsap.fromTo(
        ".achievement-badge",
        { y: 20, opacity: 0, scale: 0.88 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          duration: 0.5,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: ".achievements-container",
            start: "top 88%",
            end: "top 20%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // ── Badge hover (CSS-free scale pop) ────────────────────────────────
      const badges =
        sectionRef.current?.querySelectorAll<HTMLElement>(".achievement-badge");
      badges?.forEach((badge) => {
        const onEnter = () =>
          gsap.to(badge, { scale: 1.08, duration: 0.22, ease: "power2.out" });
        const onLeave = () =>
          gsap.to(badge, { scale: 1, duration: 0.22, ease: "power2.out" });
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
              A timeline of my campus journey — from ambassador roles and
              creative media, to AI communities and digital marketing.
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
          {/* Vertical line — grows via GSAP scrub */}
          <div className="absolute left-[19px] top-3 bottom-3 w-[2px] overflow-hidden rounded-full">
            <div className="timeline-line w-full h-full bg-gradient-to-b from-pink-300 via-pink-200 to-pink-100 will-change-transform" />
          </div>
          <div className="space-y-12">
            {timelineItems.map((item) => (
              <div
                key={item.period}
                className="timeline-item relative flex gap-8 items-start"
              >
                {/* Dot with icon */}
                <div className="flex flex-col items-center mt-1 relative z-10 shrink-0">
                  <div className={`w-9 h-9 rounded-full ${item.dotBg} border-4 border-white shadow-sm flex items-center justify-center text-base`}>
                    {item.icon}
                  </div>
                </div>
                {/* Card */}
                <div className="flex-1 bg-white rounded-2xl p-6 border border-pink-100 shadow-[0_4px_20px_rgb(244,114,182,0.05)] hover:shadow-[0_8px_30px_rgb(244,114,182,0.10)] hover:border-pink-200 transition-all duration-300">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="inline-block px-3 py-1 rounded-full bg-gray-50 text-gray-500 font-semibold text-[12px] border border-gray-200">
                      {item.period}
                    </span>
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        item.type === "education"
                          ? "bg-indigo-50 text-indigo-500 border border-indigo-100"
                          : "bg-pink-50 text-pink-500 border border-pink-100"
                      }`}
                    >
                      {item.type === "education" ? "Education" : "Work"}
                    </span>
                  </div>
                  <h3 className="font-semibold text-[18px] leading-[1.4] text-[#333333]">
                    {item.title}
                  </h3>
                  <div className={`font-semibold text-sm ${item.companyColor} mt-1 mb-4`}>
                    {item.company}
                  </div>
                  <ul className="space-y-2">
                    {item.bullets.map((bullet, i) => (
                      <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-gray-500">
                        <span className="text-pink-400 mt-[3px] shrink-0">✦</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="achievements-container">
          <h3 className="font-semibold text-xl leading-[1.4] text-[#333333] mb-6">
            Key Highlights &amp; Achievements
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
