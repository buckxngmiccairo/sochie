import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  ArrowRight,
  Eye,
  Heart,
  Music,
  Play,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import "../../styles/about.css";

const values = [
  {
    title: "My Values",
    icon: <Heart />,
    text: "Faith. Authenticity. Compassion. Growth. Purpose.",
    subtext: "These values shape every song and every decision I make.",
  },
  {
    title: "My Mission",
    icon: <Sparkles />,
    text: "To inspire healing, connection and empowerment through music.",
    subtext:
      "To create a safe space for people to feel seen, heard and uplifted.",
  },
  {
    title: "My Vision",
    icon: <Eye />,
    text: "To use music as a force for good.",
    subtext:
      "Building community, bridging cultures, and leaving a legacy that lasts beyond the music.",
  },
];

const highlights = [
  {
    icon: <Music />,
    text: "Music that crosses cultures and connects hearts worldwide",
  },
  {
    icon: <Users />,
    text: "Performing at top colleges and iconic venues across North America",
  },
  {
    icon: <Heart />,
    text: "A growing community of fans who believe in the movement",
  },
  {
    icon: <Trophy />,
    text: "Featured in playlists and recognized by industry tastemakers",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="about-page">
        {/* ======================================
            HERO
        ====================================== */}

        <section className="about-hero">
          <div className="about-hero-overlay" />

          <div className="about-hero-content">
            <p className="about-kicker">About</p>

            <h1>
              The Heart
              <br />
              Behind The Music
            </h1>

            <p className="about-script">This is Sochie.</p>

            <p className="about-hero-text">
              I&apos;m a Nigerian-American artist blending R&amp;B, Soul,
              Afrobeat, Jazz, and Amapiano into music that inspires, heals,
              celebrates and connects.
            </p>

            <p className="about-hero-text">
              I create from a place of truth, faith, and purpose — sharing
              stories that remind us we&apos;re not alone on the journey.
            </p>

            <a
              href="https://www.youtube.com/@iamsochie"
              target="_blank"
              rel="noopener noreferrer"
              className="about-primary-btn"
            >
              <Play size={16} fill="currentColor" />
              Watch My Story
            </a>
          </div>
        </section>

        {/* ======================================
            STORY
        ====================================== */}

        <section className="about-story" id="story">
          <div className="about-story-image" />

          <div className="about-story-content">
            <p className="about-kicker">My Story</p>

            <h2>
              A Journey of Faith,
              <br />
              Resilience &amp; Purpose
            </h2>

            <p>
              My journey hasn&apos;t always been easy. There were seasons of
              doubt, heartbreak, and searching for meaning.
            </p>

            <p>
              But through every high and every low, music has been my anchor.
              It&apos;s how I process, how I heal, and how I connect.
            </p>

            <p>
              The Journey Within is the story of my life — the lessons, the
              victories, the tears, and the unwavering faith that keeps me
              moving forward.
            </p>

            <strong>This is more than music. This is my purpose.</strong>
          </div>
        </section>

        {/* ======================================
            VALUES
        ====================================== */}

        <section className="about-values">
          {values.map((item) => (
            <article className="about-value-card" key={item.title}>
              <span>{item.icon}</span>

              <h3>{item.title}</h3>

              <p>{item.text}</p>

              <small>{item.subtext}</small>
            </article>
          ))}
        </section>

        {/* ======================================
            HIGHLIGHTS + PRESS
        ====================================== */}

        <section className="about-highlights-press">
          <div className="about-highlights">
            <div className="about-section-title">
              <h2>Highlights</h2>
              <span />
            </div>

            <div className="highlight-grid">
              {highlights.map((highlight, index) => (
                <div className="highlight-item" key={index}>
                  <span>{highlight.icon}</span>

                  <p>{highlight.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="about-press">
            <div className="about-section-title">
              <h2>Press &amp; Features</h2>
              <span />
            </div>

            <div className="press-grid">
              <strong>OkayAfrica</strong>
              <strong>BET</strong>
              <strong>FADER</strong>
              <strong>ESSENCE</strong>
              <strong>VIBE</strong>
              <strong>Radar Africa</strong>
            </div>

            <a
              href="https://www.youtube.com/@iamsochie"
              target="_blank"
              rel="noopener noreferrer"
              className="press-btn"
            >
              See All Features
              <ArrowRight size={16} />
            </a>
          </div>
        </section>

        {/* ======================================
            LET'S CONNECT
        ====================================== */}

        <section className="about-connect">
          <div className="about-connect-overlay" />

          <div className="about-connect-content">
            <h2>Let&apos;s Connect</h2>

            <p>
              Be part of the journey. Join my community for updates,
              behind-the-scenes content and more.
            </p>
          </div>

          <Link
            href="/contact#contact-form"
            className="about-connect-btn"
          >
            Join The Journey
            <ArrowRight size={16} />
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
}