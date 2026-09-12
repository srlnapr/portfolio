import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Serlin — Multidisciplinary Developer & Data Practitioner | helloserlin.id",
  description:
    "I design and develop responsive web platforms and robust machine learning pipelines. Bridging user-centric interfaces with deep data systems to solve real-world problems.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} antialiased`}>
      <body className="min-h-screen bg-white text-[#333333] font-[family-name:var(--font-plus-jakarta)]">
        {children}
      </body>
    </html>
  );
}
