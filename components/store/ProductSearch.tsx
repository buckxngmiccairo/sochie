"use client";

import { FormEvent } from "react";
import { Search } from "lucide-react";

interface ProductSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ProductSearch({
  value,
  onChange,
}: ProductSearchProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // ProductBrowser already filters as the user types.
    // Submitting the form simply keeps the current
    // search query active without reloading the page.
  }

  return (
    <section className="store-section store-search-section">
      <form
        className="store-search-form"
        onSubmit={handleSubmit}
      >
        <div className="store-search-input-wrap">
          <Search
            size={20}
            className="store-search-icon"
          />

          <input
            type="search"
            placeholder="Search music or merchandise..."
            value={value}
            onChange={(event) =>
              onChange(event.target.value)
            }
            aria-label="Search music or merchandise"
          />
        </div>

        <button
          type="submit"
          className="store-primary-btn store-search-button"
        >
          Search
        </button>
      </form>
    </section>
  );
}