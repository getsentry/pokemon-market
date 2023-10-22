import * as Sentry from '@sentry/nextjs';

export default function unpackSettledResults<T>(result: PromiseSettledResult<T>) {
  if (result.status === 'fulfilled') {
    return result.value;
  } else {
    Sentry.captureException(new Error('Promise.allSettled() included failure'), {
      extra: { reason: result.reason }
    });
    return undefined;
  }
}
