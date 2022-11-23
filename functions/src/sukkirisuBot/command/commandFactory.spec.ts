import { should } from "chai";
import { CommandFactory } from "./commandFactory";
import { GetPersonalSquirrelFortuneCommand } from "./getPersonalSquirrelFortuneCommand";
import { SaveBirthMonthProfileCommand } from "./saveBirthMonthProfileCommand";
import { SelfIntroduceCommand } from "./selfIntroduceCommand";
import { ShowHelpMessageCommand } from "./showHelpMessageCommand";
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
    }) ?? false;

    command.should.be.an.instanceOf(SelfIntroduceCommand);
  });

  it("should make show help message command given correct message", () => {
    const command = CommandFactory.make({
      type: "app_mention",
      username: "test_user",
      text: "ヘルプ",
      ts: "current",
      channel: "channel_mocha",
      event_ts: "current",
    }) ?? false;

    command.should.be.an.instanceOf(ShowHelpMessageCommand);
  });

  it("should make get personal squirrel fortune command given correct message", () => {
    const command = CommandFactory.make({
      type: "app_mention",
      username: "test_user",
      text: "個人スッキりす",
      ts: "current",
      channel: "channel_mocha",
      event_ts: "current",
    }) ?? false;

    command.should.be.an.instanceOf(GetPersonalSquirrelFortuneCommand);
  });

  it("should make save birth month profile command given correct message", () => {
    const command = CommandFactory.make({
      type: "app_mention",
      username: "test_user",
      text: "abcは12月生まれ",
      ts: "current",
      channel: "channel_mocha",
      event_ts: "current",
    }) ?? false;

    command.should.be.an.instanceOf(SaveBirthMonthProfileCommand);
    (command as SaveBirthMonthProfileCommand).getChannelId().should.equal("channel_mocha");
    (command as SaveBirthMonthProfileCommand).getDetail().should.deep.equal({ name: "abc", birthMonth: 12 });
  });


  it("should return undefined when no command to make", () => {
    const command = CommandFactory.make({
      type: "app_mention",
      username: "test_user",
      text: "ご飯を食べて",
      ts: "current",
      channel: "channel_mocha",
      event_ts: "current",
    });

    should().not.exist(command);
  });
});
