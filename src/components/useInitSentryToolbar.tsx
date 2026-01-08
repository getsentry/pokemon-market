import {useSentryToolbar} from "@sentry/toolbar";
import type {FeatureFlagAdapter} from "@sentry/toolbar";
import { ReactNode } from "react";
import useLogin from "./useLogin";
import stubFeatureFlagAdapter from "@/components/featureFlags/stubFeatureFlagAdapter";

const PROD_VERSION = '1.0.0-beta.22';

export default function useInitSentryToolbar() {
  const {isLoggedIn} = useLogin();

  useSentryToolbar({
    // Bootstrap config
    cdn: process.env.NEXT_PUBLIC_TOOLBAR_SRC ?? `https://browser.sentry-cdn.com/sentry-toolbar/${PROD_VERSION}/toolbar.min.js`,
    enabled: isLoggedIn,
    initProps: {
      // InitProps
      mountPoint: () => document.body,

      // ConnectionConfig
      sentryOrigin: process.env.NEXT_PUBLIC_SENTRY_ORIGIN ?? 'https://sentry-test.sentry.io',

      // FeatureFlagsConfig
      featureFlags: getFeatureFlagAdapter(),

      // OrgConfig
      organizationSlug: process.env.NEXT_PUBLIC_SENTRY_ORGANIZATION ?? 'sentry-test',
      projectIdOrSlug:process.env.NEXT_PUBLIC_SENTRY_PROJECT ?? 'pokemart',
      environment: process.env.NEXT_PUBLIC_VERCEL_ENV
        ? `vercel-${process.env.NEXT_PUBLIC_VERCEL_ENV}`
        : (process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT ?? 'production'),

      // RenderConfig
      domId: 'sentry-toolbar',
      placement: 'right-edge', //  'bottom-right-corner',
      theme: 'light',

      // Debug
      debug: process.env.NEXT_PUBLIC_DEBUG,
    }
  });
}

function getFeatureFlagAdapter(): undefined | FeatureFlagAdapter {
  switch (process.env.NEXT_PUBLIC_FF_PROVIDER) {
    case 'stub':
      return stubFeatureFlagAdapter;
    default:
      return undefined;
  }
}
