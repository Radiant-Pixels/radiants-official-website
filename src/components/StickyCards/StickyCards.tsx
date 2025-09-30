'use client';
import React from 'react'
import "./styles.css";
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger);

const StickyCards = () => {
    const stickyCardsData = [
        {
            index: "01",
            title: "Pixels",
            image: "/next.svg",
            description:
            "Radiant Pixels specializes in crafting visually stunning, UI-centric web and mobile applications. We bring ideas to life with pixel-perfect interfaces and seamless user experiences that blend aesthetics with performance."
        },
        {
            index: "02",
            title: "Cores",
            image: "/next.svg",
            description:
            "Radiant Cores delivers innovative hardware solutions — from embedded systems to custom-built devices. We design and engineer robust, efficient hardware tailored to meet real-world demands and integrate seamlessly with software ecosystems."
        },
        {
            index: "03",
            title: "Agents",
            image: "/next.svg",
            description:
            "Radiant Agents powers the future with cutting-edge AI automation and intelligent software solutions. We build adaptive systems that learn, evolve, and optimize workflows, driving efficiency and unlocking new capabilities."
        },
        {
            index: "04",
            title: "SaaS",
            image: "/next.svg",
            description:
            "Radiant SaaS turns visionary ideas into reality — delivering complete end-to-end solutions across both software and hardware. From concept to launch, we transform bold concepts into scalable products that accelerate business growth."
        }
    ];


    const container = useRef(null)

    useGSAP(() => {
        const stickyCards = document.querySelectorAll('.sticky-card');

        stickyCards.forEach((card, index) => {
            if (index < stickyCards.length - 1) {
                ScrollTrigger.create({
                    trigger: card,
                    start: "top top",
                    endTrigger: stickyCards[stickyCards.length - 1],
                    end: "top top",
                    pin: true,
                    pinSpacing: false,
                })
            }

            if (index < stickyCards.length - 1) {
                ScrollTrigger.create({
                    trigger: stickyCards[index + 1],
                    start: "top bottom",
                    end: "top top",
                    onUpdate: (self) => {
                        const progress = self.progress;
                        const scale = 1 - progress * 0.25;
                        const rotation = (index % 2 === 0 ? 5 : -5) * progress;
                        const afterOpacity = progress;

                        gsap.set(card, {
                            scale: scale,
                            rotation: rotation,
                            "--after-opacity" : afterOpacity
                        })
                    }
                })
            }
        })
    }, [container])

  return (
    <div className='sticky-cards' ref={container}>
        {stickyCardsData.map((cardData, index) => (
            <div className="sticky-card" key={index}>
                <div className="sticky-card-index">
                    <h1 className='h1'>{cardData.index}</h1>
                </div>
                <div className="sticky-card-content">
                    <div className="sticky-card-content-wrapper">
                        <h1 className='sticky-card-header h1'>{cardData.title}</h1>

                        <div className="sticky-card-img">
                            <img src={cardData.image} alt="" />
                        </div>

                        <div className="sticky-card-copy">
                            <div className="sticky-card-copy-title">
                                <p className='p'>(About the Sector)</p>
                            </div>
                            <div className="sticky-card-copy-description">
                                <p className='p'>{cardData.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </div>
  )
}

export default StickyCards