import { Fragment, ReactElement } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import useInitSentryToolbar from "@/components/useInitSentryToolbar";

export function DefaultLayout({page, navChildren}: {page: ReactElement, navChildren?: ReactElement}) {
  useInitSentryToolbar();

  return (
    <Fragment>
      <Head>
        <title>Pokemart</title>
      </Head>
      <Header />
      <Nav>{navChildren}</Nav>
      <main className="px-10 pb-10">{page}</main>
    </Fragment>
  );
}
