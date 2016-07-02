/* eslint-env node */
'use strict';

const EventEmitter = require('events');
const express = require('express');
const app = express();

app.get('/webhook', validateWebhook);

class SSE extends EventEmitter {}
const proxyEmitter = new SSE();
proxyEmitter.setMaxListeners(1);

app.post('/webhook', (req, res) => {
  console.log('[src/parseMessageByType] Webhook received this:');
  console.log(req.body);

  const data = req.body;
  // Make sure this is a page subscription
  if (data.object === 'page') {
    proxyEmitter.emit('msg', data);

    // timeout here = 20sec
    res.sendStatus(200);
  }
});

/*
  forward messages down to subscribed clients
*/
app.get('/eventsource', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control':'no-cache',
    'Connection': 'keep-alive' // eslint-disable-line
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
