import * as functions from "firebase-functions";
import { boltApp, MessageBody } from "./common/bootstrap";

const selfIntroduceFunction = async (message: {data: string}): Promise<void> => {
  try {
    const messageBody = Buffer.from(message.data, "base64").toString();
    const parsedBody: MessageBody = JSON.parse(messageBody);

    boltApp.client.chat.postMessage({
      channel: parsedBody.channel,
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "こんにちは。"
                .concat("\n誕生月占いが得意のスッキりすボットくんです。")
                .concat("\nミーティングのファシリなどを決めたい時にぜひ僕を活用してください。")
                .concat("\n詳細は `@sukkirisu bot help` をコマンドしてみてください。"),
          },
        },
      ],
    });
  } catch (e: unknown) {
    functions.logger.error(e);
  }
};

export default selfIntroduceFunction;
