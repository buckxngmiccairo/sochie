"use client";

import Link from "next/link";

import { Product } from "@/app/types/product";
import { API_BASE_URL } from "@/app/lib/constants";

interface ProductCardProps {
  product: Product;
}

function getMediaUrl(image: string | null): string | null {
  if (!image) return null;

  if (
    image.startsWith("http://") ||
    image.startsWith("https://")
  ) {
    if (image.includes("res.cloudinary.com")) {
      return image.replace(
        "/image/upload/",
        "/image/upload/w_600,q_auto,f_auto/"
      );
    }

    return image;
  }

  const apiOrigin = API_BASE_URL.replace(/\/api\/?$/, "");

  return `${apiOrigin}${image.startsWith("/") ? "" : "/"}${image}`;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  const imageUrl =
    getMediaUrl(product.thumbnail) ??
    "/assets/images/album-cover.jpg";

  return (
    <article className="product-card">
      <Link href={`/store/${product.slug}`}>
        <img
          src={imageUrl}
          alt={product.name}
        />
      </Link>

      <div className="product-info">
        <h3>{product.name}</h3>

        <p>${product.price}</p>

        <div className="mt-4">
          <Link
            href={`/store/${product.slug}`}
            className="store-section-link"
          >
            View Product
          </Link>
        </div>
      </div>
    </article>
  );
}