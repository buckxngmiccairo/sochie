import Link from "next/link";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductBrowser from "@/components/store/ProductBrowser";

import {
  getProducts,
  getCategories,
} from "@/app/lib/api";

import {
  ArrowRight,
  Heart,
  Lock,
  RefreshCw,
  Truck,
} from "lucide-react";

import "../../styles/store.css";

const benefits = [
  {
    title: "Worldwide Shipping",
    text: "Delivering to fans around the world.",
    icon: <Truck />,
  },
  {
    title: "Secure Checkout",
    text: "Your payment info is safe and encrypted.",
    icon: <Lock />,
  },
  {
    title: "Easy Returns",
    text: "Not satisfied? We've got you.",
    icon: <RefreshCw />,
  },
  {
    title: "Support The Mission",
    text: "Every purchase helps fuel the movement.",
    icon: <Heart />,
  },
];

export default async function StorePage() {
  const products = await getProducts();
  const categories = await getCategories();

  return (
    <>
      <Navbar />

      <main className="store-page">

        {/* ========================= */}
        {/* HERO */}
        {/* ========================= */}

        <section className="store-hero">
          <div className="store-hero-overlay" />

          <div className="store-hero-content">
            <p className="store-kicker">
              Store
            </p>

            <h1>
              Wear The
              <br />
              Journey.
            </h1>

            <p className="store-script">
              Represent the purpose.
            </p>

            <p className="store-hero-text">
              More than merch — it's a movement.
              Every piece tells a story.
              Every purchase supports the mission.
            </p>

            <Link
              href="#featured-products"
              className="store-primary-btn"
            >
              Shop Now

              <ArrowRight size={16} />
            </Link>
          </div>
        </section>


        {/* ========================= */}
        {/* PRODUCT BROWSER */}
        {/* ========================= */}

        <section
          className="store-section"
          id="featured-products"
        >
          <div className="store-heading-row">
            <h2>
              Featured Music
            </h2>

            <Link
              href="#featured-products"
              className="store-section-link"
            >
              Browse Collection

              <ArrowRight size={16} />
            </Link>
          </div>

          <ProductBrowser
            products={products}
            categories={categories}
          />
        </section>


        {/* ========================= */}
        {/* BENEFITS */}
        {/* ========================= */}

        <section className="store-benefits">
          {benefits.map((benefit) => (
            <div
              className="benefit-card"
              key={benefit.title}
            >
              <span>
                {benefit.icon}
              </span>

              <div>
                <h3>
                  {benefit.title}
                </h3>

                <p>
                  {benefit.text}
                </p>
              </div>
            </div>
          ))}
        </section>


        {/* ========================= */}
        {/* LIMITED DROP */}
        {/* ========================= */}

        <section className="limited-drop">
          <div className="limited-image" />

          <div className="limited-content">
            <p className="store-kicker">
              Exclusive Collection
            </p>

            <h2>
              Limited Drop.
              <br />
              Exclusive For You.
            </h2>

            <p>
              New pieces.
              Limited quantities.
              Don't miss what's next.
            </p>
          </div>

          <div className="limited-cta">
            <Link href="#join-journey">
              Join The List

              <ArrowRight size={16} />
            </Link>

            <p>
              Be the first to know about
              exclusive drops and offers.
            </p>
          </div>
        </section>

      </main>

      <Footer />

      {/* ========================= */}
      {/* JOIN JOURNEY TARGET */}
      {/* ========================= */}

      <div id="join-journey" />

    </>
  );
}