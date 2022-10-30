import * as functions from "firebase-functions";
import { PubSub } from "@google-cloud/pubsub";
import { App as BoltApp } from "@slack/bolt";

const functionConfig = functions.config();

const topicName = "projects/sukkirisu-d6ac0/topics/my-hello-world";
const pubsubClient = new PubSub();

const boltApp = new BoltApp({
  token: functionConfig.slack?.hellow_world_bot_toke ?? "not_available",
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
    channel: "C03KUJE7M71",
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
