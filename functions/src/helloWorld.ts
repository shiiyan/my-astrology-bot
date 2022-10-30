import * as functions from "firebase-functions";
import { PubSub } from "@google-cloud/pubsub";
import { App as BoltApp } from "@slack/bolt";

const functionConfig = functions.config();

const topicName = "projects/sukkirisu-d6ac0/topics/my-hello-world";
const pubsubClient = new PubSub();

const boltApp = new BoltApp({
  token: functionConfig.slack?.hello_world_bot_token,
  signingSecret: functionConfig.slack?.hello_world_signing_secret,
});

const publishMessageToPubSub = async (): Promise<void> => {
  try {
    const dataBuffer: Buffer = Buffer.from("Hello, world!");
    const messageId = await pubsubClient
        .topic(topicName)
        .publishMessage({ data: dataBuffer });
    functions.logger.info(`Message ${messageId} published.`);
  } catch (e) {
    functions.logger.error(e);
  }
};

const postMessageToSlack = () => {
  boltApp.client.chat.postMessage({
    channel: functionConfig.slack?.hello_world_channel_id,
    text: "Hello from cloud function",
  });
};

const helloWorldFunction = (
    _request: functions.https.Request,
    response: functions.Response
) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  publishMessageToPubSub();
  postMessageToSlack();
  response.send("Hello from cloud function");
};

export default helloWorldFunction;
