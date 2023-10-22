import type { EvolutionChain } from "pokenode-ts";

export default function serializeEvolution(chain: EvolutionChain | undefined) {
  if (!chain) {
    return undefined;
  }

  return chain;
}
