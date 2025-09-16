// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";
import dsn from "./sentry.shared.dsn";
import { EventHint } from "@sentry/nextjs";

Sentry.init({
  dsn,

  sendDefaultPii: true,

  sampleRate: 1.0,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  replaysOnErrorSampleRate: 1.0,

  replaysSessionSampleRate: 1.0,

  beforeSend(event, hint: EventHint) {
    // Check if it is an exception, and if so, show the report dialog
    if (event.exception && event.event_id && hint.data?.useCrashReport) {
      Sentry.showReportDialog({ eventId: event.event_id });
    }
    return event;
  },

  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      unmask: ["aside", "header", "nav"],
      blockAllMedia: true,
      unblock: [],

      networkDetailAllowUrls: [
        window.location.origin,
        "https://graphql-pokeapi.graphcdn.app/",
      ],
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

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
