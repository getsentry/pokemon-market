import { Fragment, ReactElement } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Nav from "@/components/Nav";

export function DefaultLayout({page}: {page: ReactElement}) {
  return (
    <Fragment>
      <Head>
        <title>Pokemart</title>
      </Head>
      <Header />
      <Nav />
      <main className="px-10 pb-10">{page}</main>
    </Fragment>
  );
}
