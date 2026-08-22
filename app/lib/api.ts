import { API_BASE_URL, API_ENDPOINTS } from "./constants";

import { Product } from "@/app/types/product";
import { Category } from "@/app/types/category";
import { Cart } from "@/app/types/cart";
import {
  Order,
  CheckoutResponse,
} from "@/app/types/order";

/**
 * ======================================
 * Generic API Request Helper
 * ======================================
 */

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
    cache: "no-store",
  });

  if (!response.ok) {
    let message = "Something went wrong.";

    try {
      const error = await response.json();
      message = error.detail || error.message || message;
    } catch {
      // Ignore invalid JSON responses
    }

    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

/**
 * ======================================
 * Products
 * ======================================
 */

export const getProducts = (): Promise<Product[]> =>
  request<Product[]>(API_ENDPOINTS.PRODUCTS);

export const getProduct = (
  slug: string
): Promise<Product> =>
  request<Product>(
    API_ENDPOINTS.GET_PRODUCT(slug)
  );

export const getCategories = (): Promise<Category[]> =>
  request<Category[]>(API_ENDPOINTS.CATEGORIES);

/**
 * ======================================
 * Cart
 * ======================================
 */

export const createCart = (
  sessionKey: string
): Promise<Cart> =>
  request<Cart>(API_ENDPOINTS.CREATE_CART, {
    method: "POST",
    body: JSON.stringify({
      session_key: sessionKey,
    }),
  });

export const getCart = (
  sessionKey: string
): Promise<Cart> =>
  request<Cart>(API_ENDPOINTS.GET_CART(sessionKey));

export const addToCart = (
  sessionKey: string,
  productId: number,
  quantity: number
): Promise<Cart> =>
  request<Cart>(API_ENDPOINTS.ADD_TO_CART, {
    method: "POST",
    body: JSON.stringify({
      session_key: sessionKey,
      product_id: productId,
      quantity,
    }),
  });

export const updateCartItem = (
  itemId: number,
  quantity: number
): Promise<Cart> =>
  request<Cart>(API_ENDPOINTS.UPDATE_CART_ITEM, {
    method: "PATCH",
    body: JSON.stringify({
      item_id: itemId,
      quantity,
    }),
  });

export const removeCartItem = (
  itemId: number
): Promise<Cart> =>
  request<Cart>(API_ENDPOINTS.REMOVE_CART_ITEM, {
    method: "DELETE",
    body: JSON.stringify({
      item_id: itemId,
    }),
  });

export const clearCart = (
  sessionKey: string
): Promise<Cart> =>
  request<Cart>(API_ENDPOINTS.CLEAR_CART(sessionKey), {
    method: "DELETE",
  });

/**
 * ======================================
 * Checkout
 * ======================================
 */

export interface CheckoutPayload {
  session_key: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  country: string;
  state: string;
  city: string;
  address?: string;
  notes?: string;
}

export const checkout = (
  payload: CheckoutPayload
): Promise<CheckoutResponse> =>
  request<CheckoutResponse>(
    API_ENDPOINTS.CHECKOUT,
    {
      method: "POST",
      body: JSON.stringify(payload),
    }
  );

export const verifyPayment = (
  reference: string
): Promise<CheckoutResponse> =>
  request<CheckoutResponse>(
    API_ENDPOINTS.VERIFY_PAYMENT(reference)
  );

/**
 * ======================================
 * Orders
 * ======================================
 */

export const getOrders = (): Promise<Order[]> =>
  request<Order[]>(API_ENDPOINTS.ORDERS);

/**
 * ======================================
 * Contact
 * ======================================
 */

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  message: string;
  submission?: {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    created_at: string;
  };
}

export const sendContactMessage = (
  payload: ContactPayload
): Promise<ContactResponse> =>
  request<ContactResponse>(
    "/contact/message/",
    {
      method: "POST",
      body: JSON.stringify(payload),
    }
  );


/**
 * ======================================
 * Newsletter
 * ======================================
 */

export interface NewsletterPayload {
  email: string;
}

export interface NewsletterResponse {
  message: string;
  subscriber?: {
    id: number;
    email: string;
    subscribed_at: string;
  };
}

export const subscribeToNewsletter = (
  payload: NewsletterPayload
): Promise<NewsletterResponse> =>
  request<NewsletterResponse>(
    "/contact/newsletter/",
    {
      method: "POST",
      body: JSON.stringify(payload),
    }
  );