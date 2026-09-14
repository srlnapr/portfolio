"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Mail,
  MapPin,
  CheckCircle,
  Send,
  Loader2,
  Copy,
  Check,
  Sparkles,
  ExternalLink,
} from "lucide-react";

const EMAILJS_SERVICE_ID = "service_25e38uy";
const EMAILJS_TEMPLATE_ID = "template_dve297g";
const EMAILJS_PUBLIC_KEY = "ZJJ-nG-YQe5a05MtL";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const sendBtnRef = useRef<HTMLButtonElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const [copiedEmail, setCopiedEmail] = useState(false);

  useGSAP(
    () => {
      // Whole contact card fades up
      gsap.from(".contact-card", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-card",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Left info items stagger
      gsap.from(".contact-info-item", {
        x: -30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".contact-card",
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      // Form fields stagger
      gsap.from(".contact-field", {
        y: 25,
        opacity: 0,
        stagger: 0.12,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".contact-form",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Send button hover
      const btn = sendBtnRef.current;
      if (btn) {
        const onEnter = () =>
          gsap.to(btn, {
            scale: 1.02,
            y: -2,
            duration: 0.25,
            ease: "power2.out",
          });
        const onLeave = () =>
          gsap.to(btn, {
            scale: 1,
            y: 0,
            duration: 0.25,
            ease: "power2.out",
          });
        btn.addEventListener("mouseenter", onEnter);
        btn.addEventListener("mouseleave", onLeave);
      }
    },
    { scope: sectionRef }
  );

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      errors.name = "Please enter your name.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = "Please enter your email address.";
    } else if (!emailPattern.test(formData.email.trim())) {
      errors.email = "Please enter a valid email address.";
    }

    if (!formData.message.trim()) {
      errors.message = "Please write a message.";
    } else if (formData.message.trim().length < 5) {
      errors.message = "Message should be at least 5 characters.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!validateForm()) return;
    if (!formRef.current) return;

    setStatus("submitting");

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      setStatus("success");
    } catch (err) {
      console.error("EmailJS error:", err);
      setErrorMsg(
        "Gagal mengirim pesan. Coba lagi atau hubungi langsung lewat email."
      );
      setStatus("error");
    }
  };

  const handleReset = () => {
    setFormData({ name: "", email: "", message: "" });
    setStatus("idle");
    setErrorMsg("");
    setFieldErrors({});
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("serlinaprilia32@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const mailtoUrl = `mailto:serlinaprilia32@gmail.com?subject=${encodeURIComponent(
    formData.name ? `Project Inquiry from ${formData.name}` : "Project Inquiry"
  )}&body=${encodeURIComponent(
    formData.message
      ? `${formData.message}\n\n— ${formData.name || "Sender"} (${formData.email || "No email provided"})`
      : ""
  )}`;

  return (
    <section ref={sectionRef} id="contact" className="pb-12">
      <div className="contact-card bg-white/90 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-pink-200/80 shadow-[0_8px_30px_rgb(244,114,182,0.1)] grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="contact-info-item inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 border border-pink-200/80 shadow-2xs">
            <span className="text-pink-400">✧</span>
            <span className="font-semibold text-[12px] text-pink-600 uppercase tracking-wider">
              05. Get In Touch
            </span>
            <span className="text-pink-400">💌</span>
          </div>
          <h2 className="contact-info-item font-extrabold text-3xl sm:text-4xl text-[#333333] leading-[1.15] tracking-tight">
            Let&apos;s build something <span className="text-pink-600">beautiful</span> together.
          </h2>
          <p className="contact-info-item text-gray-500 text-sm sm:text-base leading-relaxed">
            Have an interesting project, collaboration opportunity, or just want to say hi? Send me a message and I&apos;ll get back to you!
          </p>

          <div className="space-y-4 pt-2">
            {/* Email item with copy button & direct mailto link */}
            <div className="contact-info-item flex items-center justify-between p-3 rounded-2xl bg-pink-50/60 border border-pink-100 group transition-colors">
              <a
                href="mailto:serlinaprilia32@gmail.com"
                className="flex items-center gap-3 text-gray-700 hover:text-pink-600 transition-colors"
                title="Send email to serlinaprilia32@gmail.com"
              >
                <div className="w-10 h-10 rounded-full bg-white shadow-2xs border border-pink-100 flex items-center justify-center text-pink-500 group-hover:scale-105 transition-transform">
                  <Mail className="w-[18px] h-[18px]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400 font-medium">Direct Email</span>
                  <span className="font-bold text-sm text-[#333333] group-hover:text-pink-600 transition-colors">
                    serlinaprilia32@gmail.com
                  </span>
                </div>
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-gray-500 hover:text-pink-600 border border-pink-200/60 text-xs font-semibold shadow-2xs transition-all cursor-pointer"
                title="Copy email to clipboard"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-pink-500" />
                    <span className="text-pink-600 font-bold">Copied! ✨</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <div className="contact-info-item flex items-center gap-3 text-gray-600 p-2">
              <div className="w-10 h-10 rounded-full bg-pink-50 border border-pink-100 flex items-center justify-center text-pink-500 shrink-0">
                <MapPin className="w-[18px] h-[18px]" />
              </div>
              <div>
                <span className="text-xs text-gray-400 font-medium block">Location</span>
                <span className="font-semibold text-sm text-gray-700">
                  Purwokerto / Remote Worldwide
                </span>
              </div>
            </div>

            <div className="contact-info-item flex items-center gap-3 p-3 rounded-2xl bg-pink-50/70 border border-pink-200/80">
              <div className="w-9 h-9 rounded-full bg-white shadow-2xs flex items-center justify-center text-pink-500 shrink-0">
                <CheckCircle className="w-5 h-5 text-pink-500" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xs uppercase tracking-wider text-pink-600">
                  Status
                </span>
                <span className="font-semibold text-sm text-gray-800">
                  Available for new projects &amp; roles
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right form container */}
        <div className="contact-form lg:col-span-7 bg-pink-50/40 p-6 sm:p-8 rounded-3xl border border-pink-100 relative">
          {status === "success" ? (
            /* Success State Card */
            <div className="py-12 px-6 flex flex-col items-center text-center space-y-5 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-pink-100 border-2 border-pink-300 flex items-center justify-center text-pink-600 shadow-md shadow-pink-200/60 text-2xl">
                💌
              </div>
              <div className="space-y-2 max-w-md">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100/70 border border-pink-200 text-pink-600 text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Message Sent Successfully!</span>
                </div>
                <h3 className="font-extrabold text-2xl text-[#333333]">
                  Thank you, {formData.name || "friend"}!
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Your message has been delivered to <span className="font-semibold text-pink-600">serlinaprilia32@gmail.com</span>. I&apos;ll review it and get back to you as soon as possible!
                </p>
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-full bg-white hover:bg-pink-50 text-pink-600 font-semibold text-sm border border-pink-200 shadow-xs transition-all hover:scale-105 cursor-pointer"
                >
                  Send Another Message ✍️
                </button>
                <a
                  href={mailtoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-semibold text-sm shadow-md shadow-pink-200 transition-all hover:scale-105 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Open in Mail App</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ) : (
            /* Interactive Contact Form */
            <form ref={formRef} className="space-y-4" onSubmit={handleSubmit} noValidate>
              {status === "error" && errorMsg && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs sm:text-sm font-medium flex items-center justify-between gap-2">
                  <span>{errorMsg}</span>
                  <a
                    href={mailtoUrl}
                    className="underline text-red-700 font-semibold hover:text-red-800 whitespace-nowrap"
                  >
                    Open Mail App ↗
                  </a>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name field */}
                <div className="contact-field">
                  <label htmlFor="contact-name" className="block font-semibold text-xs text-gray-700 mb-1.5">
                    Your Name <span className="text-pink-500">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="from_name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: "" });
                    }}
                    placeholder="Jane Doe"
                    disabled={status === "submitting"}
                    className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-[#333333] transition-all focus:outline-none ${fieldErrors.name
                        ? "border-red-400 ring-2 ring-red-100"
                        : "border-pink-200/80 focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
                      }`}
                  />
                  {fieldErrors.name && (
                    <p className="text-[11px] text-red-500 mt-1 font-medium">{fieldErrors.name}</p>
                  )}
                </div>

                {/* Email field */}
                <div className="contact-field">
                  <label htmlFor="contact-email" className="block font-semibold text-xs text-gray-700 mb-1.5">
                    Email Address <span className="text-pink-500">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="from_email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: "" });
                    }}
                    placeholder="jane@example.com"
                    disabled={status === "submitting"}
                    className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-[#333333] transition-all focus:outline-none ${fieldErrors.email
                        ? "border-red-400 ring-2 ring-red-100"
                        : "border-pink-200/80 focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
                      }`}
                  />
                  {fieldErrors.email && (
                    <p className="text-[11px] text-red-500 mt-1 font-medium">{fieldErrors.email}</p>
                  )}
                </div>
              </div>

              {/* Message field */}
              <div className="contact-field">
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="contact-message" className="block font-semibold text-xs text-gray-700">
                    Message <span className="text-pink-500">*</span>
                  </label>
                  <span className="text-[11px] text-gray-400">
                    {formData.message.length} characters
                  </span>
                </div>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (fieldErrors.message) setFieldErrors({ ...fieldErrors, message: "" });
                  }}
                  placeholder="Tell me about your project, timeline, or just say hello..."
                  disabled={status === "submitting"}
                  className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-[#333333] resize-none transition-all focus:outline-none ${fieldErrors.message
                      ? "border-red-400 ring-2 ring-red-100"
                      : "border-pink-200/80 focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
                    }`}
                />
                {fieldErrors.message && (
                  <p className="text-[11px] text-red-500 mt-1 font-medium">{fieldErrors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                ref={sendBtnRef}
                type="submit"
                disabled={status === "submitting"}
                className="w-full py-3.5 sm:py-4 bg-pink-500 hover:bg-pink-600 disabled:opacity-75 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl transition-all shadow-md shadow-pink-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending message...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <span className="text-sm">💌</span>
                    <span className="text-pink-200">✨</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Quick mailto alternative */}
              <div className="pt-2 text-center">
                <a
                  href={mailtoUrl}
                  className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-pink-600 transition-colors font-medium cursor-pointer"
                >
                  <span>Prefer your mail client? Open direct email</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
