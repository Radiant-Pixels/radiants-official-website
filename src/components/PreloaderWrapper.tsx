"use client";
import { useState } from "react";
import Preloader from "@/components/PreLoader";
import PreHero from "@/components/PreHero";

export default function PreloaderWrapper({ children }: { children: React.ReactNode }) {
  const [showPreloader, setShowPreloader] = useState(true);
  const [showPreHero, setShowPreHero] = useState(false);

  return (
    <>
      {showPreloader && (
        <Preloader
          onComplete={() => {
            setShowPreloader(false);
            setShowPreHero(true);
          }}
        />
      )}

      {showPreHero && (
        <PreHero
          onComplete={() => {
            setShowPreHero(false);
          }}
        />
      )}

      {!showPreloader && !showPreHero && <>{children}</>}
    </>
  );
}
