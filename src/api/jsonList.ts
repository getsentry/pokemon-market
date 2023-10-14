import type { NextApiRequest } from "next";
import type { Cursor } from "@/api/validators/pagination";
import endpoint from '@/api/endpoint';
import getCurrentUrl from "@/api/getCurrentUrl";

export default function jsonList<T>(
  req: NextApiRequest,
  cursor: Cursor,
  results: T[],
  count: number,
  serializer: (value: T, index: number, arr: T[]) => unknown, 
) {
  const url = getCurrentUrl(req);

  const {offset, limit} = cursor;
  const next = offset + limit >= count ? null : offset + limit;
  const prev = offset - limit < 0 ? null : offset - limit;

  const serialized = results.map(serializer);

  return {
    count,
    next: next !== null ? {
      offset: next,
      limit,
      url: endpoint(req, url.pathname, {offset: next, limit}),
    } : null,
    previous: prev !== null ? {
      offset: prev,
      limit,
      url: endpoint(req, url.pathname, {offset: prev, limit}),
    } : null,
    results: serialized,
  };
}
