"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FaInstagram,
  FaSpotify,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";

const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/sochiesiren",
  tiktok: "https://www.tiktok.com/@sochiesiren",
  youtube: "https://www.youtube.com/@iamsochie",
  spotify:
    "https://open.spotify.com/artist/6jplkSuba0FrGBLhywo2PG?si=ub4DE9yVQRqqs66ig_kEIw",
};

const STREAM_LINKS = {
  spotify:
    "https://open.spotify.com/artist/6jplkSuba0FrGBLhywo2PG?si=ub4DE9yVQRqqs66ig_kEIw",
  appleMusic: "https://music.apple.com/us/artist/sochie/1896466678",
  audiomack: "https://audiomack.com/iamsochie",
  youtube: "https://www.youtube.com/@iamsochie",
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!email.trim()) {
      setMessage("Please enter your email address.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/contact/newsletter/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (data.email) {
          setMessage(
            Array.isArray(data.email)
              ? data.email[0]
              : "Please enter a valid email address."
          );
        } else {
          setMessage(
            data.message || "Something went wrong. Please try again."
          );
        }

        return;
      }

      setMessage(
        data.message || "You have successfully joined the journey."
      );

      setEmail("");
    } catch {
      setMessage(
        "Unable to connect right now. Please try again in a moment."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="border-t border-white/10 bg-black px-6 py-12 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
        {/* Brand */}
        <div>
          <h2 className="text-3xl font-semibold tracking-[0.25em] text-[#d4a85d]">
            SOCHIE
          </h2>

          <p className="mt-3 text-sm text-white/60">
            Soul. Rhythm. Purpose.
          </p>

          <p className="mt-5 max-w-xs text-sm leading-7 text-white/60">
            Nigerian-American artist blending R&B, Soul, Jazz, Afrobeat,
            Amapiano and Dance into music that inspires, heals and connects.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#d4a85d]">
            Quick Links
          </h3>

          <div className="flex flex-col gap-3 text-sm text-white/70">
            <Link href="/">Home</Link>
            <Link href="/music">Music</Link>
            <Link href="/album">Album</Link>
            <Link href="/tour">Tour</Link>
            <Link href="/store">Store</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>

        {/* Social + Streaming */}
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#d4a85d]">
            Follow Sochie
          </h3>

          <div className="flex gap-4 text-xl text-white/80">
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="transition hover:text-[#d4a85d]"
            >
              <FaInstagram />
            </a>

            <a
              href={SOCIAL_LINKS.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="transition hover:text-[#d4a85d]"
            >
              <FaTiktok />
            </a>

            <a
              href={SOCIAL_LINKS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="transition hover:text-[#d4a85d]"
            >
              <FaYoutube />
            </a>

            <a
              href={SOCIAL_LINKS.spotify}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Spotify"
              className="transition hover:text-[#d4a85d]"
            >
              <FaSpotify />
            </a>
          </div>

          <h3 className="mb-4 mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-[#d4a85d]">
            Stream Sochie
          </h3>

          <div className="flex flex-col gap-3 text-sm text-white/70">
            <a
              href={STREAM_LINKS.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-[#d4a85d]"
            >
              Spotify
            </a>

            <a
              href={STREAM_LINKS.appleMusic}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-[#d4a85d]"
            >
              Apple Music
            </a>

            <a
              href={STREAM_LINKS.audiomack}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-[#d4a85d]"
            >
              Audiomack
            </a>

            <a
              href={STREAM_LINKS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-[#d4a85d]"
            >
              YouTube
            </a>

            <span className="text-white/40">Boomplay</span>
          </div>
        </div>

        {/* Booking + Newsletter */}
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#d4a85d]">
            Booking & Inquiries
          </h3>

          <div className="space-y-3 text-sm text-white/70">
            <p>booking@sochiemusic.com</p>
            <p>management@sochiemusic.com</p>
          </div>

          <div className="mt-8">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#d4a85d]">
              Join The Journey
            </h3>

            <form
              onSubmit={handleNewsletterSubmit}
              className="flex overflow-hidden rounded-md bg-white"
            >
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                aria-label="Email address"
                disabled={isSubmitting}
                className="w-full px-4 py-3 text-sm text-black outline-none disabled:opacity-60"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#d4a85d] px-5 text-sm font-semibold uppercase text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "..." : "Join"}
              </button>
            </form>

            {message && (
              <p
                className="mt-3 text-xs leading-5 text-[#d4a85d]"
                role="status"
              >
                {message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/50 md:flex-row">
        <p>© 2026 Sochie Music. All Rights Reserved.</p>

        <div className="flex gap-6">
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Terms of Use</Link>
        </div>
      </div>

      {/* Think Tank Technologies Credit */}
      <div className="mx-auto mt-6 max-w-7xl border-t border-white/5 pt-5 text-center">
        <p className="text-xs tracking-[0.12em] text-white/40">
          Powered By:{" "}
          <span className="text-[#d4a85d]">
            Think Tank Technologies
          </span>
        </p>
      </div>
    </footer>
  );
}