// ======================================
// API CONFIGURATION
// ======================================

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8000/api";


// ======================================
// API ENDPOINTS
// ======================================

export const API_ENDPOINTS = {

  // ======================================
  // Products
  // ======================================

  PRODUCTS: "/store/products/",

  GET_PRODUCT: (slug: string) =>
    `/store/products/${slug}/`,

  CATEGORIES: "/store/categories/",


  // ======================================
  // Cart
  // ======================================

  CREATE_CART: "/store/cart/",

  GET_CART: (sessionKey: string) =>
    `/store/cart/${sessionKey}/`,

  ADD_TO_CART: "/store/cart/add-item/",

  UPDATE_CART_ITEM:
    "/store/cart/update-item/",

  REMOVE_CART_ITEM:
    "/store/cart/remove-item/",

  CLEAR_CART: (sessionKey: string) =>
    `/store/cart/clear/${sessionKey}/`,


  // ======================================
  // Checkout
  // ======================================

  CHECKOUT: "/store/checkout/",

  VERIFY_PAYMENT: (reference: string) =>
    `/store/payments/verify/${reference}/`,


  // ======================================
  // Orders
  // ======================================

  ORDERS: "/store/orders/",

} as const;


// ======================================
// APP CONFIGURATION
// ======================================

export const APP_NAME = "SOCHIE";

export const CURRENCY = "USD";

export const DEFAULT_CART_KEY =
  "sochie_cart";