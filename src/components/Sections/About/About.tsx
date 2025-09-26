"use client";
import React from "react";
import CTAButton from "@/components/CTA Button/cta-button";
import Copy from "@/components/Copy";

const AboutSection = () => {
  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center md:items-center">
      {/* Left: Headings + Image */}
      <div className="flex flex-col gap-6 w-full pl-8 md:pl-16">
        <div>
          <div className="text-6xl md:text-7xl sm:text-9xl font-bold font-aeonik translate-x-[8vw]">
            <Copy delay={0.2}>
              <h1>
                Making Ideas
              </h1>
            </Copy>
            </div>
          <div className="text-6xl md:text-7xl sm:text-9xl font-bold font-aeonik translate-x-[5vw]">
            <Copy delay={0.3}>
              <h1>
                Into Reality
              </h1>
            </Copy>
          </div>
        </div>
        <div className="flex items-center justify-center sm:justify-start">
          <div className="w-[75%] h-64 md:h-80 bg-gray-300 rounded-xl md:translate-x-[5vw]"></div>
        </div>
      </div>

      {/* Right: Content + CTA */}
      <div className="flex flex-col gap-6 md:w-1/2 md:translate-x-[-50px] md:translate-y-[140px] translate-y-[40px] items-center">
        <p className="text-[#1a1a1a] font-aeonik font-bold leading-relaxed w-[85%] text-justify">
          At Radiant, every pixel tells a story and every core powers a vision. 
          Through our divisions — Radiant Pixels and Radiant Cores — we bring imagination 
          to life in both digital and physical form. Pixels crafts inspiring digital 
          experiences, while Cores builds reliable hardware solutions. Together, they form 
          our mission: transforming bold ideas into reality, one pixel and one core at a time.
        </p>
        <CTAButton />
      </div>
    </section>
  );
};

export default AboutSection;
