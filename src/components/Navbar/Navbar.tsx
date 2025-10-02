import { useState, useEffect, useRef } from "react";
import SplitType from "split-type";
import "./styles.css";

interface MenuItem {
  label: string;
  href: string;
  active?: boolean;
  span?: string;
}

interface SubItem {
  title: string;
  content: string;
}

interface MenuProps {
  menuItems: MenuItem[];
  subItems: SubItem[];
}

export default function Menu({ menuItems, subItems }: MenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [menuState, setMenuState] = useState(menuItems);
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<Array<HTMLDivElement | null>>([]);

  /** Set active based on current URL */
  useEffect(() => {
    const pathname = window.location.pathname;

    const updatedMenu = menuItems.map((item) => {
      // Treat "/" as Home
      if (pathname === "/" && item.href === "/") return { ...item, active: true };
      return { ...item, active: item.href === pathname };
    });

    setMenuState(updatedMenu);
  }, [menuItems]);

  /** Animate menu items sliding in/out */
  const animateMenuItems = (direction: "in" | "out") => {
    linksRef.current.forEach((item, index) => {
      setTimeout(() => {
        if (item) item.style.left = direction === "in" ? "0px" : "-100px";
      }, index * 50);
    });
  };

  /** Shuffle letters effect */
  const addShuffleEffect = (element: HTMLElement) => {
    const chars = element.querySelectorAll<HTMLElement>(".char");
    if (!chars.length) return;

    if (!element.dataset.original) {
      element.dataset.original = [...chars].map((c) => c.textContent ?? "").join("");
    }

    const originalText = element.dataset.original.split("");
    const shuffleInterval = 30;
    const resetDelay = 50;
    const additionalDelay = 80;

    chars.forEach((char, index) => {
      setTimeout(() => {
        const interval = setInterval(() => {
          char.textContent = String.fromCharCode(97 + Math.floor(Math.random() * 26));
        }, shuffleInterval);

        setTimeout(() => {
          clearInterval(interval);
          char.textContent = originalText[index] || "";
        }, resetDelay + index * additionalDelay);
      }, index * shuffleInterval);
    });
  };

  /** Initialize SplitType and hover events on menu open */
  useEffect(() => {
    if (!isOpen) return;

    linksRef.current.forEach((item) => {
      if (!item) return;

      const linkElement = item.querySelector<HTMLAnchorElement>(".menu-item-link a");
      const spanElement = item.querySelector<HTMLSpanElement>("span");
      const bgHover = item.querySelector<HTMLDivElement>(".bg-hover");

      if (linkElement) {
        new SplitType(linkElement, { types: "words,chars" });
        if (bgHover) bgHover.style.width = linkElement.offsetWidth + 30 + "px";
      }

      if (spanElement) {
        new SplitType(spanElement, { types: "words,chars" });
        spanElement.style.width = (linkElement?.offsetWidth ?? 0) + 40 + "px";
      }

      const chars = spanElement?.querySelectorAll<HTMLElement>(".char") || [];

      const colorChars = () =>
        chars.forEach((char, i) => setTimeout(() => char.classList.add("char-active"), i * 50));
      const clearColorChars = () => chars.forEach((char) => char.classList.remove("char-active"));

      linkElement?.addEventListener("mouseenter", () => {
        colorChars();
        if (linkElement) addShuffleEffect(linkElement);
      });

      linkElement?.addEventListener("mouseleave", clearColorChars);
    });
  }, [isOpen]);

  /** Toggle menu open/close */
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      if (menuContainerRef.current) menuContainerRef.current.style.left = "0%";
      animateMenuItems("in");
    } else {
      if (menuContainerRef.current) menuContainerRef.current.style.left = "-100%";
      animateMenuItems("out");
    }
  };

  return (
    <>
      <nav>
        <div className="menu-toggle-wrapper width-[81%]">
          <div className="menu-toggle" onClick={toggleMenu}>
            <p className="menu-btn">Menu</p>
          </div>
          <div className="menu-toggle-mask"></div>
        </div>
        <a href="#" className="menu-btn">radiants.</a>
      </nav>

      <div className="menu-container font-aeonik" ref={menuContainerRef}>
        <div className="menu">
          <div className="menu-main">
            <div className="menu-top">
              <div className="menu-top-title">
                <p className="text-xl">Radiants</p>
              </div>

              <div className="menu-top-content">
                {menuState.map((item, index) => (
                  <div
                    key={index}
                    className={`menu-item ${item.active ? "active" : ""}`}
                    ref={(el) => { linksRef.current[index] = el; }}
                  >
                    <div className="menu-item-link">
                      <div className="bg-hover"></div>
                      <a className="a" href={item.href}>{item.label}</a>
                    </div>
                    {item.span && <span className="span">{item.span}</span>}
                  </div>
                ))}
              </div>
            </div>

            <div className="menu-bottom">
              {subItems.map((subItem, index) => (
                <div key={index} className="menu-sub-item">
                  <div className="menu-title">
                    <p>{subItem.title}</p>
                  </div>
                  <div className="menu-content">
                    <p>{subItem.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="menu-sidebar">
            <div className="close-btn" onClick={toggleMenu}>
              ✕
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
