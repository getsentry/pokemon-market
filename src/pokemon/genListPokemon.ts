import * as Sentry from '@sentry/nextjs';

import type { Cursor } from "@/api/validators/pagination";
import mainClient from "@/pokemon/apiClient";
import genPokemonByName from "@/pokemon/genPokemonByName";

export default async function genListPokemon(
  cursor: Cursor,
) {
  const pokemonNames = await mainClient().pokemon.listPokemons(cursor.offset, cursor.limit);
  const results = [];
  for (let entry of pokemonNames.results) {
    try {
      const pokemon = await genPokemonByName(entry.name);
      results.push(pokemon);
    } catch (error) {
      Sentry.captureException(new Error('Failed to fetch pokemon by name'), {
        extra: { pokemon: name }
      });
    }
  }
  return results;
}
