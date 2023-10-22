import type { Pokemon, PokemonSpecies, EvolutionChain } from "pokenode-ts";
import mainClient from "@/pokemon/apiClient";

export default async function genPokemonByName(
  name: string,
): Promise<{
    pokemon: Pokemon,
    species: PokemonSpecies,
    evolution: EvolutionChain,
}> {
  const pokemon = await mainClient().pokemon.getPokemonByName(name);
  const species = await mainClient().pokemon.getPokemonSpeciesByName(pokemon.species.name);

  const url = new URL(species.evolution_chain.url);
  const chainId = url.pathname.split('/').filter(Boolean).slice(-1)[0];
  console.log(url, chainId)
  const evolution = await mainClient().evolution.getEvolutionChainById(Number(chainId));

  return {
    pokemon,
    species,
    evolution,
  }
}
