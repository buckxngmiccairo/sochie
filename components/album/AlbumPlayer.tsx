"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

interface Track {
  number: string;
  title: string;
  duration: string;
  audio: string;
}

interface AlbumPlayerProps {
  tracks: Track[];
}

export default function AlbumPlayer({
  tracks,
}: AlbumPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [currentTrack, setCurrentTrack] =
    useState<number | null>(null);

  const [isPlaying, setIsPlaying] =
    useState(false);

  const playTrack = async (index: number) => {
    const audio = audioRef.current;

    if (!audio) return;

    if (currentTrack === index) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        try {
          await audio.play();
          setIsPlaying(true);
        } catch {
          setIsPlaying(false);
        }
      }

      return;
    }

    audio.src = tracks[index].audio;
    audio.load();

    setCurrentTrack(index);

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener(
      "ended",
      handleEnded
    );

    return () => {
      audio.removeEventListener(
        "ended",
        handleEnded
      );
    };
  }, []);

  return (
    <>
      <audio ref={audioRef} />

      <div className="tracklist">
        {tracks.map((track, index) => (
          <div
            className="track-row"
            key={track.number}
          >
            <button
              type="button"
              onClick={() =>
                playTrack(index)
              }
              aria-label={
                currentTrack === index &&
                isPlaying
                  ? `Pause ${track.title}`
                  : `Play ${track.title}`
              }
            >
              {currentTrack === index &&
              isPlaying ? (
                <Pause
                  size={13}
                  fill="currentColor"
                />
              ) : (
                <Play
                  size={13}
                  fill="currentColor"
                />
              )}
            </button>

            <span>{track.number}</span>

            <p>{track.title}</p>

            <strong>{track.duration}</strong>
          </div>
        ))}
      </div>
    </>
  );
}