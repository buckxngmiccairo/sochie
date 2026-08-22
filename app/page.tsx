"use client";

import Link from "next/link";
import { useState } from "react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import {
  ArrowRight,
  Clock,
  Gift,
  Music,
  Play,
  Star,
} from "lucide-react";

import {
  FaApple,
  FaSoundcloud,
  FaSpotify,
  FaYoutube,
} from "react-icons/fa";

const STREAM_LINKS = {
  spotify:
    "https://open.spotify.com/artist/6jplkSuba0FrGBLhywo2PG?si=ub4DE9yVQRqqs66ig_kEIw",

  appleMusic:
    "https://music.apple.com/us/artist/sochie/1896466678",

  youtube:
    "https://www.youtube.com/@iamsochie",

  audiomack:
    "https://audiomack.com/iamsochie",

  soundcloud:
    "https://soundcloud.com/iamsochie",
};

const SINGLE_LINKS = {
  asante:
    "https://open.spotify.com/track/07CcBPWZZDi9min2KgUW1F?si=d46fd61838cc4388",

  inVain:
    "https://open.spotify.com/track/0tde0oaoMZVvziToignSQi?si=1de43e12964943f8",

  vibranium:
    "https://open.spotify.com/track/3clowzN0iwpfFCcxpKJ1pt?si=c64616b83d9649b5",

  eyethu:
    "https://open.spotify.com/track/4u4PJYMrOXzgkLHtKopSYs?si=b2ed111a08a54ca8",
};

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [newsletterMessage, setNewsletterMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const singles = [
    {
      title: "Asante",
      image: "/assets/images/asante-single.jpg",
      href: SINGLE_LINKS.asante,
    },
    {
      title: "In Vain",
      image: "/assets/images/in-vain-single.jpg",
      href: SINGLE_LINKS.inVain,
    },
    {
      title: "Vibranium",
      image: "/assets/images/vibranium-single.jpg",
      href: SINGLE_LINKS.vibranium,
    },
    {
      title: "Eyethu",
      image: "/assets/images/eyethu-single.jpg",
      href: SINGLE_LINKS.eyethu,
    },
  ];

  const tourDates = [
    {
      date: "May 10",
      city: "New York, NY",
      venue: "Medgar Evers College",
    },
    {
      date: "May 16",
      city: "Atlanta, GA",
      venue: "Morehouse College",
    },
    {
      date: "May 24",
      city: "Washington, DC",
      venue: "Howard University",
    },
    {
      date: "May 31",
      city: "Toronto, ON, Canada",
      venue: "York University",
    },
  ];

  async function handleNewsletterSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setNewsletterMessage("Please enter your email address.");
      return;
    }

    setIsSubmitting(true);
    setNewsletterMessage("");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/contact/newsletter/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: trimmedEmail,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (data.email) {
          setNewsletterMessage(
            Array.isArray(data.email)
              ? data.email[0]
              : "Please enter a valid email address."
          );
        } else {
          setNewsletterMessage(
            data.message ||
              "Something went wrong. Please try again."
          );
        }

        return;
      }

      setNewsletterMessage(
        data.message ||
          "You have successfully joined the journey."
      );

      setEmail("");
    } catch {
      setNewsletterMessage(
        "Unable to connect right now. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Navbar />

      <main className="bg-black text-white">

        {/* ======================================
            HERO
        ====================================== */}

        <section className="relative flex min-h-screen items-center overflow-hidden px-6 pt-28">

          <div
            className="absolute inset-0 bg-[url('/assets/images/sochie-hero.jpg')] bg-cover bg-[position:75%_center] opacity-45"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/20" />

          <div className="relative z-10 mx-auto w-full max-w-7xl">

            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.45em] text-[#d4a85d]">
              Official Artist Website
            </p>

            <h1 className="text-6xl font-semibold leading-none tracking-[0.16em] text-[#d4a85d] md:text-8xl">
              SOCHIE
            </h1>

            <p className="mt-5 text-3xl font-light italic md:text-4xl">
              Soul. Rhythm. Purpose.
            </p>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/75 md:text-lg">
              Nigerian-American artist blending R&B, Soul, Afrobeat,
              Jazz and Amapiano into music that inspires, heals,
              celebrates and connects.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              <a
                href={STREAM_LINKS.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-[#d4a85d] px-6 py-3 text-sm font-bold uppercase text-black"
              >
                <Play size={18} fill="currentColor" />
                Listen Now
              </a>

              <Link
                href="/album"
                className="inline-flex items-center gap-2 rounded-md border border-[#d4a85d] px-6 py-3 text-sm font-bold uppercase text-[#d4a85d]"
              >
                Pre-Order Album
              </Link>

            </div>

            {/* STREAMING LINKS */}

            <div className="mt-8 flex items-center gap-5 text-2xl text-white/80">

              <span className="text-xs uppercase tracking-[0.3em] text-[#d4a85d]">
                Stream On
              </span>

              <a
                href={STREAM_LINKS.spotify}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Listen to Sochie on Spotify"
                className="transition hover:text-[#d4a85d]"
              >
                <FaSpotify />
              </a>

              <a
                href={STREAM_LINKS.appleMusic}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Listen to Sochie on Apple Music"
                className="transition hover:text-[#d4a85d]"
              >
                <FaApple />
              </a>

              <a
                href={STREAM_LINKS.soundcloud}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Listen to Sochie on SoundCloud"
                className="transition hover:text-[#d4a85d]"
              >
                <FaSoundcloud />
              </a>

              <a
                href={STREAM_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Watch Sochie on YouTube"
                className="transition hover:text-[#d4a85d]"
              >
                <FaYoutube />
              </a>

            </div>

          </div>
        </section>


        {/* ======================================
            LATEST SINGLES
        ====================================== */}

        <section className="px-6 py-20">

          <div className="mx-auto max-w-7xl">

            <div className="mb-8 flex items-center justify-between">

              <h2 className="text-3xl font-semibold uppercase tracking-[0.16em] text-[#d4a85d]">
                Latest Singles
              </h2>

              <a
                href={STREAM_LINKS.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm uppercase text-[#d4a85d]"
              >
                View All Music
                <ArrowRight size={16} />
              </a>

            </div>

            <div className="grid gap-6 md:grid-cols-4">

              {singles.map((single) => (

                <article
                  key={single.title}
                  className="relative flex h-72 items-end overflow-hidden rounded-xl border border-white/10 bg-cover bg-center p-5"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(0,0,0,.05), rgba(0,0,0,.92)), url('${single.image}')`,
                  }}
                >

                  <div>

                    <a
                      href={single.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-[#d4a85d] text-[#d4a85d] transition hover:bg-[#d4a85d] hover:text-black"
                      aria-label={`Play ${single.title} on Spotify`}
                    >
                      <Play size={18} fill="currentColor" />
                    </a>

                    <h3 className="text-xl font-semibold uppercase">
                      {single.title}
                    </h3>

                    <a
                      href={single.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 flex items-center gap-1 text-sm text-[#d4a85d]"
                    >
                      Listen Now
                      <ArrowRight size={14} />
                    </a>

                  </div>

                </article>

              ))}

            </div>

          </div>

        </section>


        {/* ======================================
            NEW ALBUM
        ====================================== */}

        <section className="bg-[#f4ead8] px-6 py-16 text-black">

          <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-3">

            <img
              src="/assets/images/album-cover.jpg"
              alt="Sochie album cover"
              className="rounded-xl"
            />

            <div className="text-center">

              <p className="text-sm uppercase tracking-[0.3em] text-[#9b6f2f]">
                The New Album
              </p>

              <h2 className="mt-3 text-5xl font-semibold uppercase leading-tight">
                Is Coming
              </h2>

              <p className="mt-4 text-sm uppercase">
                A journey of love, faith, healing & purpose.
              </p>

              <div className="mt-6 grid grid-cols-4 gap-3">

                {[
                  "28 Days",
                  "14 Hours",
                  "36 Minutes",
                  "52 Seconds",
                ].map((time) => (

                  <div
                    key={time}
                    className="rounded-md border border-black/20 p-3"
                  >
                    <strong className="block text-2xl">
                      {time.split(" ")[0]}
                    </strong>

                    <span className="text-xs uppercase">
                      {time.split(" ")[1]}
                    </span>
                  </div>

                ))}

              </div>

              <div className="mt-8 flex justify-center gap-4">

                <Link
                  href="/album"
                  className="rounded-md bg-[#d4a85d] px-6 py-3 text-sm font-bold uppercase"
                >
                  Pre-Order Album
                </Link>

                <Link
                  href="/contact#newsletter"
                  className="rounded-md border border-black/30 px-6 py-3 text-sm font-bold uppercase"
                >
                  Join Launch List
                </Link>

              </div>

            </div>

            <img
              src="/assets/images/stage-performance.jpg"
              alt="Sochie performing"
              className="rounded-xl"
            />

          </div>

        </section>


        {/* ======================================
            BEYOND THE MUSIC
        ====================================== */}

        <section className="grid md:grid-cols-3">

          <img
            src="/assets/images/staircase.jpg"
            alt="Sochie portrait"
            className="h-full min-h-[420px] w-full object-cover"
          />

          <div className="flex flex-col justify-center bg-[#070707] p-10">

            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#d4a85d]">
              The Story. The Purpose.
            </p>

            <h2 className="text-4xl font-semibold text-[#d4a85d]">
              Beyond The Music
            </h2>

            <p className="mt-5 leading-8 text-white/70">
              Music has always been my way of making sense of life, faith,
              gratitude, love and human connection.
            </p>

            <p className="mt-4 leading-8 text-white/70">
              This is more than music. This is a movement for a better world.
            </p>

            <Link
              href="/about"
              className="mt-7 inline-flex w-fit rounded-md border border-[#d4a85d] px-6 py-3 text-sm font-bold uppercase text-[#d4a85d]"
            >
              Learn More About Sochie
            </Link>

          </div>

          <img
            src="/assets/images/live-performance.jpg"
            alt="Sochie live"
            className="h-full min-h-[420px] w-full object-cover"
          />

        </section>


        {/* ======================================
            TOUR / MERCH / NEWSLETTER
        ====================================== */}

        <section className="px-6 py-20">

          <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">

            {/* TOUR */}

            <div className="rounded-xl border border-white/10 p-6">

              <h2 className="mb-5 text-2xl text-[#d4a85d]">
                Tour Dates
              </h2>

              <div className="space-y-4">

                {tourDates.map((tour) => (

                  <div
                    key={tour.city}
                    className="grid grid-cols-[80px_1fr] gap-4 border-b border-white/10 pb-4"
                  >

                    <span className="text-[#d4a85d]">
                      {tour.date}
                    </span>

                    <div>
                      <strong>{tour.city}</strong>

                      <p className="text-sm text-white/60">
                        {tour.venue}
                      </p>
                    </div>

                  </div>

                ))}

              </div>

              <Link
                href="/tour"
                className="mt-6 inline-flex items-center gap-2 text-sm uppercase text-[#d4a85d]"
              >
                Get Tour Updates
                <ArrowRight size={14} />
              </Link>

            </div>


            {/* MERCH */}

            <div className="rounded-xl border border-white/10 p-6">

              <h2 className="mb-5 text-2xl text-[#d4a85d]">
                Merch Store
              </h2>

              <div className="grid grid-cols-3 gap-3">

                <img
                  src="/assets/merch/hoodie-1.jpg"
                  alt="Hoodie"
                  className="rounded-md"
                />

                <img
                  src="/assets/merch/tshirt-1.jpg"
                  alt="T-shirt"
                  className="rounded-md"
                />

                <img
                  src="/assets/merch/cap-1.jpg"
                  alt="Cap"
                  className="rounded-md"
                />

              </div>

              <p className="mt-5 text-sm leading-7 text-white/70">
                New drops. Limited pieces. Worldwide shipping available.
              </p>

              <Link
                href="/store"
                className="mt-5 inline-flex items-center gap-2 text-sm uppercase text-[#d4a85d]"
              >
                Visit Store
                <ArrowRight size={14} />
              </Link>

            </div>


            {/* NEWSLETTER */}

            <div
              id="newsletter"
              className="flex min-h-full flex-col justify-center rounded-xl border border-white/10 p-6"
            >

              <div>

                <h2 className="mb-4 text-2xl text-[#d4a85d]">
                  Be The First To Know
                </h2>

                <p className="text-sm leading-7 text-white/70">
                  Be the first to hear new music, get tour updates
                  and exclusive content.
                </p>

                <form
                  onSubmit={handleNewsletterSubmit}
                  className="mt-6 flex overflow-hidden rounded-md bg-white"
                >

                  <input
                    type="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    placeholder="Enter your email"
                    aria-label="Email address"
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 text-black outline-none disabled:opacity-60"
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#d4a85d] px-5 text-sm font-bold uppercase text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? "..." : "Sign Me Up"}
                  </button>

                </form>

                {newsletterMessage && (
                  <p
                    className="mt-3 text-xs leading-5 text-[#d4a85d]"
                    role="status"
                  >
                    {newsletterMessage}
                  </p>
                )}

                <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-white/70">

                  <span className="flex gap-2">
                    <Gift size={18} />
                    Early Access
                  </span>

                  <span className="flex gap-2">
                    <Star size={18} />
                    Exclusive Content
                  </span>

                  <Link
                    href="/tour"
                    className="flex gap-2 transition hover:text-[#d4a85d]"
                  >
                    <Clock size={18} />
                    Tour Updates
                  </Link>

                  <span className="flex gap-2">
                    <Music size={18} />
                    Special Offers
                  </span>

                </div>

              </div>

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}