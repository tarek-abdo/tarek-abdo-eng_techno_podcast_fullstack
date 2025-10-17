"use client";

import React, { useState } from "react";
import ResponsivePlayerAside from "./ResponsivePlayerAside";
import EpisodeList from "./EpisodeList";
import type { Episode } from "../lib/types";
import Header from "./Header";

interface PodcastAppProps {
  episodes?: Episode[];
}

export default function PodcastApp({ episodes = [] }: PodcastAppProps) {
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState<number | null>(
    episodes.length > 0 ? 0 : null
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const currentlyPlayingEpisode =
    currentEpisodeIndex !== null && episodes.length > 0 ? episodes[currentEpisodeIndex] : null;

  const playEpisode = (index: number) => {
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (currentlyPlayingEpisode) setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    if (currentEpisodeIndex !== null && currentEpisodeIndex < episodes.length - 1) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);
    }
  };

  const playPrevious = () => {
    if (currentEpisodeIndex !== null && currentEpisodeIndex > 0) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Main content area with proper spacing for fixed header */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-2 pt-2">
        <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-6">
          {/* Left side - Episodes list */}
          <div className="flex-1 px-8 py-6 lg:pr-96">
            <div className="max-w-4xl mx-auto">
              <EpisodeList episodes={episodes} onPlayEpisode={playEpisode} />
            </div>
          </div>

          <ResponsivePlayerAside
            episode={currentlyPlayingEpisode}
            isPlaying={isPlaying}
            togglePlay={togglePlay}
            playNext={playNext}
            playPrevious={playPrevious}
            hasNext={currentEpisodeIndex !== null && currentEpisodeIndex < episodes.length - 1}
            hasPrevious={currentEpisodeIndex !== null && currentEpisodeIndex > 0}
          />
        </div>
      </div>
    </div>
  );
}
