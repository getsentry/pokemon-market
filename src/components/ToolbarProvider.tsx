import useSentryToolbar from "@/toolbar/useSentryToolbar";
import { ReactNode } from "react";
import useLogin from "./useLogin";

interface Props {
  children?: ReactNode
}

export default function ToolbarProvider({children}: Props) {
  const {isLoggedIn} = useLogin();

  useSentryToolbar({
    // Bootstrap config
    cdn: process.env.NEXT_PUBLIC_TOOLBAR_SRC ?? 'https://browser.sentry-cdn.com/sentry-toolbar/latest/toolbar.min.js',
    enabled: isLoggedIn,
    initProps: {
      // InitProps
      mountPoint: () => document.body,

      // ConnectionConfig
      sentryOrigin: process.env.NEXT_PUBLIC_SENTRY_ORIGIN ?? 'https://sentry-test.sentry.io',
      sentryRegion: process.env.NEXT_PUBLIC_SENTRY_REGION ?? 'us',
      sentryApiPath: process.env.NEXT_PUBLIC_SENTRY_API_PATH ?? '/api/0',

      // FeatureFlagsConfig
      featureFlags: undefined,

      // OrgConfig
      organizationSlug: process.env.NEXT_PUBLIC_SENTRY_ORGANIZATION ?? 'sentry-test',
      projectIdOrSlug:process.env.NEXT_PUBLIC_SENTRY_PROJECT ?? 'pokemart',
      environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT ? [process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT] : ['prod', 'development'],

      // RenderConfig
      domId: 'sentry-toolbar',
      placement: 'right-edge',
      theme: 'light',

      // Debug
      debug: process.env.NEXT_PUBLIC_DEBUG === 'true',
    }
  });

  return children
}