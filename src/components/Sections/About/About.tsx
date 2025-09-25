import CTAButton from '@/components/CTA Button/cta-button'
import React from 'react'
import styles from './about.module.scss'

const AboutSection = () => {
  return (
    <section>
        <div className={styles.headingContainer}>
            <div className={styles.headingLine1}>Making Ideas</div>
            <div className={styles.headingLine2}>Into Reality</div>
        </div>
        <div className={styles.ctaContainer}>
            <div className={styles.aboutContent}></div>
            <CTAButton />
        </div>
        <div className={styles.aboutImage}></div>
    </section>
  )
}

export default AboutSection