import type { NextApiRequest } from "next";
import absoluteUrl from "next-absolute-url";
import qs from 'query-string';

export default function endpoint(
  req: NextApiRequest,
  path: string,
  query: Record<string, string | number>,
) {
  const {origin} = absoluteUrl(req);
  return qs.stringifyUrl({url: `${origin}${path}`, query});
}
