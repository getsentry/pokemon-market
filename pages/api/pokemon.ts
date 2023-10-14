import genCountAllPokemon from "@/pokemon/genCountAllPokemon";
import genListPokemon from "@/pokemon/genListPokemon";
import jsonList from "@/api/jsonList";
import pagination from "@/api/validators/pagination";
import type { NextApiRequest } from "next";
import serializePokemon from "@/api/serializers/pokemon";
import respondWith from "@/api/respondWith";

export default respondWith(async function ApiPokemon(req: NextApiRequest) { 
  const cursor = pagination(req, {
    offset: 0,
    limit: 5,
  });

  // TODO[perf]: this could be parallelized
  const count = await genCountAllPokemon();
  const results = await genListPokemon(cursor);
  const pokemon = results.map(result => result.status === 'fulfilled' ? result.value : null);

  return jsonList(req, cursor, pokemon, count, serializePokemon);
});
