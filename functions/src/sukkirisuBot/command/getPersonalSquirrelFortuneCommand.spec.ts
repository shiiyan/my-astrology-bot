import { should } from "chai";
import { GetPersonalSquirrelFortuneCommand } from "./getPersonalSquirrelFortuneCommand";
should();

describe("GetPersonalSquirrelFortuneCommand", () => {
  it("should have correct properties", () => {
    const command = new GetPersonalSquirrelFortuneCommand({
      type: "app_mention",
      username: "test_user",
      text: "個人スッキりす",
      ts: "current",
      channel: "channel_mocha",
      event_ts: "current",
    });

    command.getChannelId().should.equal("channel_mocha");
    command.getTopic().should.equal("sukkirisu-bot-get-personal-squirrel-fortune");
    command.getDetail()?.should.be.null;
  });
});
