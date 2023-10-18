import { useEffect } from "react";
import { BrowserClient, getCurrentHub } from "@sentry/react";
import { Feedback } from "@sentry-internal/feedback";

/**
 * The "Widget" connects the default Feedback button with the Feedback Modal
 *
 * XXX: this is temporary while we make this an SDK feature.
 */
export default function FeedbackWidget() {
  useEffect(() => {
    const hub = getCurrentHub();
    const client = hub && hub.getClient<BrowserClient>();
    const feedback = client?.getIntegration(Feedback);
    const widget = feedback?.createWidget({});
    console.log({hub, client, feedback, widget});
    return () => {
      feedback?.removeWidget(widget);
    };
  }, []);

  return null;
}
