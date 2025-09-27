"use client";
import React from "react";
import CTAButton from "@/components/CTA Button/cta-button";
import Copy from "@/components/Copy/Copy";
import Copy1 from "@/components/Copy/Copy1";
import CopyLines from "@/components/Copy/CopyLine";
import "./styles.css";

const AboutSection = () => {
  return (
    <>
      <section className="min-h-screen flex flex-col md:flex-row items-center md:items-center">
        {/* Left: Headings + Image */}
        <div className="flex flex-col gap-25 w-full pl-8 md:pl-16">
          <div>
            <div className="text-6xl md:text-9xl sm:text-9xl font-bold font-aeonik translate-x-[5vw] whitespace-nowrap">
              <Copy1 delay={0.2}>
                <h1>
                  Making Ideas
                </h1>
              </Copy1>
              </div>
            <div className="text-6xl md:text-9xl sm:text-9xl font-bold font-aeonik translate-x-[5vw]">
              <Copy delay={0.3}>
                <h1>
                  Into Reality
                </h1>
              </Copy>
            </div>
          </div>
          <div className="flex items-center justify-center sm:justify-start">
            <div className="w-[75%] h-64 md:h-80 bg-[#1a1a1a] rounded-xl md:translate-x-[5vw]"></div>
          </div>
        </div>

        {/* Right: Content + CTA */}
        <div className="flex flex-col gap-10 md:w-1/2 md:translate-x-[-50px] md:translate-y-[80px] translate-y-[40px]">
        <CopyLines>
          <h4 className="text-[#1a1a1a] font-aeonik font-bold leading-relaxed w-[85%] text-justify lg:text-md">
            At Radiant, every pixel tells a story and every core powers a vision. 
            Radiant Pixels crafts digital experiences, while Radiant Cores builds reliable hardware. 
            Together, we transform bold ideas into reality.
          </h4>
        </CopyLines>
            <CTAButton />
        </div>
      {/* <img src="/images/aboutline.svg" alt="About Line" className="squiggle" /> */}
      </section>
    </>
  );
};

export default AboutSection;
