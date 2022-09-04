import { UseCaseType } from "../useCaseType";

/**
 * Show help message use case.
 *
 * @export
 * @class ShowHelpMessage
 */
export class ShowHelpMessage {
  public readonly metaInfo = {
    type: UseCaseType.Help,
    description: {
      english: "show help message",
      japanese: "ヘルプメッセージを表示",
    },
  };

  /**
   * @return {*}  {string}
   * @memberof ShowHelpMessage
   */
  getHelpMessage(): string {
    return `コマンド一覧。コマンドは日本語です
Sukkirisu Bot スッキりす （全てのランキングを表示）
Sukkirisu Bot 個人スッキりす （登録されているユーザのランキングを表示）
Sukkirisu Bot <ユーザー名>は<誕生月>月生まれ （ユーザーを登録。ex. abcは12月生まれ）

0分~30分、31~59分の30分単位で再度リクエストを送ることができるようになります`;
  }
}
