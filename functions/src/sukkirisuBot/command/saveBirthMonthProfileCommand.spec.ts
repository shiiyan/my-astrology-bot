import { SaveBirthMonthProfileCommand } from "./saveBirthMonthProfileCommand";


describe("SaveBirthMonthProfileCommand", () => {
  it("should have correct properties", () => {
    const command = new SaveBirthMonthProfileCommand({
      channelId: "channel_mocha",
      name: "abc",
      month: "12",
    });

    command.getChannelId().should.equal("channel_mocha");
    command.getTopic().should.equal("sukkirisu-bot-save-birth-month-profile");
    command.getDetail().should.deep.equal({ name: "abc", birthMonth: 12 });
  });
});
