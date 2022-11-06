import { should } from "chai";
import { ShowHelpMessageCommand } from "./showHelpMessageCommand";
should();

describe("ShowHelpMessageCommand", () => {
  it("should have correct properties", () => {
    const command = new ShowHelpMessageCommand({
      type: "app_mention",
      username: "test_user",
      text: "ヘルプ",
      ts: "current",
      channel: "channel_mocha",
      event_ts: "current",
    });

    command.getChannelId().should.equal("channel_mocha");
    command.getTopic().should.equal("sukkirisu-bot-show-help-message");
    command.getDetail()?.should.be.null;
  });
});
