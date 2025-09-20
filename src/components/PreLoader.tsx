"use client";
import { useEffect, useState } from "react";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState("https://radiant.space/init/start");

  const terminals = [
    "https://radiant.space/init/start",
    "https://radiant.space/loader/sequence",
    "https://radiant.space/core/boot",
    "https://radiant.space/assets/prep",
    "https://radiant.space/system/ok",
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let textInterval: NodeJS.Timeout;

    const handleReady = () => {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            clearInterval(textInterval);
            // Schedule onComplete after current render
            setTimeout(() => {
              onComplete();
            }, 0);
            return 100;
          }
          return prev + 2;
        });
      }, 30);

      // Rotate terminal texts
      let i = 0;
      textInterval = setInterval(() => {
        i = (i + 1) % terminals.length;
        setText(terminals[i]);
      }, 800);
    };

    if (document.readyState === "complete") {
      handleReady();
    } else {
      window.addEventListener("load", handleReady);
    }

    return () => {
      window.removeEventListener("load", handleReady);
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black text-white font-mono z-[9999] flex items-center justify-center">
      <div className="w-[600px]">
        {/* Loader Line */}
        <div className="flex items-center justify-between px-2 py-1 text-sm">
          <div className="flex items-center gap-2">
            <span className="animate-pulse">➠</span>
            <span>LOADING - {progress}%</span>
          </div>
          <div className="text-xs text-gray-400 uppercase">{text}</div>
        </div>
        {/* Progress bar */}
        <div className="w-full h-[2px] bg-gray-700">
          <div
            className="h-full bg-white transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
