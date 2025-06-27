import type {FeatureFlagAdapter} from "@sentry/toolbar";

let isCleared = false;

const stubFeatureFlagAdapter: FeatureFlagAdapter = {
  getFlagMap: () => ({}),
  getOverrides: () => (isCleared ? {} : {
    foo: true,
    bar: true,
    biz: true,
    baz: true,
  }),
  setOverride: () => {},
  clearOverrides: () => { isCleared = true},
};

export default stubFeatureFlagAdapter;
