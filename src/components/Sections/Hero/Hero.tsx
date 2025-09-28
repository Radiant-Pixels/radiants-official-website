"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import styles from "./Hero.module.scss";
import Navbar from "@/components/Navbar/Navbar";

const terminals = [
  "radiants/init/start",
  "radiants/loader/sequence",
  "radiants/core/boot",
  "radiants/assets/prep",
  "radiants/system/ok",
];

const HeroWithPreloader = () => {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState(terminals[0]);
  const [menuOpen, setMenuOpen] = useState(false);

  const preloaderRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const heroBoxRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Preloader logic
  useEffect(() => {
    if (loaded) return;

    let interval: NodeJS.Timeout;
    let textInterval: NodeJS.Timeout;

    const handleReady = () => {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            clearInterval(textInterval);

            // Animate preloader fade out
            if (preloaderRef.current) {
              gsap.to(preloaderRef.current, {
                opacity: 0,
                duration: 1,
                ease: "power2.inOut",
                onComplete: () => {
                  setLoaded(true);
                  animateHero();
                },
              });
            } else {
              setLoaded(true);
              animateHero();
            }
            return 100;
          }
          return prev + 2;
        });
      }, 30);

      let i = 0;
      textInterval = setInterval(() => {
        i = (i + 1) % terminals.length;
        setText(terminals[i]);
      }, 300);
    };

    if (document.readyState === "complete") {
      handleReady();
    } else {
      window.addEventListener("load", handleReady);
    }

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
      window.removeEventListener("load", handleReady);
    };
  }, []);

  // Hero animation
  const animateHero = () => {
    if (!heroRef.current || !overlayRef.current || !heroBoxRef.current || !headerRef.current) return;

    gsap.registerPlugin(CustomEase);
    CustomEase.create(
      "hop",
      "M0,0 C0.29,0 0.348,0.05 0.422,0.134 0.494,0.217 0.484,0.355 0.5,0.5 0.518,0.662 0.515,0.793 0.596,0.876 0.701,0.983 0.72,0.987 1,1"
    );

    const h1 = headerRef.current.querySelector("h1");
    if (h1) {
      const splitText = h1.innerText
        .split("")
        .map((char) => `<span>${char === " " ? "&nbsp;&nbsp;" : char}</span>`)
        .join("");
      h1.innerHTML = splitText;
    }

    gsap.to(heroRef.current, {
      clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
      duration: 2,
      ease: "hop",
      onStart: () => {
        gsap.to(heroRef.current, {
          transform: "translate(-50%, -50%) scale(1)",
          duration: 2.25,
          ease: "power3.inOut",
          delay: 0.25,
        });

        gsap.to(overlayRef.current, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 2,
          delay: 0.5,
          ease: "hop",
        });

        if (heroBoxRef.current) {
          const img = heroBoxRef.current.querySelector("img");
          if (img) {
            gsap.to(img, {
              transform: "scale(1)",
              duration: 2.25,
              ease: "power3.inOut",
              delay: 0.25,
            });
          }
        }

        if (headerRef.current) {
          gsap.to(headerRef.current.querySelectorAll("span"), {
            y: 0,
            stagger: 0.1,
            duration: 1.75,
            ease: "power4.inOut",
            delay: 0.75,
          });
        }
      },
    });
  };

  return (
    <>
      {/* Preloader */}
      {!loaded && (
  <div
    ref={preloaderRef}
    className="fixed inset-0 bg-amber-300 text-[#1a1a1a] font-mono z-[9999] flex items-center justify-center p-4"
  >
    <div
      className="
        w-[90svw] max-w-md  /* 90% of small viewport on mobile, cap at md width */
        sm:w-[70svw] sm:max-w-lg
        md:w-[60svw] md:max-w-xl
      "
    >
      {/* Header row */}
      <div className="flex flex-wrap items-center justify-between px-2 py-1 text-xs sm:text-sm gap-2">
        <div className="flex items-center gap-2">
          <span className="animate-pulse shrink-0">
            <Image src="/play.png" alt="Play" width={16} height={16} />
          </span>
          <span className="truncate">LOADING - {progress}%</span>
        </div>
        <div className="text-[10px] sm:text-xs uppercase truncate max-w-[60%] text-right">
          {text}
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-[2px] bg-[#ffffff]">
        <div
          className="h-full bg-[#1a1a1a] transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  </div>
)}

      {/* Hero */}
      <section ref={heroRef} className={styles.hero}>
        <div ref={overlayRef} className={styles.overlay}></div>

        <Navbar />

        <div ref={headerRef} className={styles.header}>
          <h1>radiants</h1>
        </div>

        <div ref={heroBoxRef} className={styles.heroBox}></div>
      </section>
    </>
  );
};

export default HeroWithPreloader;
