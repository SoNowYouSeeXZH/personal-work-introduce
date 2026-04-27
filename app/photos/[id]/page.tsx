import Image from "next/image";
import Link from "next/link";

const photos: Record<
  string,
  { title: string; category: string; src: string; desc: string; location: string; camera: string }
> = {
  "1": {
    title: "Mountain Sunrise",
    category: "Landscape",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85",
    desc: "The first light of dawn breaks through the alpine peaks, casting golden hues across the rugged terrain. A fleeting moment where the world holds its breath between night and day.",
    location: "Swiss Alps, Switzerland",
    camera: "Sony A7R V · 24-70mm f/2.8",
  },
  "2": {
    title: "City Lights",
    category: "Urban",
    src: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1200&q=85",
    desc: "Neon reflections dance across rain-slicked streets as the metropolis pulses with energy. Every window tells a story, every light a heartbeat of urban life.",
    location: "Tokyo, Japan",
    camera: "Leica Q3 · 28mm f/1.7",
  },
  "3": {
    title: "Ocean Sunset",
    category: "Seascape",
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=85",
    desc: "The sun melts into the Pacific, painting the sky in layers of amber and rose. Gentle waves carry the last warmth of the day to shore.",
    location: "Maldives",
    camera: "Canon R5 · 70-200mm f/2.8",
  },
  "4": {
    title: "Forest Path",
    category: "Nature",
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=85",
    desc: "Dappled sunlight filters through an ancient canopy, illuminating a moss-covered trail that winds deeper into the emerald cathedral of old-growth forest.",
    location: "Olympic National Park, USA",
    camera: "Fujifilm GFX 100S · 32-64mm f/4",
  },
  "5": {
    title: "Snow Peaks",
    category: "Landscape",
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=85",
    desc: "Pristine snow blankets the towering summits as crystalline air carries the silence of altitude. A landscape sculpted by millennia of wind and ice.",
    location: "Patagonia, Argentina",
    camera: "Nikon Z9 · 14-24mm f/2.8",
  },
  "6": {
    title: "Cherry Blossom",
    category: "Nature",
    src: "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=1200&q=85",
    desc: "Delicate petals unfold in the spring breeze, transforming the landscape into a sea of soft pink. A celebration of renewal and the fleeting beauty of nature.",
    location: "Kyoto, Japan",
    camera: "Sony A7 IV · 85mm f/1.4",
  },
};

export function generateStaticParams() {
  return Object.keys(photos).map((id) => ({ id }));
}

export default async function PhotoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const photo = photos[id];

  if (!photo) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-20">
        <div className="text-center">
          <p className="text-6xl font-bold text-stone-200 dark:text-stone-800">404</p>
          <p className="mt-2 text-stone-500">Photo not found</p>
          <Link href="/" className="mt-4 inline-block text-sm font-medium text-amber-600 hover:text-amber-700">
            &larr; Back to gallery
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-sm font-medium text-stone-500 transition-colors hover:text-amber-600 dark:text-stone-400"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to Gallery
        </Link>

        {/* Main image */}
        <div className="mt-8 overflow-hidden rounded-2xl">
          <div className="relative aspect-[16/9]">
            <Image
              src={photo.src}
              alt={photo.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Info section */}
        <div className="mt-10 grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-600 dark:text-amber-500">
              {photo.category}
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-50 lg:text-5xl">
              {photo.title}
            </h1>
            <p className="mt-6 text-base leading-relaxed text-stone-500 dark:text-stone-400 lg:text-lg">
              {photo.desc}
            </p>
          </div>

          <div className="space-y-6 rounded-2xl bg-stone-50 p-6 dark:bg-stone-900/50 lg:p-8">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-stone-400 dark:text-stone-500">
                Location
              </p>
              <p className="mt-1 text-sm font-medium text-stone-700 dark:text-stone-300">
                {photo.location}
              </p>
            </div>
            <div className="border-t border-stone-200 pt-6 dark:border-stone-800">
              <p className="text-xs font-medium uppercase tracking-wider text-stone-400 dark:text-stone-500">
                Camera & Lens
              </p>
              <p className="mt-1 text-sm font-medium text-stone-700 dark:text-stone-300">
                {photo.camera}
              </p>
            </div>
            <div className="border-t border-stone-200 pt-6 dark:border-stone-800">
              <p className="text-xs font-medium uppercase tracking-wider text-stone-400 dark:text-stone-500">
                Photo ID
              </p>
              <p className="mt-1 font-mono text-sm text-stone-700 dark:text-stone-300">
                LUM-2026-{id.padStart(4, "0")}
              </p>
            </div>

            <div className="border-t border-stone-200 pt-6 dark:border-stone-800">
                      <p className="rounded-lg bg-amber-50 p-3 text-xs leading-relaxed text-amber-700 dark:bg-amber-900/20 dark:text-amber-400">
                You&apos;re viewing the <strong>full detail page</strong>. This means you accessed this URL directly or refreshed. From the homepage, clicking a photo opens a modal instead (intercepting route).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
