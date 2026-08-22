"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import {
  ArrowRight,
  Check,
  Heart,
  Music,
  Play,
  ShoppingCart,
  Sparkles,
} from "lucide-react";

import { useCart } from "@/app/context/CartContext";

import "../../styles/album.css";

/* =========================================================
   API
========================================================= */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000/api";

/* =========================================================
   SOCHIE ALBUM CONSTANTS
========================================================= */

const SPOTIFY_URL =
  "https://open.spotify.com/artist/6jplkSuba0FrGBLhywo2PG?si=6uEPQv_YT56IiHX-DJ17mQ";

const ALBUM_TITLE = "The Journey Within";

const ALBUM_SCRIPT =
  "A journey of love, faith, healing & purpose.";

const ALBUM_DESCRIPTION =
  "Raw. Honest. Spiritual. Real. This is more than music. This is my story.";

/* =========================================================
   ABOUT ALBUM IMAGE

   HARD-CODED NEXT.JS PUBLIC ASSET.
   This does NOT come from Django Admin.
========================================================= */

const ALBUM_ABOUT_IMAGE =
  "/assets/images/about-album-cover.jpg";

/* =========================================================
   TRACKLIST
========================================================= */

const TRACKLIST = [
  {
    number: "01",
    title: "Asante",
  },
  {
    number: "02",
    title: "Eyethu",
  },
  {
    number: "03",
    title: "Vibranium",
  },
  {
    number: "04",
    title: "In Vain",
  },
  {
    number: "05",
    title: "TBA",
  },
  {
    number: "06",
    title: "TBA",
  },
];

/* =========================================================
   THEMES
========================================================= */

const themes = [
  {
    label: "Love",
    icon: <Heart size={18} />,
  },
  {
    label: "Faith",
    icon: <Sparkles size={18} />,
  },
  {
    label: "Healing",
    icon: <Music size={18} />,
  },
  {
    label: "Purpose",
    icon: <ArrowRight size={18} />,
  },
];

/* =========================================================
   PRODUCTS
========================================================= */

const ALLOWED_BUNDLES = [
  "Digital Album",
  "Signed CD",
  "Deluxe Bundle",
  "Collector Bundle",
];

/* =========================================================
   TYPES
========================================================= */

interface AlbumProduct {
  id: number;
  name: string;
  slug: string;
  product_type: "physical" | "digital";
  description: string;
  thumbnail: string | null;
  price: string;
  stock_quantity: number;
  is_active: boolean;
  featured: boolean;
}

/* =========================================================
   HELPERS
========================================================= */

function getMediaUrl(
  image: string | null
): string | null {
  if (!image) {
    return null;
  }

  if (
    image.startsWith("http://") ||
    image.startsWith("https://")
  ) {
    return image;
  }

  const apiOrigin =
    API_BASE_URL.replace(/\/api\/?$/, "");

  return `${apiOrigin}${
    image.startsWith("/") ? "" : "/"
  }${image}`;
}

function formatUSD(price: string): string {
  const amount = Number(price);

  if (Number.isNaN(amount)) {
    return "$0.00";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/* =========================================================
   ALBUM PAGE
========================================================= */

export default function AlbumPage() {
  const { addItem } = useCart();

  const [products, setProducts] = useState<
    AlbumProduct[]
  >([]);

  const [loadingProducts, setLoadingProducts] =
    useState(true);

  const [addingProductId, setAddingProductId] =
    useState<number | null>(null);

  /* =======================================================
     FETCH STORE PRODUCTS

     Correct Django endpoint:
     /api/store/products/
  ======================================================= */

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch(
          `${API_BASE_URL}/store/products/`,
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch products: ${response.status}`
          );
        }

        const data = await response.json();

        const productList: AlbumProduct[] =
          Array.isArray(data)
            ? data
            : Array.isArray(data.results)
              ? data.results
              : [];

        const albumProducts =
          productList.filter(
            (product) =>
              product.is_active &&
              ALLOWED_BUNDLES.includes(
                product.name
              )
          );

        const orderedProducts =
          ALLOWED_BUNDLES
            .map((bundleName) =>
              albumProducts.find(
                (product) =>
                  product.name === bundleName
              )
            )
            .filter(
              (
                product
              ): product is AlbumProduct =>
                Boolean(product)
            );

        setProducts(orderedProducts);
      } catch (error) {
        console.error(
          "Failed to load Album products:",
          error
        );

        setProducts([]);
      } finally {
        setLoadingProducts(false);
      }
    }

    loadProducts();
  }, []);

  /* =======================================================
     ADD PRODUCT TO CART
  ======================================================= */

  async function handleAddToCart(
    productId: number
  ) {
    try {
      setAddingProductId(productId);

      await addItem(productId, 1);
    } catch (error) {
      console.error(
        "Failed to add product to cart:",
        error
      );
    } finally {
      setAddingProductId(null);
    }
  }

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <>
      <Navbar />

      <main className="album-page">

        {/* =================================================
            HERO
        ================================================= */}

        <section className="album-hero">

          <div className="album-hero-overlay" />

          <div className="album-hero-content">

            <p className="album-kicker">
              New Album
            </p>

            <h1>
              {ALBUM_TITLE}
            </h1>

            <p className="album-script">
              {ALBUM_SCRIPT}
            </p>

            <p className="album-hero-text">
              {ALBUM_DESCRIPTION}
            </p>

            <div className="album-hero-actions">

              <Link
                href="#bundles"
                className="album-primary-btn"
              >
                <ShoppingCart
                  size={16}
                />

                Order Now
              </Link>

              <a
                href={SPOTIFY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="album-secondary-btn"
              >
                <Play
                  size={16}
                  fill="currentColor"
                />

                Listen Now
              </a>

            </div>

            <p className="album-release-date">
              Album Coming Soon
            </p>

          </div>

        </section>

        {/* =================================================
            ABOUT THE ALBUM
        ================================================= */}

        <section className="album-about">

          <div className="album-cover-wrap">

            <img
              src="/assets/images/about-album-cover.jpg"
              alt="Sochie album artwork"
              className="album-cover"
            />

            <div className="vinyl-disc" />

          </div>

          <div className="album-about-text">

            <p className="album-kicker">
              About The Album
            </p>

            <h2>
              {ALBUM_TITLE}
            </h2>

            <p>
              {ALBUM_DESCRIPTION}
            </p>

            <div className="album-themes">

              {themes.map((theme) => (
                <div
                  className="album-theme"
                  key={theme.label}
                >
                  {theme.icon}

                  <span>
                    {theme.label}
                  </span>
                </div>
              ))}

            </div>

          </div>

        </section>

        {/* =================================================
            TRACKLIST
        ================================================= */}

        <section className="album-feature">

          <div
            className="tracklist-card"
            id="tracklist"
          >

            <h2>
              Tracklist
            </h2>

            <div className="tracklist">

              {TRACKLIST.map((track) => (
                <div
                  className="track-row"
                  key={track.number}
                >

                  <button
                    type="button"
                    disabled
                    aria-label={`Preview ${track.title}`}
                  >
                    <Play
                      size={13}
                      fill="currentColor"
                    />
                  </button>

                  <span>
                    {track.number}
                  </span>

                  <p>
                    {track.title}
                  </p>

                  <strong>
                    —
                  </strong>

                </div>
              ))}

            </div>

            <a
              href={SPOTIFY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="spotify-preview"
            >
              Preview Full Album on Spotify
            </a>

          </div>

          <div className="album-quote">

            <div>

              <span className="quote-mark">
                “
              </span>

              <p>
                This album is for anyone
                who has ever loved, lost,
                healed, forgiven, grown,
                or simply kept going.
              </p>

              <h3>
                Sochie ♡
              </h3>

            </div>

          </div>

        </section>

        {/* =================================================
            PRODUCTS / BUNDLES
        ================================================= */}

        <section
          className="album-bundles"
          id="bundles"
        >

          <h2>
            Choose Your Bundle
          </h2>

          {loadingProducts ? (

            <div
              className="album-about-text"
              style={{
                textAlign: "center",
                margin: "0 auto",
              }}
            >
              <p>
                Loading album products...
              </p>
            </div>

          ) : products.length > 0 ? (

            <div className="bundle-grid">

              {products.map((product) => {

                const isAdding =
                  addingProductId ===
                  product.id;

                const isSoldOut =
                  product.stock_quantity === 0;

                const imageUrl =
                  getMediaUrl(
                    product.thumbnail
                  );

                return (
                  <article
                    className="bundle-card"
                    key={product.id}
                  >

                    {product.featured && (
                      <span className="popular-badge">
                        Most Popular
                      </span>
                    )}

                    <h3>
                      {product.name}
                    </h3>

                    <p
                      style={{
                        whiteSpace:
                          "pre-line",
                      }}
                    >
                      {product.description ||
                        (product.product_type ===
                        "digital"
                          ? "High Quality Digital Download"
                          : "Official Sochie Merchandise")}
                    </p>

                    <div className="bundle-icon">

                      {imageUrl ? (

                        <img
                          src={imageUrl}
                          alt={product.name}
                        />

                      ) : (

                        <Music
                          size={40}
                        />

                      )}

                    </div>

                    <strong>
                      {formatUSD(
                        product.price
                      )}
                    </strong>

                    <ul>

                      <li>
                        <Check
                          size={15}
                        />

                        {product.product_type ===
                        "digital"
                          ? "Digital Download"
                          : "Physical Product"}
                      </li>

                      <li>
                        <Check
                          size={15}
                        />

                        Official Sochie Product
                      </li>

                      {product.stock_quantity >
                        0 && (

                        <li>
                          <Check
                            size={15}
                          />

                          {product.stock_quantity}{" "}
                          Available
                        </li>

                      )}

                    </ul>

                    <button
                      type="button"
                      className="bundle-btn"
                      onClick={() =>
                        handleAddToCart(
                          product.id
                        )
                      }
                      disabled={
                        isAdding ||
                        isSoldOut
                      }
                    >

                      {isAdding
                        ? "Adding..."
                        : isSoldOut
                          ? "Sold Out"
                          : "Order Now"}

                    </button>

                  </article>
                );
              })}

            </div>

          ) : (

            <div
              className="album-about-text"
              style={{
                textAlign: "center",
                margin: "0 auto",
              }}
            >

              <p>
                Album purchase options
                will appear here once the
                four album products are
                uploaded in Django Admin.
              </p>

            </div>

          )}

        </section>

      </main>

      <Footer />
    </>
  );
}