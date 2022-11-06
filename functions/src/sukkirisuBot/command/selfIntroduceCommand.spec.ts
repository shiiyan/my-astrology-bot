import { should } from "chai";
import { SelfIntroduceCommand } from "./selfIntroduceCommand";
should();

describe("SelfIntroduceCommand", () => {
  it("should have correct properties", () => {
    const command = new SelfIntroduceCommand({
      type: "app_mention",
      username: "test_user",
      text: "自己紹介",
      ts: "current",
      channel: "channel_mocha",
      event_ts: "current",
    });

    command.getChannelId().should.equal("channel_mocha");
    command.getTopic().should.equal("sukkirisu-bot-self-introduce");
    command.getDetail()?.should.be.null;
  });
});
