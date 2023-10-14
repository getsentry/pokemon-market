import genPokemonByName from "@/pokemon/genPokemonByName";
import jsonItem from "@/api/jsonItem";
import type { NextApiRequest } from "next";
import first from "@/utils/array/first";
import serializePokemon from "@/api/serializers/pokemon";
import respondWith from "@/api/respondWith";

export default respondWith(async function ApiPokemonName(req: NextApiRequest) {  
  const result = await genPokemonByName(first(req.query.pokemonName ?? ''));

  return jsonItem(req, result, serializePokemon)
});
