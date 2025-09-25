// "use client"

// import React, { use, useRef } from "react";

// import gsap from "gsap";
// import { SplitText } from "gsap/SplitText";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useGSAP } from "@gsap/react"
// import { text } from "stream/consumers";

// gsap.registerPlugin(SplitText, ScrollTrigger);

// interface CopyProps {
//     children: React.ReactElement;
//     animateOnScroll?: boolean;
//     delay?: number;
// }

// export default function Copy({children, animateOnScroll = true, delay = 0}: CopyProps) {
//     const containerRef = useRef<HTMLDivElement | null>(null);
//     const elementRef = useRef<Element[]>([]);
//     const splitRef = useRef<any[]>([]);
//     const lines = useRef<any[]>([]);

//     useGSAP(() => {

//         if (!containerRef.current) return;

//         splitRef.current = []
//         elementRef.current = []
//         lines.current = []

//         let elements = []
//         if (containerRef.current.hasAttribute("data-copy-wrapper")) {
//             elements = Array.from(containerRef.current.children)
//         } else {
//             elements = [containerRef.current]
//         }
        
//         elements.forEach((element) => {
//             elementRef.current.push(element)

//             const split = SplitText.create(element, { 
//                     type: "lines",
//                     mask: "lines", 
//                     linesClass: "line++" 
//                 })
//                 splitRef.current.push(split)

//                 const computedStyle = window.getComputedStyle(element);
//                 const textIndent = computedStyle.textIndent;

//                 if(textIndent && textIndent !== "0px") {
//                     if(split.lines.length > 0) {
//                         (split.lines[0] as HTMLElement).style.paddingLeft = textIndent
//                     }
//                     (element as HTMLElement).style.textIndent = "0"
//                 }

//                 lines.current.push(...split.lines)
//         })

//         gsap.set(lines.current, { y: "100%" })

//         const animationProps = {
//             y: "0%",
//             duration: 1,
//             stagger: 0.1,
//             ease: "power4.out",
//             delay: delay
//         }

//         if(animateOnScroll) {
//             gsap.to(lines.current, {
//                 ...animationProps, scrollTrigger: {
//                     trigger: containerRef.current,
//                     start: "top 75%",
//                     once: true,
//                 }
//             })
//         } else {
//             gsap.to(lines.current, animationProps)
//         }

//         return () => {
//             splitRef.current.forEach((split) => {
//                 if (split) {
//                     split.revert();
//                 }
//             })
//         }

//     }, {scope: containerRef, dependencies: [animateOnScroll, delay]})

//     if (React.Children.count(children) === 1) {
//         return (
//             <div ref={containerRef}>
//                 {children}
//             </div>
//         );
//     }

//     return (
//         <div ref={containerRef} data-copy-wrapper="true">
//             {children}
//         </div>
//     )

// }

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

export default function Copy({ children, animateOnScroll = true, delay = 0 }: CopyProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const linesRef = useRef<HTMLElement[]>([]);

  // Helper to wrap each line in a custom mask
  const wrapLines = (element: HTMLElement) => {
    const text = element.innerText;
    element.innerHTML = ""; // clear existing content

    // Simple split: by line breaks
    const splitLines = text.split("\n");

    const lines: HTMLElement[] = [];

    splitLines.forEach((lineText) => {
      const mask = document.createElement("div");
      mask.className = "custom-mask overflow-hidden"; // your mask wrapper

      const inner = document.createElement("div");
      inner.className = "line-inner inline-block";
      inner.innerText = lineText;

      mask.appendChild(inner);
      element.appendChild(mask);

      lines.push(inner);
    });

    return lines;
  };

  useEffect(() => {
    if (!containerRef.current) return;

    // Reset refs
    linesRef.current = [];

    let elements: Element[] = containerRef.current.hasAttribute("data-copy-wrapper")
      ? Array.from(containerRef.current.children)
      : [containerRef.current];

    elements.forEach((el) => {
      const htmlEl = el as HTMLElement;
      const wrappedLines = wrapLines(htmlEl);
      linesRef.current.push(...wrappedLines);
    });

    // Initial state
    gsap.set(linesRef.current, { y: "100%", opacity: 0 });

    const animationProps = {
      y: "0%",
      opacity: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: "power4.out",
      delay: delay
    };

    if (animateOnScroll) {
      gsap.to(linesRef.current, {
        ...animationProps,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          once: true
        }
      });
    } else {
      gsap.to(linesRef.current, animationProps);
    }
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
