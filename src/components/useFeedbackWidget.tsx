"use client";

import type {RefObject} from 'react';
import {useEffect, useState} from 'react';
import * as Sentry from '@sentry/nextjs';
import type { OverrideFeedbackConfiguration } from '@sentry/nextjs';

interface Props {
  buttonRef?: RefObject<HTMLButtonElement> | RefObject<HTMLAnchorElement>;
  options?: OverrideFeedbackConfiguration,
}

export default function useFeedbackWidget({
  buttonRef,
  options = {},
}: Props) {
  const [feedback, setFeedback] = useState();
  // Read `getFeedback` on the client only, to avoid hydration errors when server rendering
  useEffect(() => {
    setFeedback(Sentry.getFeedback());
  }, []);

  useEffect(() => {
    if (!feedback) {
      return undefined;
    }

    if (buttonRef) {
      if (buttonRef.current) {
        return feedback.attachTo(buttonRef.current, options);
      }
    } else {
      const widget = feedback.createWidget(options);
      return () => {
        widget.removeFromDom();
      };
    }

    return undefined;
  }, [buttonRef, feedback, options]);

  return feedback;
}
