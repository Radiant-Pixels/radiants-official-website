"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CopyLinesProps {
  children: React.ReactElement;
  animateOnScroll?: boolean;
  delay?: number;
}

export default function CopyLines({
  children,
  animateOnScroll = true,
  delay = 0,
}: CopyLinesProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const linesRef = useRef<HTMLElement[]>([]);

  // Helper to wrap each line in a mask
  const wrapLines = (element: HTMLElement) => {
    const text = element.textContent ?? "";
    element.innerHTML = "";

    // split by line breaks (\n)
    const splitLines = text.split("\n");
    const created: HTMLElement[] = [];

    splitLines.forEach((lineText) => {
      const mask = document.createElement("div");
      mask.className = "inline-block overflow-hidden w-full";

      const inner = document.createElement("div");
      inner.className = "inline-block w-full";
      inner.textContent = lineText;

      // make sure font styling is inherited
      inner.style.font = "inherit";

      mask.appendChild(inner);
      element.appendChild(mask);
      created.push(mask);
    });

    return created;
  };

  useEffect(() => {
    if (!containerRef.current) return;

    linesRef.current = [];
    const elements: Element[] = containerRef.current.hasAttribute("data-copy-wrapper")
      ? Array.from(containerRef.current.children)
      : [containerRef.current];

    elements.forEach((el) => {
      linesRef.current.push(...wrapLines(el as HTMLElement));
    });

    gsap.set(linesRef.current, { y: "100%", opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: animateOnScroll
        ? { trigger: containerRef.current, start: "top 75%" }
        : undefined,
      delay,
    });

    // animate each line
    tl.to(linesRef.current, {
      y: "0%",
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "power4.out",
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [animateOnScroll, delay]);

  return (
    <div ref={containerRef} data-copy-wrapper="true">
      {children}
    </div>
  );
}
