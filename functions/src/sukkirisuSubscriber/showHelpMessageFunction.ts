import * as functions from "firebase-functions";
import { boltApp, MessageBody } from "./common/bootstrap";

const showHelpMessageFunction = async (message: {data: string}): Promise<void> => {
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
            "text": "コマンド一覧。"
                .concat(" ```@Sukkirisu Bot スッキりす （全てのランキングを表示）")
                .concat("\n@Sukkirisu Bot 個人スッキりす （登録されているユーザのランキングを表示）")
                .concat("\n@Sukkirisu Bot <ユーザ名>は<誕生月>月生まれ （ユーザを登録。ユーザ名は英語。例、abcは12月生まれ）")
                .concat("\n@Sukkirisu Bot ヘルプ （ヘルプメッセージを表示）")
                .concat("\n@Sukkirisu Bot 自己紹介 （スッキりすボットの自己紹介を見る）```")
                .concat(" コマンドから返信まで時間がかかる場合があります。"),
          },
        },
      ],
    });
  } catch (e: unknown) {
    functions.logger.error(e);
  }
};

export default showHelpMessageFunction;
