import Head from 'next/head'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <>
    <Head>
    <title>MyTop</title>
    </Head>
    <Component {...pageProps}></Component>
  </>
}

export default MyApp
