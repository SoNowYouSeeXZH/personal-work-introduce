"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { editPetPhoto, type EditPhotoState } from "@/app/actions";

const initialState: EditPhotoState = {
  status: "idle",
  message: "",
};

type EditPetPhotoFormProps = {
  id: string;
  title: string;
  note: string | null;
};

export function EditPetPhotoForm({ id, title, note }: EditPetPhotoFormProps) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(editPetPhoto, initialState);

  useEffect(() => {
    if (state.status === "success") {
      router.refresh();
    }
  }, [router, state.status]);

  return (
    <form action={formAction} className="grid gap-4 border-t border-[#F8D5C4] bg-[#FFFAF0]/70 p-5 md:p-7">
      <input type="hidden" name="id" value={id} />

      <div>
        <p className="xhs-section-label">编辑记录</p>
        <p className="mt-3 text-sm leading-7 text-slate-500">
          可以随时修正这张照片的标题和描述，保存后首页时间线也会同步更新。
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-slate-700">
          照片标题
          <input
            required
            name="title"
            defaultValue={title}
            className="h-11 rounded-md border border-[#F8D5C4] bg-white px-3 text-sm outline-none transition focus:border-[#E8655A] focus:ring-4 focus:ring-[#F8D5C4]/60"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-slate-700 md:row-span-2">
          图片描述
          <textarea
            name="note"
            defaultValue={note ?? ""}
            rows={5}
            placeholder="写一点小记忆..."
            className="min-h-28 resize-none rounded-md border border-[#B5E5CF] bg-white px-3 py-3 text-sm outline-none transition focus:border-[#E8655A] focus:ring-4 focus:ring-[#B5E5CF]/60"
          />
        </label>

        <div className="flex flex-col justify-end gap-3">
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
            {state.message || "只会更新文字记录，不会改变图片和上传时间。"}
          </p>
          <button
            type="submit"
            disabled={pending}
            className="xhs-button inline-flex h-11 w-fit items-center justify-center rounded-md px-5 text-sm font-bold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? "保存中..." : "保存修改"}
          </button>
        </div>
      </div>
    </form>
  );
}
