import { useEffect } from "react";
import { loadToolbar } from '@/toolbar/loadToolbar';

type InitProps = Parameters<Awaited<ReturnType<typeof loadToolbar>>['init']>[0]
export default function useSentryToolbar({
  enabled, cdn = 'https://browser.sentry-cdn.com/sentry-toolbar/latest/toolbar.min.js', initProps,
}: {
  enabled: boolean;
  cdn: string;
  initProps: InitProps;
}, p0: never[]) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const controller = new AbortController();

    let cleanup: Function | undefined = undefined;
    loadToolbar(controller.signal, cdn).then(SentryToolbar => {
      cleanup = SentryToolbar.init(initProps);
    });

    return () => {
      controller.abort();
      cleanup?.();
    }
  }, [enabled, cdn]);
}
