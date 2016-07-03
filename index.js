/* eslint-env node */
'use strict';

const EventSource = require('eventsource');

const HEROKU_APP_URL = 'https://devkit-test.herokuapp.com'; //INSERT YOUR ENDPOINT HERE

const endpoint = `${HEROKU_APP_URL}/eventsource`;
const source = new EventSource(endpoint);

source.addEventListener('error', e => {
  if (e.readyState === EventSource.CLOSED) {
    console.log('Connection was closed! ', e);
  } else {
    console.log('An unknown error occurred: ', e);
  }
}, false);

source.addEventListener('open', e => {
  console.log('Connection opened!', e);
});

// event must be called msg on remote too
source.addEventListener('msg', data => {
  let parsedData = null;
  try {
    parsedData = JSON.parse(data.data);
  } catch (err) {
    console.log(err);
  }

  if (parsedData) {
    // Iterate over each entry (may be multiple if batched)
    parsedData.entry.forEach(pageEntry => {
      pageEntry.messaging.forEach(messagingEvent => {
        if (messagingEvent.optin) {
          // handle receivedAuthentication event here;
        } else if (messagingEvent.message) {
          // handle receivedMessage event here;
        } else if (messagingEvent.delivery) {
          // handle receivedDeliveryConfirmation event here;
        } else if (messagingEvent.postback) {
          // handle messagingEvent here;
        } else {
          console.log(`[index] Listener received unknown messagingEvent ${messagingEvent}`); //eslint-disable-line
        }
      });
    });
  }
});
