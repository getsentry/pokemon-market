import genListPokemonByName from "@/pokemon/genListPokemonByName";
import jsonList from "@/api/jsonList";
import pagination from "@/api/validators/pagination";
import type { NextApiRequest } from "next";
import serializePokemon from "@/api/serializers/pokemon";
import respondWith from "@/api/respondWith";
import { ListPokemonResponse } from "@/types";
import { Pokemon } from "pokenode-ts";

const FEATURED = [
  'pikachu',
  'charizard',
  'slowpoke',
  'mewtwo',
  'ash ketchum',
];

type Data = (Pokemon | null);

export default respondWith(async function ApiPokemonFeatured(req: NextApiRequest) {  
  const cursor = pagination(req, {
    offset: 0,
    limit: FEATURED.length,
  });

  const count = FEATURED.length;
  const results = await genListPokemonByName(FEATURED);
  const pokemon = results.map(result => result.status === 'fulfilled' ? result.value : null);

  return jsonList<Data, ListPokemonResponse>(req, cursor, pokemon, count, serializePokemon);
});
