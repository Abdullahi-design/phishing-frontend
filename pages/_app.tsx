import Nav from '../components/Nav'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Nav/>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
