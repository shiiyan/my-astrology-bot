import * as functions from "firebase-functions";
import * as firebaseAdmin from "firebase-admin";
import { App as BoltApp, ExpressReceiver } from "@slack/bolt";
import { UseCaseFactory } from "./useCase/useCaseFactory";
import { UseCaseSelector } from "./useCase/useCaseSelector";
import { isCommandUseCase, isHelpUseCase, isQueryUseCase } from "./useCase/useCaseType";
import { SlackMessageBuilderFactory } from "./presentation/slackMessageBuilderFactory";

const functionConfig = functions.config();

const boltAppReceiver = new ExpressReceiver({
  signingSecret: functionConfig.slack.signing_secret,
  endpoints: "/events",
  processBeforeResponse: true,
});

const boltApp = new BoltApp({
  token: functionConfig.slack.bot_token,
  receiver: boltAppReceiver,
  processBeforeResponse: true,
});


boltApp.event("app_home_opened", async ({ event, client }) => {
  functions.logger.debug("app_home_opened");

  try {
    /* view.publish is the method that your
    app uses to push a view to the Home tab */
    await client.views.publish({
      /* the user that opened your app's app home */
      user_id: event.user,

      /* the view object that appears in the app home*/
      view: {
        type: "home",
        callback_id: "home_view",

        /* body of the view */
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "*Welcome to your _App's Home_ from Cloud Function* :tada:",
            },
          },
        ],
      },
    });
  } catch (e) {
    functions.logger.error(e);
  }
});

boltApp.event("app_mention", async ({ event, say })=> {
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
      const message = useCase.helpMessage;
      await say(message);
    }

    functions.logger.info("Finished ", useCase.metaInfo.description.english);
  } catch (e) {
    functions.logger.error(e);
  }
});

export default boltAppReceiver;
