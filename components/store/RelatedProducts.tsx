"use client";

import Link from "next/link";

import { Product } from "@/app/types/product";

interface RelatedProductsProps {
  currentProduct: Product;
  products: Product[];
}

export default function RelatedProducts({
  currentProduct,
  products,
}: RelatedProductsProps) {
  const relatedProducts = products
    .filter(
      (product) =>
        product.id !== currentProduct.id &&
        product.category?.id === currentProduct.category?.id
    )
    .slice(0, 4);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="store-section">
      <div className="store-heading-row">
        <h2>You May Also Like</h2>
      </div>

      <div className="product-grid">
        {relatedProducts.map((product) => (
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
                className="store-primary-btn"
              >
                View Details
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}