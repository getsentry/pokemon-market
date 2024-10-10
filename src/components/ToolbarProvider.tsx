import useSentryToolbar from "@/toolbar/useSentryToolbar";
import { createContext, ReactNode } from "react";
import useLogin from "./useLogin";

interface Props {
  children: ReactNode
}

export default function ToolbarProvider({children}: Props) {
  const {isLoggedIn} = useLogin();

  useSentryToolbar({
    // Bootstrap config
    cdn: process.env.NEXT_PUBLIC_TOOLBAR_SRC || 'https://browser.sentry-cdn.com/sentry-toolbar/latest/toolbar.min.js',
    enabled: isLoggedIn,
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

  return children
}
