import * as Sentry from '@sentry/nextjs';
import dsn from './sentry.shared.dsn';

export function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // this is your Sentry.init call from `sentry.server.config.js|ts`
    Sentry.init({
      dsn,

      // Adjust this value in production, or use tracesSampler for greater control
      tracesSampleRate: 1,

      // Setting this option to true will print useful information to the console while you're setting up Sentry.
      debug: false,
    });
  }

  // This is your Sentry.init call from `sentry.edge.config.js|ts`
  if (process.env.NEXT_RUNTIME === 'edge') {
    Sentry.init({
      dsn,

      // Adjust this value in production, or use tracesSampler for greater control
      tracesSampleRate: 1,

      // Setting this option to true will print useful information to the console while you're setting up Sentry.
      debug: false,
    });

  }
}
