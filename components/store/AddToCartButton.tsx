"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";

import { useCart } from "@/app/context/CartContext";

interface AddToCartButtonProps {
  productId: number;
  disabled?: boolean;
}

export default function AddToCartButton({
  productId,
  disabled = false,
}: AddToCartButtonProps) {
  const { addItem } = useCart();

  const [adding, setAdding] = useState(false);

  async function handleAddToCart() {
    if (disabled || adding) {
      return;
    }

    try {
      setAdding(true);

      await addItem(productId);

      alert("Product added to cart.");
    } catch (error) {
      console.error(error);

      alert("Unable to add product to cart.");
    } finally {
      setAdding(false);
    }
  }

  return (
    <button
      type="button"
      className="store-primary-btn"
      onClick={handleAddToCart}
      disabled={disabled || adding}
    >
      <ShoppingCart size={18} />

      {adding ? "Adding..." : "Add To Cart"}
    </button>
  );
}