import { useState, useEffect, useRef } from "react";
import FeedbackButton from "@/components/FeedbackButton";
import * as Sentry from "@sentry/nextjs";

type FeedbackIntegration = ReturnType<typeof Sentry.getFeedback>;
type FeedbackWidget = any; // Should be something like ReturnType<FeedbackIntegration['createWidget']>;

export default function Feedback() {
  return (
    <div className="m-auto max-w-screen-lg">
      <h1 className="text-2xl mt-4">Feedback Test Area</h1>
      <p>
        This Pokemart app is an example Next.JS website that simulates a
        storefront. It is instrumented with the Sentry SDK featuring Session
        Replay, Feedback, Distributed Tracing and of course Errors!.
      </p>
      <ul className="raw">
        <li>
          <div className="flex">
            <FeedbackButton />
          </div>
        </li>
        <li>
          <ToggleFeedbackButton />
        </li>
        <li>
          <AttachToFeedbackButton />
        </li>
        <li>
          <CreateFeedbackFromButton />
        </li>
        <li>
          <MyFeedbackForm />
        </li>
      </ul>
    </div>
  );
}

function ToggleFeedbackButton() {
  const [feedback, setFeedback] = useState<FeedbackIntegration>();
  // Read `getFeedback` on the client only, to avoid hydration errors when server rendering
  useEffect(() => {
    setFeedback(Sentry.getFeedback());
  }, []);

  const [widget, setWidget] = useState<FeedbackWidget>();
  return (
    <button
      className="hover:bg-hover px-4 py-2 rounded-md"
      type="button"
      onClick={async () => {
        if (widget) {
          widget.removeFromDom();
          setWidget(null);
        } else if (feedback) {
          setWidget(feedback.createWidget({
            tags: {component: 'ToggleFeedbackButton'}
          }));
        }
      }}
    >
      {widget ? "Remove Widget" : "Create Widget"}
    </button>
  );
}

function AttachToFeedbackButton() {
  const [feedback, setFeedback] = useState<FeedbackIntegration>();
  // Read `getFeedback` on the client only, to avoid hydration errors when server rendering
  useEffect(() => {
    setFeedback(Sentry.getFeedback());
  }, []);

  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (feedback && buttonRef.current) {
      const unsubscribe = feedback.attachTo(buttonRef.current, {
        tags: {component: 'AttachToFeedbackButton'}
      })
      return unsubscribe;
    }
    return () => {};
  }, [feedback]);

  return (
    <button
      className="hover:bg-hover px-4 py-2 rounded-md"
      type="button"
      ref={buttonRef}
    >
      Give me feedback (attachTo)
    </button>
  );
}

function CreateFeedbackFromButton() {
  const [feedback, setFeedback] = useState<FeedbackIntegration>();
  // Read `getFeedback` on the client only, to avoid hydration errors when server rendering
  useEffect(() => {
    setFeedback(Sentry.getFeedback());
  }, []);

  // Don't render custom feedback button if Feedback integration isn't installed
  if (!feedback) {
    return null;
  }

  return (
    <button
    className="hover:bg-hover px-4 py-2 rounded-md"
      type="button"
      onClick={async () => {
        const form = await feedback.createForm({
          tags: {component: 'CreateFeedbackFromButton'}
        });
        form.appendToDom();
        form.open();
      }}
    >
      Give me feedback (createForm)
    </button>
  );
}

function MyFeedbackForm() {
  return (
    <form id="my-feedback-form" onSubmit={async event => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      
      const attachment = async () => {
        const attatchmentField = formData.get("attachment") as File;
        const data = new Uint8Array(
          await attatchmentField.arrayBuffer()
        );
        const attachmentData = {
          data,
          filename: 'upload', // Or pass attatchmentField.name,
          // No need to set `contentType` because it's encoded in the `data` array
        };
        return attachmentData;
      };
      
      Sentry.getCurrentScope().setTags({component: 'MyFeedbackForm'});
      Sentry.captureFeedback({
        name: String(formData.get('name')),
        email: String(formData.get('email')),
        message: String(formData.get('message')),
      }, {
        attachments: [await attachment()],
      });
    }}>
      <input name="name" placeholder="Your Name" />
      <input name="email" placeholder="Your Email" />
      <textarea name="message" placeholder="What's the issue?" />
      <input type="file" name="attachment" />
      <button type="submit">Submit</button>
    </form>
  );
}

