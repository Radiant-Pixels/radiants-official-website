"use client";
import { useState } from "react";
import Preloader from "@/components/PreLoader";
import PreHero from "@/components/PreHero";

export default function PreloaderWrapper({ children }: { children: React.ReactNode }) {
  const [showPreloader, setShowPreloader] = useState(true);
  const [showPreHero, setShowPreHero] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const handleEnableSound = () => setSoundEnabled(true);

  return (
    <>
      {/* Click anywhere overlay to enable sound */}
      {!soundEnabled && (
        <div
          className="fixed inset-0 z-[9999] bg-black text-white flex items-center justify-center cursor-pointer"
          onClick={handleEnableSound}
        >
          <p className="text-center text-xl md:text-2xl font-aeonik px-4">
            Click anywhere to enable sound
          </p>
        </div>
      )}

      {/* Preloader */}
      {soundEnabled && showPreloader && (
        <Preloader
          onComplete={() => {
            // Give a tiny delay so progress reaches 100% visually
            setTimeout(() => {
              setShowPreloader(false);
              setShowPreHero(true);
            }, 400); // adjust this for smoother feel
          }}
        />
      )}

      {/* PreHero */}
      {soundEnabled && showPreHero && (
        <PreHero
          onComplete={() => {
            setShowPreHero(false);
          }}
        />
      )}

      {/* Main content */}
      {!showPreloader && !showPreHero && <>{children}</>}
    </>
  );
}
