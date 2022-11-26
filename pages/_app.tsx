import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Header from "../components/shared/header";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "next-themes";
import classNames from "classnames";
import { sono } from "../lib/fonts";

export default function App({ Component, pageProps, router }: AppProps) {
  const url = `https://joelmercier.io${router.route}`;

  return (
    <ThemeProvider attribute="class">
      <div className={classNames("font-sans", sono.variable)}>
        <Head>
          <link rel="icon" href="/icons/favicon.ico" />
        </Head>
        <Header />
        <AnimatePresence
          mode="wait"
          initial={false}
          onExitComplete={() => window.scrollTo(0, 0)}
        >
          <Component {...pageProps} canonical={url} key={url} />
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
}
