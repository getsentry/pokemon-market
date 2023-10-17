export function range(start: number, end?: number) {
  const startIndex = end === undefined ? 0 : start;
  const endIndex = end === undefined ? start : end;
  const arr = new Array(endIndex - startIndex);
  for (let i = 0; i < endIndex - startIndex; i++) {
    arr[i] = startIndex + i;
  }
  return arr;
}
