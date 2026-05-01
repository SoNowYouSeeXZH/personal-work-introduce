import Image from "next/image";
import Link from "next/link";
import { UploadPetPhotoForm } from "./components/pet/UploadPetPhotoForm";
import {
  formatDateLabel,
  formatDateTimeLabel,
  getPetPhotos,
  groupPhotosByUploadDay,
  isSupabaseConfigured,
  type PetPhoto,
} from "./lib/pet-photos";

export const dynamic = "force-dynamic";

function PhotoTile({ photo, priority }: { photo: PetPhoto; priority?: boolean }) {
  return (
    <Link
      href={`/photos/${photo.id}`}
      className="group grid overflow-hidden rounded-lg border border-emerald-100 bg-white shadow-sm transition hover:-translate-y-1 hover:border-rose-200 hover:shadow-[0_18px_48px_rgba(15,23,42,0.12)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-emerald-50">
        <Image
          src={photo.image_url}
          alt={photo.title}
          fill
          priority={priority}
          unoptimized={photo.image_url.startsWith("data:")}
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(min-width: 1024px) 31vw, (min-width: 768px) 45vw, 100vw"
        />
      </div>
      <div className="grid gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-black text-slate-900">{photo.title}</h3>
            <p className="mt-1 text-sm font-semibold text-rose-600">{photo.pet_name}</p>
          </div>
          <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700">
            日常
          </span>
        </div>
        {photo.note ? <p className="line-clamp-2 text-sm leading-6 text-slate-500">{photo.note}</p> : null}
        <time className="text-xs font-medium text-slate-400" dateTime={photo.uploaded_at}>
          {formatDateTimeLabel(photo.uploaded_at)}
        </time>
      </div>
    </Link>
  );
}

function CartoonFuzai() {
  return (
    <div className="fuzai-card" aria-label="福仔卡通头像">
      <div className="fuzai-face" aria-hidden="true">
        <span className="fuzai-ear fuzai-ear-left" />
        <span className="fuzai-ear fuzai-ear-right" />
        <span className="fuzai-eye fuzai-eye-left" />
        <span className="fuzai-eye fuzai-eye-right" />
        <span className="fuzai-nose" />
        <span className="fuzai-mouth" />
        <span className="fuzai-whisker fuzai-whisker-left-one" />
        <span className="fuzai-whisker fuzai-whisker-left-two" />
        <span className="fuzai-whisker fuzai-whisker-right-one" />
        <span className="fuzai-whisker fuzai-whisker-right-two" />
      </div>
      <div>
        <p className="text-xs font-black text-rose-500">今日主角</p>
        <p className="mt-1 text-2xl font-black text-slate-950">福仔</p>
      </div>
    </div>
  );
}

export default async function Home() {
  const photos = await getPetPhotos();
  const groupedPhotos = groupPhotosByUploadDay(photos);
  const totalDays = groupedPhotos.length;
  const latestPhoto = photos[0];

  return (
    <div className="min-h-screen bg-[#fffdf8] text-slate-900">
      <section className="border-b border-emerald-100 bg-[linear-gradient(135deg,#fff7ed_0%,#ecfeff_52%,#f0fdf4_100%)] px-5 pb-12 pt-28 md:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <div>
            <p className="text-sm font-black text-rose-500">福仔日常相册</p>
            <h1 className="mt-4 max-w-3xl text-5xl font-black leading-[1.02] text-slate-950 md:text-7xl">
              把福仔每天的小瞬间收好
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
              上传照片、写下当天的小故事，网站会按照上传日期自动整理成清爽的福仔日常时间线。
            </p>
            <div className="mt-7 grid max-w-xl grid-cols-3 gap-3">
              <div className="rounded-lg border border-white bg-white/70 p-3">
                <p className="text-2xl font-black text-slate-950">{photos.length}</p>
                <p className="mt-1 text-xs font-bold text-slate-500">张照片</p>
              </div>
              <div className="rounded-lg border border-white bg-white/70 p-3">
                <p className="text-2xl font-black text-slate-950">{totalDays}</p>
                <p className="mt-1 text-xs font-bold text-slate-500">个日期</p>
              </div>
              <div className="rounded-lg border border-white bg-white/70 p-3">
                <p className="text-2xl font-black text-slate-950">4MB</p>
                <p className="mt-1 text-xs font-bold text-slate-500">单图上限</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <CartoonFuzai />
            {latestPhoto ? (
              <div className="grid overflow-hidden rounded-lg border border-white bg-white shadow-[0_24px_70px_rgba(15,23,42,0.12)] md:grid-cols-[0.95fr_1fr]">
                <div className="relative min-h-72 bg-emerald-50">
                  <Image
                    src={latestPhoto.image_url}
                    alt={latestPhoto.title}
                    fill
                    priority
                    unoptimized={latestPhoto.image_url.startsWith("data:")}
                    className="object-cover"
                    sizes="(min-width: 1024px) 40vw, 100vw"
                  />
                </div>
                <div className="flex flex-col justify-between gap-8 p-5">
                  <div>
                    <p className="text-xs font-black text-emerald-600">最新记录</p>
                    <h2 className="mt-3 text-3xl font-black text-slate-950">{latestPhoto.title}</h2>
                    <p className="mt-3 text-sm font-bold text-rose-600">{latestPhoto.pet_name}</p>
                    {latestPhoto.note ? (
                      <p className="mt-4 text-sm leading-7 text-slate-600">{latestPhoto.note}</p>
                    ) : null}
                  </div>
                  <Link
                    href={`/photos/${latestPhoto.id}`}
                    className="inline-flex h-10 w-fit items-center rounded-md bg-rose-500 px-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-900"
                  >
                    查看照片
                  </Link>
                </div>
              </div>
            ) : null}

            {!isSupabaseConfigured ? (
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-900">
                当前展示的是示例数据。配置 Supabase 环境变量后，上传入口会写入
                <code className="mx-1 rounded bg-white px-1.5 py-0.5">pet_photos</code>
                表。
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section id="upload" className="px-5 py-10 md:px-8">
        <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[320px_1fr] lg:items-start">
          <div>
            <div className="paw-trail mb-4" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <p className="text-sm font-black text-emerald-600">上传记录</p>
            <h2 className="mt-3 text-3xl font-black text-slate-950">记录今天的福仔</h2>
            <p className="mt-4 text-sm leading-7 text-slate-500">
              表单提交后会重新刷新首页时间线，最新照片会出现在最上方。
            </p>
          </div>
          <UploadPetPhotoForm />
        </div>
      </section>

      <section id="gallery" className="border-t border-emerald-100 bg-white px-5 py-12 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black text-rose-500">时间线</p>
              <h2 className="mt-3 text-3xl font-black text-slate-950">按上传时间整理</h2>
            </div>
            <p className="text-sm font-semibold text-slate-500">最新的日常会排在前面</p>
          </div>

          <div className="grid gap-10">
            {groupedPhotos.map((group, groupIndex) => (
              <section key={group.date} className="grid gap-4">
                <div className="flex items-center gap-3">
                  <time
                    className="rounded-md bg-emerald-100 px-3 py-2 text-sm font-black text-emerald-800"
                    dateTime={group.date}
                  >
                    {formatDateLabel(group.date)}
                  </time>
                  <div className="h-px flex-1 bg-emerald-100" />
                  <span className="text-xs font-bold text-slate-400">{group.photos.length} 张</span>
                </div>
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {group.photos.map((photo, photoIndex) => (
                    <PhotoTile
                      key={photo.id}
                      photo={photo}
                      priority={groupIndex === 0 && photoIndex < 2}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
