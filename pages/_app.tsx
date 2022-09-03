import Head from "next/head";
import "../styles/globals.css";
import Router from "next/router";
import ym from "react-yandex-metrika";
import { YMInitializer } from "react-yandex-metrika";

Router.events.on("routeChangeComplete", (url: string) => {
  if (typeof window !== "undefined") {
    ym("hit", url);
  }
});

function MyApp({ Component, pageProps, router }) {
  return (
    <>
      <Head>
        <title>MyTop</title>
        <meta property="og:url" content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath} />
        <meta property="og:locale" content="ru_RU" />
      </Head>
      <YMInitializer accounts={[]} options={{ webvisor: true, defer: true }} version="2" />
      <Component {...pageProps}></Component>
    </>
  );
}

export default MyApp;
