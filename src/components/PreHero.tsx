"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

interface PreHeroProps {
  onComplete: () => void;
}

export default function PreHero({ onComplete }: PreHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const weAreRef = useRef<HTMLHeadingElement>(null);
  const radiantRef = useRef<HTMLHeadingElement>(null);

  // Helper to wrap each letter
  const splitText = (text: string) =>
    text.split("").map((char, i) => {
      const isSpace = char === " ";
      return (
        <span
          key={i}
          className={`inline-block overflow-hidden ${isSpace ? "w-[0.5em]" : ""}`}
        >
          <span className="inline-block translate-y-[100%]">
            {isSpace ? "\u00A0" : char}
          </span>
        </span>
      );
    });

  useEffect(() => {
    if (!weAreRef.current || !radiantRef.current || !heroRef.current) return;

    const preheroAudio = new Audio("/sounds/prehero.mp3");
    preheroAudio.volume = 0.5;
    preheroAudio.currentTime = 0;
    preheroAudio.play();

    const weAreSpans = weAreRef.current.querySelectorAll("span span");
    const radiantSpans = radiantRef.current.querySelectorAll("span span");

    // Total animation time ~5s
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        preheroAudio.pause(); // stop audio after animation if needed
        onComplete();
      },
    });

    // "WE ARE" letters: ~1.5s
    tl.to(weAreSpans, {
      y: "0%",
      opacity: 1,
      stagger: 0.12, // slower stagger
      duration: 1.5,
    });

    // "RADIANT" letters: ~2.5s
    tl.to(
      radiantSpans,
      {
        y: "0%",
        opacity: 1,
        stagger: 0.08, // slower stagger
        duration: 2.5,
      },
      "-=0.5" // overlap slightly
    );

    // Fade-out with clipping mask: ~1s
    tl.to(
      heroRef.current,
      {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 1,
        delay: 0.5,
        pointerEvents: "none",
        ease: "power2.inOut",
      },
      "+=0"
    );
  }, [onComplete]);

  return (
    <div
      ref={heroRef}
      className="fixed inset-0 bg-black text-white z-[9999] flex flex-col items-center justify-center text-center overflow-hidden"
    >
      <h2
        ref={weAreRef}
        className="relative text-2xl md:text-4xl font-semibold tracking-widest mb-4 uppercase font-aeonik"
      >
        {splitText("WE ARE")}
      </h2>

      <h1
        ref={radiantRef}
        className="relative text-5xl md:text-7xl font-bold tracking-[0.25em] uppercase font-aeonik"
      >
        {splitText("RADIANT")}
      </h1>
    </div>
  );
}
