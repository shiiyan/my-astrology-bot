import * as functions from "firebase-functions";
import * as firebaseAdmin from "firebase-admin";
import {App as BoltApp, ExpressReceiver} from "@slack/bolt";
// eslint-disable-next-line max-len
import SaveBirthMonthProfile, {BirthMonthProfile} from "./SaveBirthMonthProfile";

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
    const {useCase, executeParam}= selectUseCase(event.text);
    if (!useCase || !executeParam) {
      await say("理解できませんでした。");
      return;
    }

    functions.logger.info("Starting ", useCase.description.english);
    await useCase.execute(executeParam);
    functions.logger.info("Finished ", useCase.description.english);
    await say(`${useCase.description.japanese}が成功しました。`);
  } catch (e) {
    functions.logger.error(e);
  }
});


const selectUseCase = (eventMessage: string): SelectResult => {
  const matchedGroups = eventMessage.match(
      /(?<name>[\w]+)は(?<month>[0-9]{1,2})月生まれ/
  )?.groups;

  if (!matchedGroups) {
    return {
      useCase: undefined,
      executeParam: undefined,
    };
  }

  const useCase = new SaveBirthMonthProfile(
      firebaseAdmin.firestore(),
  );

  const birthMonthProfile: BirthMonthProfile = {
    name: String(matchedGroups.name),
    birthMonth: Number(matchedGroups.month),
  };

  return {
    useCase,
    executeParam: birthMonthProfile,
  };
};


declare type SelectResult = {
  useCase?: SaveBirthMonthProfile,
  executeParam?: BirthMonthProfile
}

export default functions.https.onRequest(expressReceiver.app);
