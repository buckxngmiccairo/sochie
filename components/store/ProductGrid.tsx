"use client";

import { Product } from "@/app/types/product";

import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({
  products,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <section className="store-section">
        <h3>No products found.</h3>

        <p className="store-hero-text">
          Try another search or category.
        </p>
      </section>
    );
  }

  return (
    <section className="store-section">
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}