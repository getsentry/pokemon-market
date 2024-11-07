import type { LDClient } from "launchdarkly-js-client-sdk";
import { createContext, useContext } from "react";

export const LDClientContext = createContext<LDClient | undefined>(undefined);

export default function useLDClient() {
    return useContext(LDClientContext);
}
