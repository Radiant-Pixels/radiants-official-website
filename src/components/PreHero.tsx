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

    const weAreSpans = weAreRef.current.querySelectorAll("span span");
    const radiantSpans = radiantRef.current.querySelectorAll("span span");

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => onComplete(),
    });

    // "WE ARE" letters
    tl.to(weAreSpans, { y: "0%", opacity: 1, stagger: 0.08, duration: 0.8 });

    // "RADIANT" letters
    tl.to(radiantSpans, { y: "0%", opacity: 1, stagger: 0.03, duration: 1 }, "-=0.4");

    // Fade-out with clipping mask
    tl.to(
      heroRef.current,
      { clipPath: "inset(0% 0% 100% 0%)", duration: 1.2, delay: 1, pointerEvents: "none", ease: "power2.inOut" },
      "+=0.5"
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
