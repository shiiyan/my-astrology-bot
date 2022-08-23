/* eslint-disable @typescript-eslint/no-explicit-any */
import { DocumentAlreadyExists } from "@shiiyan/sukkirisu-function-error";
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
    const expected = `コマンド一覧。コマンドは日本語です
Sukkirisu Bot スッキりす （全てのランキングを表示）
Sukkirisu Bot 個人スッキりす （登録されているユーザのランキングを表示）
Sukkirisu Bot <ユーザー名>は<誕生月>月生まれ （ユーザーを登録。ex. abcは12月生まれ）

0分~30分、31~59分の30分単位で再度リクエストを送ることができるようになります`;
    stubbed.calledOnce.should.be.true;
    actual.should.equal(expected);
  });

  it("should not return help message when ensureCallableOncePerHalfHour fails", () => {
    stubbed.throws(new DocumentAlreadyExists());
    return useCase.getHelpMessage().should.be.rejectedWith(DocumentAlreadyExists);
  });
});
