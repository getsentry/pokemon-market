import type { NextApiRequest } from "next";

export default async function ApiPokemonFeatured(req: NextApiRequest) {  
  await new Promise(resolve => {
    setTimeout(resolve, 3000);
  });

  throw new Error('Duplicate key violates unique constraint')
}
