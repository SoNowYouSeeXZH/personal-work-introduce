import Image from "next/image";
import Link from "next/link";
import Modal from "@/app/components/Modal";

const photos: Record<
  string,
  { title: string; category: string; src: string; desc: string; location: string }
> = {
  "1": {
    title: "Mountain Sunrise",
    category: "Landscape",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1000&q=80",
    desc: "The first light of dawn breaks through the alpine peaks, casting golden hues across the rugged terrain.",
    location: "Swiss Alps, Switzerland",
  },
  "2": {
    title: "City Lights",
    category: "Urban",
    src: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1000&q=80",
    desc: "Neon reflections dance across rain-slicked streets as the metropolis pulses with energy.",
    location: "Tokyo, Japan",
  },
  "3": {
    title: "Ocean Sunset",
    category: "Seascape",
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&q=80",
    desc: "The sun melts into the Pacific, painting the sky in layers of amber and rose.",
    location: "Maldives",
  },
  "4": {
    title: "Forest Path",
    category: "Nature",
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1000&q=80",
    desc: "Dappled sunlight filters through an ancient canopy, illuminating a moss-covered trail.",
    location: "Olympic National Park, USA",
  },
  "5": {
    title: "Snow Peaks",
    category: "Landscape",
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1000&q=80",
    desc: "Pristine snow blankets the towering summits as crystalline air carries the silence of altitude.",
    location: "Patagonia, Argentina",
  },
  "6": {
    title: "Cherry Blossom",
    category: "Nature",
    src: "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=1000&q=80",
    desc: "Delicate petals unfold in the spring breeze, transforming the landscape into a sea of soft pink.",
    location: "Kyoto, Japan",
  },
};

export function generateStaticParams() {
  return Object.keys(photos).map((id) => ({ id }));
}

export default async function InterceptedPhotoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const photo = photos[id];

  if (!photo) {
    return null;
  }

  return (
    <Modal>
      {/* Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={photo.src}
          alt={photo.title}
          fill
          className="object-cover"
        />
        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="rounded-full bg-amber-500/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            {photo.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h2 className="text-xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
          {photo.title}
        </h2>
          <p className="mt-2 text-sm leading-relaxed text-stone-500 dark:text-stone-400">
          {photo.desc}
        </p>

        <div className="mt-4 flex items-center gap-2 text-xs text-stone-400 dark:text-stone-500">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          {photo.location}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-stone-100 pt-5 dark:border-stone-800">
          <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-900/20 dark:text-green-400">
            Intercepted Route · Modal
          </span>
          <Link
            href={`/photos/${id}`}
            className="text-sm font-medium text-amber-600 transition-colors hover:text-amber-700 dark:text-amber-500 dark:hover:text-amber-400"
          >
            View Full Page &rarr;
          </Link>
        </div>
      </div>
    </Modal>
  );
}
