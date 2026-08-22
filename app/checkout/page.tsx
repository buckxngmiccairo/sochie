"use client";

import { useState } from "react";
import Link from "next/link";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import { ArrowLeft, CreditCard } from "lucide-react";

import { useCart } from "@/app/context/CartContext";
import { checkout } from "@/app/lib/api";

import "../../styles/store.css";

export default function CheckoutPage() {
  const { cart, totalItems, totalPrice } = useCart();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",

    country: "",
    state: "",
    city: "",

    address: "",
    notes: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleCheckout() {
    if (!cart) return;

    try {
      setLoading(true);

      const response = await checkout({
        session_key: cart.session_key,

        customer_name: form.customer_name,
        customer_email: form.customer_email,
        customer_phone: form.customer_phone,

        country: form.country,
        state: form.state,
        city: form.city,

        address: form.address,
        notes: form.notes,
      });

      window.location.href =
        response.payment.authorization_url;
    } catch (error) {
      console.error(error);
      alert("Unable to start payment.");
    } finally {
      setLoading(false);
    }
  }

    if (!cart) {
    return (
      <>
        <Navbar />

        <main className="store-page">
          <section className="store-section">
            <h2>Your cart is empty.</h2>

            <Link
              href="/store"
              className="store-primary-btn"
            >
              Continue Shopping
            </Link>
          </section>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="store-page">

        <section className="store-section">

          <Link
            href="/cart"
            className="store-section-link"
          >
            <ArrowLeft size={16} />
            Back To Cart
          </Link>

          <div
            className="store-heading-row"
            style={{ marginTop: "2rem" }}
          >
            <div>
              <p className="store-kicker">
                Checkout
              </p>

              <h2>Customer Information</h2>

              <p className="store-hero-text">
                Enter your details below to
                complete your purchase.
              </p>
            </div>

            <CreditCard size={42} />
          </div>

        </section>

        <section
          className="store-section"
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "2rem",
            alignItems: "start",
          }}
        >

          {/* CUSTOMER FORM */}

          <div className="product-card">

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(2,minmax(0,1fr))",
                gap: "1rem",
              }}
            >

              <input
                name="customer_name"
                placeholder="Full Name"
                value={form.customer_name}
                onChange={handleChange}
              />

              <input
                name="customer_email"
                type="email"
                placeholder="Email Address"
                value={form.customer_email}
                onChange={handleChange}
              />

              <input
                name="customer_phone"
                placeholder="Phone Number"
                value={form.customer_phone}
                onChange={handleChange}
              />

              <input
                name="country"
                placeholder="Country"
                value={form.country}
                onChange={handleChange}
              />

              <input
                name="state"
                placeholder="State"
                value={form.state}
                onChange={handleChange}
              />

              <input
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
              />

            </div>

            <input
              name="address"
              placeholder="Delivery Address (Optional)"
              value={form.address}
              onChange={handleChange}
              style={{
                width: "100%",
                marginTop: "1rem",
              }}
            />

            <textarea
              name="notes"
              placeholder="Additional Notes (Optional)"
              value={form.notes}
              onChange={handleChange}
              rows={5}
              style={{
                width: "100%",
                marginTop: "1rem",
              }}
            />

                        <div
              style={{
                marginTop: "2rem",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <button
                type="button"
                onClick={handleCheckout}
                disabled={loading}
                className="store-primary-btn"
              >
                {loading
                  ? "Processing..."
                  : "Proceed To Payment"}
              </button>
            </div>

          </div>

          {/* ORDER SUMMARY */}

          <div className="product-card">

            <h3>Order Summary</h3>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "2rem",
              }}
            >
              <span>Items</span>
              <strong>{totalItems}</strong>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "1rem",
              }}
            >
              <span>Subtotal</span>
              <strong>${totalPrice.toFixed(2)}</strong>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "1rem",
              }}
            >
              <span>Shipping</span>
              <span>Calculated after payment</span>
            </div>

            <hr style={{ margin: "2rem 0" }} />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontWeight: 700,
                fontSize: "1.2rem",
              }}
            >
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}