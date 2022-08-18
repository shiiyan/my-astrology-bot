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
  get helpMessage(): string {
    return `メンションして以下を含めた投稿を行ってください
スッキりす：今日のすっきりすランキングを全て表示
個人スッキりす：ユーザとその誕生月を設定した場合、登録されているユーザのランキングを表示
{ユーザー}は{誕生月}月生まれ：ユーザに対して誕生月を設定する。ユーザーはローマ字で指定、誕生月は数字で指定

0分~30分、31~59分の30分単位で再度リクエストを送ることができるようになります`;
  }
}
