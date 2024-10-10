import './globals.css';

import { NextPage } from "next";
import { ReactNode, PropsWithChildren, ReactElement } from "react";
import type { AppProps } from "next/app";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { DefaultLayout } from '@/components/DefaultLayout';
import { LocalStorageContextProvider } from '@/components/LocalStorageProvider';
import useSentryToolbar from '@/toolbar/useSentryToolbar';

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
  useSentryToolbar({
    // Bootstrap config
    cdn: process.env.NEXT_PUBLIC_TOOLBAR_SRC || 'https://browser.sentry-cdn.com/sentry-toolbar/latest/toolbar.min.js',
    enabled: true,
    initProps: {
      // InitProps
      mountPoint: () => document.body,

      // ConnectionConfig
      sentryOrigin: 'https://sentry-test.sentry.io',
      sentryRegion: 'us',
      sentryApiPath: '/api/0',

      // FeatureFlagsConfig
      featureFlags: undefined,

      // OrgConfig
      organizationSlug: 'sentry-test',
      projectIdOrSlug: 'pokemart',
      environment: ['prod', 'development'],

      // RenderConfig
      domId: 'sentry-toolbar',
      placement: 'right-edge',
      theme: 'light',

      // Debug
      debug: process.env.NEXT_PUBLIC_DEBUG === 'true',
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      <LocalStorageContextProvider>{children}</LocalStorageContextProvider>
    </QueryClientProvider>
  );
}
