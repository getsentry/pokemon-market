import first from "@/utils/array/first"

export default function decodeInteger(input: string | string[], dflt: number): number {
  const val = parseInt(first(input), 10);
  return isNaN(val) ? dflt : val;
}
