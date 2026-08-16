import '../styles/globals.css'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from '@vercel/analytics/react'
import GlobeBackground from '../components/GlobeBackground'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobeBackground />
      <Component {...pageProps} />
      <Analytics />
      <SpeedInsights />
    </>
  )
}
