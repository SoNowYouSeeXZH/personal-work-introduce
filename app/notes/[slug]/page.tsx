import Link from "next/link";
import { notFound } from "next/navigation";
import { getKnowledgeNote, knowledgeNotes } from "../../lib/knowledge-notes";

type NotePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return knowledgeNotes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: NotePageProps) {
  const { slug } = await params;
  const note = getKnowledgeNote(slug);

  return {
    title: note ? `${note.title} | 福仔日记` : "知识日记 | 福仔日记",
    description: note?.excerpt,
  };
}

export default async function NoteDetailPage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = getKnowledgeNote(slug);

  if (!note) {
    notFound();
  }

  return (
    <main className="xhs-shell min-h-screen px-5 pb-20 pt-28 md:px-8">
      <article className="mx-auto max-w-5xl">
        <Link href="/notes" className="note-back-link">
          ← 返回知识日记
        </Link>

        <header className="note-article-header mt-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="xhs-pill bg-[#A8D8EA]/75 text-xs font-black text-sky-900">{note.category}</span>
            <time className="text-sm font-semibold text-slate-400" dateTime={note.publishedAt}>
              {note.publishedAt}
            </time>
            <span className="text-sm font-semibold text-slate-400">预计阅读 {note.readingTime}</span>
          </div>
          <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight text-slate-950 md:text-6xl">
            {note.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{note.excerpt}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {note.tags.map((tag) => (
              <span key={tag} className="note-tag">
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-start">
          <div className="note-article-body">
            {note.sections.map((section, index) => (
              <section key={section.heading} id={`section-${index + 1}`} className="scroll-mt-24">
                <div className="mb-4 flex items-center gap-3">
                  <span className="note-section-number">{String(index + 1).padStart(2, "0")}</span>
                  <h2>{section.heading}</h2>
                </div>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.code ? <pre><code>{section.code}</code></pre> : null}
              </section>
            ))}
          </div>

          <aside className="note-outline lg:sticky lg:top-24">
            <p className="xhs-section-label">文章目录</p>
            <nav className="mt-4 grid gap-2">
              {note.sections.map((section, index) => (
                <a key={section.heading} href={`#section-${index + 1}`}>
                  {section.heading}
                </a>
              ))}
            </nav>
          </aside>
        </div>
      </article>
    </main>
  );
}
