import { EvolutionClient } from "pokenode-ts";

let api: EvolutionClient | null = null;

export default function evolutionClient() {
  if (!api) {
    api = new EvolutionClient();
  }
  return api;
}
