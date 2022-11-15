import express from "express";
import { client } from "./matrix.mjs";
import fetch from "node-fetch";
import { ticketToString } from "./helpers.mjs";
import * as crypto from "crypto";
import { store } from "./store.mjs";

global.fetch = fetch;

const port = 3000;
const app = express();

const router = express.Router();

router
  .use(
    express.json({
      verify(req, res, buf, encoding) {
        req.rawBody = buf;
      },
    })
  )
  .use((req, res, next) => {
    const hmac = crypto.createHmac('sha1', store.taiga.webhookSecret);
    hmac.write(req.rawBody);
    hmac.end();
    const hash = hmac.read().toString('hex');
    if (req.headers['x-taiga-webhook-signature'] !== hash) {
      res.status(403);
      res.send({ message: 'unauthorized' });
      return;
    }
    next();
  });

app.use('/api/v1', router);

router.post('/hook/:roomId/event', async (req, res) => {
  const { roomId } = req.params;
  const event = req.body;
  if (!event) {
    res.status(400);
    res.send({ message: 'event is missing data' });
    return;
  }
  try {
    switch (req.body.action) {
      case 'create': {
        await client.sendMessage(roomId, {
          "body": `Neues Ticket von: ${ event.by?.username ?? 'Unbekannt' } ${ ticketToString(event.data) }`,
          "msgtype": "m.notice",
        });
        break;
      } case 'change': {
        await client.sendMessage(roomId, {
          "body": `Ticket geändert von: ${ event.by?.username ?? 'Unbekannt'} ${ ticketToString(event.data) }`,
          "msgtype": "m.notice",
        });
        break;
      } case 'delete': {
        await client.sendMessage(roomId, {
          "body": `Ticket gelöscht von: ${ event.by?.username ?? 'Unbekannt'} ${ ticketToString(event.data) }`,
          "msgtype": "m.notice",
        });
        break;
      } default: {
        res.status(200);
        res.send({ message: 'received data but did not send matrix event' });
        return;
      }
    }
    res.status(200);
    res.send({ message: 'successfully sent matrix event' });
  } catch (e) {
    res.status(500);
    res.send({ message: 'failed to sent matrix event' });
    console.error(e);
  }
});

app.listen(port);

console.log('express server started');
