import express from "express";
import { client } from "./matrix.mjs";
import fetch from "node-fetch";

global.fetch = fetch;

const port = 3000;
const app = express();

const router = express.Router();

router.use(express.json());

app.use('/api/v1', router);

router.post('/hook/:roomId/event', async (req, res) => {
  const { roomId } = req.params;
  if (!req.body?.content?.body) {
    res.status(400);
    res.send({ message: 'content is missing' });
    return;
  }
  try {
    await client.sendMessage(roomId, {
      "body": req.body.content.body,
      "msgtype": "m.text",
    });
    res.status(200);
    res.send({ message: 'successfully sent matrix event' });
  } catch (e) {
    res.status(500);
    res.send({ message: 'failed to sent matrix event' });
  }
});

app.listen(port);

console.log('express server started');
