import type {FeatureFlagAdapter} from "@sentry/toolbar";

let isCleared = false;

const stubFeatureFlagAdapter: FeatureFlagAdapter = {
  getFlagMap: () => ({}),
  getOverrides: () => (isCleared ? {} : {
    foo: true
  }),
  setOverride: () => {},
  clearOverrides: () => { isCleared = true},
};

export default stubFeatureFlagAdapter;
