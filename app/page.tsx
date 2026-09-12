import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ProjectsSection from "./components/ProjectsSection";
import ExperienceSection from "./components/ExperienceSection";
import BlogSection from "./components/BlogSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen w-full relative overflow-x-clip bg-white">
      {/* Background decorations - Ambient gradients spanning seamlessly from top: 0 */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Top-left organic pink aura that smoothly covers behind the navbar and hero */}
        <div className="absolute -top-[12%] -left-[8%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] bg-pink-100/70 rounded-full blur-[130px] animate-pulse" />
        {/* Soft blush on right */}
        <div
          className="absolute top-[20%] -right-[10%] w-[50vw] h-[50vw] max-w-[650px] max-h-[650px] bg-pink-50 rounded-full blur-[140px] animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        {/* Mid left aura */}
        <div
          className="absolute top-[45%] -left-[10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-pink-100/40 rounded-full blur-[100px] animate-pulse"
          style={{ animationDelay: "4s" }}
        />
        {/* Lower right aura */}
        <div className="absolute top-[75%] -right-[5%] w-[45vw] h-[45vw] max-w-[550px] max-h-[550px] bg-pink-50/80 rounded-full blur-[120px]" />

        {/* Floating decorative symbols */}
        <div className="absolute top-[12%] right-[15%] text-pink-300 text-3xl font-bold select-none rotate-12">
          ✦
        </div>
        <div className="absolute top-[28%] left-[5%] text-pink-300 text-2xl font-bold select-none -rotate-12">
          ✧
        </div>
        <div className="absolute top-[48%] right-[8%] text-pink-300 text-4xl select-none rotate-45">
          ✿
        </div>
        <div className="absolute top-[68%] left-[8%] text-pink-300 text-3xl select-none -rotate-6">
          ♡
        </div>
        <div className="absolute top-[85%] right-[22%] text-pink-300 text-2xl select-none rotate-12">
          ✦
        </div>
      </div>

      <Header />
      <main className="w-full pt-24 sm:pt-28 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full space-y-32 py-16">
          <HeroSection />
          <ProjectsSection />
          <ExperienceSection />
          <BlogSection />
          <ContactSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
