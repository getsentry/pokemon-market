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

import { UnleashClient } from 'unleash-proxy-client';
import { FlagProvider } from "@unleash/nextjs/client";
import { wrappedUnleashStorageProvider } from '@/unleash-adapter';

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

const host = process.env.NEXT_PUBLIC_UNLEASH_HOST ?? 'http://localhost:4242';
const unleashClient = new UnleashClient({
  url: `${host}/api/frontend/`,
  clientKey: process.env.NEXT_PUBLIC_UNLEASH_CLIENT_KEY ?? 'default:development.unleash-insecure-frontend-api-token',
  appName: process.env.NEXT_PUBLIC_UNLEASH_APP_NAME ?? 'pokemon-market',
  storageProvider: wrappedUnleashStorageProvider(),
});

if ('window' in globalThis) {
  if (window.location.hash === '#mock-flags=POKEMART-NX') {
    localStorage.setItem(
      'pokemon_market:sntry_tb:unleash:overrides',
      JSON.stringify({
        'dark-mode': true,
        'on-sale': true,
        'enable-feedback': true
      })
    );
    window.location.hash = '';
    window.location.reload();
  }
}

function AppProviders({children}: PropsWithChildren) {
  return (
    <FlagProvider unleashClient={unleashClient}>
      <LocalStorageContextProvider>
        <LoginContextProvider>
          <QueryClientProvider client={queryClient}>
            <SentryToolbar unleashClient={unleashClient}>
              <SpotlightProvider>
                {children}
              </SpotlightProvider>
            </SentryToolbar>
          </QueryClientProvider>
        </LoginContextProvider>
      </LocalStorageContextProvider>
    </FlagProvider>
  );
}
