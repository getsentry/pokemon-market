import { PokemonClient } from "pokenode-ts";

let api: PokemonClient | null = null;

export default function pokemonClient() {
  if (!api) {
    api = new PokemonClient();
  }
  return api;
}
