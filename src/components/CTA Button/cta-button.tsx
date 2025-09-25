"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import styles from "./cta-button.module.scss";

const CTAButton = () => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);

const handleHover = () => {
  if (!dotRef.current || !btnRef.current) return;

  gsap.to(dotRef.current, {
    scale: 28,
    borderRadius: 9999,
    backgroundColor: "#0cac8a",
    duration: 0.5,
    ease: "power2.out",
  });

  gsap.to(textRef.current, {
    x: -19,
    color: "#1a1a1a",
    duration: 0.5,
    ease: "power2.out",
  });

  gsap.to(arrowRef.current, {
    x: -btnRef.current.offsetWidth + 104, // moves it into view
    opacity: 1,
    duration: 0.5,
    ease: "power2.out",
  });
};

const handleHoverOut = () => {
  if (!dotRef.current) return;

  gsap.to(dotRef.current, {
    scale: 1,
    borderRadius: "50%",
    backgroundColor: "#0cac8a",
    duration: 0.5,
    ease: "power2.in",
  });

  gsap.to(textRef.current, {
    x: 0,
    color: "#ffffff",
    duration: 0.5,
    ease: "power2.in",
  });

  gsap.to(arrowRef.current, {
    x: 0,               // reset translation
    opacity: 0,
    duration: 0.5,
    ease: "power2.in",
  });
};


  return (
    <div className={styles.cta}>
      <button
        ref={btnRef}
        className={styles.ctaBtn}
        onMouseEnter={handleHover}
        onMouseLeave={handleHoverOut}
      >
        {/* Dot */}
        <span className={styles.dot}>
          <span ref={dotRef} className={styles.dotInner}></span>
        </span>

        {/* Text */}
        <span ref={textRef} className={styles.text}>
          About Us
        </span>

        {/* Arrow */}
        <span ref={arrowRef} className={styles.arrow}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 16 16"
          >
            <path
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M2.343 8h11.314m0 0-4.984 4.984M13.657 8 8.673 3.016"
            ></path>
          </svg>
        </span>
      </button>
    </div>
  );
};

export default CTAButton;
