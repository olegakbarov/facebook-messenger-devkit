/* eslint-env node */
'use strict';

const EventEmitter = require('events');
const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();

app.use(bodyParser.json({ verify: verifyRequestSignature }));
app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
  res.send('this works as expected!');
})

app.get('/webhook', (req, res) => {
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === process.env.MESSENGER_VALIDATION_TOKEN) {
    console.log('[server.js] Validating webhook!');

    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.log('[server.js] Error. Make sure the validation tokens match.');
    res.sendStatus(403);
  }
});

class SSE extends EventEmitter {}
const proxyEmitter = new SSE();
proxyEmitter.setMaxListeners(1);

app.post('/webhook', (req, res) => {
  // if (data.object === 'page') {
    proxyEmitter.emit('msg', req);

    // timeout here = 20sec
    res.sendStatus(200);
  // }
});

// forward messages down to subscribed clients
app.get('/eventsource', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control':'no-cache',
    'Connection': 'keep-alive'
  });
  console.log('Client connected to eventsoruce');

  // workaround for Heroku: https://devcenter.heroku.com/articles/request-timeout
  setInterval(() => {
    res.write('ping \n\n');
  }, 1000);

  proxyEmitter.on('msg', data => {
    res.write(`event:msg\ndata: ${JSON.stringify(data)}\n\n`);
  });

  res.socket.on('close', () => {
    console.log('Client has left');
  });
});

app.all('/*', (req, res) => {
  res.json({
    status: 404,
    message: `No endpoint exists at ${req.originalUrl}`
  });
});

function verifyRequestSignature(req, res, buf) {
  var signature = req.headers["x-hub-signature"];

  if (!signature) {
    // For testing, let's log an error. In production, you should throw an
    // error.
    console.error("Couldn't validate the signature.");
  } else {
    var elements = signature.split('=');
    var method = elements[0];
    var signatureHash = elements[1];

    var expectedHash = crypto.createHmac('sha1', APP_SECRET)
                        .update(buf)
                        .digest('hex');

    if (signatureHash != expectedHash) {
      throw new Error("Couldn't validate the request signature.");
    }
  }
}

app.listen(process.env.PORT || 5000)
