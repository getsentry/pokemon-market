import { useRef } from "react";
import useFeedbackWidget from "./useFeedbackWidget";

export default function FeedbackButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  useFeedbackWidget({buttonRef, options: {
    tags: {
      component: 'FeedbackButton'
    }
  }})

  return (
    <div className="bg-darkRed hover:bg-red text-white px-2 py-1 rounded-md text-md block">
      <button ref={buttonRef}>
        Give Feedback
      </button>
    </div>
  );
}
