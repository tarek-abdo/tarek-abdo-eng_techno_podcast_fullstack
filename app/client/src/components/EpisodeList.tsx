"use client";

import React from "react";
import type { Episode } from "../lib/types";
import LatestReleaseCard from "./LatestReleaseCard";
import EpisodeRow from "./EpisodeRow";

interface EpisodeListProps {
  episodes: Episode[];
  onPlayEpisode: (index: number) => void;
}

export default function EpisodeList({ episodes, onPlayEpisode }: EpisodeListProps) {
  if (!episodes || episodes.length === 0) {
    return <p className="text-gray-500 text-center mt-10">No podcasts available.</p>;
  }

  const latestEpisodes = episodes.slice(0, 2);
  const allOtherEpisodes = episodes.slice(2);

  const findEpisodeIndex = (episodeId: string) => {
    return episodes.findIndex((e) => e._id === episodeId);
  };

  return (
    <section className="mt-20">
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">Latest</h2>

      {/* Mobile: stacked list */}
      <div className="space-y-4 md:hidden">
        {latestEpisodes.map((episode, idx) => {
          const globalIndex = findEpisodeIndex(episode._id ?? "");
          const indexToPlay = globalIndex >= 0 ? globalIndex : idx; // fallback to local idx
          return (
            <div key={episode._id ?? `latest-mobile-${idx}`}>
              <LatestReleaseCard episode={episode} onPlay={() => onPlayEpisode(indexToPlay)} />
            </div>
          );
        })}
      </div>

      {/* Desktop/Tablet: grid */}
      <div className="hidden md:grid grid-cols-2 gap-6">
        {latestEpisodes.map((episode, idx) => {
          const globalIndex = findEpisodeIndex(episode._id ?? "");
          const indexToPlay = globalIndex >= 0 ? globalIndex : idx;
          return (
            <LatestReleaseCard
              key={episode._id ?? `latest-${idx}`}
              episode={episode}
              onPlay={() => onPlayEpisode(indexToPlay)}
            />
          );
        })}
      </div>

      <h2 className="mt-8 mb-4 text-2xl font-semibold text-gray-800">All Episodes</h2>

      {/* Mobile stacked cards for all episodes */}
      <div className="space-y-4 md:hidden">
        {allOtherEpisodes.map((episode, idx) => {
          const globalIndex = findEpisodeIndex(episode._id ?? "");
          const indexToPlay = globalIndex >= 0 ? globalIndex : idx + 2;
          return (
            <div key={episode._id ?? `mobile-${idx}`}>
              <LatestReleaseCard episode={episode} onPlay={() => onPlayEpisode(indexToPlay)} />
            </div>
          );
        })}
      </div>

      {/* Desktop/Tablet: table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[720px]" cellSpacing={0}>
          <thead>
            <tr className="text-left text-xs text-gray-400 uppercase font-medium">
              <th className="py-3 px-4">Podcast</th>
              <th className="py-3 px-4">Guests</th>
              <th className="py-3 px-4 w-28">Date</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4 w-20">Duration</th>
            </tr>
          </thead>
          <tbody>
            {allOtherEpisodes.map((episode, idx) => {
              const globalIndex = findEpisodeIndex(episode._id ?? "");
              const indexToPlay = globalIndex >= 0 ? globalIndex : idx + 2; // offset of slice
              return (
                <EpisodeRow
                  key={episode._id ?? `other-${idx}`}
                  episode={episode}
                  onPlay={() => onPlayEpisode(indexToPlay)}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
