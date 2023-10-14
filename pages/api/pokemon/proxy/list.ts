import { PokemonClient } from "pokenode-ts";
import pagination from "@/api/validators/pagination";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function ApiPokemonProxyList(req: NextApiRequest, res: NextApiResponse) { 
  const api = new PokemonClient();

  const cursor = pagination(req);

  const pokemons = await api.listPokemons(cursor.offset, cursor.limit);
  res.status(200).json(pokemons);
}
