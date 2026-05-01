"use client";

import Image from "next/image";
import { useActionState, useEffect, useState, type ChangeEvent } from "react";
import { uploadPetPhoto, type UploadState } from "@/app/actions";

const initialState: UploadState = {
  status: "idle",
  message: "",
};

export function UploadPetPhotoForm() {
  const [state, formAction, pending] = useActionState(uploadPetPhoto, initialState);
  const [fileName, setFileName] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0];
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setFileName(file?.name ?? "");
    setPreviewUrl(file ? URL.createObjectURL(file) : "");
  }

  return (
    <form
      action={formAction}
      className="xhs-form-card grid gap-4 rounded-lg border bg-white/88 p-4 backdrop-blur md:grid-cols-[1fr_1fr] md:p-5"
    >
      <label className="grid gap-2 text-sm font-semibold text-slate-700">
        照片标题
        <input
          required
          name="title"
          placeholder="例如：午后晒太阳"
          className="h-11 rounded-md border border-[#F8D5C4] bg-[#FFFAF0] px-3 text-sm outline-none transition focus:border-[#E8655A] focus:ring-4 focus:ring-[#F8D5C4]/60"
        />
      </label>

      <label className="grid gap-2 text-sm font-semibold text-slate-700">
        猫咪名字（默认福仔）
        <input
          name="petName"
          placeholder="例如：福仔"
          className="h-11 rounded-md border border-[#D5C6E0] bg-[#FFFAF0] px-3 text-sm outline-none transition focus:border-[#E8655A] focus:ring-4 focus:ring-[#D5C6E0]/60"
        />
      </label>

      <label className="grid gap-2 text-sm font-semibold text-slate-700 md:col-span-2">
        今天发生了什么
        <textarea
          name="note"
          placeholder="写一点小记忆..."
          rows={3}
          className="resize-none rounded-md border border-[#B5E5CF] bg-[#FFFAF0] px-3 py-3 text-sm outline-none transition focus:border-[#E8655A] focus:ring-4 focus:ring-[#B5E5CF]/60"
        />
      </label>

      <div className="grid gap-2 text-sm font-semibold text-slate-700 md:col-span-2">
        <label htmlFor="pet-photo-upload">上传图片</label>
        <div className="xhs-upload-drop relative grid gap-4 overflow-hidden rounded-md border border-dashed p-4 transition focus-within:border-[#E8655A] focus-within:ring-4 focus-within:ring-[#F8D5C4]/60 sm:grid-cols-[132px_1fr] sm:items-center">
          <div className="relative aspect-square overflow-hidden rounded-md border border-white/80 bg-white/70 shadow-[4px_4px_0_rgba(248,213,196,0.65)]">
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt="待上传图片预览"
                fill
                unoptimized
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,rgba(248,213,196,0.62),rgba(181,229,207,0.45))] px-4 text-center text-xs font-black leading-5 text-slate-500">
                图片预览
              </div>
            )}
          </div>
          <input
            id="pet-photo-upload"
            required
            name="photo"
            type="file"
            accept="image/*"
            className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
            aria-describedby="pet-photo-upload-hint"
            onChange={handlePhotoChange}
          />
          <div className="pointer-events-none flex flex-col gap-2 sm:items-start">
            <span className="xhs-button inline-flex h-10 w-fit items-center rounded-md px-4 text-sm font-bold text-white">
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
          className="xhs-button inline-flex h-11 items-center justify-center gap-2 rounded-md px-5 text-sm font-bold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="text-lg leading-none">+</span>
          {pending ? "保存中..." : "记录这一刻"}
        </button>
      </div>
    </form>
  );
}
