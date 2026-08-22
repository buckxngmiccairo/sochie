import { Category } from "./category";

export interface ProductImage {
  id: number;
  image: string;
  alt_text: string;
}

export interface Product {
  id: number;
  category: Category;
  name: string;
  slug: string;

  product_type: "physical" | "digital";

  description: string;

  thumbnail: string | null;

  price: string;

  stock_quantity: number;

  is_active: boolean;

  created_at: string;

  images: ProductImage[];
}