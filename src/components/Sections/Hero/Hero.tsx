"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import styles from "./Hero.module.scss";

const terminals = [
  "https://radiantsofficial.com/init/start",
  "https://radiantsofficial.com/loader/sequence",
  "https://radiantsofficial.com/core/boot",
  "https://radiantsofficial.com/assets/prep",
  "https://radiantsofficial.com/system/ok",
];

const HeroWithPreloader = () => {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState(terminals[0]);

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
          className="fixed inset-0 bg-[#ebebeb] text-[#1a1a1a] font-mono z-[9999] flex items-center justify-center"
        >
          <div className="w-[600px]">
            <div className="flex items-center justify-between px-2 py-1 text-sm">
              <div className="flex items-center gap-2">
                <span className="animate-pulse">
                  <Image src="/play.png" alt="Play" width={16} height={16} />
                </span>
                <span>LOADING - {progress}%</span>
              </div>
              <div className="text-xs uppercase">{text}</div>
            </div>
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

        <nav>
          <div className={styles.navCol}>
            <div className={styles.navItems}>
              <a href="#">radiants</a>
            </div>
            <div className={styles.navItems}>
              <p>innovation hub</p>
            </div>
          </div>
          <div className={styles.navCol}>
            <div className={styles.navItems}>
              <a href="/work">work</a>
              <a href="/pixels">pixels</a>
              <a href="/cores">cores</a>
            </div>
            <div className={styles.navItems}>
              <a href="https://www.instagram.com/radiant_enterprises.official/" target="_blank" rel="noopener noreferrer">instagram</a>
            </div>
            <div className={styles.navItems}>
              <p>anywhere, earth</p>
            </div>
          </div>
        </nav>

        <div ref={headerRef} className={styles.header}>
          <h1>radiants</h1>
        </div>

        <div ref={heroBoxRef} className={styles.heroBox}></div>
      </section>
    </>
  );
};

export default HeroWithPreloader;
