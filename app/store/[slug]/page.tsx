import Link from "next/link";
import { notFound } from "next/navigation";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AddToCartButton from "@/components/store/AddToCartButton";

import { getProduct } from "@/app/lib/api";

import {
  ArrowLeft,
  Truck,
  ShieldCheck,
  RefreshCw,
  Check,
} from "lucide-react";

import "../../../styles/store.css";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({
  params,
}: Props) {
  const { slug } = await params;

  let product;

  try {
    product = await getProduct(slug);
  } catch {
    notFound();
  }

  return (
    <>
      <Navbar />

      <main className="store-page">

        {/* ========================= */}
        {/* BREADCRUMB */}
        {/* ========================= */}

        <section className="store-section">
          <Link
            href="/store"
            className="store-section-link"
          >
            <ArrowLeft size={16} />
            Back to Store
          </Link>
        </section>


        {/* ========================= */}
        {/* PRODUCT */}
        {/* ========================= */}

        <section className="store-section">

          <div className="product-details-grid">

            {/* LEFT */}
            <div className="product-gallery">

              <img
                src={
                  product.thumbnail ??
                  "/assets/images/album-cover.jpg"
                }
                alt={product.name}
                className="product-main-image"
              />

              {product.images.length > 0 && (
                <div className="product-thumbnails">

                  {product.images.map((image) => (
                    <img
                      key={image.id}
                      src={image.image}
                      alt={image.alt_text}
                    />
                  ))}

                </div>
              )}

            </div>


            {/* RIGHT */}
            <div className="product-content">

              <p className="store-kicker">
                {product.category.name}
              </p>

              <h1>
                {product.name}
              </h1>

              <h2>
                ${product.price}
              </h2>

              <p>
                {product.description}
              </p>


              {/* ========================= */}
              {/* PRICE / CART */}
              {/* ========================= */}

              <div className="product-price-box">

                <div className="price-row">

                  <strong>
                    ${product.price}
                  </strong>

                  <span>
                    {product.stock_quantity > 0
                      ? "In Stock"
                      : "Out of Stock"}
                  </span>

                </div>


                <div className="product-actions">

                  <AddToCartButton
                    productId={product.id}
                    disabled={
                      product.stock_quantity === 0
                    }
                  />

                </div>

              </div>


              {/* ========================= */}
              {/* FEATURES */}
              {/* ========================= */}

              <div className="product-features">

                <div>
                  <Truck size={18} />

                  <span>
                    Worldwide Shipping
                  </span>
                </div>

                <div>
                  <ShieldCheck size={18} />

                  <span>
                    Secure Checkout
                  </span>
                </div>

                <div>
                  <RefreshCw size={18} />

                  <span>
                    Easy Returns
                  </span>
                </div>

              </div>


              {/* ========================= */}
              {/* MORE IMAGES */}
              {/* ========================= */}

              {product.images.length > 0 && (
                <div className="product-extra-images">

                  <h3>
                    More Images
                  </h3>

                  <div className="product-thumbnails">

                    {product.images.map((image) => (
                      <img
                        key={image.id}
                        src={image.image}
                        alt={image.alt_text}
                      />
                    ))}

                  </div>

                </div>
              )}


              <hr />


              {/* ========================= */}
              {/* PRODUCT DETAILS */}
              {/* ========================= */}

              <div className="product-description">

                <h3>
                  Product Details
                </h3>

                <p>
                  {product.description}
                </p>

              </div>


              <hr />


              {/* ========================= */}
              {/* PRODUCT META */}
              {/* ========================= */}

              <div className="product-meta">

                <div>
                  <strong>
                    Category
                  </strong>

                  <p>
                    {product.category.name}
                  </p>
                </div>

                <div>
                  <strong>
                    Product Type
                  </strong>

                  <p>
                    {product.product_type}
                  </p>
                </div>

                <div>
                  <strong>
                    Availability
                  </strong>

                  <p>
                    {product.stock_quantity > 0
                      ? `${product.stock_quantity} in stock`
                      : "Out of Stock"}
                  </p>
                </div>

              </div>

            </div>

          </div>

        </section>


        {/* ========================= */}
        {/* BENEFITS */}
        {/* ========================= */}

        <section className="store-benefits">

          <div className="benefit-card">

            <Check />

            <div>
              <h3>
                Official Merchandise
              </h3>

              <p>
                Authentic products directly from Sochie.
              </p>
            </div>

          </div>


          <div className="benefit-card">

            <Truck />

            <div>
              <h3>
                Worldwide Shipping
              </h3>

              <p>
                Delivery available internationally.
              </p>
            </div>

          </div>


          <div className="benefit-card">

            <ShieldCheck />

            <div>
              <h3>
                Secure Payments
              </h3>

              <p>
                Protected checkout experience.
              </p>
            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}