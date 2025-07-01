import './globals.css';

import { NextPage } from "next";
import { ReactNode, PropsWithChildren, ReactElement, Fragment } from "react";
import type { AppProps } from "next/app";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { DefaultLayout } from '@/components/DefaultLayout';
import { LocalStorageContextProvider } from '@/components/LocalStorageProvider';
import { LoginContextProvider } from '@/components/useLogin';
import SpotlightProvider from '@/components/SpotlightProvider';
import Head from 'next/head';

type GetLayout = (props: {page: ReactElement}) => ReactNode

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  Layout?: GetLayout;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function Layout({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? DefaultLayout;

  return <AppProviders><Layout page={<Component {...pageProps} />} /></AppProviders>;
}

const queryClient = new QueryClient();

function AppProviders({children}: PropsWithChildren) {
  return (
    <Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </Head>
      <LocalStorageContextProvider>
        <LoginContextProvider>
          <QueryClientProvider client={queryClient}>
            <SpotlightProvider>
              {children}
            </SpotlightProvider>
          </QueryClientProvider>
        </LoginContextProvider>
      </LocalStorageContextProvider>
    </Fragment>
  );
}


