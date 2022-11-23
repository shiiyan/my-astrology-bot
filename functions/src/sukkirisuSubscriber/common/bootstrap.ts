import * as functions from "firebase-functions";
import { App as BoltApp } from "@slack/bolt";

export type MessageBody = {
    channel: string
};

const functionConfig = functions.config();
export const boltApp = new BoltApp({
  // set token as not_available for CI to pass
  // TODO: find a better way than above.
  token: functionConfig.slack?.bot_token ?? "not_available",
  signingSecret: functionConfig.slack?.signing_secret ?? "not_available",
});
