import * as functions from "firebase-functions";
import { PubSub } from "@google-cloud/pubsub";

const topicName = "projects/sukkirisu-d6ac0/topics/my-hello-world";
const pubsubClient = new PubSub();

const publishMessage = async (): Promise<void> => {
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

const helloWorldFunction = (
    _request: functions.https.Request,
    response: functions.Response
) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  publishMessage();
  response.send("Hello from cloud function");
};

export default helloWorldFunction;
