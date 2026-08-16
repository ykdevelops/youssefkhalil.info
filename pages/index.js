import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import scrollStyles from '../styles/ScrollHint.module.css'
import Intro from '../components/Intro'
import Education from '../components/Education'
import Pitch from '../components/Pitch'
import WorkExperience from '../components/WorkExperience'
import Contact from '../components/Contact'
import StickyNav from '../components/StickyNav'

export default function Home() {
  const [showScrollDown, setShowScrollDown] = useState(false)
  const siteUrl = 'https://youssefkhalil.info'
  const title = 'Youssef Khalil — Web Developer'
  const description =
    'Fast, modern websites for small businesses—strategy, build, launch, and ongoing care.'
  const ogImage = 'https://ykdevelops.s3.us-east-2.amazonaws.com/contact/introGif-min.png'

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowScrollDown(true)
    }, 20000)

    const handleMouseActivity = () => {
      clearTimeout(timeoutId)
      setShowScrollDown(false)
    }

    window.addEventListener('scroll', handleMouseActivity)

    return () => {
      window.removeEventListener('scroll', handleMouseActivity)
      clearTimeout(timeoutId)
    }
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={siteUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Youssef Khalil" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content="Youssef Khalil — Web Developer" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'WebSite',
                  url: siteUrl,
                  name: 'Youssef Khalil',
                  description,
                },
                {
                  '@type': 'Person',
                  name: 'Youssef Khalil',
                  url: siteUrl,
                  sameAs: ['https://linkedin.com/in/ykdevelops', 'https://github.com/ykdevelops'],
                },
              ],
            }),
          }}
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <StickyNav />
      {/* <SpeakButton /> */}
      {showScrollDown && (
        <div className={scrollStyles.scrollColumn}>
          <div className={scrollStyles.scrollTitle}>Scroll for more</div>
          <div className={scrollStyles.iconScroll}></div>
        </div>
      )}

      <Intro />
      <Pitch />
      <WorkExperience />
      <Education />
      <Contact />
    </div>
  )
}
