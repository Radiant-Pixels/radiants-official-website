"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CopyWordProps {
  children: React.ReactElement;
  animateOnScroll?: boolean;
  delay?: number;
}

export default function CopyWord({ children, animateOnScroll = true, delay = 0 }: CopyWordProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wordsRef = useRef<HTMLElement[]>([]);

  const wrapWords = (element: HTMLElement) => {
    const text = element.textContent ?? "";
    element.innerHTML = "";
    const tokens = text.split(/(\s+)/);
    const created: HTMLElement[] = [];

    tokens.forEach(token => {
      if (/\s+/.test(token)) {
        element.appendChild(document.createTextNode(token));
      } else {
        const mask = document.createElement("span");
        mask.className = "inline-block overflow-hidden";

        const inner = document.createElement("span");
        inner.className = "inline-block";
        inner.textContent = token;

        mask.appendChild(inner);
        element.appendChild(mask);
        created.push(mask);
      }
    });

    return created;
  };

  useEffect(() => {
    if (!containerRef.current) return;
    wordsRef.current = [];
    const elements: Element[] = containerRef.current.hasAttribute("data-copy-wrapper")
      ? Array.from(containerRef.current.children)
      : [containerRef.current];

    elements.forEach(el => {
      wordsRef.current.push(...wrapWords(el as HTMLElement));
    });

    gsap.set(wordsRef.current, { y: "100%", opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: animateOnScroll
        ? { trigger: containerRef.current, start: "top 75%" }
        : undefined,
      delay,
    });

    // only animate Y and opacity, no horizontal movement
    tl.to(wordsRef.current, {
      y: "0%",
      opacity: 1,
      duration: 0.6,
      stagger: 0.05,
      ease: "power4.out",
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [animateOnScroll, delay]);

  return (
    <div ref={containerRef} data-copy-wrapper="true">
      {children}
    </div>
  );
}
