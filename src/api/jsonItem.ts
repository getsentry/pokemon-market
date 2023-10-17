import type { NextApiRequest } from "next";

export interface ApiItemResult<T> {
  result: T;
}

export default function jsonItem<T>(
  req: NextApiRequest,
  result: T,
  serializer: (value: T, index: number, arr: T[]) => unknown, 
) {
  const serialized = serializer(result, 0, [result])

  return {
    result: serialized,
  };
}
