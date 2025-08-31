"use client"

import { useEffect, useRef, useState } from "react";
import { shorts, thumbnails } from "../constants/index";

export default function Activity() {
  const [activeShort, setActiveShort] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const rotationIntervalMs = 10000;

  // helper to set videoRefs[idx]
  function setVideoRef(el: any, idx: number) {
    videoRefs.current[idx] = el;
  }

  // rotate shorts every 6 seconds
  useEffect(() => {
    // on mount, start interval
    const id = setInterval(() => {
      setActiveShort((prev) => (prev + 1) % shorts.length);
    }, rotationIntervalMs);

    return () => {
      clearInterval(id);
    };
  }, []);

  // on activeShort change: play active video, pause others, reset to start
  useEffect(() => {
    videoRefs.current.forEach((vid, i) => {
      if (!vid) return;
      try {
        if (i === activeShort) {
          // reset and play
          vid.currentTime = 0;
          // ensure muted (autoplay-friendly)
          vid.muted = true;
          const playPromise = vid.play();
          if (playPromise && typeof playPromise.then === "function") {
            playPromise.catch(() => {
              // autoplay might be blocked — ignore gracefully
            });
          }
        } else {
          // pause other videos to save CPU
          vid.pause();
        }
      } catch (err) {
        // ignore errors (some browsers may restrict play commands)
      }
    });
  }, [activeShort]);

  return (
    <div className="min-h-screen pb-6">
      <div className="text-3xl md:text-5xl font-bold mb-8">What I love to do...</div>
      
      {/* Main container with proper responsive layout */}
      <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-lg grid grid-cols-1 xl:grid-cols-[2fr_1fr] shadow-[0_0_15px_3px_rgba(255,115,0,0.7),0_0_40px_10px_rgba(255,123,128,0.4)] gap-8 max-w-7xl mx-auto p-6">
        
        {/* LEFT: Thumbnails grid */}
        <div className="grid grid-cols-2 grid-rows-2 gap-4 w-full">
          {thumbnails.map((t) => (
            <a
              key={t.id}
              href={t.link}
              className="group rounded-lg overflow-hidden border bg-gray-800 flex flex-col min-h-[100px] md:min-h-[180px]"
              target="_blank"
              rel="noreferrer"
              title={t.title}
            >
              {/* Image container with fixed aspect ratio */}
              <div className="flex-1 overflow-hidden">
                <img
                  src={t.image}
                  alt={t.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              {/* Title overlay */}
              {/* <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-black/80 to-transparent text-white">
                <div className="font-medium text-sm truncate">{t.title}</div>
              </div> */}
            </a>
          ))}
        </div>

        {/* RIGHT: Shorts video container */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-sm mx-auto">
            {/* Video container with proper 9:16 aspect ratio */}
            <div className="relative w-full aspect-[9/16] rounded-lg overflow-hidden border bg-black shadow-[0_0_15px_3px_rgba(255,115,0,0.7),0_0_40px_10px_rgba(255,123,128,0.4)]">
              {shorts.map((s, idx) => (
                <video
                  key={s.id}
                  ref={(el) => setVideoRef(el, idx)}
                  src={s.src}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-600 ${
                    idx === activeShort ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  }`}
                  playsInline
                  muted
                  loop={false}
                  preload="auto"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}