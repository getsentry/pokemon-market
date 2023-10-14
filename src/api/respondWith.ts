import { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

type Builder = (req: NextApiRequest, res: NextApiResponse) => unknown

export default function respondWith(builder: Builder) {
  return async function(req: NextApiRequest, res: NextApiResponse) {
    try { 
      res.status(200).json(await builder(req, res));
    } catch (error) {
      if (error instanceof AxiosError) {
        res.status(error.response?.status ?? 500).json({error: error.response?.statusText});
      }
    }
  }
}
