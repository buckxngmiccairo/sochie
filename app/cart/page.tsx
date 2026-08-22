"use client";

import { useEffect } from "react";
import Link from "next/link";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import {
  ArrowLeft,
  ShoppingBag,
} from "lucide-react";

import { useCart } from "@/app/context/CartContext";

import { API_BASE_URL } from "@/app/lib/constants";

import "../../styles/store.css";


/**
 * ======================================
 * PRODUCT IMAGE HELPER
 * ======================================
 *
 * Django may return either:
 *
 * /media/products/...
 *
 * or:
 *
 * http://127.0.0.1:8000/media/products/...
 *
 * This function makes sure the browser
 * requests the image from Django rather
 * than from the Next.js frontend.
 */

function getImageUrl(
  imageUrl: string | null | undefined
): string {

  if (!imageUrl) {
    return "/assets/images/about-album-cover.jpg";
  }

  if (
    imageUrl.startsWith("http://") ||
    imageUrl.startsWith("https://")
  ) {
    return imageUrl;
  }

  try {
    return new URL(
      imageUrl,
      API_BASE_URL
    ).toString();

  } catch {
    return "/assets/images/about-album-cover.jpg";
  }
}


/**
 * ======================================
 * CART PAGE
 * ======================================
 */

export default function CartPage() {

  const {
    cart,
    loading,
    refreshCart,
    updateItem,
    removeItem,
  } = useCart();


  /**
   * ======================================
   * LOAD CART
   * ======================================
   */

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);


  /**
   * ======================================
   * LOADING STATE
   * ======================================
   */

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="store-page">

          <section className="store-section">

            <h1>
              Loading Cart...
            </h1>

          </section>

        </main>

        <Footer />
      </>
    );
  }


  /**
   * ======================================
   * CART ERROR STATE
   * ======================================
   */

  if (!cart) {
    return (
      <>
        <Navbar />

        <main className="store-page">

          <section className="store-section">

            <h1>
              Unable to load cart.
            </h1>

          </section>

        </main>

        <Footer />
      </>
    );
  }


  /**
   * IMPORTANT:
   *
   * After the null check above,
   * store the cart in a new constant.
   *
   * This prevents TypeScript from
   * complaining that cart may be null
   * inside the nested rendering functions.
   */

  const currentCart = cart;


  /**
   * ======================================
   * RENDER CART ITEMS
   * ======================================
   */

  function renderCartItems() {

    if (
      currentCart.items.length === 0
    ) {

      return (
        <div
          style={{
            textAlign: "center",
            padding: "5rem 0",
          }}
        >

          <h2>
            Your cart is empty.
          </h2>


          <p
            style={{
              marginTop: "1rem",
              opacity: 0.75,
            }}
          >
            Discover merchandise from the
            official Sochie Store.
          </p>


          <Link
            href="/store"
            className="store-primary-btn"
            style={{
              display: "inline-flex",
              marginTop: "2rem",
            }}
          >
            Continue Shopping
          </Link>

        </div>
      );
    }


    return (
      <div className="cart-items">

        {currentCart.items.map(
          (item) => {

            const imageUrl =
              getImageUrl(
                item.product.thumbnail
              );


            return (
              <div
                key={item.id}
                className="product-card"
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "140px 1fr auto",
                  gap: "2rem",
                  alignItems: "center",
                  marginBottom: "2rem",
                }}
              >

                {/* ==================================
                    PRODUCT IMAGE
                    ================================== */}

                <Link
                  href={`/store/${item.product.slug}`}
                >

                  <img
                    src={imageUrl}
                    alt={item.product.name}
                    style={{
                      width: "140px",
                      height: "140px",
                      objectFit: "cover",
                      borderRadius: "10px",
                      display: "block",
                    }}

                    onError={(event) => {

                      event.currentTarget.onerror =
                        null;

                      event.currentTarget.src =
                        "/assets/images/about-album-cover.jpg";

                    }}
                  />

                </Link>


                {/* ==================================
                    PRODUCT INFORMATION
                    ================================== */}

                <div>

                  <h3>
                    {item.product.name}
                  </h3>


                  <p
                    style={{
                      margin: "0.75rem 0",
                      opacity: 0.75,
                    }}
                  >
                    {item.product.description}
                  </p>


                  <strong>
                    $
                    {Number(
                      item.product.price
                    ).toFixed(2)}
                  </strong>

                </div>


                {/* ==================================
                    QUANTITY / REMOVE / SUBTOTAL
                    ================================== */}

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    alignItems: "center",
                  }}
                >

                  {/* Quantity */}

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                    }}
                  >

                    <button
                      className="store-primary-btn"
                      onClick={() =>
                        updateItem(
                          item.id,
                          item.quantity - 1
                        )
                      }
                    >
                      −
                    </button>


                    <strong>
                      {item.quantity}
                    </strong>


                    <button
                      className="store-primary-btn"
                      onClick={() =>
                        updateItem(
                          item.id,
                          item.quantity + 1
                        )
                      }
                    >
                      +
                    </button>

                  </div>


                  {/* Remove */}

                  <button
                    className="store-section-link"
                    onClick={() =>
                      removeItem(item.id)
                    }
                  >
                    Remove
                  </button>


                  {/* Subtotal */}

                  <strong>

                    $
                    {(
                      Number(
                        item.product.price
                      ) *
                      item.quantity
                    ).toFixed(2)}

                  </strong>

                </div>

              </div>
            );
          }
        )}

      </div>
    );
  }


  /**
   * ======================================
   * ORDER SUMMARY
   * ======================================
   */

  function renderOrderSummary() {

    const totalItems =
      currentCart.items.reduce(
        (sum, item) =>
          sum + item.quantity,
        0
      );


    return (
      <div
        className="product-card"
        style={{
          maxWidth: "420px",
          marginLeft: "auto",
        }}
      >

        <h2>
          Order Summary
        </h2>


        <hr
          style={{
            margin: "1.5rem 0",
          }}
        />


        {/* Items */}

        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            marginBottom: "1rem",
          }}
        >

          <span>
            Items
          </span>

          <strong>
            {totalItems}
          </strong>

        </div>


        {/* Shipping */}

        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            marginBottom: "1rem",
          }}
        >

          <span>
            Shipping
          </span>

          <span>
            Calculated at checkout
          </span>

        </div>


        {/* Total */}

        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            fontSize: "1.2rem",
            fontWeight: 700,
            marginTop: "2rem",
          }}
        >

          <span>
            Total
          </span>


          <span>

            $
            {Number(
              currentCart.total
            ).toFixed(2)}

          </span>

        </div>


        {/* Checkout */}

        <Link
          href="/checkout"
          className="store-primary-btn"
          style={{
            display: "flex",
            justifyContent:
              "center",
            marginTop: "2rem",
          }}
        >
          Proceed To Checkout
        </Link>


        {/* Continue Shopping */}

        <Link
          href="/store"
          className="store-section-link"
          style={{
            display: "flex",
            justifyContent:
              "center",
            marginTop: "1rem",
          }}
        >
          Continue Shopping
        </Link>

      </div>
    );
  }


  /**
   * ======================================
   * PAGE
   * ======================================
   */

  return (
    <>
      <Navbar />


      <main className="store-page">


        {/* ==================================
            CART HEADER
            ================================== */}

        <section className="store-section">


          <Link
            href="/store"
            className="store-section-link"
          >

            <ArrowLeft size={16} />

            Continue Shopping

          </Link>


          <div
            className="store-heading-row"
            style={{
              marginTop: "2rem",
            }}
          >

            <div>

              <p className="store-kicker">
                Shopping Cart
              </p>


              <h2>
                Your Selected Merchandise
              </h2>


              <p
                style={{
                  marginTop: "0.75rem",
                  opacity: 0.75,
                }}
              >
                Review your items before
                proceeding to checkout.
              </p>

            </div>


            <ShoppingBag size={42} />

          </div>

        </section>


        {/* ==================================
            CART ITEMS
            ================================== */}

        <section className="store-section">

          {renderCartItems()}

        </section>


        {/* ==================================
            ORDER SUMMARY
            ================================== */}

        <section className="store-section">

          {renderOrderSummary()}

        </section>


      </main>


      <Footer />

    </>
  );
}