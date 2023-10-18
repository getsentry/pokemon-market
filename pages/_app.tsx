import './globals.css';

import { NextPage } from "next";
import { ReactNode, PropsWithChildren, ReactElement } from "react";
import type { AppProps } from "next/app";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { DefaultLayout } from '@/components/DefaultLayout';
import { LocalStorageContextProvider } from '@/components/LocalStorageProvider';

type GetLayout = (page: ReactElement) => ReactNode

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: GetLayout;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function Layout({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? DefaultLayout;

  return <AppProviders>{getLayout(<Component {...pageProps} />)}</AppProviders>;
}

const queryClient = new QueryClient();

function AppProviders({children}: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <LocalStorageContextProvider>{children}</LocalStorageContextProvider>
    </QueryClientProvider>
  );
}


