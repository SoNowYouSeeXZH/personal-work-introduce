import Link from "next/link";
import { knowledgeNotes } from "../lib/knowledge-notes";

export const metadata = {
  title: "知识日记 | 福仔日记",
  description: "整理学习中的新发现、实践记录和个人思考。",
};

export default function NotesPage() {
  return (
    <main className="xhs-shell min-h-screen px-5 pb-20 pt-28 md:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="notes-hero mb-12 rounded-lg border border-[#B7DCEB] px-6 py-10 md:px-12 md:py-14">
          <p className="xhs-section-label">福仔知识日记</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-slate-950 md:text-6xl">
            一边记录福仔，<span className="xhs-highlight">一边弄懂世界</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
            这里放学习笔记、实践记录和还在慢慢想清楚的事情。每一篇都从一个具体问题开始。
          </p>
        </header>

        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="xhs-section-label">最近学到的</p>
            <h2 className="mt-3 text-3xl font-black text-slate-950">知识日记</h2>
          </div>
          <span className="xhs-pill bg-[#D5C6E0]/70 text-sm font-bold text-slate-700">
            {knowledgeNotes.length} 篇记录
          </span>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {knowledgeNotes.map((note) => (
            <Link key={note.slug} href={`/notes/${note.slug}`} className="note-card group">
              <div className="flex items-center justify-between gap-3">
                <span className="xhs-pill bg-[#A8D8EA]/75 text-xs font-black text-sky-900">
                  {note.category}
                </span>
                <time className="text-xs font-semibold text-slate-400" dateTime={note.publishedAt}>
                  {note.publishedAt}
                </time>
              </div>
              <h2 className="mt-5 text-2xl font-black leading-tight text-slate-950 transition group-hover:text-rose-600">
                {note.title}
              </h2>
              <p className="mt-4 leading-7 text-slate-600">{note.excerpt}</p>
              <div className="mt-6 flex flex-wrap items-center gap-2">
                {note.tags.map((tag) => (
                  <span key={tag} className="note-tag">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex items-center justify-between border-t border-slate-200/80 pt-4 text-sm font-bold text-slate-500">
                <span>预计阅读 {note.readingTime}</span>
                <span className="text-rose-600 transition group-hover:translate-x-1">打开笔记 →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
