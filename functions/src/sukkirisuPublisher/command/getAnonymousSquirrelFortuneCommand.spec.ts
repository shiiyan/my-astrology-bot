import { should } from "chai";
import { GetAnonymousSquirrelFortuneCommand } from "./getAnonymousSquirrelFortuneCommand";
should();

describe("GetAnonymousSquirrelFortuneCommand", () => {
  it("should have correct properties", () => {
    const command = new GetAnonymousSquirrelFortuneCommand({
      type: "app_mention",
      username: "test_user",
      text: "今日のスッキりす",
      ts: "current",
      channel: "channel_mocha",
      event_ts: "current",
    });

    command.getChannelId().should.equal("channel_mocha");
    command.getTopic().should.equal("sukkirisu-bot-get-anonymous-squirrel-fortune");
    command.getDetail()?.should.be.null;
  });
});
