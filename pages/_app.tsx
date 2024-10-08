import './globals.css';

import { NextPage } from "next";
import { ReactNode, PropsWithChildren, ReactElement, useEffect } from "react";
import type { AppProps } from "next/app";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { DefaultLayout } from '@/components/DefaultLayout';
import { LocalStorageContextProvider } from '@/components/LocalStorageProvider';
import { loadToolbar } from '@/utils/loadToolbar';

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
    cdn: 'https://browser.sentry-cdn.com/sentry-toolbar/latest/toolbar.min.js',
    enabled: true,
    initProps: {
      // InitProps
      mountPoint: () => document.body,

      // ConnectionConfig
      sentryOrigin: 'https://sentry.io',
      sentryRegion: 'us',

      // FeatureFlagsConfig
      featureFlags: undefined,

      // OrgConfig
      organizationIdOrSlug: 'sentry-test',
      projectIdOrSlug: 'pokemart',
      environment: ['prod', 'development'],

      // RenderConfig
      domId: 'sentry-toolbar',
      placement: 'right-edge',
      theme: 'light',

      // Debug
      debug: true,
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      <LocalStorageContextProvider>{children}</LocalStorageContextProvider>
    </QueryClientProvider>
  );
}

type InitProps = Parameters<Awaited<ReturnType<typeof loadToolbar>>['init']>[0]
function useSentryToolbar({
  enabled,
  cdn = 'https://browser.sentry-cdn.com/sentry-toolbar/latest/toolbar.min.js',
  initProps,
}: {
  enabled: boolean;
  cdn: string;
  initProps: InitProps,
}) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const controller = new AbortController();

    let cleanup: Function | undefined = undefined;
    loadToolbar(controller.signal, cdn).then(SentryToolbar => {
      cleanup = SentryToolbar.init(initProps);
    });

    return () => {
      controller.abort();
      cleanup?.();
    }
  }, [enabled, cdn]);
}
