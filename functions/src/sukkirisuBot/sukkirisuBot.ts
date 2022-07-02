import * as functions from "firebase-functions";
import * as firebaseAdmin from "firebase-admin";
import {App as BoltApp, ExpressReceiver} from "@slack/bolt";
import {UseCaseFactory} from "./useCase/useCaseFactory";
import {UseCaseSelector} from "./useCase/useCaseSelector";

firebaseAdmin.initializeApp();

const functionConfig = functions.config();

const expressReceiver = new ExpressReceiver({
  signingSecret: functionConfig.slack.signing_secret,
  endpoints: "/events",
  processBeforeResponse: true,
});

const boltApp = new BoltApp({
  token: functionConfig.slack.bot_token,
  receiver: expressReceiver,
  processBeforeResponse: true,
});


boltApp.event("app_home_opened", async ({event, client}) => {
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

boltApp.event("app_mention", async ({event, say})=> {
  try {
    const {useCaseName, executeParam}= UseCaseSelector.select(event.text);
    if (!useCaseName || !executeParam) {
      await say("理解できませんでした。");
      return;
    }

    const useCase = UseCaseFactory.create({
      useCaseName: useCaseName,
      dependency: firebaseAdmin.firestore(),
    });

    functions.logger.info("Starting ", useCase.description.english);
    await useCase.execute(executeParam);
    functions.logger.info("Finished ", useCase.description.english);
    await say(`${useCase.description.japanese}が成功しました。`);
  } catch (e) {
    functions.logger.error(e);
  }
});

export default functions.https.onRequest(expressReceiver.app);