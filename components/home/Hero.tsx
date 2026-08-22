import Link from "next/link";
import { Play, ShoppingBag } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-black px-6 pt-28 text-white">
      <div className="absolute inset-0 bg-[url('/assets/images/sochie-hero.jpg')] bg-cover bg-[position:75%_center] opacity-45" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/20" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 md:grid-cols-2">
        <div>
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.45em] text-[#d4a85d]">
            Nigerian-American Artist
          </p>

          <h1 className="text-6xl font-semibold leading-none tracking-[0.16em] text-[#d4a85d] md:text-7xl lg:text-8xl">
            SOCHIE
          </h1>

          <p className="mt-5 text-3xl font-light italic text-white md:text-4xl">
            Soul. Rhythm. Purpose.
          </p>

          <p className="mt-6 max-w-2xl text-base leading-8 text-white/75 md:text-lg">
            Blending R&B, Soul, Jazz, Afrobeat, Amapiano and Dance into music
            that inspires, heals, celebrates and connects.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/music"
              className="inline-flex items-center gap-2 rounded-md bg-[#d4a85d] px-6 py-3 text-sm font-bold uppercase text-black transition hover:bg-[#e7bd72]"
            >
              <Play size={18} fill="currentColor" />
              Listen Now
            </Link>

            <Link
              href="/album"
              className="inline-flex items-center gap-2 rounded-md border border-[#d4a85d] px-6 py-3 text-sm font-bold uppercase text-[#d4a85d] transition hover:bg-[#d4a85d] hover:text-black"
            >
              <ShoppingBag size={18} />
              Buy Album
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}