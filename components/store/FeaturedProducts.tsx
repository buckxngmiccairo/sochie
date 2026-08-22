"use client";

import Link from "next/link";

import { Product } from "@/app/types/product";

interface FeaturedProductsProps {
  products: Product[];
}

export default function FeaturedProducts({
  products,
}: FeaturedProductsProps) {
  // Don't display Featured Products until
  // there are at least 4 products.
  if (products.length < 4) {
    return null;
  }

  return (
    <section className="store-section">
      <div className="store-heading-row">
        <h2>Featured Products</h2>
      </div>

      <div className="product-grid">
        {products.slice(0, 4).map((product) => (
          <article
            key={product.id}
            className="product-card"
          >
            <img
              src={
                product.thumbnail ||
                "/assets/images/album-cover.jpg"
              }
              alt={product.name}
            />

            <div className="product-info">
              <h3>{product.name}</h3>

              <p>${product.price}</p>

              <Link
                href={`/store/${product.slug}`}
                className="store-section-link"
              >
                View Product
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}