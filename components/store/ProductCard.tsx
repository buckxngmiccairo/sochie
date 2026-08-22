"use client";

import Link from "next/link";

import { Product } from "@/app/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  return (
    <article className="product-card">
      <Link href={`/store/${product.slug}`}>
        <img
          src={
            product.thumbnail ??
            "/assets/images/album-cover.jpg"
          }
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