import * as functions from "firebase-functions";
import {App as BoltApp, ExpressReceiver} from "@slack/bolt";

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
  console.log("app_home_opened");

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
  } catch (error) {
    console.error(error);
  }
});

export default functions.https.onRequest(expressReceiver.app);