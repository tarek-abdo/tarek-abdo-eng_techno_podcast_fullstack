"use client";

import ResponsivePlayerAside from "@/components/ResponsivePlayerAside";
import { Episode } from "@/lib/types";
import Image from "next/image";
import React, { useState } from "react";

// Static episode data
const staticEpisodes: Episode[] = [
  {
    _id: "1",
    title: "Small Cloud Chats",
    host: "Diego e Richard",
    date: "8 Jan 21",
    description:
      "Neste episódio, Diego e Richard discutem as melhores práticas para começar na programação em 2021. Eles compartilham dicas valiosas sobre escolha de linguagens, recursos de aprendizado e como manter a motivação durante a jornada de desenvolvimento.",
    imageUrl:
      "https://res.cloudinary.com/dvqhmeydt/image/upload/v1760618958/bcd3040d2d383ff21f0c859c6c69587b40fee08a_i5hvxp.png",
    audioUrl:
      "https://res.cloudinary.com/dvqhmeydt/video/upload/v1760455044/file_example_MP3_700KB_h4givh.mp3",
    createdAt: "8 Jan 21",
    durationAsString: "35:40",
  },
];

export default function EpisodesPage() {
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(staticEpisodes[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    const currentIndex = staticEpisodes.findIndex((ep) => ep._id === currentEpisode?._id);
    const nextIndex = (currentIndex + 1) % staticEpisodes.length;
    setCurrentEpisode(staticEpisodes[nextIndex]);
  };

  const playPrevious = () => {
    const currentIndex = staticEpisodes.findIndex((ep) => ep._id === currentEpisode?._id);
    const prevIndex = currentIndex === 0 ? staticEpisodes.length - 1 : currentIndex - 1;
    setCurrentEpisode(staticEpisodes[prevIndex]);
  };

  const currentIndex = staticEpisodes.findIndex((ep) => ep._id === currentEpisode?._id);
  const hasNext = currentIndex < staticEpisodes.length - 1;
  const hasPrevious = currentIndex > 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Main content area with proper spacing for fixed header */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-2 pt-10 bg-white">
        <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-6 bg-white">
          {/* Left side - Episodes list */}
          <div className="flex-1 px-4 py-6 flex flex-col items-center lg:pr-96">
            <div className="w-full max-w-2xl mx-auto">
              {staticEpisodes.map((episode) => (
                <article key={episode._id} className="bg-white  p-0    flex flex-col items-stretch">
                  {/* Top - cover with overlay controls */}
                  <div
                    className="relative mx-auto w-full rounded-2xl overflow-visible mt-6 mb-4"
                    style={{ maxWidth: "95%", minHeight: "155px" }}
                  >
                    <Image
                      src={episode.imageUrl}
                      alt={episode.title}
                      className="w-full h-40 object-cover rounded-2xl"
                      width={656}
                      height={160}
                    />

                    {/* Overlay buttons with centers aligned on image borders */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        playPrevious();
                      }}
                      className="pointer-events-auto absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-purple-500 flex items-center justify-center rounded-lg shadow-md hover:bg-purple-700 transition-colors"
                      aria-label="Previous Episode"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="white"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentEpisode(episode);
                        togglePlay();
                      }}
                      className="pointer-events-auto absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-green-500 flex items-center justify-center rounded-lg shadow-lg transition-all hover:bg-green-600 focus:outline-none"
                      aria-label={isPlaying ? "Pause" : "Play"}
                    >
                      {/* Play Icon */}
                      <svg className="w-8 h-8 ml-1" fill="white" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  </div>

                  {/* Main Content */}
                  <div className="px-8 mt-1 flex flex-col">
                    <h1 className="font-bold text-2xl text-gray-800 mb-2 mt-4">{episode.title}</h1>
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-6">
                      <span className="font-medium">{episode.host}</span>
                      <span className="text-gray-400">•</span>
                      <span>{episode.createdAt}</span>
                      <span className="text-gray-400">•</span>
                      <span>{episode.durationAsString}</span>
                    </div>
                    <hr className="border-gray-200 mb-5" />
                    <p className="text-gray-600 text-base leading-relaxed mb-4">
                      {/* More realistic rich description */}
                      In this episode of Faladev, Diego Fernandes meets with João Pedro Schmitz,
                      Bruno Lemos, and Diego Haz to discuss the importance of open-source
                      contribution and the challenges that exist within the community. We spend most
                      of our time writing code — now it’s time to talk about it. Every week, we
                      bring together technology professionals to discuss everything that revolves
                      around the world of programming. Faladev is an original podcast by Rocketseat.
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <ResponsivePlayerAside
            episode={currentEpisode}
            isPlaying={isPlaying}
            togglePlay={togglePlay}
            playNext={playNext}
            playPrevious={playPrevious}
            hasNext={hasNext}
            hasPrevious={hasPrevious}
          />
        </div>
      </div>
    </div>
  );
}
