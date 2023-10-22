import type { Cursor } from "@/api/validators/pagination";
import mainClient from "@/pokemon/apiClient";
import genPokemonByName from "@/pokemon/genPokemonByName";

export default async function genListPokemon(
  cursor: Cursor,
) {
  const pokemons = await mainClient().pokemon.listPokemons(cursor.offset, cursor.limit);
  return Promise.allSettled(pokemons.results.map(({name}) => genPokemonByName(name)));
}
