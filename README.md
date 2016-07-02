# Facebook Messenger DevKit

##### What?

Setup for rapid development of bots for Facebook Messenger.

##### What's the trick?

Facebook Messenger works via `https`, so the possibilities of local development are limited. In case you iterate fast you need to constantly redeploy your app to remote https-powered server (like Heroku, for example).

##### How DevKit works?

DevKit requires you to set up your app with webhook handler once. After that you have access to the stream of events via `eventsource`.

##### What about production?

You'd better get rid of `eventsource` proxy in production. It's trival task and it's up on you.

# Step by step tutorial

1. Create app on Facebook

2. Get the Application Token and Validation Token

3. [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

4. Go to your Facebook app settings and navigate to `Webhook` tab

5. Add your newly created heroku app as webhook 

4. Set up `MESSENGER_VALIDATION_TOKEN` in Heroku Dashboard under Settings tab (you need to click 'Reveal Config Vars')

5. Get the app url and add it to `index.js` as `HEROKU_APP_URL`
