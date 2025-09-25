"use client";
import React from "react";
import CTAButton from "@/components/CTA Button/cta-button";
import Copy from "@/components/Copy";

const AboutSection = () => {
  return (
    <section className="min-h-screen flex flex-col md:flex-row items-start md:items-center p-16 gap-12">
      {/* Left: Headings + Image */}
      <div className="flex flex-col gap-6 w-full pl-8 md:pl-16">
        <div>
          <div className="text-5xl md:text-9xl font-bold font-aeonik">
            <Copy delay={0.2}>
              <h1>
                Making Ideas
              </h1>
            </Copy>
            </div>
          <div className="text-5xl md:text-9xl font-bold font-aeonik">
            <Copy delay={0.3}>
              <h1>
                Into Reality
              </h1>
            </Copy>
          </div>
        </div>

        <div className="w-full h-64 md:h-80 bg-gray-300 rounded-xl"></div>
      </div>

      {/* Right: Content + CTA */}
      <div className="flex flex-col gap-6 md:w-1/2">
        <p className="text-base md:text-lg leading-relaxed">
          Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
          ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum.
        </p>
        <CTAButton />
      </div>
    </section>
  );
};

export default AboutSection;
