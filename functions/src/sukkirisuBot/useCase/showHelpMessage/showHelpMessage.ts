import { firestore } from "firebase-admin";
import moment from "moment";
import { UseCaseType } from "../useCaseType";

/**
 * Show help message use case.
 *
 * @export
 * @class ShowHelpMessage
 */
export class ShowHelpMessage {
  private firestore: firestore.Firestore;

  public readonly metaInfo = {
    type: UseCaseType.Help,
    description: {
      english: "show help message",
      japanese: "ヘルプメッセージを表示",
    },
  };

  /**
   * Creates an instance of ShowHelpMessage.
   * @param {firestore.Firestore} firestore
   * @memberof ShowHelpMessage
   */
  constructor(firestore: firestore.Firestore) {
    this.firestore = firestore;
  }

  /**
   * @return {*}  {string}
   * @memberof ShowHelpMessage
   */
  async getHelpMessage(): Promise<string> {
    await this.ensureCallableOncePerHalfHour();

    return `メンションして以下を含めた投稿を行ってください
スッキりす：今日のすっきりすランキングを全て表示
個人スッキりす：ユーザとその誕生月を設定した場合、登録されているユーザのランキングを表示
{ユーザー}は{誕生月}月生まれ：ユーザに対して誕生月を設定する。ユーザーはローマ字で指定、誕生月は数字で指定

0分~30分、31~59分の30分単位で再度リクエストを送ることができるようになります`;
  }

  /**
   * Ensure show help message can only perform once per half hour.
   *
   * @private
   * @memberof ShowHelpMessage
   */
  private async ensureCallableOncePerHalfHour() {
    const halfHour = Number(moment().format("m")) > 30 ? "30" : "00";
    const currentHour = moment().format("YYYY-MM-DD HH");
    const docId = currentHour.concat(":").concat(halfHour);

    const docRef = this.firestore.collection("showHelpMessageLog").doc(docId);
    const doc = await docRef.get();
    if (!doc.exists) {
      docRef.set({ useCase: "showHelpMessage" });
    } else {
      throw new Error("Document already exists.");
    }
  }
}
