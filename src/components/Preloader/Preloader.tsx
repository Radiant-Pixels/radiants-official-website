"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

const terminals = [
  "radiants/init/start",
  "radiants/loader/sequence",
  "radiants/core/boot",
  "radiants/assets/prep",
  "radiants/system/ok",
];

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState(terminals[0]);
  const preloaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let textInterval: NodeJS.Timeout;

    const startLoading = () => {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            clearInterval(textInterval);

            // Fade out animation
            if (preloaderRef.current) {
              gsap.to(preloaderRef.current, {
                opacity: 0,
                duration: 1,
                ease: "power2.inOut",
                onComplete,
              });
            } else {
              onComplete();
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
      startLoading();
    } else {
      window.addEventListener("load", startLoading);
    }

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
      window.removeEventListener("load", startLoading);
    };
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 bg-[#ebebeb] text-[#1a1a1a] font-mono z-[9999] flex items-center justify-center p-4"
    >
      <div className="w-[90svw] max-w-md sm:w-[70svw] sm:max-w-lg md:w-[60svw] md:max-w-xl">
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

        <div className="w-full h-[2px] bg-[#ffffff]">
          <div
            className="h-full bg-[#1a1a1a] transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
