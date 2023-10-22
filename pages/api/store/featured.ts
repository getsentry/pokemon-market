import genListPokemonByName from "@/pokemon/genListPokemonByName";
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

const FEATURED = [
  'pikachu',
  'charizard',
  'slowpoke',
  'mewtwo',
];

type Data = undefined | Awaited<ReturnType<typeof genPokemonByName>>;

export default respondWith(async function ApiPokemonFeatured(req: NextApiRequest) {  
  const cursor = pagination(req, {
    offset: 0,
    limit: FEATURED.length,
  });

  const count = FEATURED.length;
  const results = await genListPokemonByName(FEATURED);
  const data = results.map(unpackSettledResults);

  return jsonList<Data, ListPokemonResponse>(req, cursor, data, count, (data) => ({
    pokemon: serializePokemon(data?.pokemon),
    species: serializeSpecies(data?.species),
    evolution: serializeEvolution(data?.evolution),
  }));
});
