import { should } from "chai";
import { CommandFactory } from "./commandFactory";
import { SelfIntroduceCommand } from "./selfIntroduceCommand";
should();

describe("CommandFactory", () => {
  it("should make self introduce command given correct message", () => {
    const command = CommandFactory.make({
      type: "app_mention",
      username: "test_user",
      text: "自己紹介",
      ts: "current",
      channel: "channel_mocha",
      event_ts: "current",
    });

    command?.should.be.an.instanceOf(SelfIntroduceCommand);
  });
});
