"use client";

import React, { useEffect, useRef } from "react";
import HeadphonesIcon from "./icons/HeadphonesIcon";
import PlayIcon  from "./icons/PlayIcon";
import PauseIcon from "./icons/PauseIcon";
import PreviousIcon from "./icons/PreviousIcon";
import NextIcon from "./icons/NextIcon";
import ShuffleIcon from "./icons/ShuffleIcon";
import RepeatIcon from "./icons/RepeatIcon";
import Image from "next/image";

interface PlayerProps {
  episode?: any | null;
  isPlaying: boolean;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

export default function Player ({ 
  episode, 
  isPlaying, 
  togglePlay, 
  playNext, 
  playPrevious, 
  hasNext, 
  hasPrevious 
  } : PlayerProps){
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch((err) => console.error("Audio play error:", err));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, episode]);

  useEffect(() => {
    const audioEl = audioRef.current;
    if (!audioEl) return;

    if (episode && episode.audioUrl) {
      if (audioEl.src !== episode.audioUrl) {
        audioEl.src = episode.audioUrl;
        audioEl.load();
      }
    } else {
      audioEl.removeAttribute("src");
      audioEl.load();
    }
  }, [episode]);

  return (
  <aside className="w-full lg:w-80 bg-[#8257E5] text-white flex flex-col items-center justify-between p-4 lg:p-6 h-auto lg:h-screen rounded-2xl lg:rounded-none">
      <header className="flex items-center gap-2">
        <HeadphonesIcon />
        <strong className="font-lexend font-bold">Now Playing</strong>
      </header>

      {episode ? (
        <div className="text-center mt-2">
    <div className="mx-auto w-24 h-24 lg:w-40 lg:h-40 relative">
            {episode.imageUrl ? (
              <Image width={96} height={96} src={episode.imageUrl} alt={episode.title} className="w-full h-full rounded-2xl object-cover" />
            ) : (
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600" />
            )}
          </div>
          <strong className="font-lexend font-bold block mt-2 text-sm lg:text-lg">{episode.title}</strong>
          <span className="block mt-1 text-xs opacity-60">{episode.host}</span>

          <audio ref={audioRef} src={episode?.audioUrl ?? ""} preload="auto" />
        </div>
      ) : (
        <div className="w-full h-32 lg:h-48 border-2 border-dashed border-purple-400 rounded-3xl bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
          <strong className="text-center font-lexend text-sm">Select a podcast to play</strong>
        </div>
      )}

      <footer className="self-stretch mt-4">
        <div className="flex items-center justify-center gap-4 mt-4">
          <button type="button" className="text-white disabled:opacity-50 disabled:cursor-not-allowed"><ShuffleIcon /></button>
          <button type="button" onClick={playPrevious} disabled={!episode || !hasPrevious} className="text-white disabled:opacity-50 disabled:cursor-not-allowed"><PreviousIcon /></button>
          <button type="button" onClick={togglePlay} disabled={!episode} className="w-12 h-12 rounded-2xl bg-purple-500 flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed">{isPlaying ? <PauseIcon /> : <PlayIcon />}</button>
          <button type="button" onClick={playNext} disabled={!episode || !hasNext} className="text-white disabled:opacity-50 disabled:cursor-not-allowed"><NextIcon /></button>
          <button type="button" className="text-white"><RepeatIcon /></button>
        </div>
      </footer>
    </aside>
  );
};
