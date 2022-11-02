import * as sdk from "matrix-js-sdk";
import { store } from "./store.mjs";

export const client = sdk.createClient({
  baseUrl: store.matrix.baseUrl,
  userId: store.matrix.userId,
  accessToken: store.matrix.accessToken,
});
