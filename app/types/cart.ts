import { Product } from "./product";

export interface CartItem {
  id: number;

  product: Product;

  quantity: number;

  subtotal: string;
}

export interface Cart {
  id: number;

  session_key: string;

  items: CartItem[];

  total: string;

  created_at: string;
}