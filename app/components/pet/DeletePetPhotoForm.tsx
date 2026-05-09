"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { deletePetPhotoRecord, type DeletePhotoState } from "@/app/actions";

const initialState: DeletePhotoState = {
  status: "idle",
  message: "",
};

type DeletePetPhotoFormProps = {
  id: string;
  title: string;
};

export function DeletePetPhotoForm({ id, title }: DeletePetPhotoFormProps) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(deletePetPhotoRecord, initialState);

  useEffect(() => {
    if (state.status === "success") {
      router.replace("/#gallery");
      router.refresh();
    }
  }, [router, state.status]);

  return (
    <form
      action={formAction}
      className="grid gap-4 border-t border-rose-100 bg-[#FFF5F7]/78 p-5 md:p-7"
      onSubmit={(event) => {
        const confirmed = window.confirm(`确定要删除「${title}」这条记录吗？删除后无法恢复。`);
        if (!confirmed) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-black text-rose-600">危险操作</p>
          <p className="mt-2 text-sm leading-7 text-slate-500">
            删除后这条照片记录会从首页时间线和详情页移除，无法在页面内恢复。
          </p>
          <p
            aria-live="polite"
            className={`mt-2 min-h-5 text-sm ${
              state.status === "success"
                ? "text-emerald-700"
                : state.status === "error"
                  ? "text-rose-700"
                  : "text-slate-500"
            }`}
          >
            {state.message}
          </p>
        </div>
        <button
          type="submit"
          disabled={pending || state.status === "success"}
          className="inline-flex h-11 w-fit items-center justify-center rounded-md border border-rose-200 bg-white px-5 text-sm font-black text-rose-600 shadow-[4px_4px_0_rgba(248,213,196,0.65)] transition hover:-translate-y-0.5 hover:border-rose-400 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "删除中..." : "删除这条记录"}
        </button>
      </div>
    </form>
  );
}
