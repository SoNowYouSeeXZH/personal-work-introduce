"use client";

import { useActionState } from "react";
import { uploadPetPhoto, type UploadState } from "@/app/actions";

const initialState: UploadState = {
  status: "idle",
  message: "",
};

export function UploadPetPhotoForm() {
  const [state, formAction, pending] = useActionState(uploadPetPhoto, initialState);

  return (
    <form
      action={formAction}
      encType="multipart/form-data"
      className="grid gap-4 rounded-lg border border-rose-100 bg-white/82 p-4 shadow-[0_18px_60px_rgba(251,113,133,0.14)] backdrop-blur md:grid-cols-[1fr_1fr] md:p-5"
    >
      <label className="grid gap-2 text-sm font-semibold text-slate-700">
        照片标题
        <input
          required
          name="title"
          placeholder="例如：午后晒太阳"
          className="h-11 rounded-md border border-rose-100 bg-white px-3 text-sm outline-none transition focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
        />
      </label>

      <label className="grid gap-2 text-sm font-semibold text-slate-700">
        猫咪名字
        <input
          name="petName"
          placeholder="例如：年糕"
          className="h-11 rounded-md border border-rose-100 bg-white px-3 text-sm outline-none transition focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
        />
      </label>

      <label className="grid gap-2 text-sm font-semibold text-slate-700 md:col-span-2">
        今天发生了什么
        <textarea
          name="note"
          placeholder="写一点小记忆..."
          rows={3}
          className="resize-none rounded-md border border-rose-100 bg-white px-3 py-3 text-sm outline-none transition focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
        />
      </label>

      <label className="grid gap-2 text-sm font-semibold text-slate-700 md:col-span-2">
        上传图片
        <input
          required
          name="photo"
          type="file"
          accept="image/*"
          className="rounded-md border border-dashed border-rose-200 bg-rose-50/70 px-3 py-3 text-sm text-slate-600 file:mr-4 file:rounded-md file:border-0 file:bg-rose-500 file:px-4 file:py-2 file:text-sm file:font-bold file:text-white hover:file:bg-rose-600"
        />
      </label>

      <div className="flex flex-col gap-3 md:col-span-2 md:flex-row md:items-center md:justify-between">
        <p
          aria-live="polite"
          className={`min-h-5 text-sm ${
            state.status === "success"
              ? "text-emerald-700"
              : state.status === "error"
                ? "text-rose-700"
                : "text-slate-500"
          }`}
        >
          {state.message || "支持 JPG、PNG、WebP、GIF，单张不超过 4MB。"}
        </p>
        <button
          disabled={pending}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-slate-900 px-5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="text-lg leading-none">+</span>
          {pending ? "保存中..." : "记录这一刻"}
        </button>
      </div>
    </form>
  );
}
