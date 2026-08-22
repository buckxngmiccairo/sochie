"use client";

import { Category } from "@/app/types/category";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onChange: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onChange,
}: CategoryFilterProps) {
  return (
    <section className="store-section">
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          flexWrap: "wrap",
          marginBottom: "2rem",
        }}
      >
        <button
          onClick={() => onChange("all")}
          className={
            selectedCategory === "all"
              ? "store-primary-btn"
              : "store-section-link"
          }
        >
          All
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() =>
              onChange(String(category.id))
            }
            className={
              selectedCategory ===
              String(category.id)
                ? "store-primary-btn"
                : "store-section-link"
            }
          >
            {category.name}
          </button>
        ))}
      </div>
    </section>
  );
}