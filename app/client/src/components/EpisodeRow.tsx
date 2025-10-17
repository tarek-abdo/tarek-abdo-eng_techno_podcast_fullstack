"use client";

import React, { useEffect, useRef, useState } from "react";

import type { Episode } from "../lib/types";
import PlayIcon from "./icons/PlayIcon";
import Image from "next/image";

interface EpisodeRowProps {
  episode: Episode;
  onPlay: () => void;
}

export default function EpisodeRow({ episode, onPlay }: EpisodeRowProps) {
  const [duration, setDuration] = useState<string>("--:--");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!episode.audioUrl) return;
    const audio = new Audio(episode.audioUrl);

    audio.addEventListener("loadedmetadata", () => {
      const totalSeconds = Math.floor(audio.duration);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      setDuration(`${minutes}:${seconds.toString().padStart(2, "0")}`);
    });

    audioRef.current = audio;

    return () => {
      audio.removeEventListener("loadedmetadata", () => {});
    };
  }, [episode.audioUrl]);
  return (
    <tr
      className="border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
      onClick={onPlay}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onPlay();
      }}
      role="button"
      tabIndex={0}
    >
      <td className="py-3 px-4 flex items-center gap-3">
        <div className="relative w-10 h-10">
          {episode.imageUrl ? (
            <Image
              src={episode.imageUrl}
              alt={episode.title}
              className="w-full h-full rounded-md object-cover"
              width={50}
              height={50}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 rounded-md" />
          )}
        </div>
        <span className="font-lexend font-semibold text-gray-700">{episode.title}</span>
      </td>

      <td className="py-3 px-4 text-sm text-gray-500">{episode.host}</td>

      <td className="py-3 px-4 text-sm text-gray-500">{episode.date || "5 jun 2022"}</td>

      <td className="py-3 px-4 text-sm text-gray-500">{episode.description}</td>
      <td className="py-3 px-4 text-sm text-gray-500">{duration}</td>

      <td className="py-3 px-4">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPlay();
          }}
          className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-green-500 hover:bg-gray-100 transition"
        >
          <PlayIcon />
        </button>
      </td>
    </tr>
  );
}
