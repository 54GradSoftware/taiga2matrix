import express from "express";
import { client } from "./matrix.mjs";
import fetch from "node-fetch";
import { ticketToBody } from "./helpers.mjs";
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
  const ticket = req.body;
  if (!ticket) {
    res.status(400);
    res.send({ message: 'event is missing data' });
    return;
  }
  try {
    const body = ticketToBody(ticket)
    if (body) {
      await client.sendMessage(roomId, {
        body,
        "msgtype": "m.notice",
      });
      res.status(200);
      res.send({ message: 'successfully sent matrix event' });
    } else {
      throw new Error('Wrong ticket action');
    }
  } catch (e) {
    res.status(500);
    res.send({ message: 'failed to sent matrix event' });
    console.error(e);
  }
});

app.listen(port);

console.log('express server started');
