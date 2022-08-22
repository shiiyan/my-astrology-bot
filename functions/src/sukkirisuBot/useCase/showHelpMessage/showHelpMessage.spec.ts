/* eslint-disable @typescript-eslint/no-explicit-any */
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { firestore } from "firebase-admin";
import Sinon, { stub } from "sinon";
import { StubbedInstance, stubInterface } from "ts-sinon";
import { ShowHelpMessage } from "./showHelpMessage";
chai.use(chaiAsPromised);
chai.should();

describe("ShowHelpMessage", () => {
  let stubFirestore: StubbedInstance<firestore.Firestore>;
  let stubbed: Sinon.SinonStub;
  let useCase: ShowHelpMessage;

  beforeEach(() => {
    stubFirestore = stubInterface<firestore.Firestore>();
    stubbed = stub(ShowHelpMessage.prototype, "ensureCallableOncePerHalfHour" as any);
    useCase = new ShowHelpMessage(stubFirestore);
  });

  afterEach(() => {
    stubbed.restore();
  });

  it("should get correct help message", async () => {
    const actual = await useCase.getHelpMessage();
    const expected = `メンションして以下を含めた投稿を行ってください
スッキりす：今日のすっきりすランキングを全て表示
個人スッキりす：ユーザとその誕生月を設定した場合、登録されているユーザのランキングを表示
{ユーザー}は{誕生月}月生まれ：ユーザに対して誕生月を設定する。ユーザーはローマ字で指定、誕生月は数字で指定

0分~30分、31~59分の30分単位で再度リクエストを送ることができるようになります`;
    stubbed.calledOnce.should.be.true;
    actual.should.equal(expected);
  });

  it("should not return help message when ensureCallableOncePerHalfHour fails", () => {
    stubbed.throws(new Error("Document already exists."));
    (useCase.getHelpMessage()).should.eventually.throws(Error, "Document already exists.");
  });
});
