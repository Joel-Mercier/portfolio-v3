import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Header from '../components/header'
import { AnimatePresence } from 'framer-motion'

export default function App({ Component, pageProps, router }: AppProps) {
  const url = `https://joelmercier.io${router.route}`

  return (
    <div className='bg-slate-900 w-screen h-screen'>
      <Head>
        <link rel="icon" href="/icons/favicon.ico" />
      </Head>
      <Header />
      <AnimatePresence
        exitBeforeEnter
        initial={false}
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <Component {...pageProps} canonical={url} key={url} />
      </AnimatePresence>
    </div>
  )
}
