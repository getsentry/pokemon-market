import type { Pokemon } from "pokenode-ts";
import type { Cursor } from "@/api/validators/pagination";
import pokemonClient from "@/pokemon/pokemonClient";

export default async function genListPokemon(
  cursor: Cursor,
): Promise<PromiseSettledResult<Pokemon>[]> {
  const pokemons = await pokemonClient().listPokemons(cursor.offset, cursor.limit);

  return Promise.allSettled(
    pokemons.results.map(({name}) => pokemonClient().getPokemonByName(name))
  );
}
