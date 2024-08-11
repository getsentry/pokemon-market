import './globals.css';

import SentryToolbar from '@sentry/toolbar';

import { NextPage } from "next";
import { ReactNode, PropsWithChildren, ReactElement, useEffect } from "react";
import type { AppProps } from "next/app";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { DefaultLayout } from '@/components/DefaultLayout';
import { LocalStorageContextProvider } from '@/components/LocalStorageProvider';

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
  useEffect(() => {
    SentryToolbar.init({
      rootNode: document.body,
      cdn: 'http://localhost:8888',
    });
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <LocalStorageContextProvider>{children}</LocalStorageContextProvider>
    </QueryClientProvider>
  );
}
