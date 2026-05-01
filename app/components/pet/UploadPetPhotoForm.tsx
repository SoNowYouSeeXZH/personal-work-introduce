"use client";

import { useActionState, useState } from "react";
import { uploadPetPhoto, type UploadState } from "@/app/actions";

const initialState: UploadState = {
  status: "idle",
  message: "",
};

export function UploadPetPhotoForm() {
  const [state, formAction, pending] = useActionState(uploadPetPhoto, initialState);
  const [fileName, setFileName] = useState("");

  return (
    <form
      action={formAction}
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
        猫咪名字（默认福仔）
        <input
          name="petName"
          placeholder="例如：福仔"
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

      <div className="grid gap-2 text-sm font-semibold text-slate-700 md:col-span-2">
        <label htmlFor="pet-photo-upload">上传图片</label>
        <div className="relative overflow-hidden rounded-md border border-dashed border-rose-200 bg-rose-50/70 p-4 transition focus-within:border-rose-300 focus-within:ring-4 focus-within:ring-rose-100">
          <input
            id="pet-photo-upload"
            required
            name="photo"
            type="file"
            accept="image/*"
            className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
            aria-describedby="pet-photo-upload-hint"
            onChange={(event) => setFileName(event.currentTarget.files?.[0]?.name ?? "")}
          />
          <div className="pointer-events-none flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <span className="inline-flex h-10 w-fit items-center rounded-md bg-rose-500 px-4 text-sm font-bold text-white">
              选择相册图片
            </span>
            <span id="pet-photo-upload-hint" className="text-sm font-medium text-slate-500">
              {fileName || "点这里打开手机相册"}
            </span>
          </div>
        </div>
      </div>

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
          {state.message || "支持常见图片格式，单张不超过 4MB。"}
        </p>
        <button
          type="submit"
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
