import endpoint from '@/api/endpoint';
import getCurrentUrl from "@/api/getCurrentUrl";
import type { Cursor } from "@/api/validators/pagination";
import type { NextApiRequest } from "next";

type OffsetPage = {
  offset: number;
  limit: number;
  url: string;
};

export interface ApiListResult<T extends Array<unknown>> {
  count: number,
  next: null | OffsetPage;
  previous: null | OffsetPage;
  results: T;
}

export default function jsonList<D, S extends Array<unknown>>(
  req: NextApiRequest,
  cursor: Cursor,
  data: D[],
  count: number,
  serializer: (value: D, index: number, arr: D[]) => S[number], 
) {
  const url = getCurrentUrl(req);

  const {offset, limit} = cursor;
  const next = offset + limit >= count ? null : offset + limit;
  const prev = offset - limit < 0 ? null : offset - limit;

  const serialized = data.map(serializer);

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
