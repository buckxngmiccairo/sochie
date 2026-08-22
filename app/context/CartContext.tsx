"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import {
  createCart,
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "@/app/lib/api";

import { Cart } from "@/app/types/cart";
import { DEFAULT_CART_KEY } from "@/app/lib/constants";

interface CartContextType {
  cart: Cart | null;

  loading: boolean;

  totalItems: number;

  totalPrice: number;

  refreshCart: () => Promise<void>;

  addItem: (
    productId: number,
    quantity?: number
  ) => Promise<void>;

  updateItem: (
    itemId: number,
    quantity: number
  ) => Promise<void>;

  removeItem: (
    itemId: number
  ) => Promise<void>;

  clear: () => Promise<void>;
}

const CartContext =
  createContext<CartContextType | null>(null);

interface Props {
  children: ReactNode;
}

export function CartProvider({
  children,
}: Props) {
  const [cart, setCart] =
    useState<Cart | null>(null);

  const [loading, setLoading] =
    useState(true);

  async function refreshCart() {
    try {
      const existing =
        await getCart(DEFAULT_CART_KEY);

      setCart(existing);
    } catch {
      const created =
        await createCart(DEFAULT_CART_KEY);

      setCart(created);
    }
  }

  async function addItem(
    productId: number,
    quantity = 1
  ) {
    try {
      await addToCart(
        DEFAULT_CART_KEY,
        productId,
        quantity
      );

      await refreshCart();
    } catch (error) {
      console.error(error);
    }
  }

  async function updateItem(
    itemId: number,
    quantity: number
  ) {
    try {
      await updateCartItem(
        itemId,
        quantity
      );

      await refreshCart();
    } catch (error) {
      console.error(error);
    }
  }

  async function removeItem(
    itemId: number
  ) {
    try {
      await removeCartItem(itemId);

      await refreshCart();
    } catch (error) {
      console.error(error);
    }
  }

  async function clear() {
    try {
      await clearCart(DEFAULT_CART_KEY);

      await refreshCart();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    async function loadCart() {
      try {
        await refreshCart();
      } finally {
        setLoading(false);
      }
    }

    loadCart();
  }, []);

  const totalItems =
    cart?.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    ) ?? 0;

  const totalPrice =
    Number(cart?.total ?? 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,

        totalItems,
        totalPrice,

        refreshCart,

        addItem,
        updateItem,
        removeItem,
        clear,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context =
    useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider."
    );
  }

  return context;
}