import AboutSection from '@/components/Sections/About/About'
import HeroWithPreloader from '@/components/Sections/Hero/Hero'
import React from 'react'
import {ReactLenis} from 'lenis/react'

const Home = () => {
  return (
    <>
    <ReactLenis root>
        <HeroWithPreloader />
        <AboutSection />
    </ReactLenis>
    </>
  )
}

export default Home