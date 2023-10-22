import type { EvolutionChain } from "pokenode-ts";

export default function serializeEvolution(chain: EvolutionChain | null) {
  if (!chain) {
    return null;
  }

  return chain;
}
