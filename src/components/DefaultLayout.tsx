import cx from "classnames";
import { Fragment, ReactElement } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import useIsDarkMode from "./useIsDarkMode";

export function DefaultLayout({page}: {page: ReactElement}) {
  const {isDarkMode} = useIsDarkMode();

  return (
    <Fragment>
      <Head>
        <title>Pokemart</title>
      </Head>
      <Header />
      <Nav />
      <main
        className={cx(
          "px-10 pb-10 min-h-full",
          isDarkMode ? 'bg-black text-white' : 'bg-white text-black',
        )}>
          {page}
      </main>
    </Fragment>
  );
}
