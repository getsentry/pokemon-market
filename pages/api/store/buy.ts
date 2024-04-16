import type { NextApiRequest, NextApiResponse } from "next";
import {serializeError} from 'serialize-error';

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

    res.status(400).json({error: serializeError(new InventoryError("Invalid Pokemon selected"))})
  } else {
    res.status(200).json({success: true});
  }
}
