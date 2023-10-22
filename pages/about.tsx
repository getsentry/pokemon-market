import Link from "next/link";

export default function About() {
  return (
    <div className="m-auto max-w-screen-lg">
      <h1 className="text-2xl mt-4">About The Pokemart</h1>
      <p>
        This Pokemart app is an example Next.JS website that simulates a
        storefront for Pokemon. It is instrumented with the Sentry SDK featuring
        Session Replay, Feedback, and Distributed Tracing.
      </p>
      <h1 className="text-2xl mt-4">Features</h1>
      <p>
        This site contains a number of features meant to showcase different
        problems and debugging situations.
      </p>
      <ul className="raw">
        <li>
          <strong>Session Replay:</strong> Visit{" "}
          <Link href="https://sentry-test.sentry.io/replays/?project=4506072436572160&statsPeriod=14d" className="text-blue underline">
            sentry-test/pokemart
          </Link>{" "}
          to see replays.
        </li>
        <li>
          <strong>Dead Clicks:</strong> Click on the View Cart link when there
          are &quot;0 Items&quot; will result in a dead click.
        </li>
      </ul>
    </div>
  );
}
