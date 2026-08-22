"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  ArrowRight,
  CalendarDays,
  Clock,
  Heart,
  Mail,
  Music,
  Sparkles,
  Users,
} from "lucide-react";
import {
  FaInstagram,
  FaSpotify,
  FaTiktok,
  FaYoutube,
  FaSoundcloud,
} from "react-icons/fa";
import "../../styles/tour.css";

const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/sochiesiren",
  tiktok: "https://www.tiktok.com/@sochiesiren",
  youtube: "https://www.youtube.com/@iamsochie",
  spotify:
    "https://open.spotify.com/artist/6jplkSuba0FrGBLhywo2PG?si=ub4DE9yVQRqqs66ig_kEIw",
  soundcloud: "https://soundcloud.com/iamsochie",
};

const tourDates = [
  {
    number: "01",
    city: "New York, NY",
    venue: "Medgar Evers College",
    date: "Spring 2027",
    time: "TBD",
    image: "/assets/images/live-performance.jpg",
  },
  {
    number: "02",
    city: "Atlanta, GA",
    venue: "Morehouse College",
    date: "Spring 2027",
    time: "TBD",
    image: "/assets/images/stage-performance.jpg",
  },
  {
    number: "03",
    city: "Washington, DC",
    venue: "Howard University",
    date: "Spring 2027",
    time: "TBD",
    image: "/assets/images/staircase.jpg",
  },
  {
    number: "04",
    city: "Toronto, ON, Canada",
    venue: "York University",
    date: "Spring 2027",
    time: "TBD",
    image: "/assets/images/sochie-hero.jpg",
  },
];

const pillars = [
  {
    title: "Real Music",
    text: "Live. Raw. Soulful.",
    icon: <Heart />,
  },
  {
    title: "Real People",
    text: "Unity. Culture. Love.",
    icon: <Users />,
  },
  {
    title: "Real Purpose",
    text: "Inspire. Heal. Elevate.",
    icon: <Sparkles />,
  },
  {
    title: "Real You",
    text: "This journey is for us.",
    icon: <Music />,
  },
];

export default function TourPage() {
  const [email, setEmail] = useState("");
  const [newsletterMessage, setNewsletterMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  /*
   * ======================================
   * SCROLL TO NEWSLETTER
   * ======================================
   */

  function scrollToNewsletter() {
    const newsletter = document.getElementById("join-tour");

    if (!newsletter) {
      return;
    }

    newsletter.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }

  /*
   * ======================================
   * NEWSLETTER
   * ======================================
   */

  async function handleNewsletterSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setNewsletterMessage("Please enter your email address.");
      return;
    }

    setIsSubmitting(true);
    setNewsletterMessage("");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/contact/newsletter/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: trimmedEmail,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (data.email) {
          setNewsletterMessage(
            Array.isArray(data.email)
              ? data.email[0]
              : "Please enter a valid email address."
          );
        } else {
          setNewsletterMessage(
            data.message ||
              "Something went wrong. Please try again."
          );
        }

        return;
      }

      setNewsletterMessage(
        data.message ||
          "You have successfully joined the journey."
      );

      setEmail("");
    } catch {
      setNewsletterMessage(
        "Unable to connect right now. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Navbar />

      <main className="tour-page">

        {/* ======================================
            HERO
        ====================================== */}

        <section className="tour-hero">
          <div className="tour-hero-overlay" />

          <div className="tour-hero-content">

            <h1>
              Live.
              <br />
              Connect.
            </h1>

            <p className="tour-script">
              Feel the Journey.
            </p>

            <p className="tour-hero-text">
              Sochie is hitting the stage at some of the nation&apos;s top
              Black colleges and universities. Be a part of the movement.
            </p>

            <div className="tour-actions">

              <button
                type="button"
                onClick={scrollToNewsletter}
                className="tour-primary-btn"
              >
                Get Tour Updates
                <ArrowRight size={16} />
              </button>

              <a
                href={SOCIAL_LINKS.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="tour-secondary-btn"
              >
                Follow Sochie
              </a>

            </div>

            {/* SOCIAL LINKS */}

            <div className="tour-socials">

              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>

              <a
                href={SOCIAL_LINKS.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
              >
                <FaTiktok />
              </a>

              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <FaYoutube />
              </a>

              <a
                href={SOCIAL_LINKS.spotify}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Spotify"
              >
                <FaSpotify />
              </a>

              <a
                href={SOCIAL_LINKS.soundcloud}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SoundCloud"
              >
                <FaSoundcloud />
              </a>

            </div>

          </div>
        </section>


        {/* ======================================
            TOUR DATES
        ====================================== */}

        <section
          className="tour-section"
          id="tour-dates"
        >

          <div className="tour-heading">
            <span />
            <h2>Tour Dates</h2>
            <span />
          </div>

          <p className="tour-subtitle">
            A journey across campuses. A connection that lasts forever.
          </p>

          <div className="tour-grid">

            {tourDates.map((tour) => (

              <article
                className="tour-card"
                key={tour.city}
              >

                <div
                  className="tour-card-image"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(0,0,0,.05), rgba(0,0,0,.75)), url('${tour.image}')`,
                  }}
                >
                  <span>{tour.number}</span>
                </div>

                <div className="tour-card-body">

                  <h3>{tour.city}</h3>

                  <p>{tour.venue}</p>

                  <div className="tour-meta">
                    <CalendarDays size={16} />
                    <span>{tour.date}</span>
                  </div>

                  <div className="tour-meta">
                    <Clock size={16} />
                    <span>{tour.time}</span>
                  </div>

                  <button
                    type="button"
                    onClick={scrollToNewsletter}
                    className="tour-card-btn"
                  >
                    Get Updates
                  </button>

                </div>

              </article>

            ))}

          </div>
        </section>


        {/* ======================================
            MORE DATES
        ====================================== */}

        <section className="more-dates-banner">

          <div className="more-dates-icon">
            <CalendarDays />
          </div>

          <div>
            <h2>More Dates Coming Soon</h2>

            <p>
              Additional cities and campuses will be announced.
              Stay tuned and be the first to know.
            </p>
          </div>

          <button
            type="button"
            onClick={scrollToNewsletter}
            className="more-dates-btn"
          >
            Join The Journey
            <ArrowRight size={16} />
          </button>

        </section>


        {/* ======================================
            TOUR EXPERIENCE
        ====================================== */}

        <section className="tour-experience">

          <div className="tour-experience-image" />

          <div className="tour-experience-content">

            <p className="tour-kicker">
              More Than A Concert
            </p>

            <h2>
              An Experience.
              <br />
              A Movement.
            </h2>

            <p>
              Every show is an atmosphere of soul, purpose, and pure
              connection. This isn&apos;t just a performance, it&apos;s a moment
              we create together.
            </p>

            <div className="tour-pillars">

              {pillars.map((pillar) => (

                <div
                  className="tour-pillar"
                  key={pillar.title}
                >
                  {pillar.icon}

                  <h3>{pillar.title}</h3>

                  <span>{pillar.text}</span>
                </div>

              ))}

            </div>

          </div>

        </section>


        {/* ======================================
            TOUR NEWSLETTER
        ====================================== */}

        <section
          className="tour-newsletter"
          id="join-tour"
        >

          {/* IMAGE */}

          <div className="tour-newsletter-image">
            <img
              src="/assets/images/be-the-first-to-know.jpg"
              alt="Be the first to know"
            />
          </div>

          {/* CONTENT */}

          <div className="tour-newsletter-content">

            <div className="tour-newsletter-icon">
              <Mail />
            </div>

            <div>
              <h2>
                Be The First To Know
              </h2>

              <p>
                Get early access to tickets, exclusive content,
                tour updates, and special announcements.
              </p>
            </div>

            <form onSubmit={handleNewsletterSubmit}>

              <input
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="Enter your email address"
                aria-label="Email address"
                disabled={isSubmitting}
              />

              <button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "..."
                  : "Sign Me Up"}
              </button>

            </form>

            {newsletterMessage && (
              <p
                className="tour-newsletter-message"
                role="status"
              >
                {newsletterMessage}
              </p>
            )}

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}