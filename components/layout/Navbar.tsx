"use client";

import Link from "next/link";
import { Menu, X, ShoppingCart } from "lucide-react";
import { FaInstagram, FaSpotify, FaTiktok } from "react-icons/fa";
import { useState } from "react";

import { useCart } from "@/app/context/CartContext";

const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/sochiesiren",
  tiktok: "https://www.tiktok.com/@sochiesiren",
  spotify:
    "https://open.spotify.com/artist/6jplkSuba0FrGBLhywo2PG?si=ub4DE9yVQRqqs66ig_kEIw",
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { totalItems } = useCart();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Music", href: "/music" },
    { label: "Album", href: "/album" },
    { label: "Tour", href: "/tour" },
    { label: "Store", href: "/store" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 text-white">
        <Link
          href="/"
          className="text-2xl font-semibold tracking-[0.28em] text-[#d4a85d]"
        >
          SOCHIE
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-7 text-sm font-medium uppercase tracking-wide md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-[#d4a85d]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Social + Cart */}
        <div className="hidden items-center gap-4 text-lg md:flex">
          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Sochie on Instagram"
            className="transition hover:text-[#d4a85d]"
          >
            <FaInstagram />
          </a>

          <a
            href={SOCIAL_LINKS.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Sochie on TikTok"
            className="transition hover:text-[#d4a85d]"
          >
            <FaTiktok />
          </a>

          <a
            href={SOCIAL_LINKS.spotify}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Sochie on Spotify"
            className="transition hover:text-[#d4a85d]"
          >
            <FaSpotify />
          </a>

          <Link
            href="/cart"
            aria-label="Shopping Cart"
            className="relative transition hover:text-[#d4a85d]"
          >
            <ShoppingCart size={22} />

            {totalItems > 0 && (
              <span
                className="
                  absolute
                  -right-2
                  -top-2
                  flex
                  h-5
                  w-5
                  items-center
                  justify-center
                  rounded-full
                  bg-[#d4a85d]
                  text-[10px]
                  font-bold
                  text-black
                "
              >
                {totalItems}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden"
          onClick={() => setMenuOpen((current) => !current)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-white/10 bg-black px-6 py-5 text-white md:hidden">
          <div className="flex flex-col gap-4 text-sm font-medium uppercase tracking-wide">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition hover:text-[#d4a85d]"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-5 text-xl text-[#d4a85d]">
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Sochie on Instagram"
            >
              <FaInstagram />
            </a>

            <a
              href={SOCIAL_LINKS.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Sochie on TikTok"
            >
              <FaTiktok />
            </a>

            <a
              href={SOCIAL_LINKS.spotify}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Sochie on Spotify"
            >
              <FaSpotify />
            </a>

            <Link
              href="/cart"
              aria-label="Shopping Cart"
              className="relative"
              onClick={() => setMenuOpen(false)}
            >
              <ShoppingCart size={22} />

              {totalItems > 0 && (
                <span
                  className="
                    absolute
                    -right-2
                    -top-2
                    flex
                    h-5
                    w-5
                    items-center
                    justify-center
                    rounded-full
                    bg-[#d4a85d]
                    text-[10px]
                    font-bold
                    text-black
                  "
                >
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}