"use server";

import { revalidatePath } from "next/cache";
import { getShanghaiDateKey, insertPetPhoto, isSupabaseConfigured } from "./lib/pet-photos";

export type UploadState = {
  status: "idle" | "success" | "error";
  message: string;
};

const MAX_IMAGE_SIZE = 4 * 1024 * 1024;

function readTextField(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function uploadPetPhoto(
  _previousState: UploadState,
  formData: FormData
): Promise<UploadState> {
  if (!isSupabaseConfigured) {
    return {
      status: "error",
      message:
        "还没有配置 Supabase 环境变量。请先设置 NEXT_PUBLIC_SUPABASE_URL 和 SUPABASE_SERVICE_ROLE_KEY。",
    };
  }

  const title = readTextField(formData, "title");
  const petName = readTextField(formData, "petName") || "福仔";
  const note = readTextField(formData, "note");
  const file = formData.get("photo");

  if (!title) {
    return { status: "error", message: "给这张照片起一个可爱的标题吧。" };
  }

  if (!(file instanceof File) || file.size === 0) {
    return { status: "error", message: "请选择一张猫咪照片。" };
  }

  if (!file.type.startsWith("image/")) {
    return { status: "error", message: "上传文件必须是图片格式。" };
  }

  if (file.size > MAX_IMAGE_SIZE) {
    return { status: "error", message: "图片不能超过 4MB，稍微压缩一下再上传。" };
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const imageUrl = `data:${file.type};base64,${bytes.toString("base64")}`;
  const uploadedAt = new Date();

  try {
    await insertPetPhoto({
      title,
      pet_name: petName,
      note: note || null,
      image_url: imageUrl,
      uploaded_at: uploadedAt.toISOString(),
      uploaded_on: getShanghaiDateKey(uploadedAt),
    });
  } catch (error) {
    console.error("Failed to upload pet photo:", error);
    return {
      status: "error",
      message: "照片没有保存成功，请检查 Supabase key 是否有服务端写入权限。",
    };
  }

  revalidatePath("/");

  return { status: "success", message: "已记录一条新的猫咪日常。" };
}
