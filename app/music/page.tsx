"use client";

import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowRight, Play } from "lucide-react";
import { FaApple, FaSpotify, FaYoutube } from "react-icons/fa";
import "../../styles/music.css";
import { FormEvent, useState } from "react";

const SOCIAL_LINKS = {
  spotify:
    "https://open.spotify.com/artist/6jplkSuba0FrGBLhywo2PG?si=6uEPQv_YT56IiHX-DJ17mQ",
  youtube: "https://www.youtube.com/@iamsochie",
};

const STREAM_LINKS = {
  spotify:
    "https://open.spotify.com/artist/6jplkSuba0FrGBLhywo2PG?si=6uEPQv_YT56IiHX-DJ17mQ",

  appleMusic:
    "https://music.apple.com/us/artist/sochie/1896466678",

  audiomack: "https://audiomack.com/iamsochie",

  youtube: "https://www.youtube.com/@iamsochie",
};

const releases = [
  {
    title: "Asante",
    type: "Single • 2024",
    image: "/assets/images/asante-single.jpg",
    href: "https://open.spotify.com/track/07CcBPWZZDi9min2KgUW1F?si=d46fd61838cc4388",
  },
  {
    title: "In Vain",
    type: "Single • 2024",
    image: "/assets/images/in-vain-single.jpg",
    href: "https://open.spotify.com/track/0tde0oaoMZVvziToignSQi?si=1de43e12964943f8",
  },
  {
    title: "Vibranium",
    type: "Single • 2024",
    image: "/assets/images/vibranium-single.jpg",
    href: "https://open.spotify.com/track/3clowzN0iwpfFCcxpKJ1pt?si=c64616b83d9649b5",
  },
  {
    title: "Eyethu",
    type: "Single • 2024",
    image: "/assets/images/eyethu-single.jpg",
    href: "https://open.spotify.com/track/4u4PJYMrOXzgkLHtKopSYs?si=b2ed111a08a54ca8",
  },
];

const videos = [
  {
    title: "Let's Do It Again",
    time: "Recording Session",
    image: "/assets/images/lets-do-it-again-cover-art.jpg",
    href: "https://youtu.be/n7RS7dxWFpo?si=l8JjUW0SFTFiT4l7",
  },
  {
    title: "Cupid",
    time: "Live at Mad Muse Studios",
    image: "/assets/images/cupid-cover-art.jpg",
    href: "https://youtu.be/EHcWtqloJwQ?si=cEv6e77y6z3CtTQV",
  },
];

const streamPlatforms = [
  {
    name: "Spotify",
    label: "Stream on Spotify",
    button: "Play Now",
    icon: <FaSpotify />,
    href: STREAM_LINKS.spotify,
  },
  {
    name: "Apple Music",
    label: "Listen on Apple Music",
    button: "Play Now",
    icon: <FaApple />,
    href: STREAM_LINKS.appleMusic,
  },
  {
    name: "Audiomack",
    label: "Stream on Audiomack",
    button: "Play Now",
    icon: "〽",
    href: STREAM_LINKS.audiomack,
  },
  {
    name: "YouTube",
    label: "Watch on YouTube",
    button: "Watch Now",
    icon: <FaYoutube />,
    href: STREAM_LINKS.youtube,
  },
  {
    name: "Boomplay",
    label: "Stream on Boomplay",
    button: "Play Now",
    icon: "B",
    href: "#",
  },
];

export default function MusicPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!email.trim()) {
      setMessage("Please enter your email address.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/contact/newsletter/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(
          data.message || "You have successfully joined the journey."
        );
        setEmail("");
      } else {
        if (data.email) {
          setMessage(
            Array.isArray(data.email) ? data.email[0] : data.email
          );
        } else {
          setMessage(
            data.message || "Something went wrong. Please try again."
          );
        }
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      setMessage(
        "Unable to connect to the server. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="music-page">

        {/* ======================================
            HERO
        ====================================== */}

        <section className="music-hero">
          <div className="music-hero-overlay" />

          <div className="music-hero-content">
            <p className="music-kicker">Music</p>

            <h1>
              The Sound of Soul, Rhythm & Purpose.
            </h1>

            <p className="music-script">
              Real music. Real stories. Real healing.
            </p>

            <p className="music-hero-text">
              Explore Sochie&apos;s music across all platforms.
              Listen, watch, and connect.
            </p>

            <div className="music-hero-actions">

              <a
                href={SOCIAL_LINKS.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="music-primary-btn"
              >
                <Play size={16} fill="currentColor" />
                Listen Now
              </a>

              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="music-secondary-btn"
              >
                Watch Videos
              </a>

            </div>
          </div>
        </section>

        {/* ======================================
            STREAM MY MUSIC
        ====================================== */}

        <section className="music-section">
          <h2>Stream My Music</h2>

          <div className="platform-grid">
            {streamPlatforms.map((platform) => {

              if (platform.href === "#") {
                return (
                  <div
                    className="platform-card"
                    key={platform.name}
                  >
                    <span className="platform-icon">
                      {platform.icon}
                    </span>

                    <h3>{platform.name}</h3>

                    <p>{platform.label}</p>

                    <span className="platform-button">
                      {platform.button}
                    </span>
                  </div>
                );
              }

              return (
                <a
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="platform-card"
                  key={platform.name}
                >
                  <span className="platform-icon">
                    {platform.icon}
                  </span>

                  <h3>{platform.name}</h3>

                  <p>{platform.label}</p>

                  <span className="platform-button">
                    {platform.button}
                  </span>
                </a>
              );
            })}
          </div>
        </section>

        {/* ======================================
            LATEST RELEASES
        ====================================== */}

        <section
          className="music-section"
          id="latest-releases"
        >
          <div className="section-heading-row">

            <h2>Latest Releases</h2>

            <a
              href={SOCIAL_LINKS.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="section-link"
            >
              View All Music
              <ArrowRight size={16} />
            </a>

          </div>

          <div className="release-grid">

            {releases.map((release) => (
              <article
                className="release-card"
                key={release.title}
              >

                <div
                  className="release-image"
                  style={{
                    backgroundImage: `
                      linear-gradient(
                        180deg,
                        rgba(0,0,0,.05),
                        rgba(0,0,0,.7)
                      ),
                      url('${release.image}')
                    `,
                  }}
                >

                  <a
                    href={release.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="play-button"
                    aria-label={`Play ${release.title}`}
                  >
                    <Play size={22} fill="currentColor" />
                  </a>

                </div>

                <h3>{release.title}</h3>

                <p>{release.type}</p>

                <a
                  href={release.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="listen-link"
                >
                  Listen Now
                  <ArrowRight size={14} />
                </a>

              </article>
            ))}

          </div>
        </section>

        {/* ======================================
            MUSIC VIDEOS
        ====================================== */}

        <section
          className="music-section"
          id="music-videos"
        >
          <div className="section-heading-row">

            <h2>Music Videos</h2>

            <a
              href={SOCIAL_LINKS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="section-link"
            >
              View All Videos
              <ArrowRight size={16} />
            </a>

          </div>

          <div className="video-grid">

            {videos.map((video) => (
              <article
                className="video-card"
                key={video.title}
              >

                <div
                  className="video-image"
                  style={{
                    backgroundImage: `
                      linear-gradient(
                        180deg,
                        rgba(0,0,0,.04),
                        rgba(0,0,0,.65)
                      ),
                      url('${video.image}')
                    `,
                  }}
                >

                  <a
                    href={video.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="play-button small"
                    aria-label={`Watch ${video.title}`}
                  >
                    <Play size={18} fill="currentColor" />
                  </a>

                </div>

                <h3>{video.title}</h3>

                <p>{video.time}</p>

              </article>
            ))}

          </div>
        </section>

        {/* ======================================
            JOIN THE JOURNEY
        ====================================== */}

        <section className="music-join">

          <div className="music-join-image" />

          <div className="music-join-content">

            <h2>Join The Journey</h2>

            <p>
              Be the first to hear new music, get exclusive content,
              and stay updated on everything Sochie.
            </p>

            <form
              className="music-join-form"
              onSubmit={handleNewsletterSubmit}
            >

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                required
                disabled={isSubmitting}
              />

              <button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Joining..." : "Join Now"}
              </button>

            </form>

            {message && (
              <p className="music-join-message">
                {message}
              </p>
            )}

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}