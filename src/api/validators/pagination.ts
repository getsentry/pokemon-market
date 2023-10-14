import type { NextApiRequest } from "next";
import decodeInteger from "@/utils/string/decodeInteger";

export interface Cursor {
  offset: number;
  limit: number;
}

export default function pagination(req: NextApiRequest, defaults?: Partial<Cursor>) {
  return {
    offset: decodeInteger(req.query.offset ?? '', defaults?.offset ?? 0),
    limit: decodeInteger(req.query.limit ?? '', defaults?.limit ?? 10),
  };
}
