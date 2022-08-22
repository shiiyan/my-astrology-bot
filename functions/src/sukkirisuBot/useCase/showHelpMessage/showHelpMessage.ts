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

    return `コマンド一覧。コマンドは日本語です
Sukkirisu Bot スッキりす （全てのランキングを表示）
Sukkirisu Bot 個人スッキりす （登録されているユーザのランキングを表示）
Sukkirisu Bot <ユーザー名>は<誕生月>月生まれ （ユーザーを登録。ex. abcは12月生まれ）

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
