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
            description: "Radiant Pixels focuses on .."
        },
        {
            index: "02",
            title: "Cores",
            image: "/next.svg",
            description: "Radiant Cores focuses on .."
        },
        {
            index: "03",
            title: "Agents",
            image: "/next.svg",
            description: "Radiant Agents focuses on .."
        },
        {
            index: "04",
            title: "SaaS",
            image: "/next.svg",
            description: "Radiant SaaS focuses on .."
        },
    ]

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
                                <p className='p'>(About the state)</p>
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