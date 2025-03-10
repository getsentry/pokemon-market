import {useSentryToolbar} from "@sentry/toolbar";
import { ReactNode, useMemo } from "react";
import useLogin from "./useLogin";
import {getUnleashFlagAdapter} from "../unleash-adapter";
import type { UnleashClient } from 'unleash-proxy-client';

interface Props {
  children?: ReactNode;
  unleashClient?: UnleashClient;
}

export default function SentryToolbar({children, unleashClient}: Props) {
  const {isLoggedIn} = useLogin();

  useSentryToolbar(useMemo(() => ({
    // Bootstrap config
    cdn: process.env.NEXT_PUBLIC_TOOLBAR_SRC ?? 'https://browser.sentry-cdn.com/sentry-toolbar/latest/toolbar.min.js',
    enabled: isLoggedIn,
    initProps: (SentryToolbar) => ({
      // InitProps
      mountPoint: () => document.body,

      // ConnectionConfig
      sentryOrigin: process.env.NEXT_PUBLIC_SENTRY_ORIGIN,

      // FeatureFlagsConfig
      featureFlags: getUnleashFlagAdapter(unleashClient),

      // OrgConfig
      organizationSlug: process.env.NEXT_PUBLIC_SENTRY_ORGANIZATION ?? 'sentry-test',
      projectIdOrSlug:process.env.NEXT_PUBLIC_SENTRY_PROJECT ?? 'pokemart',
      environment: process.env.NEXT_PUBLIC_VERCEL_ENV ? `vercel-${process.env.NEXT_PUBLIC_VERCEL_ENV}` : undefined,

      // RenderConfig
      domId: 'sentry-toolbar',
      placement: 'right-edge', //  'bottom-right-corner',
      theme: 'light',

      // Debug
      debug: process.env.NEXT_PUBLIC_DEBUG,
    }),
  }), [isLoggedIn, unleashClient]));

  return children
}
