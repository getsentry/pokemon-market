import type { Pokemon } from "pokenode-ts";
import mainClient from "@/pokemon/apiClient";

export default function genListPokemonByName(
  names: string[]
): Promise<PromiseSettledResult<Pokemon>[]> {
  return Promise.allSettled(names.map(name => mainClient().pokemon.getPokemonByName(name)));
}
