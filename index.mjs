import express from "express";
import { client } from "./matrix.mjs";

const port = 3000;
const app = express();

const router = express.Router();

router.use(express.json());

app.use('/api/v1', router);

router.post('/hook/:roomId/event', async (req, res) => {
  const { roomId } = req.params;
  await client.sendMessage(roomId, {
    "body": req.body.content.body,
    "msgtype": "m.text",
  });
  res.status(200);
  res.send({ message: 'successfully sent matrix event' });
});
