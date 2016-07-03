![DevKit](https://raw.githubusercontent.com/olegakbarov/facebook-messenger-devkit/master/logo.png)

# Facebook Messenger DevKit

##### What?

Setup for rapid development of bots for Facebook Messenger.

##### What's the trick?

Facebook Messenger works via `https`, so the possibilities of local development are limited. In case you iterate fast you need to constantly redeploy your app to remote https-powered server (like Heroku, for example).

##### How DevKit works?

DevKit requires you to set up your app with webhook handler once. After that you have access to the stream of events via `eventsource`. There're two files: `server.js` is meant to be spinned on the remote https-powered server, while `index.js` ought to be run locally and include your bot's logic.

##### What about production?

You'd better get rid of `eventsource` proxy in production. It's trival task and it's up on you.

# Step-by-step tutorial

1. Create app on Facebook

2. Add the Validation Token and remember it as `MESSENGER_VALIDATION_TOKEN` for step 5

3. [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

4. Go to your Facebook app settings and navigate to `Webhook` tab. Add your newly created Heroku app as webhook.

5. Set up `MESSENGER_VALIDATION_TOKEN` in Heroku Dashboard under Settings tab (you need to click 'Reveal Config Vars')

6. Get the app url and add it to `index.js` as `HEROKU_APP_URL`

7. Read the [Messenger Platfrom](https://developers.facebook.com/products/messenger/) docs and go build something cool!

# Project Roadmap

1. Better docs

2. Reusable factory functions for common tasks
