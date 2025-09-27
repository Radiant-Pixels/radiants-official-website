"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import "./styles.css";

export default function Navbar() {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    // "/images/logos/blush-commercial.png",
    // "/images/logos/blush-hospital.png",
    // "/images/next.svg",
  ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImage((prev) => (prev === 0 ? 1 : 0));
//     }, 2000);
//     return () => clearInterval(interval);
//   }, []);

  useEffect(() => {
    gsap.registerPlugin(CustomEase);
    CustomEase.create(
      "hop",
      "M0,0 C0.354,0 0.464,0.133 0.498,0.502 0.532,0.872 0.651,1 1,1"
    );

    const menuToggle = document.querySelector(".menu-toggle") as HTMLElement;
    const menu = document.querySelector(".menu") as HTMLElement;
    const links = document.querySelectorAll(".link");
    const socialLinks = document.querySelectorAll(".socials p");
    let isAnimating = false;

    // Split text function
    const splitTextIntoSpans = (selector: string) => {
      document.querySelectorAll(selector).forEach((element) => {
        const text = element.textContent || "";
        const splitText = text
          .split("")
          .map((char) => `<span>${char === " " ? "&nbsp;&nbsp;" : char}</span>`)
          .join("");
        element.innerHTML = splitText;
      });
    };

    splitTextIntoSpans(".header h1");

    const handleToggle = () => {
      if (isAnimating) return;
      if (!menuToggle) return;

      menuToggle.classList.toggle("active");

      if (menuToggle.classList.contains("active")) {
        menuToggle.classList.remove("closed");
        menuToggle.classList.add("opened");

        document.body.classList.add("menu-open");

        isAnimating = true;

        gsap.to(menu, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "hop",
          duration: 1.5,
          onStart: () => {
            menu.style.pointerEvents = "all";
            menu.style.zIndex = "1";
          },
          onComplete: () => {
            isAnimating = false;
          },
        });

        gsap.to(links, {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          delay: 0.85,
          duration: 1,
          ease: "power3.out",
        });

        gsap.to(socialLinks, {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          delay: 0.85,
          duration: 1,
          ease: "power3.out",
        });

        gsap.to(".video-wrapper", {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "hop",
          duration: 1.5,
          delay: 0.5,
        });

        gsap.to(".header h1 span", {
          rotateY: 0,
          stagger: 0.05,
          delay: 0.75,
          duration: 1.5,
          ease: "power4.out",
        });

        gsap.to(".header h1 span", {
          y: 0,
          scale: 1,
          stagger: 0.05,
          delay: 0.5,
          duration: 1.5,
          ease: "power4.out",
        });
      } else {
        menuToggle.classList.remove("opened");
        menuToggle.classList.add("closed");

        document.body.classList.remove("menu-open"); 

        isAnimating = true;

        gsap.to(menu, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          ease: "hop",
          duration: 1.5,
          onComplete: () => {
            menu.style.pointerEvents = "none";
            gsap.set(menu, {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            });

            gsap.set(links, { y: 30, opacity: 0 });
            gsap.set(socialLinks, { y: 30, opacity: 0 });
            gsap.set(".video-wrapper", {
              clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            });
            gsap.set(".header h1 span", {
              y: 500,
              rotateY: 90,
              scale: 0.75,
            });

            isAnimating = false;
          },
        });
      }
    };

    menuToggle?.addEventListener("click", handleToggle);

    return () => {
      menuToggle?.removeEventListener("click", handleToggle);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="logo">
        <a href="#home">
          radiants.
        </a>
      </div>
      {/* Toggle button */}
      <div className="menu-toggle closed">
        <div className="menu-toggle-icon">
          <div className="hamburger">
            <div className="menu-bar" data-position="top"></div>
            <div className="menu-bar" data-position="bottom"></div>
          </div>
        </div>
        <div className="menu-copy font-aeonik">
          <p>Menu</p>
        </div>
      </div>

      {/* Menu Overlay */}
      <div className="menu">
        <div className="col col-1">
          <div className="menu-logo">
            <a href="#home">
              radiants.
            </a>
          </div>
          <div className="links">
            <div className="link">
              <a href="#">Home</a>
            </div>
            <div className="link">
              <a href="#">Pixels</a>
            </div>
            {/* <div className="link">
              <a href="#">Cores</a>
            </div> */}
            <div className="link">
              <a href="#">About</a>
            </div>
            <div className="link">
              <a href="#">Contact</a>
            </div>
          </div>
          <div className="video-wrapper">
            <video autoPlay muted loop>
              <source src="/video/navbar-video.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        <div className="col col-2">
          <div className="socials">
              <div className="sub-col">
                <p>remote & global</p>
                <br />
                <p>sparks@radiantsofficial.com</p>
              </div>
              <br />
          </div>
          <div className="header font-schabo">
            <h1>pixels</h1>
          </div>
        </div>
      </div>
    </nav>
  );
}