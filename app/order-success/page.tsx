"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import {
  CheckCircle2,
  Loader2,
} from "lucide-react";

import { verifyPayment } from "@/app/lib/api";
import { useCart } from "@/app/context/CartContext";

import "../../styles/store.css";

function OrderSuccessContent() {
  const params = useSearchParams();

  const reference =
    params.get("reference");

  const { clear } = useCart();

  const [loading, setLoading] =
    useState(true);

  const [orderNumber, setOrderNumber] =
    useState("");

  const [customerName, setCustomerName] =
    useState("");

  const [total, setTotal] =
    useState("");

  const [verified, setVerified] =
    useState(false);

  useEffect(() => {
    async function verify() {
      if (!reference) {
        setLoading(false);
        return;
      }

      try {
        const result =
          await verifyPayment(reference);

        setVerified(true);

        setOrderNumber(
          String(result.order.id)
        );

        setCustomerName(
          result.order.customer_name
        );

        setTotal(
          result.order.total_amount
        );

        await clear();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    verify();
  }, [reference]);

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="store-page">
          <section className="store-section">
            <div
              style={{
                textAlign: "center",
                padding: "6rem 0",
              }}
            >
              <Loader2
                size={60}
                className="animate-spin"
              />

              <h2
                style={{
                  marginTop: "2rem",
                }}
              >
                Verifying payment...
              </h2>
            </div>
          </section>
        </main>

        <Footer />
      </>
    );
  }

  if (!verified) {
    return (
      <>
        <Navbar />

        <main className="store-page">
          <section className="store-section">
            <h2>
              Unable to verify payment.
            </h2>

            <Link
              href="/store"
              className="store-primary-btn"
            >
              Return To Store
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
        <section
          className="store-section"
          style={{
            textAlign: "center",
            maxWidth: "700px",
            margin: "0 auto",
          }}
        >
          <CheckCircle2
            size={90}
            color="#22c55e"
          />

          <p className="store-kicker">
            Payment Successful
          </p>

          <h1>
            Thank You,
            <br />
            {customerName}
          </h1>

          <p className="store-hero-text">
            Your payment has been verified.
            <br />
            Your order is now being processed.
          </p>

          <div
            className="product-card"
            style={{
              marginTop: "3rem",
            }}
          >
            <p>
              <strong>Order #</strong>
              <br />
              {orderNumber}
            </p>

            <p
              style={{
                marginTop: "1.5rem",
              }}
            >
              <strong>Total Paid</strong>
              <br />
              ${total}
            </p>
          </div>

          <Link
            href="/store"
            className="store-primary-btn"
            style={{
              marginTop: "3rem",
            }}
          >
            Continue Shopping
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <>
          <Navbar />

          <main className="store-page">
            <section className="store-section">
              <div
                style={{
                  textAlign: "center",
                  padding: "6rem 0",
                }}
              >
                <Loader2
                  size={60}
                  className="animate-spin"
                />

                <h2
                  style={{
                    marginTop: "2rem",
                  }}
                >
                  Loading order confirmation...
                </h2>
              </div>
            </section>
          </main>

          <Footer />
        </>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}