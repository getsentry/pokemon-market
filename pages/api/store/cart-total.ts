import type { NextApiRequest, NextApiResponse } from "next";
import genPokemonByName from "@/pokemon/genPokemonByName";
import getPrice from "@/pokemon/getPrice";
import serializePokemon from "@/api/serializers/pokemon";
import serializeSpecies from "@/api/serializers/species";
import serializeEvolution from "@/api/serializers/evolution";

export default async function ApiCartTotal(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const items: Array<{ name: string; quantity: number }> = JSON.parse(
    req.body
  );

  let total = 0;
  for (const { name, quantity } of items) {
    const data = await genPokemonByName(name);
    const pokemon = serializePokemon(data.pokemon);
    const species = serializeSpecies(data.species);
    const evolution = serializeEvolution(data.evolution);

    if (!pokemon || !species || !evolution) {
      continue;
    }

    const locale = (req.query.locale as string) ?? "us";
    const { regularPrice, salePrice, isSale } = getPrice(
      locale,
      pokemon,
      species,
      evolution
    );
    const unitPrice = isSale ? salePrice : regularPrice;
    total += unitPrice * quantity;
  }

  res.status(200).json({ total });
}
