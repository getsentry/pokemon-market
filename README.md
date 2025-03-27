## Sentry Demo App - Pokemon Market

This application is meant to be used as a demoinstraction of the Session Replay 
feature on sentry.io.

## Running the App

### Locally

Running __locally__ is nice for development because you get hot-reloading when 
files change.
For Demo purposes, build and run the production server (see below).

1. Make sure that `sentry.shared.dsn.js` includes an Org/DSN for which you are 
   a part of.
2. Run `yarn dev`
3. Visit `http://localhost:3000` to see the Pokemon Market

Afterwards, visit your sentry org (in step #1) to view Replays, Perfomance, and 
Error from the demo.

### Production

The __production server__ is optimized for demo purposes because it includes:
- Built (minified) assets & stacktraces
- Release created on sentry.io
- Source maps uploaded

1. Make sure that `sentry.shared.dsn.js` includes an Org/DSN for which you are 
   a part of.
2. Run: `yarn build && yarn start`
3. Visit `http://localhost:3000` to see the Pokemon Market

Afterwards, visit your sentry org (in step #1) to view Replays, Perfomance, and
Error from the demo.


## Developing

To start the pokemon market locally just run:
```bash
yarn dev
```

You can also create a file named `.env.local` to override default settings. 
Search the codebase for `NEXT_PUBLIC_` to find the names of values that can be
set.

### Using a dev-mode `@sentry/toolbar`

In dev and in prod the latest production version of the Toolbar is used by
default. Set `NEXT_PUBLIC_TOOLBAR_SRC=http://localhost:8080/toolbar.min.js` in
your `.env.local` file to switch to a dev build of the toolbar.

### Using a dev-mode `@sentry/feedback`

If you're developing something inside the Sentry JS SDK (`@sentry/browser` or
`@sentry/nextjs` etc) it's possible to link and install the dev version of the
SDK using yalc.

First, set things up so the package you're working with re-builds, and 
re-publishes with yalc:

```bash
cd ~/code/sentry-javascript/packages/types
nodemon --exec "yarn clean && yarn build:types" --watch src -e ts

cd ~/code/sentry-javascript/packages/feedback
nodemon --exec "rm -rf ./build/* && yarn build:dev && yarn yalc:publish" --watch src -e ts,tsx
```

Then get this pokemon-market repo to use the published yalc files, and rebuild
whenever that published code changes.

```bash
cd ~/code/pokemon-market

# "yalc add" the dependencies you're working on
# for example:
yalc add @sentry-internal/feedback

# dev, but also watch the yalc folder:
yarn dev:yalc
```


