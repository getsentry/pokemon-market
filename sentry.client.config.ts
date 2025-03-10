// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";
import dsn from "./sentry.shared.dsn";
import { UnleashClient } from "unleash-proxy-client";

Sentry.init({
  dsn,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  replaysOnErrorSampleRate: 1.0,

  replaysSessionSampleRate: 1.0,

  integrations: [
    Sentry.unleashIntegration({ featureFlagClientClass: UnleashClient }),

    Sentry.replayIntegration({
      maskAllText: true,
      unmask: ["aside", "header", "nav"],
      blockAllMedia: true,
      unblock: [],

      networkDetailAllowUrls: [window.location.origin],
      networkDetailDenyUrls: [
        window.location.origin + "/_next/",
        window.location.origin + "/monitoring",
      ],
      networkCaptureBodies: true,
    }),

    Sentry.feedbackIntegration({
      autoInject: false,
      colorScheme: "light",
      showScreenshot: true,
      themeLight: {
        accentForeground: "#ffffff",
        accentBackground: "rgb(235,20,20)",
      },
      tags: {
        appName: "pokemon-market",
        component: "autoInjected",
      },
      _experiments: {
        annotations: true,
      },
    }),
  ],
});
