import * as functions from "firebase-functions";
import * as firebaseAdmin from "firebase-admin";
import { App as BoltApp, AppMentionEvent, ExpressReceiver, SayFn } from "@slack/bolt";
import { UseCaseFactory } from "./useCase/useCaseFactory";
import { UseCaseSelector } from "./useCase/useCaseSelector";
import { isCommandUseCase, isQueryUseCase } from "./useCase/useCaseType";
import { SlackMessageBuilderFactory } from "./presentation/slackMessageBuilderFactory";
import { SameAppMentionEventFilter } from "./infrastructure/filter/sameAppMentionEventFilter";
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

    if (command) {
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
    }

    // TODO: lines of code below are to be removed.
    const { useCaseName, useCaseParam } = UseCaseSelector.select(event.text);
    if (!useCaseName) {
      say("理解できませんでした。");
      return;
    }

    await (new SameAppMentionEventFilter(firebaseAdmin.firestore())).filter(event);
    const useCase = UseCaseFactory.create({
      useCaseName: useCaseName,
      firestore: firebaseAdmin.firestore(),
    });

    functions.logger.info("Starting ", useCase.metaInfo.description.english);

    if (isCommandUseCase(useCase)) {
      await useCase.execute(useCaseParam);
      await say(useCase.metaInfo.message.success);
    }

    if (isQueryUseCase(useCase)) {
      const queryResult = await useCase.run();
      if (!queryResult) {
        await say(useCase.metaInfo.message.failure);
        return;
      }

      const message = SlackMessageBuilderFactory.create(queryResult).build();
      await say(message);
    }

    functions.logger.info("Finished ", useCase.metaInfo.description.english);
  } catch (e) {
    functions.logger.error(e);
  }
};

boltApp.event("app_mention", sukkirisuBotFunction);

export default boltAppReceiver;
