import * as functions from "firebase-functions";
import {App as BoltApp, ExpressReceiver} from "@slack/bolt";

const expressReceiver = new ExpressReceiver({
  signingSecret: String(process.env.SLACK_SIGNING_SECRET),
});

const boltApp = new BoltApp({
  token: process.env.SLACK_BOT_TOKEN,
  receiver: expressReceiver,
  processBeforeResponse: true,
});


boltApp.event("app_home_opened", async ({event, client}) => {
  console.log("app_home_opened");

  try {
    // eslint-disable-next-line max-len
    /* view.publish is the method that your app uses to push a view to the Home tab */
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
          {
            type: "divider",
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              // eslint-disable-next-line max-len
              text: "This button won't do much for now but you can set up a listener for it using the `actions()` method and passing its unique `action_id`. See an example in the `examples` folder within your Bolt app.",
            },
          },
          {
            type: "actions",
            elements: [
              {
                type: "button",
                text: {
                  type: "plain_text",
                  text: "Click me!",
                },
              },
            ],
          },
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});

export default functions.https.onRequest(expressReceiver.app);
