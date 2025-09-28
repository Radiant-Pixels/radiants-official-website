// Used to move the animate text after revealing and moving each word (mask + word) to the center
"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CopyProps {
  children: React.ReactElement;
  animateOnScroll?: boolean;
  delay?: number;
}

export default function Copy1({
  children,
  animateOnScroll = true,
  delay = 0,
}: CopyProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wordsRef = useRef<HTMLElement[]>([]);

  // Helper to wrap tokens (words + whitespace). Whitespace tokens are re-inserted as controlled spacing.
  const wrapWordsPreserveSpaces = (element: HTMLElement) => {
    const text = element.textContent ?? "";
    element.innerHTML = ""; // clear content

    const tokens = text.split(/(\s+)/);
    const createdMasks: HTMLElement[] = [];

    tokens.forEach((token, idx) => {
      if (/\s+/.test(token)) {
        // Instead of raw whitespace, insert a fixed-width spacer
        const spacer = document.createElement("span");
        spacer.className = "inline-block"; 
        spacer.style.width = "0.55em"; 
        // ⬅️ Adjust spacing between words here (e.g., 0.25em, 1em, etc.)
        element.appendChild(spacer);
      } else {
        const mask = document.createElement("span");
        mask.className = "custom-mask inline-block overflow-hidden align-bottom";

        const inner = document.createElement("span");
        inner.className = "word-inner inline-block";
        inner.textContent = token;

        mask.appendChild(inner);
        element.appendChild(mask);

        createdMasks.push(mask);
      }
    });

    return createdMasks;
  };

  useEffect(() => {
    if (!containerRef.current) return;

    wordsRef.current = [];

    const elements: Element[] = containerRef.current.hasAttribute("data-copy-wrapper")
      ? Array.from(containerRef.current.children)
      : [containerRef.current];

    elements.forEach((el) => {
      const htmlEl = el as HTMLElement;
      const wrapped = wrapWordsPreserveSpaces(htmlEl);
      wordsRef.current.push(...wrapped);
    });

    if (wordsRef.current.length === 0) return;

    gsap.set(wordsRef.current, { y: "100%", opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: animateOnScroll
        ? {
            trigger: containerRef.current,
            start: "top 75%",
          }
        : undefined,
      delay,
    });

    tl.to(wordsRef.current, {
      y: "0%",
      opacity: 1,
      duration: 0.6,
      stagger: 0.05,
      ease: "power4.out",
    });

    tl.to(
      wordsRef.current,
      {
        x: "30%",
        transformOrigin: "center center",
        duration: 1,
        ease: "power3.out",
        stagger: 0.05,
      },
      "+=0.2"
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [animateOnScroll, delay]);

  if (React.Children.count(children) === 1) {
    return <div ref={containerRef}>{children}</div>;
  }

  return (
    <div ref={containerRef} data-copy-wrapper="true">
      {children}
    </div>
  );
}
