import React from 'react'
import "./styles.css";
import StickyCards from '@/components/StickyCards/StickyCards';

const Cards = () => {
  return (
    <>
        <main className='cards-main'>
            <section className='intro'>
                <h1 className='intro-header'>What Radiants Offers</h1>
            </section>

            <StickyCards />

            <section className='outro'>
                <h1 className='outro-header'>Coming Soon...</h1>
            </section>
        </main>
    </>
  )
}

export default Cards