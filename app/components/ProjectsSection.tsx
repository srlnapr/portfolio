"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ExternalLink,
  Code,
  ShoppingBag,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Recycle,
  CheckCircle,
  XCircle,
  Search,
  Radar,
  Database,
  TrendingUp,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Project {
  category: string;
  categoryEmoji: string;
  badgeTag?: string;
  title: string;
  description: string;
  techStack: string[];
  decorSymbol: string;
  buttonLabel: string;
  buttonEmoji: string;
  liveUrl?: string;
  githubUrl?: string;
  kaggleUrl?: string;
  metric?: {
    type:
      | "code"
      | "stat"
      | "progress"
      | "roc"
      | "highlight"
      | "skincare"
      | "waste"
      | "news"
      | "maritime"
      | "scraper"
      | "sales";
    lines?: string[];
    statLabel?: string;
    statSub?: string;
    statValue?: string;
    statEmoji?: string;
    progressLabel?: string;
    progressValue?: number;
    progressDisplay?: string;
    highlightTitle?: string;
    highlightBadge?: string;
    barrierSafety?: string;
    conflictAlert?: string;
    checkUrl?: string;
  };
}

const projects: Project[] = [
  {
    category: "Web Development",
    categoryEmoji: "💻",
    badgeTag: "Platform Rekomendasi Jurusan Berbasis AI",
    title: "NextEdu (Jurusanku)",
    description:
      "Discover ideal majors based on interests and plan your future education and career accurately using an active AI expert system.",
    techStack: ["Next.js", "Tailwind CSS", "AI Expert System"],
    decorSymbol: "✦",
    buttonLabel: "View Project Demo",
    buttonEmoji: "✨",
    liveUrl: "https://nextedu-v3.vercel.app/",
    githubUrl: "https://github.com/srlnapr/nextedu-v3",
    metric: {
      type: "highlight",
      highlightTitle: "Temukan jurusanmu sekarang",
      highlightBadge: "Sistem Pakar AI Aktif",
    },
  },
  {
    category: "Web Development",
    categoryEmoji: "💻",
    badgeTag: "AI-Powered Skincare Intelligence",
    title: "Routicare",
    description:
      "Your AI Skincare Routine Analyst. Routicare uses computer vision and dermatologist-trained AI models to decode daily products, identify harmful ingredient conflicts, and optimize layering for your unique skin barrier.",
    techStack: ["Next.js", "AI / Computer Vision", "Tailwind CSS"],
    decorSymbol: "♡",
    buttonLabel: "View Project Demo",
    buttonEmoji: "✨",
    liveUrl: "https://routicare.vercel.app/",
    githubUrl: "https://github.com/srlnapr/routicare",
    metric: {
      type: "skincare",
      barrierSafety: "Barrier Safety: 98% Match",
      conflictAlert: "Retinol + AHA - High Conflict",
    },
  },
  {
    category: "Data & AI",
    categoryEmoji: "🛰️",
    badgeTag: "GEMASTIK 2026 • Maritime AI Agent",
    title: "Dark Vessel Detection & Autonomous Patrol Agent",
    description:
      "Autonomous maritime surveillance system combining SAR satellite imagery and AIS data to detect illegal fishing (dark vessels) in Indonesia's EEZ. Features Unsupervised Isolation Forest, XGBoost anomaly scoring, and a LangGraph autonomous patrol agent for real-time threat reporting.",
    techStack: [
      "Python",
      "LangGraph",
      "XGBoost",
      "Isolation Forest",
      "GeoPandas",
      "Folium",
    ],
    decorSymbol: "✦",
    buttonLabel: "Explore Kaggle Notebook",
    buttonEmoji: "📓",
    liveUrl: "https://www.kaggle.com/code/serlinapriliakaggle/darkvesseldetection",
    kaggleUrl: "https://www.kaggle.com/code/serlinapriliakaggle/darkvesseldetection",
    metric: {
      type: "maritime",
    },
  },
  {
    category: "Data & AI",
    categoryEmoji: "💼",
    badgeTag: "Automated Data Pipeline • Job Market Intelligence",
    title: "Job Market Data Scraper & Career Analytics",
    description:
      "Automated multi-page web scraping and data pipeline leveraging Jobstreet's enterprise search API to collect fresh graduate hiring trends. Extracts role specifications, companies, locations, work types, and salary distributions into structured datasets for market intelligence.",
    techStack: [
      "Python",
      "BeautifulSoup4",
      "Requests API",
      "Pandas",
      "Data Pipeline",
      "EDA",
    ],
    decorSymbol: "✧",
    buttonLabel: "Explore Kaggle Notebook",
    buttonEmoji: "📓",
    liveUrl: "https://www.kaggle.com/code/serlinapriliakaggle/scrapingdatajob",
    kaggleUrl: "https://www.kaggle.com/code/serlinapriliakaggle/scrapingdatajob",
    metric: {
      type: "scraper",
    },
  },
  {
    category: "Data & AI",
    categoryEmoji: "📈",
    badgeTag: "SPARC 2026 • Sales Intelligence ML",
    title: "Customer Repeat Order Prediction & Sales Strategy",
    description:
      "Predictive machine learning model developed for SPARC 2026 competition to forecast customer repeat purchase probability and prioritize high-value follow-ups. Employs LightGBM with Optuna Bayesian hyperparameter tuning, Stratified K-Fold validation, and SHAP explainability.",
    techStack: [
      "Python",
      "LightGBM",
      "Optuna",
      "SHAP",
      "Scikit-Learn",
      "Stratified K-Fold",
    ],
    decorSymbol: "♡",
    buttonLabel: "Explore Kaggle Notebook",
    buttonEmoji: "📓",
    liveUrl: "https://www.kaggle.com/code/serlinapriliakaggle/notebookdatasales",
    kaggleUrl: "https://www.kaggle.com/code/serlinapriliakaggle/notebookdatasales",
    metric: {
      type: "sales",
    },
  },
];

const filterCategories = [
  { id: "all", label: "All", symbol: "✦" },
  { id: "Web Development", label: "Web Dev", symbol: "💻" },
  { id: "Data & AI", label: "Data & AI", symbol: "🤖" },
];

function MetricBlock({ metric }: { metric: Project["metric"] }) {
  if (!metric) return null;

  if (metric.type === "highlight") {
    return (
      <div className="bg-pink-50/40 rounded-xl p-4 border border-pink-100 flex items-center justify-between h-[76px] gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-pink-100 border border-pink-200/60 flex items-center justify-center text-pink-600 shrink-0 shadow-2xs">
            <Sparkles className="w-5 h-5 text-pink-500" />
          </div>
          <div className="min-w-0">
            <div className="font-bold text-sm sm:text-[15px] text-[#333333] truncate">
              &ldquo;{metric.highlightTitle}&rdquo;
            </div>
          </div>
        </div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-pink-100/90 border border-pink-200 text-pink-600 text-[11px] font-bold shrink-0 shadow-2xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
          </span>
          <span className="whitespace-nowrap">{metric.highlightBadge}</span>
        </div>
      </div>
    );
  }

  if (metric.type === "skincare") {
    return (
      <div className="bg-pink-50/40 rounded-xl p-2 sm:p-2.5 border border-pink-100 flex items-center justify-between gap-2 h-[76px]">
        {/* Barrier Safety Badge */}
        <div className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg bg-white border border-pink-200/80 shadow-2xs min-w-0 flex-1 h-full">
          <div className="w-7 h-7 rounded-md bg-pink-100/80 text-pink-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] text-pink-400 font-semibold uppercase tracking-wider">Safety Index</div>
            <div className="text-xs sm:text-[12.5px] font-bold text-pink-700 truncate">
              {metric.barrierSafety || "Barrier Safety: 98% Match"}
            </div>
          </div>
        </div>

        {/* Conflict Alert Badge */}
        <div className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg bg-white border border-rose-200/80 shadow-2xs min-w-0 flex-1 h-full">
          <div className="w-7 h-7 rounded-md bg-rose-100/80 text-rose-500 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-4 h-4 text-rose-500 animate-pulse" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] text-rose-500 font-semibold uppercase tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping inline-block"></span>
              Conflict Alert
            </div>
            <div className="text-xs sm:text-[12.5px] font-bold text-rose-700 truncate">
              {metric.conflictAlert || "Retinol + AHA - High Conflict"}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (metric.type === "waste") {
    return (
      <div className="bg-pink-50/40 rounded-xl p-3 sm:p-3.5 border border-pink-100 flex items-center justify-between h-[76px] gap-3">
        {/* Left: Illustration + Hero Text */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-pink-100 border border-pink-200/70 flex items-center justify-center text-pink-600 shrink-0 shadow-2xs">
            <Recycle className="w-5 h-5 text-pink-500" />
          </div>
          <div className="min-w-0">
            <div className="font-bold text-sm sm:text-[15px] text-[#333333] truncate">
              &ldquo;{metric.highlightTitle || "Kelola Sampahmu"}&rdquo;
            </div>
            <div className="text-[11px] text-gray-500 truncate">
              Pemilahan Cerdas AI
            </div>
          </div>
        </div>

        {/* Right: Active System Indicator for Organik & Anorganik */}
        <div className="flex flex-col items-end gap-1 shrink-0">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pink-100/90 border border-pink-200 text-pink-700 text-[10.5px] font-bold shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
            </span>
            <span>Sistem Aktif</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] font-bold text-gray-600">
            <span className="px-1.5 py-0.5 rounded-md bg-white border border-pink-200/80 text-pink-600 shadow-2xs">
              Organik
            </span>
            <span className="text-pink-300">&</span>
            <span className="px-1.5 py-0.5 rounded-md bg-white border border-pink-200/80 text-pink-600 shadow-2xs">
              Anorganik
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (metric.type === "maritime") {
    return (
      <div className="bg-pink-50/40 rounded-xl p-3 sm:p-3.5 border border-pink-100 flex items-center justify-between h-[76px] gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-pink-100 border border-pink-200/70 flex items-center justify-center text-pink-600 shrink-0 shadow-2xs">
            <Radar className="w-5 h-5 text-pink-500" />
          </div>
          <div className="min-w-0">
            <div className="font-bold text-sm sm:text-[14.5px] text-[#333333] truncate">
              &ldquo;LangGraph Patrol Agent&rdquo;
            </div>
            <div className="text-[11px] text-gray-500 truncate flex items-center gap-1.5">
              <span>Isolation Forest + XGBoost</span>
              <span className="text-pink-300">•</span>
              <span className="text-pink-600 font-semibold">SAR / ZEE</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1 shrink-0">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pink-100/90 border border-pink-200 text-pink-700 text-[10.5px] font-bold shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
            </span>
            <span>Agent Active</span>
          </div>
          <div className="text-[10px] font-bold text-gray-600 px-2 py-0.5 rounded-md bg-white border border-pink-200/80 shadow-2xs">
            Threat Alerting 🚨
          </div>
        </div>
      </div>
    );
  }

  if (metric.type === "scraper") {
    return (
      <div className="bg-pink-50/40 rounded-xl p-3 sm:p-3.5 border border-pink-100 flex items-center justify-between h-[76px] gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-pink-100 border border-pink-200/70 flex items-center justify-center text-pink-600 shrink-0 shadow-2xs">
            <Database className="w-5 h-5 text-pink-500" />
          </div>
          <div className="min-w-0">
            <div className="font-bold text-sm sm:text-[14.5px] text-[#333333] truncate">
              &ldquo;Jobstreet API Extraction&rdquo;
            </div>
            <div className="text-[11px] text-gray-500 truncate">
              Multi-page Paginated Pipeline
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1 shrink-0">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pink-100/90 border border-pink-200 text-pink-700 text-[10.5px] font-bold shadow-2xs">
            <Sparkles className="w-3 h-3 text-pink-500" />
            <span>Automated</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] font-bold text-gray-600">
            <span className="px-1.5 py-0.5 rounded-md bg-white border border-pink-200/80 text-pink-600 shadow-2xs">
              Role &amp; Salary
            </span>
            <span className="px-1.5 py-0.5 rounded-md bg-white border border-pink-200/80 text-pink-600 shadow-2xs">
              EDA
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (metric.type === "sales") {
    return (
      <div className="bg-pink-50/40 rounded-xl p-3 sm:p-3.5 border border-pink-100 flex items-center justify-between h-[76px] gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-pink-100 border border-pink-200/70 flex items-center justify-center text-pink-600 shrink-0 shadow-2xs">
            <TrendingUp className="w-5 h-5 text-pink-500" />
          </div>
          <div className="min-w-0">
            <div className="font-bold text-sm sm:text-[14.5px] text-[#333333] truncate">
              &ldquo;Optuna + SHAP Explainable AI&rdquo;
            </div>
            <div className="text-[11px] text-gray-500 truncate">
              LightGBM Repeat Order ML
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1 shrink-0">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pink-100/90 border border-pink-200 text-pink-700 text-[10.5px] font-bold shadow-2xs">
            <span className="text-xs">🏆</span>
            <span>SPARC 2026</span>
          </div>
          <div className="text-[10px] font-bold text-pink-600 px-2 py-0.5 rounded-md bg-white border border-pink-200/80 shadow-2xs">
            Stratified K-Fold
          </div>
        </div>
      </div>
    );
  }

  if (metric.type === "news") {
    return (
      <div className="bg-pink-50/40 rounded-xl p-3 sm:p-3.5 border border-pink-100 flex items-center justify-between h-[76px] gap-2">
        {/* Left: Classification status indicators */}
        <div className="flex flex-col justify-center min-w-0">
          <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-1">
            Status Klasifikasi
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold shadow-2xs">
              <CheckCircle className="w-3 h-3 text-blue-500" />
              Beneran
            </span>
            <span className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold shadow-2xs">
              <XCircle className="w-3 h-3 text-rose-500" />
              Bohongan
            </span>
          </div>
        </div>

        {/* Right: Action button "Cek Berita Sekarang" */}
        <a
          href={metric.checkUrl || "https://fakenews-classification.vercel.app/"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl bg-white hover:bg-pink-50 text-pink-600 border border-pink-200/90 text-xs font-bold shadow-2xs shrink-0 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
        >
          <Search className="w-3.5 h-3.5 text-pink-500" />
          <span className="whitespace-nowrap">Cek Berita Sekarang</span>
        </a>
      </div>
    );
  }

  if (metric.type === "code") {
    return (
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 font-mono text-[11px] text-gray-600 space-y-1 h-[76px] flex flex-col justify-center">
        <div className="text-pink-600 font-bold truncate">{metric.lines?.[0]}</div>
        <div className="truncate">{metric.lines?.[1]}</div>
      </div>
    );
  }

  if (metric.type === "stat" || metric.type === "roc") {
    return (
      <div className="bg-pink-50/40 rounded-xl p-4 border border-pink-100 flex items-center justify-between h-[76px]">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center text-pink-600 shrink-0 ${
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
        <span className="text-lg font-bold text-pink-600 flex items-center gap-1 shrink-0">
          {metric.statValue} <span className="text-xs">{metric.statEmoji}</span>
        </span>
      </div>
    );
  }

  if (metric.type === "progress") {
    return (
      <div className="bg-pink-50/50 rounded-xl p-4 border border-pink-50 flex flex-col justify-center h-[76px]">
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
            className="progress-bar bg-pink-500 h-full rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${metric.progressValue}%` }}
          />
        </div>
      </div>
    );
  }

  return null;
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const isMatchCategory = (project: Project, filterId: string) => {
    if (filterId === "all") return true;
    if (filterId === "Web Development") {
      return project.category === "Web Development";
    }
    if (filterId === "Data & AI") {
      return (
        project.category === "Data & AI" ||
        project.category.includes("AI") ||
        project.category.includes("Data")
      );
    }
    return project.category === filterId;
  };

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((p) => isMatchCategory(p, selectedCategory));

  // Smooth entrance when switching filter category
  useGSAP(
    () => {
      gsap.fromTo(
        ".project-card",
        { opacity: 0, y: 16, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.35,
          stagger: 0.08,
          ease: "power2.out",
          clearProps: "all",
        }
      );
    },
    { scope: gridRef, dependencies: [selectedCategory] }
  );

  // Scroll entrance animation
  useGSAP(
    () => {
      // ── Section header ────────────────────────────────────────────────────
      gsap.fromTo(
        ".projects-header",
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-header",
            start: "top 87%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );

      // ── Project cards: per-card reveal (fade + scale + stagger) ──────────
      // Each card gets its own ScrollTrigger so they reveal one-by-one
      const cards = gsap.utils.toArray<HTMLElement>(".project-card");
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
            delay: i * 0.08,          // stagger via delay offset
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="projects" className="space-y-12">
      {/* Section Header */}
      <div className="projects-header flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-pink-50 border border-pink-200/80 shadow-2xs">
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
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-pink-100/60 text-pink-600 font-semibold text-[11px] rotate-2 shadow-2xs">
              ✨ handpicked
            </span>
          </div>
        </div>

        {/* Interactive Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1.5 bg-pink-50/60 rounded-full border border-pink-200/80 shadow-xs">
          {filterCategories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            const count =
              cat.id === "all"
                ? projects.length
                : projects.filter((p) => isMatchCategory(p, cat.id)).length;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 sm:px-4 py-1.5 rounded-full font-semibold text-xs transition-all duration-200 flex items-center gap-1.5 cursor-pointer select-none ${
                  isActive
                    ? "bg-white text-pink-600 shadow-sm font-bold border border-pink-200/80 scale-[1.02]"
                    : "text-gray-600 hover:text-pink-600 hover:bg-pink-100/50"
                }`}
              >
                <span>{cat.symbol}</span>
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    isActive
                      ? "bg-pink-100/80 text-pink-600"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Project Cards Grid */}
      <div
        ref={gridRef}
        className="projects-grid grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {filteredProjects.map((project) => (
          <div
            key={project.title}
            className="project-card group bg-white rounded-[2rem] p-8 border border-pink-100 hover:border-pink-200 shadow-[0_8px_30px_rgb(244,114,182,0.08)] hover:shadow-[0_20px_45px_rgb(244,114,182,0.18)] hover:-translate-y-2 transition-all duration-300 ease-out flex flex-col justify-between"
          >
            <div className="space-y-4 relative flex-1 flex flex-col">
              {/* Decorative symbol */}
              <div className="absolute -top-3 -right-2 text-pink-300 text-lg select-none font-bold">
                {project.decorSymbol}
              </div>

              {/* Category + Links */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full bg-pink-50 text-pink-600 border border-pink-100 font-bold text-[11px] uppercase flex items-center gap-1.5 shadow-2xs">
                    <span>{project.categoryEmoji}</span> {project.category}
                  </span>
                  {project.badgeTag && (
                    <span className="px-2.5 py-0.5 rounded-full bg-pink-100/70 text-pink-700 border border-pink-200/80 font-semibold text-[10.5px]">
                      {project.badgeTag}
                    </span>
                  )}
                  <span className="text-[11px] text-pink-400">✧</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {project.kaggleUrl && (
                    <a
                      href={project.kaggleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Kaggle Notebook"
                      className="p-1.5 rounded-lg text-gray-400 hover:text-pink-500 hover:bg-pink-50 transition-colors cursor-pointer"
                    >
                      <svg
                        className="w-[18px] h-[18px]"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.178c-.234 0-.351-.117-.351-.352V.352C4.827.117 4.944 0 5.178 0h2.758c.234 0 .351.117.351.352v14.053l6.467-6.847c.14-.141.304-.212.492-.212h3.28c.164 0 .258.07.281.212.023.094-.023.211-.141.352l-5.6 5.864 5.952 9.734c.094.14.141.258.141.351z" />
                      </svg>
                    </a>
                  )}
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={project.kaggleUrl ? "Open Kaggle Notebook" : "Live Demo"}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-pink-500 hover:bg-pink-50 transition-colors cursor-pointer"
                    >
                      <ExternalLink className="w-[18px] h-[18px]" />
                    </a>
                  ) : null}
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="GitHub Repository"
                      className="p-1.5 rounded-lg text-gray-400 hover:text-pink-500 hover:bg-pink-50 transition-colors cursor-pointer"
                    >
                      <svg
                        className="w-[18px] h-[18px]"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        />
                      </svg>
                    </a>
                  ) : null}
                </div>
              </div>

              {/* Title + Description */}
              <div>
                <h3 className="font-semibold text-xl leading-[1.4] text-[#333333] group-hover:text-pink-600 transition-colors">
                  {project.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-gray-500">
                  {project.description}
                </p>
              </div>

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
              <div className="mt-auto pt-2">
                <MetricBlock metric={project.metric} />
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-6">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-btn w-full py-3 rounded-xl bg-pink-50 text-pink-600 font-semibold hover:bg-pink-100 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer group-hover:bg-pink-100/70"
                >
                  {project.kaggleUrl ? (
                    <svg
                      className="w-4 h-4 text-pink-500 shrink-0"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.178c-.234 0-.351-.117-.351-.352V.352C4.827.117 4.944 0 5.178 0h2.758c.234 0 .351.117.351.352v14.053l6.467-6.847c.14-.141.304-.212.492-.212h3.28c.164 0 .258.07.281.212.023.094-.023.211-.141.352l-5.6 5.864 5.952 9.734c.094.14.141.258.141.351z" />
                    </svg>
                  ) : null}
                  <span>{project.buttonLabel}</span>
                  <span className="text-pink-400">{project.buttonEmoji}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ) : (
                <button
                  type="button"
                  className="project-btn w-full py-3 rounded-xl bg-pink-50 text-pink-600 font-semibold hover:bg-pink-100 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer group-hover:bg-pink-100/70"
                >
                  <span>{project.buttonLabel}</span>
                  <span className="text-pink-400">{project.buttonEmoji}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
