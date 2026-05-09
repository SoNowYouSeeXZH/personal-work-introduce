export type PetPhoto = {
  id: string;
  title: string;
  pet_name: string;
  note: string | null;
  image_url: string;
  uploaded_at: string;
  uploaded_on: string;
};

export type NewPetPhoto = Omit<PetPhoto, "id">;

export type PetPhotoUpdates = Pick<PetPhoto, "title" | "note">;

export const isSupabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
    (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const samplePhotos: PetPhoto[] = [
  {
    id: "sample-1",
    title: "午后晒太阳",
    pet_name: "福仔",
    note: "窗边那块阳光每天准时变成福仔的专属小床。",
    image_url:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1200&q=85",
    uploaded_at: "2026-04-30T06:20:00.000Z",
    uploaded_on: "2026-04-30",
  },
  {
    id: "sample-2",
    title: "认真巡逻",
    pet_name: "福仔",
    note: "厨房、客厅、纸箱，全部被福仔认真检查完毕。",
    image_url:
      "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=1200&q=85",
    uploaded_at: "2026-04-29T13:08:00.000Z",
    uploaded_on: "2026-04-29",
  },
  {
    id: "sample-3",
    title: "被窝占领计划",
    pet_name: "福仔",
    note: "人类只拥有床沿三厘米使用权。",
    image_url:
      "https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?w=1200&q=85",
    uploaded_at: "2026-04-29T03:36:00.000Z",
    uploaded_on: "2026-04-29",
  },
];

async function supabaseRequest<T>(path: string, init?: RequestInit): Promise<T> {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase environment variables are not configured.");
  }

  const method = (init?.method ?? "GET").toUpperCase();
  const isRead = method === "GET";

  const response = await fetch(`${supabaseUrl}${path}`, {
    ...init,
    // Allow ISR/data-cache for reads so the homepage can be statically cached
    // and refreshed via `revalidatePath` from server actions. Writes always
    // bypass cache.
    ...(isRead
      ? { next: { revalidate: 30, tags: ["pet_photos"] } }
      : { cache: "no-store" as const }),
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Supabase request failed with ${response.status}.`);
  }

  return (await response.json()) as T;
}

export async function getPetPhotos(): Promise<PetPhoto[]> {
  if (!isSupabaseConfigured) {
    return samplePhotos;
  }

  try {
    return await supabaseRequest<PetPhoto[]>(
      "/rest/v1/pet_photos?select=id,title,pet_name,note,image_url,uploaded_at,uploaded_on&order=uploaded_at.desc"
    );
  } catch (error) {
    console.error("Failed to load pet photos:", error);
    return samplePhotos;
  }
}

export async function getPetPhoto(id: string): Promise<PetPhoto | null> {
  if (!isSupabaseConfigured) {
    return samplePhotos.find((photo) => photo.id === id) ?? null;
  }

  try {
    const rows = await supabaseRequest<PetPhoto[]>(
      `/rest/v1/pet_photos?select=id,title,pet_name,note,image_url,uploaded_at,uploaded_on&id=eq.${encodeURIComponent(
        id
      )}&limit=1`
    );
    return rows[0] ?? null;
  } catch (error) {
    console.error("Failed to load pet photo:", error);
    return null;
  }
}

const PET_PHOTOS_BUCKET = "pet-photos";

export async function uploadPetPhotoToStorage(
  bytes: Buffer | Uint8Array,
  contentType: string,
  fileExt: string
): Promise<string> {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase environment variables are not configured.");
  }

  const safeExt = fileExt.replace(/[^a-z0-9]/gi, "").toLowerCase() || "jpg";
  const fileName = `${crypto.randomUUID()}.${safeExt}`;
  const uploadUrl = `${supabaseUrl}/storage/v1/object/${PET_PHOTOS_BUCKET}/${fileName}`;

  const response = await fetch(uploadUrl, {
    method: "POST",
    cache: "no-store",
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
      "x-upsert": "false",
    },
    body: new Uint8Array(bytes),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Supabase Storage upload failed with ${response.status}.`);
  }

  return `${supabaseUrl}/storage/v1/object/public/${PET_PHOTOS_BUCKET}/${fileName}`;
}

export async function insertPetPhoto(photo: NewPetPhoto): Promise<PetPhoto> {
  const rows = await supabaseRequest<PetPhoto[]>("/rest/v1/pet_photos", {
    method: "POST",
    headers: {
      Prefer: "return=representation",
    },
    body: JSON.stringify(photo),
  });

  if (!rows[0]) {
    throw new Error("Supabase did not return the inserted photo.");
  }

  return rows[0];
}

export async function updatePetPhoto(id: string, updates: PetPhotoUpdates): Promise<PetPhoto> {
  const rows = await supabaseRequest<PetPhoto[]>(
    `/rest/v1/pet_photos?id=eq.${encodeURIComponent(id)}`,
    {
      method: "PATCH",
      headers: {
        Prefer: "return=representation",
      },
      body: JSON.stringify(updates),
    }
  );

  if (!rows[0]) {
    throw new Error("Supabase did not return the updated photo.");
  }

  return rows[0];
}

export async function deletePetPhoto(id: string): Promise<PetPhoto> {
  const rows = await supabaseRequest<PetPhoto[]>(
    `/rest/v1/pet_photos?id=eq.${encodeURIComponent(id)}`,
    {
      method: "DELETE",
      headers: {
        Prefer: "return=representation",
      },
    }
  );

  if (!rows[0]) {
    throw new Error("Supabase did not return the deleted photo.");
  }

  return rows[0];
}

export function groupPhotosByUploadDay(photos: PetPhoto[]) {
  return photos.reduce<Array<{ date: string; photos: PetPhoto[] }>>((groups, photo) => {
    const existing = groups.find((group) => group.date === photo.uploaded_on);
    if (existing) {
      existing.photos.push(photo);
      return groups;
    }

    groups.push({ date: photo.uploaded_on, photos: [photo] });
    return groups;
  }, []);
}

export function formatDateLabel(date: string) {
  const parsed = new Date(`${date}T00:00:00+08:00`);
  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(parsed);
}

export function formatDateTimeLabel(date: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export function getShanghaiDateKey(date: Date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}
