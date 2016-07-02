/* eslint-env node */
'use strict';

const EventSource require('eventsource');

const EVENTSOURCE_API = ''; //INSERT YOUR ENDPOINT HERE
const source = new EventSource(EVENTSOURCE_API);

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
  // Iterate over each entry (may be multiple if batched)
  log.info('[index] on msg', data);

  let parsedData = null;
  try {
    parsedData = JSON.parse(data.data);
  } catch (err) {
    log.error(err);
  }

  if (parsedData) {
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
