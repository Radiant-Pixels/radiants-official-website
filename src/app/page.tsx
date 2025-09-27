import AboutSection from '@/components/Sections/About/About'
import HeroWithPreloader from '@/components/Sections/Hero/Hero'
import React from 'react'
import {ReactLenis} from 'lenis/react'
import Cards from '@/components/Sections/Cards/Cards'

const Home = () => {
  return (
    <>
    <ReactLenis root>
        <HeroWithPreloader />
        <AboutSection />
        <Cards />
    </ReactLenis>
    </>
  )
}

export default Home