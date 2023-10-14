import type { Pokemon } from "pokenode-ts";
import pokemonClient from "@/pokemon/pokemonClient";

export default function genListPokemonByName(
  names: string[]
): Promise<PromiseSettledResult<Pokemon>[]> {
  return Promise.allSettled(names.map(name => pokemonClient().getPokemonByName(name)));
}
