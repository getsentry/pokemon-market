import genCountAllPokemon from "@/pokemon/genCountAllPokemon";
import genListPokemon from "@/pokemon/genListPokemon";
import genPokemonByName from "@/pokemon/genPokemonByName";
import jsonList from "@/api/jsonList";
import pagination from "@/api/validators/pagination";
import respondWith from "@/api/respondWith";
import serializeEvolution from "@/api/serializers/evolution";
import serializePokemon from "@/api/serializers/pokemon";
import serializeSpecies from "@/api/serializers/species";
import type { ListPokemonResponse } from "@/types";
import type { NextApiRequest } from "next";
import unpackSettledResults from "@/api/serializers/unpackSettledResults";

type Data = undefined | Awaited<ReturnType<typeof genPokemonByName>>;

export default respondWith(async function ApiPokemon(req: NextApiRequest) { 
  const cursor = pagination(req, {
    offset: 0,
    limit: 5,
  });

  // TODO[perf]: this could be parallelized
  const count = await genCountAllPokemon();
  const results = await genListPokemon(cursor);
  const data = results.map(unpackSettledResults);
  
  return jsonList<Data, ListPokemonResponse>(req, cursor, data, count, (data) => ({
    pokemon: serializePokemon(data?.pokemon),
    species: serializeSpecies(data?.species),
    evolution: serializeEvolution(data?.evolution),
  }));
});
