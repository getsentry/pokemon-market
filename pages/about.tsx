import Link from "next/link";

export default function About() {
  return (
    <div className="m-auto max-w-screen-lg">
      <h1 className="text-2xl mt-4">About The Pokemart</h1>
      <p>
        This Pokemart app is an example Next.JS website that simulates a
        storefront. It is instrumented with the Sentry SDK featuring Session
        Replay, Feedback, Distributed Tracing and of course Errors!.
      </p>
      <h1 className="text-2xl mt-4">Features</h1>
      <p>
        This site contains a number of features meant to showcase different
        problems and debugging situations:
      </p>
      <ul className="raw">
        <li>
          <strong>Backend Error</strong> If you have MissingNo in your cart, and
          try to Checkout: the backend will throw an error.
        </li>
        <li>
          <strong>Frontend Error</strong> If you have MissingNo in your cart, and
          try to Checkout: the frontend will receive a 500 response from the
          backend and throw it&apos;s own error.
        </li>
        <li>
          <strong>Session Replay:</strong> Visit{" "}
          <Link
            href="https://sentry-test.sentry.io/replays/?project=4506072436572160&statsPeriod=14d"
            className="text-blue underline"
          >
            sentry-test/pokemart
          </Link>{" "}
          to see replays.
        </li>
        <li>
          <strong>Dead Clicks:</strong> Charizard is out of stock, clicking &quot;Add to Cart&quot; will result in a dead-click (or rage-click if you click enough times quickly).
        </li>
        <li>
          <strong>N+1 API calls</strong> The main Index page makes 16 api calls,
          to fetch all the pokemon from 1 to 151.
        </li>
        <li>
          <strong>Slow Loading</strong> The Details page for Slowpoke and Slowbro is artificially slow to load.
        </li>
        <li>
          <strong>User Feedback</strong> If you change currency into GBP you will notice that the price for Pikachu is not a good deal. This is a good reason to submit a Bug Report / User Feedback.
        </li>
        <li>
          <Link href="/feedback" className="text-blue underline">
            Tests the User Feedback integration
          </Link>
        </li>
      </ul>
    </div>
  );
}
