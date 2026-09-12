"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Brain, Palette, Database } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const articles = [
  {
    icon: Brain,
    category: "AI Ethics",
    readTime: "5 min read",
    title: "The Human Element in LLM Fine-Tuning",
    description:
      "Examining subjective biases introduced during human-in-the-loop evaluation and methods for designing ethical alignment protocols.",
  },
  {
    icon: Palette,
    category: "Web Dev",
    readTime: "4 min read",
    title: "Bridging the Gap: Design Systems to Tailwind Components",
    description:
      "Practical strategies for structuring shared design tokens in Figma and compiling them reliably into modular Tailwind stylesheets.",
  },
  {
    icon: Database,
    category: "Data Eng",
    readTime: "6 min read",
    title: "Optimizing Data Pipelines for Real-time Dashboards",
    description:
      "Techniques for orchestrating low-latency aggregations and stream processing for instant client dashboard refreshes.",
  },
];

export default function BlogSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Section header
      gsap.from(".blog-header", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".blog-header",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Article cards stagger
      gsap.from(".blog-article", {
        x: -40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.18,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".blog-articles",
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });

      // Hover on articles
      const articles = sectionRef.current?.querySelectorAll(".blog-article");
      articles?.forEach((article) => {
        const onEnter = () =>
          gsap.to(article, {
            x: 6,
            boxShadow: "0 8px 30px rgb(244,114,182,0.12)",
            duration: 0.3,
            ease: "power2.out",
          });
        const onLeave = () =>
          gsap.to(article, {
            x: 0,
            boxShadow: "0 4px 20px rgb(244,114,182,0.05)",
            duration: 0.3,
            ease: "power2.out",
          });
        article.addEventListener("mouseenter", onEnter);
        article.addEventListener("mouseleave", onLeave);
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="blog" className="space-y-12">
      {/* Header */}
      <div className="blog-header flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-pink-50 border border-pink-100 shadow-sm">
            <span className="text-pink-400">✧</span>
            <span className="font-semibold text-[12px] text-pink-600 uppercase tracking-wider">
              04. Writing
            </span>
            <span className="text-pink-400">✦</span>
          </div>
          <div className="flex items-center gap-3">
            <h2 className="font-bold text-[32px] leading-[1.2] tracking-tight text-[#333333]">
              Blog &amp; <span className="text-pink-600">Publications</span>
            </h2>
            <span className="text-2xl select-none animate-pulse">📖</span>
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-pink-100/60 text-pink-600 font-semibold text-[11px] -rotate-2">
              ✍️ thoughts &amp; logs
            </span>
          </div>
        </div>
        <a
          href="#"
          className="font-semibold text-pink-500 flex items-center gap-1.5 hover:underline text-sm"
        >
          <span>View all on Medium</span>{" "}
          <span className="text-pink-400">✦</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>

      {/* Articles */}
      <div className="blog-articles flex flex-col gap-6">
        {articles.map((article) => (
          <article
            key={article.title}
            className="blog-article flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden border border-pink-100 shadow-[0_4px_20px_rgb(244,114,182,0.05)] cursor-pointer"
          >
            <div className="w-full md:w-64 h-32 md:h-auto bg-pink-50/80 flex items-center justify-center p-6 text-pink-400">
              <article.icon className="w-10 h-10" />
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-pink-500 font-semibold text-[10px] uppercase tracking-wider font-bold">
                  {article.category}
                </span>
                <span className="text-[12px] text-gray-400">
                  • {article.readTime}
                </span>
              </div>
              <h3 className="font-semibold text-xl leading-[1.4] text-[#333333] mb-2 hover:text-pink-500 transition-colors">
                {article.title}
              </h3>
              <p className="text-base leading-relaxed text-gray-500 line-clamp-2">
                {article.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
