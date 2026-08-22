"use client";

import { useMemo, useState } from "react";

import { Product } from "@/app/types/product";
import { Category } from "@/app/types/category";

import ProductSearch from "./ProductSearch";
import CategoryFilter from "./CategoryFilter";
import FeaturedProducts from "./FeaturedProducts";
import ProductGrid from "./ProductGrid";

interface ProductBrowserProps {
  products: Product[];
  categories: Category[];
}

export default function ProductBrowser({
  products,
  categories,
}: ProductBrowserProps) {
  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("all");

  /*
   * ================================
   * FEATURED PRODUCTS
   * ================================
   *
   * The first four products are used
   * as the Featured Products section.
   */

  const featuredProducts = useMemo(() => {
    return products.slice(0, 4);
  }, [products]);

  /*
   * ================================
   * FILTER PRODUCTS
   * ================================
   */

  const filteredProducts = useMemo(() => {
    const searchTerm =
      search.trim().toLowerCase();

    const filtered = products.filter((product) => {
      /*
       * SEARCH
       */

      const matchesSearch =
        searchTerm === "" ||
        product.name
          .toLowerCase()
          .includes(searchTerm) ||
        product.description
          ?.toLowerCase()
          .includes(searchTerm);

      /*
       * CATEGORY
       */

      let matchesCategory = true;

      if (selectedCategory !== "all") {
        const productCategoryId =
          typeof product.category === "object"
            ? product.category?.id
            : product.category;

        matchesCategory =
          String(productCategoryId) ===
          String(selectedCategory);
      }

      return (
        matchesSearch &&
        matchesCategory
      );
    });

    /*
     * When viewing the complete store without
     * a search, the first four products are
     * already displayed in Featured Products.
     *
     * Remove them from the main grid so they
     * don't appear twice.
     */

    if (
      selectedCategory === "all" &&
      searchTerm === ""
    ) {
      const featuredIds = new Set(
        featuredProducts.map(
          (product) => product.id
        )
      );

      return filtered.filter(
        (product) =>
          !featuredIds.has(product.id)
      );
    }

    return filtered;
  }, [
    products,
    search,
    selectedCategory,
    featuredProducts,
  ]);

  const showFeatured =
    selectedCategory === "all" &&
    search.trim() === "" &&
    featuredProducts.length >= 4;

  return (
    <>
      {/* ================================ */}
      {/* SEARCH */}
      {/* ================================ */}

      <ProductSearch
        value={search}
        onChange={setSearch}
      />

      {/* ================================ */}
      {/* CATEGORY FILTER */}
      {/* ================================ */}

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onChange={setSelectedCategory}
      />

      {/* ================================ */}
      {/* FEATURED PRODUCTS */}
      {/* ================================ */}

      {showFeatured && (
        <FeaturedProducts
          products={featuredProducts}
        />
      )}

      {/* ================================ */}
      {/* FILTERED PRODUCTS */}
      {/* ================================ */}

      <ProductGrid
        products={filteredProducts}
      />
    </>
  );
}