import type { Pokemon } from "pokenode-ts";
import pokemonClient from "@/pokemon/pokemonClient";

export default function genPokemonByName(
  name: string,
): Promise<Pokemon> {
  return pokemonClient().getPokemonByName(name)
}
