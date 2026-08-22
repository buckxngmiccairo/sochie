import { Product } from "./product";

export interface OrderItem {
  id: number;

  order: number;

  product: Product;

  quantity: number;

  price: string;
}

export interface Order {
  id: number;

  cart: number | null;

  customer_name: string;

  customer_email: string;

  customer_phone: string;

  country: string;

  state: string;

  city: string;

  address: string;

  order_type:
    | "digital"
    | "physical"
    | "mixed";

  status:
    | "pending"
    | "paid"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "failed"
    | "refunded";

  payment_method:
    | "paystack"
    | "stripe"
    | "bank_transfer"
    | "cash";

  payment_reference: string | null;

  total_amount: string;

  notes: string;

  paid_at: string | null;

  created_at: string;

  updated_at: string;

  items: OrderItem[];
}

export interface Payment {
  authorization_url: string;

  access_code: string;

  reference: string;
}

export interface CheckoutResponse {
  message: string;

  order: Order;

  payment: Payment;
}
