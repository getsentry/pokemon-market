import './globals.css';

import { NextPage } from "next";
import { ReactNode, PropsWithChildren, ReactElement } from "react";
import type { AppProps } from "next/app";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { DefaultLayout } from '@/components/DefaultLayout';
import { LocalStorageContextProvider } from '@/components/LocalStorageProvider';
import { LoginContextProvider } from '@/components/useLogin';
import SentryToolbar from '@/components/SentryToolbar';
import SpotlightProvider from '@/components/SpotlightProvider';

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
    <LocalStorageContextProvider>
      <LoginContextProvider>
        <QueryClientProvider client={queryClient}>
          <SentryToolbar>
            <SpotlightProvider>
              {children}
            </SpotlightProvider>
          </SentryToolbar>
        </QueryClientProvider>
      </LoginContextProvider>
    </LocalStorageContextProvider>
  );
}

