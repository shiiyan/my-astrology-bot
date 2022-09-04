import chai from "chai";
import { ShowHelpMessage } from "./showHelpMessage";
chai.should();

describe("ShowHelpMessage", () => {
  it("should get correct help message", () => {
    const actual = (new ShowHelpMessage()).getHelpMessage();
    const expected = `コマンド一覧。コマンドは日本語です
Sukkirisu Bot スッキりす （全てのランキングを表示）
Sukkirisu Bot 個人スッキりす （登録されているユーザのランキングを表示）
Sukkirisu Bot <ユーザー名>は<誕生月>月生まれ （ユーザーを登録。ex. abcは12月生まれ）

0分~30分、31~59分の30分単位で再度リクエストを送ることができるようになります`;
    actual.should.equal(expected);
  });
});
