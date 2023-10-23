import first from "@/utils/array/first";
import genPokemonByName from "@/pokemon/genPokemonByName";
import jsonItem from "@/api/jsonItem";
import respondWith from "@/api/respondWith";
import serializeEvolution from "@/api/serializers/evolution";
import serializePokemon from "@/api/serializers/pokemon";
import serializeSpecies from "@/api/serializers/species";
import type { NextApiRequest } from "next";
import type { SinglePokemonResponse } from "@/types";

type Data = Awaited<ReturnType<typeof genPokemonByName>>;

const SLOW_POKEMON = ['slowpoke', 'slowbro'];

export default respondWith(async function ApiPokemonName(req: NextApiRequest) {  
  const name = first(req.query.pokemonName ?? '');

  const promise = SLOW_POKEMON.includes(name.toLowerCase())
    ? new Promise<Awaited<ReturnType<typeof genPokemonByName>>>((resolve) => {
      setTimeout(() => {
        resolve(genPokemonByName(name));
      }, 4000);
    })
    : genPokemonByName(name);
  const result = await promise;

  return jsonItem<Data, SinglePokemonResponse>(req, result, ({pokemon, species, evolution}) => ({
    pokemon: serializePokemon(pokemon),
    species: serializeSpecies(species),
    evolution: serializeEvolution(evolution),
  }));
});
