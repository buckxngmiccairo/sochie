"use client";

import Link from "next/link";

import { useState } from "react";

import type {
  ChangeEvent,
  FormEvent,
} from "react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import "../../styles/contact.css";

import { sendContactMessage } from "@/app/lib/api";

import {
  ArrowRight,
  Building2,
  CalendarDays,
  Clock3,
  Mail,
  MapPin,
  Mic2,
  Phone,
  Send,
  Users,
} from "lucide-react";

import {
  FaInstagram,
  FaSpotify,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";


/* =========================================
   SOCIAL & STREAMING LINKS
========================================= */

const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/sochiesiren",
  tiktok: "https://www.tiktok.com/@sochiesiren",
  youtube: "https://www.youtube.com/@iamsochie",
  spotify:
    "https://open.spotify.com/artist/6jplkSuba0FrGBLhywo2PG?si=ub4DE9yVQRqqs66ig_kEIw",
};

const STREAM_LINKS = {
  spotify:
    "https://open.spotify.com/artist/6jplkSuba0FrGBLhywo2PG?si=ub4DE9yVQRqqs66ig_kEIw",
  appleMusic:
    "https://music.apple.com/us/artist/sochie/1896466678",
  audiomack:
    "https://audiomack.com/iamsochie",
  youtube:
    "https://www.youtube.com/@iamsochie",
};


/* =========================================
   CONTACT INFORMATION
========================================= */

const contactInfo = [
  {
    title: "Email",
    text: "info@sochiemusic.com",
    icon: <Mail />,
  },
  {
    title: "Booking",
    text: "booking@sochiemusic.com",
    icon: <Phone />,
  },
  {
    title: "Location",
    text: "New York, NY",
    icon: <MapPin />,
  },
  {
    title: "Response Time",
    text: "Within 48 Hours",
    icon: <Clock3 />,
  },
];


/* =========================================
   BOOKING TYPES
========================================= */

const bookingTypes = [
  {
    title: "Performances",
    text: "Concerts, festivals, campus events",
    icon: <CalendarDays />,
  },
  {
    title: "Speaking Engagements",
    text: "Panels, keynotes, workshops",
    icon: <Mic2 />,
  },
  {
    title: "Private Events",
    text: "Private shows, celebrations, special occasions",
    icon: <Users />,
  },
  {
    title: "Brand Collaborations",
    text: "Partnerships, campaigns, endorsements",
    icon: <Building2 />,
  },
];


/* =========================================
   CONTACT PAGE SOCIAL CARDS
========================================= */

const socials = [
  {
    name: "Instagram",
    handle: "@sochiesiren",
    icon: <FaInstagram />,
    href: SOCIAL_LINKS.instagram,
  },
  {
    name: "TikTok",
    handle: "@sochiesiren",
    icon: <FaTiktok />,
    href: SOCIAL_LINKS.tiktok,
  },
  {
    name: "YouTube",
    handle: "Sochie Music",
    icon: <FaYoutube />,
    href: SOCIAL_LINKS.youtube,
  },
];


export default function ContactPage() {
  /* =========================================
     FORM STATE
  ========================================= */

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [sending, setSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  /* =========================================
     HANDLE FORM INPUT
  ========================================= */

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };


  /* =========================================
     SUBMIT CONTACT FORM
  ========================================= */

 const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setSending(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await sendContactMessage(formData);

      setSuccessMessage(response.message);

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to send your message. Please try again."
      );
    } finally {
      setSending(false);
    }
  };


  /* =========================================
     PAGE
  ========================================= */

  return (
    <>
      <Navbar />

      <main className="contact-page">

        {/* =====================================
            HERO
        ===================================== */}

        <section className="contact-hero">
          <div className="contact-hero-overlay" />

          <div className="contact-hero-content">

            <p className="contact-kicker">
              Get In Touch
            </p>

            <h1>
              Let&apos;s Create
              <br />
              Something Beautiful.
            </h1>

            <p className="contact-script">
              The journey continues with you.
            </p>

            <p className="contact-hero-text">
              Whether it&apos;s a collaboration, booking, media inquiry,
              or just a message of love — I&apos;d love to hear from you.
            </p>

            <p className="contact-hero-text">
              Thank you for being part of the journey.
            </p>


            {/* CONTACT INFORMATION */}

            <div className="contact-info-row">

              {contactInfo.map((item) => (
                <div
                  className="contact-info-card"
                  key={item.title}
                >
                  <span>
                    {item.icon}
                  </span>

                  <div>
                    <h3>
                      {item.title}
                    </h3>

                    <p>
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}

            </div>

          </div>
        </section>


        {/* =====================================
            CONTACT / BOOKING
        ===================================== */}

        <section className="contact-main">

          {/* MESSAGE CARD */}

          <div
            className="message-card"
            id="contact-form"
          >
            <h2>
              Send A Message
            </h2>

            <p>
              Fill out the form below and I&apos;ll get back to you as soon as
              possible.
            </p>


            <form onSubmit={handleSubmit}>

              <div className="form-grid">

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                />

              </div>


              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Subject
                </option>

                <option value="Booking Inquiry">
                  Booking Inquiry
                </option>

                <option value="Collaboration">
                  Collaboration
                </option>

                <option value="Media Inquiry">
                  Media Inquiry
                </option>

                <option value="General Message">
                  General Message
                </option>
              </select>


              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                required
              />


              {/* SUCCESS MESSAGE */}

              {successMessage && (
                <p className="contact-success-message">
                  {successMessage}
                </p>
              )}


              {/* ERROR MESSAGE */}

              {errorMessage && (
                <p className="contact-error-message">
                  {errorMessage}
                </p>
              )}


              {/* SEND BUTTON */}

              <button
                type="submit"
                disabled={sending}
              >
                {sending
                  ? "Sending..."
                  : "Send Message"}

                {!sending && (
                  <Send size={16} />
                )}
              </button>

            </form>
          </div>


          {/* BOOKING CARD */}

          <div className="booking-card">

            <h2>
              Book Sochie
            </h2>

            <p>
              Looking to book Sochie for a performance, event, panel,
              or special appearance?
            </p>

            <p>
              Please include as much detail as possible and our team will be in
              touch.
            </p>


            <div className="booking-list">

              {bookingTypes.map((item) => (
                <div
                  className="booking-item"
                  key={item.title}
                >
                  <span>
                    {item.icon}
                  </span>

                  <div>
                    <h3>
                      {item.title}
                    </h3>

                    <p>
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}

            </div>


            {/* BOOK NOW
                Sends visitor to the actual working
                contact form instead of the inactive
                booking email address. */}

            <a
              href="#contact-form"
              className="book-now-btn"
            >
              Book Now
              <ArrowRight size={16} />
            </a>

          </div>

        </section>


        {/* =====================================
            SOCIAL / STREAMING
        ===================================== */}

        <section className="contact-connect">

          <div className="contact-connect-image" />


          <div className="contact-connect-content">

            <h2>
              Let&apos;s Connect
            </h2>

            <p>
              Follow the journey. Be part of the movement.
            </p>


            {/* SOCIAL CARDS */}

            <div className="social-grid">

              {socials.map((social) => (
                <a
                  href={social.href}
                  className="social-card"
                  key={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>
                    {social.icon}
                  </span>

                  <h3>
                    {social.name}
                  </h3>

                  <p>
                    {social.handle}
                  </p>
                </a>
              ))}

            </div>


            {/* SPOTIFY */}

            <div className="spotify-banner">

              <span>
                <FaSpotify />
              </span>


              <div>
                <h3>
                  Listen On Spotify
                </h3>

                <p>
                  Stream Sochie&apos;s music anytime, anywhere.
                </p>
              </div>


              <a
                href={STREAM_LINKS.spotify}
                target="_blank"
                rel="noopener noreferrer"
              >
                Stream Now
                <ArrowRight size={16} />
              </a>

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}