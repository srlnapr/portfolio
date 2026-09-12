"use client";

import { useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ExternalLink, Code, ShoppingBag, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Project {
  category: string;
  categoryEmoji: string;
  title: string;
  description: string;
  techStack: string[];
  decorSymbol: string;
  buttonLabel: string;
  buttonEmoji: string;
  metric?: {
    type: "code" | "stat" | "progress" | "roc";
    lines?: string[];
    statLabel?: string;
    statSub?: string;
    statValue?: string;
    statEmoji?: string;
    progressLabel?: string;
    progressValue?: number;
    progressDisplay?: string;
  };
}

const projects: Project[] = [
  {
    category: "Web Development",
    categoryEmoji: "💻",
    title: "SaaS Analytics Dashboard",
    description:
      "Next-generation enterprise telemetry interface featuring responsive real-time analytics, modular widgets, and authentication.",
    techStack: ["Next.js", "Tailwind", "Supabase"],
    decorSymbol: "✦",
    buttonLabel: "View Project Demo",
    buttonEmoji: "✨",
    metric: {
      type: "code",
      lines: [
        "const metrics = await queryTelemetry({ interval: '1m' });",
        "return <AnalyticsGrid data={metrics} live={true} />;",
      ],
    },
  },
  {
    category: "Web Development",
    categoryEmoji: "🛍️",
    title: "E-Commerce Experience Hub",
    description:
      "Frictionless customer shopping flow with instant state synchronization, design tokens library, and optimized checkout.",
    techStack: ["React", "Node.js", "GraphQL"],
    decorSymbol: "♡",
    buttonLabel: "View Project Demo",
    buttonEmoji: "✨",
    metric: {
      type: "stat",
      statLabel: "Cart Conversion Rate",
      statSub: "Optimized micro-interactions",
      statValue: "+34.8%",
      statEmoji: "💖",
    },
  },
  {
    category: "Data & AI",
    categoryEmoji: "🤖",
    title: "Customer Sentiment & NLP Pipeline",
    description:
      "Distributed transformer pipeline processing customer reviews and conversational prompts with multi-class emotion tagging.",
    techStack: ["Python", "PyTorch", "Transformers"],
    decorSymbol: "✦",
    buttonLabel: "View Pipeline & Models",
    buttonEmoji: "🌸",
    metric: {
      type: "progress",
      progressLabel: "Model Accuracy Score",
      progressValue: 98,
      progressDisplay: "98.4%",
    },
  },
  {
    category: "Data & AI",
    categoryEmoji: "📈",
    title: "Predictive Churn Model & Visualizer",
    description:
      "End-to-end customer retention prediction service integrated with interactive feature attribution visualizer and FastAPI endpoints.",
    techStack: ["Pandas", "Scikit-learn", "FastAPI"],
    decorSymbol: "✧",
    buttonLabel: "View Project Details",
    buttonEmoji: "✨",
    metric: {
      type: "roc",
      statLabel: "ROC-AUC Performance",
      statSub: "Trained on 1.2M records",
      statValue: "0.942",
      statEmoji: "🎯",
    },
  },
];

function MetricBlock({ metric }: { metric: Project["metric"] }) {
  if (!metric) return null;

  if (metric.type === "code") {
    return (
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 font-mono text-[11px] text-gray-600 space-y-1">
        <div className="text-pink-600 font-bold">{metric.lines?.[0]}</div>
        <div>{metric.lines?.[1]}</div>
      </div>
    );
  }

  if (metric.type === "stat" || metric.type === "roc") {
    return (
      <div className="bg-pink-50/40 rounded-xl p-4 border border-pink-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center text-pink-600 ${
              metric.type === "stat"
                ? "bg-pink-100"
                : "bg-white border border-pink-200"
            }`}
          >
            {metric.type === "stat" ? (
              <ShoppingBag className="w-5 h-5" />
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            )}
          </div>
          <div>
            <div className="font-bold text-sm text-[#333333]">
              {metric.statLabel}
            </div>
            <div className="text-xs text-gray-500">{metric.statSub}</div>
          </div>
        </div>
        <span className="text-lg font-bold text-pink-600 flex items-center gap-1">
          {metric.statValue} <span className="text-xs">{metric.statEmoji}</span>
        </span>
      </div>
    );
  }

  if (metric.type === "progress") {
    return (
      <div className="bg-pink-50/50 rounded-xl p-4 border border-pink-50 flex flex-col justify-center">
        <div className="flex justify-between items-end mb-2">
          <span className="text-[10px] text-gray-500 font-bold uppercase flex items-center gap-1">
            <span>✨</span> {metric.progressLabel}
          </span>
          <span className="text-lg text-pink-600 font-bold">
            {metric.progressDisplay}
          </span>
        </div>
        <div className="w-full bg-white h-2 rounded-full overflow-hidden">
          <div
            className="progress-bar bg-pink-500 h-full rounded-full"
            style={{ width: 0 }}
            data-target-width={`${metric.progressValue}%`}
          />
        </div>
      </div>
    );
  }

  return null;
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Attach GSAP hover to each card via event delegation
  const handleCardEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = (e.target as HTMLElement).closest(".project-card");
    if (card) {
      gsap.to(card, {
        y: -8,
        boxShadow: "0 16px 40px rgb(244,114,182,0.18)",
        duration: 0.35,
        ease: "power2.out",
      });
    }
  }, []);

  const handleCardLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = (e.target as HTMLElement).closest(".project-card");
    if (card) {
      gsap.to(card, {
        y: 0,
        boxShadow: "0 8px 30px rgb(244,114,182,0.08)",
        duration: 0.35,
        ease: "power2.out",
      });
    }
  }, []);

  useGSAP(
    () => {
      // Section header entrance
      gsap.from(".projects-header", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".projects-header",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Project cards — scroll-triggered staggered fade-up
      gsap.from(".project-card", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".projects-grid",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Animate progress bars within cards when they scroll into view
      const progressBars = sectionRef.current?.querySelectorAll(".progress-bar");
      progressBars?.forEach((bar) => {
        const target = bar.getAttribute("data-target-width") || "0%";
        gsap.to(bar, {
          width: target,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bar,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      });

      // GSAP hover on "View Project" buttons
      const buttons = sectionRef.current?.querySelectorAll(".project-btn");
      buttons?.forEach((btn) => {
        const onEnter = () =>
          gsap.to(btn, {
            scale: 1.03,
            backgroundColor: "#fce7f3",
            duration: 0.25,
            ease: "power2.out",
          });
        const onLeave = () =>
          gsap.to(btn, {
            scale: 1,
            backgroundColor: "#fdf2f8",
            duration: 0.25,
            ease: "power2.out",
          });
        btn.addEventListener("mouseenter", onEnter);
        btn.addEventListener("mouseleave", onLeave);
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="projects" className="space-y-12">
      {/* Section Header */}
      <div className="projects-header flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-pink-50 border border-pink-100 shadow-sm">
            <span className="text-pink-400">✧</span>
            <span className="font-semibold text-[12px] text-pink-600 uppercase tracking-wider">
              02. Portfolio
            </span>
            <span className="text-pink-400">✦</span>
          </div>
          <div className="flex items-center gap-3">
            <h2 className="font-bold text-[32px] leading-[1.2] tracking-tight text-[#333333]">
              Featured{" "}
              <span className="relative inline-block text-pink-600">
                Projects
                <svg
                  className="absolute -bottom-1 left-0 w-full h-2.5 text-pink-300"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 120 10"
                >
                  <path
                    d="M2 7C30 1 70 8 118 4"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="3"
                  />
                </svg>
              </span>
            </h2>
            <span className="text-2xl select-none animate-pulse">🌸</span>
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-pink-100/60 text-pink-600 font-semibold text-[11px] rotate-2">
              ✨ handpicked
            </span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 p-1.5 bg-pink-50/50 rounded-full border border-pink-100 shadow-sm">
          <button className="px-4 py-1.5 rounded-full bg-white text-pink-600 shadow-sm font-semibold text-[12px] font-bold flex items-center gap-1 cursor-pointer">
            <span>✦</span> All
          </button>
          <button className="px-4 py-1.5 rounded-full text-gray-600 hover:text-pink-600 font-semibold text-[12px] cursor-pointer transition-colors">
            Web Dev
          </button>
          <button className="px-4 py-1.5 rounded-full text-gray-600 hover:text-pink-600 font-semibold text-[12px] cursor-pointer transition-colors">
            Data &amp; AI
          </button>
        </div>
      </div>

      {/* Project Cards Grid */}
      <div
        className="projects-grid grid grid-cols-1 md:grid-cols-2 gap-8"
        onMouseOver={handleCardEnter}
        onMouseOut={handleCardLeave}
      >
        {projects.map((project) => (
          <div
            key={project.title}
            className="project-card bg-white rounded-[2rem] p-8 border border-pink-100 shadow-[0_8px_30px_rgb(244,114,182,0.08)] flex flex-col justify-between transition-none"
          >
            <div className="space-y-4 relative">
              {/* Decorative symbol */}
              <div className="absolute -top-3 -right-2 text-pink-300 text-lg select-none font-bold">
                {project.decorSymbol}
              </div>

              {/* Category + Links */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-pink-50 text-pink-600 border border-pink-100 font-semibold text-[11px] font-bold uppercase flex items-center gap-1">
                    <span>{project.categoryEmoji}</span> {project.category}
                  </span>
                  <span className="text-[11px] text-pink-400">✧</span>
                </div>
                <div className="flex gap-2">
                  <ExternalLink className="w-[18px] h-[18px] text-gray-400 hover:text-pink-500 cursor-pointer transition-colors" />
                  <Code className="w-[18px] h-[18px] text-gray-400 hover:text-pink-500 cursor-pointer transition-colors" />
                </div>
              </div>

              {/* Title + Description */}
              <h3 className="font-semibold text-xl leading-[1.4] text-[#333333]">
                {project.title}
              </h3>
              <p className="text-base leading-relaxed text-gray-500">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-0.5 rounded-full bg-gray-50 text-gray-600 border border-gray-200 font-semibold text-[11px]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Metric Block */}
              <MetricBlock metric={project.metric} />
            </div>

            {/* CTA Button */}
            <div className="pt-6">
              <button className="project-btn w-full py-3 rounded-xl bg-pink-50 text-pink-600 font-semibold hover:bg-pink-100 flex items-center justify-center gap-2 shadow-sm cursor-pointer">
                {project.buttonLabel}{" "}
                <span className="text-pink-400">{project.buttonEmoji}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
