import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "福仔日常相册",
  description: "一个用于记录福仔日常照片，并按上传日期分类展示的清新个人网站。",
};

function Navbar() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-[#F8D5C4] bg-[#F5F0E8]/88 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[#E8655A] text-sm font-black text-white shadow-[4px_4px_0_rgba(44,62,80,0.14)]">
            福
          </span>
          <span className="text-sm font-black text-slate-950">福仔日记</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/#gallery"
            className="hidden rounded-md px-3 py-2 text-sm font-bold text-slate-600 transition hover:bg-[#B5E5CF]/45 hover:text-emerald-800 sm:inline-flex"
          >
            相册
          </Link>
          <Link
            href="/#upload"
            className="xhs-button inline-flex h-9 items-center rounded-md px-4 text-sm font-bold text-white transition hover:-translate-y-0.5"
          >
            上传
          </Link>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#F8D5C4] bg-[#F5F0E8]">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between md:px-8">
        <p>© 2026 福仔日记 · 猫咪日常记录</p>
        <div className="flex gap-4">
          <Link className="font-semibold transition hover:text-rose-600" href="/#upload">
            上传照片
          </Link>
          <Link className="font-semibold transition hover:text-emerald-700" href="/#gallery">
            浏览时间线
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
