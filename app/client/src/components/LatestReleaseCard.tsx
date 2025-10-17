"use client";

import React, { useEffect, useState } from "react";
import type { Episode } from "../lib/types";
import PlayIcon from "./icons/PlayIcon";
import Link from "next/link";
import Image from "next/image";

interface LatestReleaseCardProps {
  episode: Episode;
  onPlay: () => void;
}

export default function LatestReleaseCard({ episode, onPlay }: LatestReleaseCardProps) {
  const [computedDuration, setComputedDuration] = useState<string | null>(null);

  const formatDuration = (): string | null => {
    if (episode.durationAsString) return episode.durationAsString;
    if (typeof episode.duration === "number") {
      const m = Math.floor(episode.duration / 60);
      const s = String(episode.duration % 60).padStart(2, "0");
      return `${m}:${s}`;
    }
    return null;
  };

  const duration = formatDuration() ?? computedDuration;
  useEffect(() => {
    if (duration || !episode.audioUrl) return;
    const audio = new Audio(episode.audioUrl);
    const onMeta = () => {
      const total = Math.floor(audio.duration || 0);
      if (total > 0) {
        const m = Math.floor(total / 60);
        const s = String(total % 60).padStart(2, "0");
        setComputedDuration(`${m}:${s}`);
      }
    };
    audio.addEventListener("loadedmetadata", onMeta);
    return () => audio.removeEventListener("loadedmetadata", onMeta);
  }, [episode.audioUrl, duration]);

  return (
    <div
      className="bg-white border border-gray-200 p-4 sm:p-5 rounded-2xl flex items-center gap-4 cursor-pointer shadow-sm"
      tabIndex={0}
    >
      <Link href={"/episodes"}>
        <div className="flex items-center gap-4 flex-1">
          <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
            {episode.imageUrl ? (
              <Image
                src={episode.imageUrl}
                alt={episode.title}
                className="w-full h-full object-cover"
                width={50}
                height={50}
              />
            ) : (
              <div className="w-full h-full bg-gray-200" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <span className="block font-lexend font-bold text-gray-800 text-sm sm:text-base truncate">
              {episode.title}
            </span>
            <p className="text-xs text-gray-500 mt-1 truncate">{episode.host}</p>

            <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
              <span>{episode.date || "22 may 2025"}</span>

              {duration && (
                <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-700 rounded-md">
                  {duration}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
      <div className="flex-shrink-0">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPlay();
          }}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onPlay();
            }
          }}
          className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm hover:bg-gray-50"
          aria-label={`Play ${episode.title}`}
        >
          <PlayIcon className="w-5 h-5 text-green-500" />
        </button>
      </div>
    </div>
  );
}
