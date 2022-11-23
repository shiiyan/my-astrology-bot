import * as functions from "firebase-functions";
import { App as BoltApp, AppMentionEvent, ExpressReceiver, SayFn } from "@slack/bolt";
import { PubSub } from "@google-cloud/pubsub";
import { CommandFactory } from "./command/commandFactory";

const functionConfig = functions.config();
const pubsubClient = new PubSub();
const boltAppReceiver = new ExpressReceiver({
  // TODO: refactor move to functionConfig Object.
  signingSecret: functionConfig.slack?.signing_secret ?? "not_available",
  endpoints: "/events",
  processBeforeResponse: true,
});

const boltApp = new BoltApp({
  token: functionConfig.slack?.bot_token ?? "not available",
  receiver: boltAppReceiver,
  processBeforeResponse: true,
});

export const sukkirisuBotFunction = async (
    { event, say }: { event: AppMentionEvent, say: SayFn }
): Promise<void> => {
  try {
    const command = CommandFactory.make(event);
    if (!command) {
      say("理解できませんでした。");
      return;
    }

    const dataBuffer = Buffer.from(JSON.stringify({
      channel: command.getChannelId(),
      detail: command.getDetail(),
    }));
    const messageId = await pubsubClient
        .topic(functionConfig.pubsub.topic_prefix.concat(command.getTopic()))
        .publishMessage({ data: dataBuffer });
    functions.logger.info(`Message ${messageId} of topic ${command.getTopic()} published.`);

    say("かしこまりました。");
    return;
  } catch (e) {
    functions.logger.error(e);
  }
};

boltApp.event("app_mention", sukkirisuBotFunction);

export default boltAppReceiver;
