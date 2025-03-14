import type {FeatureFlagAdapter} from "@sentry/toolbar";

const stubFeatureFlagAdapter: FeatureFlagAdapter = {
  getFlagMap: () => ({}),
  getOverrides: () => ({
    foo: true
  }),
  setOverride: () => {},
  clearOverrides: () => {},
};

export default stubFeatureFlagAdapter;
