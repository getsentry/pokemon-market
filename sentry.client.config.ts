// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";
import dsn from "./sentry.shared.dsn";

Sentry.init({
  dsn,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  replaysOnErrorSampleRate: 1.0,

  replaysSessionSampleRate: 1.0,

  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      unmask: [
        "header",
        "nav",
      ],

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
      colorScheme: "light",
      themeLight: {
        submitBackground: "rgb(235,20,20)",
        submitBackgroundHover: "rgb(140,0,0)",
        submitBorder: "rgb (0,0,0)",
      },
    }),
  ],
});
