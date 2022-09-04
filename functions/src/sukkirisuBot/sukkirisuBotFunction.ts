import * as functions from "firebase-functions";
import * as firebaseAdmin from "firebase-admin";
import { App as BoltApp, AppMentionEvent, ExpressReceiver, SayFn } from "@slack/bolt";
import { UseCaseFactory } from "./useCase/useCaseFactory";
import { UseCaseSelector } from "./useCase/useCaseSelector";
import { isCommandUseCase, isHelpUseCase, isQueryUseCase } from "./useCase/useCaseType";
import { SlackMessageBuilderFactory } from "./presentation/slackMessageBuilderFactory";

const functionConfig = functions.config();

const boltAppReceiver = new ExpressReceiver({
  signingSecret: functionConfig.slack?.signing_secret ?? "not available",
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
    const { useCaseName, useCaseParam } = UseCaseSelector.select(event.text);
    if (!useCaseName) {
      await say("理解できませんでした。");
      return;
    }

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

    if (isHelpUseCase(useCase)) {
      const message = await useCase.getHelpMessage();
      await say(message);
    }

    functions.logger.info("Finished ", useCase.metaInfo.description.english);
  } catch (e) {
    functions.logger.error(e);
  }
};

boltApp.event("app_mention", sukkirisuBotFunction);

export default boltAppReceiver;
