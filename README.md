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

#### Local Unleashed server

```
git clone git@github.com:Unleash/unleash.gi
cd unleash
docker compose up -d
```

Then point your browser to localhost:4242 and log in using:

username: `admin`
password: `unleash4all`

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
