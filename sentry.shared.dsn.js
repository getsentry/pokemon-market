const keys = {
  ["wildcard-inc/pokemon-market"]: {
    dsn: "https://bbdcc1e077ae45c3930770f8f3c3bd25@o1170741.ingest.sentry.io/4505500919726080",
    settings:
      "https://wildcard-inc.sentry.io/settings/projects/pokemon-market/keys/",
  },
  ["sentry/replay-test"]: {
    dsn: "https://6820f26957914eecbfc6d9ec83016b2e@o1.ingest.sentry.io/6380506",
    settings: "https://sentry.sentry.io/settings/projects/replay-test/keys/",
  },
  ["sentry-test/pokemart"]: {
    dsn: "https://9b88555f533ab26d4dfbd4eb52514484@o19635.ingest.sentry.io/4506072436572160",
    settings: "https://sentry-test.sentry.io/settings/projects/pokemart/keys/",
  },
};

// Remember to update next.config.js to match the selected org & project
// And clear `.sentryclirc` of tokens from other orgs.
export default keys["sentry-test/pokemart"].dsn;
