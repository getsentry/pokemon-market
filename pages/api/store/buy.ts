import type { NextApiRequest, NextApiResponse } from "next";

export default async function ApiPokemonFeatured(req: NextApiRequest, res: NextApiResponse) {  
  const items: Array<[string, number]> = JSON.parse(req.body);

  const hasMewtwo = items.some(([name, amount]) => name === 'mewtwo');
  if (hasMewtwo) {
    await new Promise(resolve => {
      setTimeout(resolve, 4000);
    });

    res.status(500).json({error: "Invalid Pokemon selected"});
  } else {
    res.status(200).json({success: true});
  }
}
