import { should } from "chai";
import { ShowHelpMessage } from "./showHelpMessage";
should();

describe("ShowHelpMessage", () => {
  it("should get correct help message", () => {
    const actual = (new ShowHelpMessage()).helpMessage;
    const expected = `メンションして以下を含めた投稿を行ってください
スッキリす：今日のすっきりすランキングを全て表示
個人スッキリす：ユーザとその誕生月を設定した場合、登録されているユーザのランキングを表示
{ユーザー}は{誕生月}月生まれ：ユーザに対して誕生月を設定する。ユーザーはローマ字で指定、誕生月は数字で指定

0分~30分、31~59分の30分単位で再度リクエストを送ることができるようになります`;
    actual.should.equal(expected);
  });
});
