import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDateTimeLabel, getPetPhoto } from "@/app/lib/pet-photos";

export const dynamic = "force-dynamic";

export default async function PhotoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const photo = await getPetPhoto(id);

  if (!photo) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#fffdf8] px-5 pb-12 pt-28 text-slate-900 md:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/#gallery"
          className="inline-flex h-10 items-center rounded-md border border-emerald-100 bg-white px-4 text-sm font-bold text-slate-600 transition hover:-translate-y-0.5 hover:border-rose-200 hover:text-rose-600"
        >
          返回相册
        </Link>

        <article className="mt-6 overflow-hidden rounded-lg border border-emerald-100 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.12)]">
          <div className="relative aspect-[4/3] bg-emerald-50 md:aspect-[16/10]">
            <Image
              src={photo.image_url}
              alt={photo.title}
              fill
              priority
              unoptimized={photo.image_url.startsWith("data:")}
              className="object-cover"
              sizes="(min-width: 1024px) 960px, 100vw"
            />
          </div>

          <div className="grid gap-8 p-5 md:grid-cols-[1fr_280px] md:p-7">
            <div>
              <p className="text-sm font-black uppercase text-emerald-600">Cat Memory</p>
              <h1 className="mt-3 text-4xl font-black text-slate-950 md:text-5xl">{photo.title}</h1>
              {photo.note ? <p className="mt-5 text-base leading-8 text-slate-600">{photo.note}</p> : null}
            </div>

            <aside className="grid gap-4 rounded-lg bg-rose-50 p-4">
              <div>
                <p className="text-xs font-black uppercase text-rose-500">猫咪</p>
                <p className="mt-1 text-lg font-black text-slate-950">{photo.pet_name}</p>
              </div>
              <div className="border-t border-rose-100 pt-4">
                <p className="text-xs font-black uppercase text-rose-500">上传时间</p>
                <time className="mt-1 block text-sm font-semibold leading-6 text-slate-600" dateTime={photo.uploaded_at}>
                  {formatDateTimeLabel(photo.uploaded_at)}
                </time>
              </div>
              <div className="border-t border-rose-100 pt-4">
                <p className="text-xs font-black uppercase text-rose-500">记录编号</p>
                <p className="mt-1 break-all font-mono text-xs text-slate-500">{photo.id}</p>
              </div>
            </aside>
          </div>
        </article>
      </div>
    </div>
  );
}
