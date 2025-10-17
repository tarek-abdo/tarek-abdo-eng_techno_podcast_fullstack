"use client";
import React from "react";
import LogoIcon from "./icons/LogoIcon";
import Link from "next/link";

export default function Header() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  return (
    <header
      role="banner"
      className="fixed top-0 left-0 w-full lg:w-[calc(100%-20rem)] flex items-center justify-center gap-4 sm:gap-6 py-4 px-4 sm:px-6 mt-0 border-b border-gray-200 dark:border-gray-800 bg-white z-20"
    >
      <Link href={"/"}>
        <div className="flex items-center justify-center flex-shrink-0">
          <LogoIcon className="h-8 w-auto sm:h-10" />
          <h1 className="text-2xl font-bold pl-4">Podcastr</h1>
        </div>
      </Link>

      {/* Title - visible on small screens and up; hidden on very small viewports */}
      <div className="hidden xs:block sm:flex items-center ml-2 sm:ml-4">
        <p className="ml-0 sm:ml-6 pl-0 sm:pl-6 border-l-0 sm:border-l border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 text-sm sm:text-base">
          Your Best Podcaster
        </p>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Date - move to next line on very small screens using responsive utilities */}
      <div className="text-right text-gray-600 dark:text-gray-300 text-sm sm:text-base">
        <span className="block truncate max-w-[160px] sm:max-w-none capitalize">{currentDate}</span>
      </div>
    </header>
  );
}
