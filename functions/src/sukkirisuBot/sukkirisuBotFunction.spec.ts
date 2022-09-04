import * as firebaseAdmin from "firebase-admin";
import { AppMentionEvent } from "@slack/bolt";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { sukkirisuBotFunction } from "./sukkirisuBotFunction";
import { spy } from "sinon";
import { FirebaseFunctionsTestHelper } from "../shared/firebaseFunctionsTestHelper";
import { cleanup } from "../index.spec";
chai.use(chaiAsPromised);
chai.should();

const firestore = firebaseAdmin.firestore();

describe("sukkirisuBotFunction", () => {
  afterEach(async () => {
    cleanup();
    await (new FirebaseFunctionsTestHelper(firestore)).deleteTestCollection("appMentionEventFilters");
  });

  it("should filter same event payload within 30 minutes", async () => {
    const event = { text: "aaaaa", user: "123" } as AppMentionEvent;
    const say = spy();

    await Promise.all([
      sukkirisuBotFunction({ event, say }),
      sukkirisuBotFunction({ event, say }),
      sukkirisuBotFunction({ event, say }),
    ]);

    say.calledOnce.should.be.true;
    say.calledWith("理解できませんでした。").should.be.true;
  }).timeout(10000);
});
