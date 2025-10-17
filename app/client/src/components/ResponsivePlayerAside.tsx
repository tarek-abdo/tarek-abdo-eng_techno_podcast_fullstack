"use client";

import React from "react";
import Player from "./Player";

interface ResponsivePlayerAsideProps {
  episode: any | null;
  isPlaying: boolean;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

export default function ResponsivePlayerAside({
  episode,
  isPlaying,
  togglePlay,
  playNext,
  playPrevious,
  hasNext,
  hasPrevious,
}: ResponsivePlayerAsideProps) {
  return (
    <aside className="w-full lg:w-80 lg:fixed lg:top-0 lg:right-0 lg:h-screen lg:z-10">
      <div className="lg:hidden">
        <Player
          episode={episode}
          isPlaying={isPlaying}
          togglePlay={togglePlay}
          playNext={playNext}
          playPrevious={playPrevious}
          hasNext={hasNext}
          hasPrevious={hasPrevious}
        />
      </div>
      <div className="hidden lg:block">
        <Player
          episode={episode}
          isPlaying={isPlaying}
          togglePlay={togglePlay}
          playNext={playNext}
          playPrevious={playPrevious}
          hasNext={hasNext}
          hasPrevious={hasPrevious}
        />
      </div>
    </aside>
  );
}
