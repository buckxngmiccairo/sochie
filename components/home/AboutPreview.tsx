import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutPreview() {
  return (
    <section className="bg-black px-6 py-24 text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <img
            src="/assets/images/sochie-about.jpg"
            alt="Sochie artist portrait"
            className="h-[520px] w-full object-cover"
          />
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-[#d4a85d]">
            The Story. The Purpose.
          </p>

          <h2 className="text-4xl font-semibold leading-tight text-[#d4a85d] md:text-6xl">
            Beyond The Music
          </h2>

          <p className="mt-6 text-base leading-8 text-white/70 md:text-lg">
            Sochie creates music from a place of truth, faith and purpose. Her
            sound blends soulful melodies, African rhythm and heartfelt
            storytelling into a journey that connects people across cultures.
          </p>

          <p className="mt-5 text-base leading-8 text-white/70 md:text-lg">
            This is more than music. It is healing, gratitude, love, resilience
            and the reminder that we are never alone on the journey.
          </p>

          <Link
            href="/about"
            className="mt-8 inline-flex items-center gap-2 rounded-md border border-[#d4a85d] px-6 py-3 text-sm font-bold uppercase text-[#d4a85d] transition hover:bg-[#d4a85d] hover:text-black"
          >
            Learn More About Sochie
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}