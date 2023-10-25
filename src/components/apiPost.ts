import * as Sentry from '@sentry/nextjs';
import qs, { type StringifiableRecord } from 'query-string';

class NetworkError extends Error {
  name = 'NetworkError';
}

export default async function apiPost(path: string, query: StringifiableRecord = {}, body: BodyInit | null | undefined = undefined) {
  const url = qs.stringifyUrl({ url: path, query });
  const response = await fetch(url, {
    method: "POST",
    body,
  });
  if (!response.ok) {
    const error = new NetworkError(`Ajax response returned ${response.status}`, {
      cause: response.statusText,
    });
    Sentry.captureException(error, {
      extra: {cause: response.statusText}
    });
    throw error;
  }
  return response.json();
}

