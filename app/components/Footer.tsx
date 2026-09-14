import { User, Code, FileText, AtSign } from "lucide-react";

const footerLinks = [
  { icon: User, title: "About", href: "#about" },
  { icon: Code, title: "Code", href: "#projects" },
  { icon: FileText, title: "Blog", href: "#blog" },
  { icon: AtSign, title: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-pink-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col md:flex-row items-center gap-2 text-center md:text-left">
          <p className="font-semibold text-[13px] text-gray-500">
            © 2026 helloserlin.id
          </p>
          <span className="hidden md:inline text-gray-300">•</span>
          <p className="text-[13px] text-gray-400">
            Designed &amp; built with passion in pastel pink
          </p>
        </div>
        <div className="flex items-center gap-6">
          {footerLinks.map((link) => (
            <a
              key={link.title}
              href={link.href}
              title={link.title}
              className="text-gray-400 hover:text-pink-500 transition-colors"
            >
              <link.icon className="w-[18px] h-[18px]" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
