import { AppMentionEvent } from "@slack/bolt";
import { CommandInterface } from "./commandInterface";


/**
 * @export
 * @class GetPersonalSquirrelFortuneCommand
 * @implements {CommandInterface}
 */
export class GetPersonalSquirrelFortuneCommand implements CommandInterface {
  private topic = "sukkirisu-bot-get-personal-squirrel-fortune";
  private channelId: string;

  /**
     * Creates an instance of GetPersonalSquirrelFortuneCommand.
     * @param {AppMentionEvent} event
     * @memberof GetPersonalSquirrelFortuneCommand
     */
  constructor(event: AppMentionEvent) {
    this.channelId = event.channel;
  }

  /**
   * @return {*}  {string}
   * @memberof GetPersonalSquirrelFortuneCommand
   */
  getTopic(): string {
    return this.topic;
  }

  /**
   * @return {*}  {string}
   * @memberof GetPersonalSquirrelFortuneCommand
   */
  getChannelId(): string {
    return this.channelId;
  }

  /**
   * @return {*}  {(object | null)}
   * @memberof GetPersonalSquirrelFortuneCommand
   */
  getDetail(): object | null {
    return null;
  }
}
