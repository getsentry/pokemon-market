import type { NextApiRequest, NextApiResponse } from "next";
import {serializeError} from 'serialize-error';
import * as Sentry from '@sentry/nextjs';

class ServerError extends Error {
  name = 'ServerError';
}

export default async function ApiPokemonFeatured(req: NextApiRequest, res: NextApiResponse) {  
  const items: Array<[string, number]> = JSON.parse(req.body);

  const hasMissingNo = items.some(([name]) => name === 'missingno');
  if (hasMissingNo) {
    // Artificial delay of 4s to simulate database lookup:
    await new Promise(resolve => {
      setTimeout(resolve, 4000);
    });

    // Artificial error:
    const error = new ServerError("Inventory system error. Invalid id");
    Sentry.captureException(error);

    res.status(500).json({error: serializeError(error)})
  } else {
    res.status(200).json({success: true});
  }
}
