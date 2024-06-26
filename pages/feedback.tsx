import { useState, useEffect, useRef } from "react";
import FeedbackButton from "@/components/FeedbackButton";
import * as Sentry from "@sentry/nextjs";

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
  const [feedback, setFeedback] = useState();
  // Read `getFeedback` on the client only, to avoid hydration errors when server rendering
  useEffect(() => {
    setFeedback(Sentry.getFeedback());
  }, []);

  const [widget, setWidget] = useState();
  return (
    <button
      className="hover:bg-hover px-4 py-2 rounded-md"
      type="button"
      onClick={async () => {
        if (widget) {
          widget.removeFromDom();
          setWidget(null);
        } else {
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
  const [feedback, setFeedback] = useState();
  // Read `getFeedback` on the client only, to avoid hydration errors when server rendering
  useEffect(() => {
    setFeedback(Sentry.getFeedback());
  }, []);

  const buttonRef = useRef();
  useEffect(() => {
    if (feedback) {
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
  const [feedback, setFeedback] = useState();
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
        const data = new Uint8Array(
          await formData.get("attachment").arrayBuffer()
        );
        const attachmentData = {
          data,
          ...formData.get("attachment"),
        };
        return attachmentData;
      };
      
      Sentry.getCurrentScope().setTags({component: 'MyFeedbackForm'});
      Sentry.captureFeedback({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
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

