import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DeletePetPhotoForm } from "@/app/components/pet/DeletePetPhotoForm";
import { EditPetPhotoForm } from "@/app/components/pet/EditPetPhotoForm";
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
    <div className="xhs-shell min-h-screen px-5 pb-12 pt-28 text-slate-900 md:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/#gallery"
          className="inline-flex h-10 items-center rounded-md border border-[#F8D5C4] bg-white px-4 text-sm font-bold text-slate-600 transition hover:-translate-y-0.5 hover:border-[#E8655A] hover:text-rose-600"
        >
          返回相册
        </Link>

        <article className="xhs-feature-card mt-6 overflow-hidden rounded-lg border bg-white">
          <div className="xhs-polaroid-frame relative aspect-[4/3] bg-emerald-50 md:aspect-[16/10]">
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
              <p className="xhs-pill w-fit bg-[#B5E5CF]/80 text-sm font-black text-emerald-800">福仔的照片</p>
              <h1 className="mt-3 text-4xl font-black text-slate-950 md:text-5xl">{photo.title}</h1>
              {photo.note ? <p className="mt-5 text-base leading-8 text-slate-600">{photo.note}</p> : null}
            </div>

            <aside className="grid gap-4 rounded-lg border border-[#F8D5C4] bg-[#FFF5F7] p-4 shadow-[6px_6px_0_rgba(248,213,196,0.65)]">
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

          <EditPetPhotoForm id={photo.id} title={photo.title} note={photo.note} />
          <DeletePetPhotoForm id={photo.id} title={photo.title} />
        </article>
      </div>
    </div>
  );
}
