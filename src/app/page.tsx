'use client'
import AboutSection from '@/components/Sections/About/About'
import HeroWithPreloader from '@/components/Sections/Hero/Hero'
import React, { useState } from 'react'
import {ReactLenis} from 'lenis/react'
import Cards from '@/components/Sections/Cards/Cards'
import Contact from '@/components/Contact/Contact'
import Menu from '@/components/Navbar/Navbar'
import Preloader from '@/components/Preloader/Preloader'
import Hero from '@/components/Sections/Hero/Hero'

const Home = () => {
  const menuItems = [
    { label: "Home", href: "/", active: false },
    { label: "About", href: "/about", active: false },
    { label: "Pixels", href: "/pixels", active: true },
    { label: "Cores", href: "/cores", active: false },
    { label: "Agents", href: "/agents", active: false },
    { label: "SaaS", href: "/saas", active: false },
    // { label: "Contact", href: "#contact", active: false },
  ];

  const subItems = [
    { title: "Connect", content: "Instagram" },
    { title: "Email", content: "sparks@radiantsofficial.com" },
    { title: "GLOBAL", content: "2025" },
  ];

  const [loaded, setLoaded] = useState(false);
  return (
    <>
      <ReactLenis root>
            <HeroWithPreloader />
            <Menu menuItems={menuItems} subItems={subItems} />
            <AboutSection />
            <Cards />
            {/* <Contact /> */}
      </ReactLenis>
    </>
  )
}

export default Home