import qs, { type StringifiableRecord } from 'query-string';

export default async function apiFetch(path: string, query: StringifiableRecord = {}) {
  const url = qs.stringifyUrl({ url: path, query });
  const response = await fetch(url, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}
