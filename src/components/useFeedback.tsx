import type {RefObject} from 'react';
import {useEffect} from 'react';
import * as Sentry from '@sentry/browser';
import type { OverrideFeedbackConfiguration } from '@sentry/types';

interface Props {
  buttonRef?: RefObject<HTMLButtonElement> | RefObject<HTMLAnchorElement>;
  options?: OverrideFeedbackConfiguration,
}

export default function useFeedbackWidget({
  buttonRef,
  options = {},
}: Props) {
  const feedback = Sentry.getFeedback();

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
