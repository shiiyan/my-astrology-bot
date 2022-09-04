import { AppMentionEvent } from "@slack/bolt";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { sukkirisuBotFunction } from "./sukkirisuBotFunction";
import { spy } from "sinon";
chai.use(chaiAsPromised);
chai.should();

describe("sukkirisuBotFunction", () => {
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
    // assert db log once
  });
});
