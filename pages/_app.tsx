import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: 'calc(100vh - 200px)' }}>
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  )
}
