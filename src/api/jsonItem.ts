import type { NextApiRequest } from "next";

export interface ApiItemResult<S> {
  result: S;
}

export default function jsonItem<D, S = unknown>(
  req: NextApiRequest,
  data: D,
  serializer: (value: D, index: number, arr: D[]) => S, 
) {
  const serialized = serializer(data, 0, [data])

  return {
    result: serialized,
  };
}
