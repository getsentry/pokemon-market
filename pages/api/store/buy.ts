import type { NextApiRequest, NextApiResponse } from "next";

class InventoryError extends Error {
  name = 'InventoryError';
}

export default async function ApiPokemonFeatured(req: NextApiRequest, res: NextApiResponse) {  
  const items: Array<[string, number]> = JSON.parse(req.body);

  const hasMewtwo = items.some(([name]) => name === 'mewtwo');
  if (hasMewtwo) {
    await new Promise(resolve => {
      setTimeout(resolve, 4000);
    });

    throw new InventoryError("Invalid Pokemon selected");
  } else {
    res.status(200).json({success: true});
  }
}
