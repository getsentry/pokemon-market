import { NextApiRequest } from "next";
import absoluteUrl from "next-absolute-url";

export default function currentUrl(req: NextApiRequest): URL {
  const {origin} = absoluteUrl(req);
  const url = new URL(req.url ?? '', `http://${origin}`);
  return url;
}
