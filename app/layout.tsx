import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "徐子涵 | Frontend Engineer Resume",
  description:
    "徐子涵的前端工程师个人简历站，展示 React、TypeScript、工程化、性能优化与复杂业务系统开发经验。",
};

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#05070b]/75 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300 to-amber-200 text-sm font-black text-slate-950 shadow-lg shadow-cyan-950/30">
            X
          </div>
          <span className="text-sm font-black uppercase tracking-[0.22em] text-white">
            Xuzihan.dev
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#skills" className="text-sm font-semibold text-slate-400 transition-colors hover:text-cyan-200">
            Skills
          </a>
          <a href="#experience" className="text-sm font-semibold text-slate-400 transition-colors hover:text-cyan-200">
            Experience
          </a>
          <a href="#projects" className="text-sm font-semibold text-slate-400 transition-colors hover:text-cyan-200">
            Projects
          </a>
          <a href="#contact" className="text-sm font-semibold text-slate-400 transition-colors hover:text-cyan-200">
            Contact
          </a>
        </div>

        <a
          href="mailto:xzhjobweb@163.com"
          className="hidden rounded-full bg-white px-5 py-2 text-sm font-bold text-slate-950 transition-all hover:-translate-y-0.5 hover:bg-cyan-200 md:block"
        >
          Hire Me
        </a>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#05070b]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 text-sm text-slate-500 md:flex-row md:items-center md:justify-between lg:px-8">
        <p>© 2026 徐子涵 · Frontend Engineer Resume</p>
        <div className="flex gap-5">
          <a className="transition-colors hover:text-cyan-200" href="#skills">Skills</a>
          <a className="transition-colors hover:text-cyan-200" href="#experience">Experience</a>
          <a className="transition-colors hover:text-cyan-200" href="mailto:xzhjobweb@163.com">Email</a>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        {modal}
      </body>
    </html>
  );
}
