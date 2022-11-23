import { AppMentionEvent } from "@slack/bolt";
import { CommandInterface } from "./commandInterface";
import { GetPersonalSquirrelFortuneCommand } from "./getPersonalSquirrelFortuneCommand";
import { SaveBirthMonthProfileCommand } from "./saveBirthMonthProfileCommand";
import { SelfIntroduceCommand } from "./selfIntroduceCommand";
import { ShowHelpMessageCommand } from "./showHelpMessageCommand";

/**
 * @export
 * @class CommandFactory
 */
export class CommandFactory {
  /**
   * @static
   * @param {AppMentionEvent} event
   * @return {*}  {(CommandInterface | undefined)}
   * @memberof CommandFactory
   */
  public static make(event: AppMentionEvent): CommandInterface | undefined {
    let matchedGroups: {[key: string]: string} | undefined;

    matchedGroups = event.text.match(/(?<selfIntroduce>自己紹介)/)?.groups;
    if (matchedGroups?.selfIntroduce) {
      return new SelfIntroduceCommand(event);
    }

    matchedGroups = event.text.match(/(?<help>help|ヘルプ)/)?.groups;
    if (matchedGroups?.help) {
      return new ShowHelpMessageCommand(event);
    }

    matchedGroups = event.text.match(/(?<personalSquirrelFortune>個人スッキりす)/)?.groups;
    if (matchedGroups?.personalSquirrelFortune) {
      return new GetPersonalSquirrelFortuneCommand(event);
    }

    matchedGroups = event.text.match(/(?<name>[\w]+)は(?<month>[0-9]{1,2})月生まれ/)?.groups;
    if (matchedGroups?.name && matchedGroups?.month) {
      return new SaveBirthMonthProfileCommand({
        channelId: event.channel,
        name: matchedGroups.name,
        month: matchedGroups.month,
      });
    }

    return;
  }
}
