# Facebook Messenger DevKit

### What?

This is setup for rapid development of bots for Facebook Messenger.

### What's the trick?

Facebook Messenger via `https`, so the possibilities of local development are limited. In case you iterate fast you need to constantly redeploy your app to remote https-powered server (like Heroku, for example).

### How DevKit works?

DevKit requires you to set up your app with webhook handler once. After that you have access to the stream of events via `eventsource`.

### So what's that et al?

Allows rapid iteration, without constant redeploy of app.

### What about production?

You'd better get rid of `eventsource` proxy in production. It's trival task and it's up on you.
