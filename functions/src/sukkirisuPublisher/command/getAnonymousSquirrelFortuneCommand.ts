import { AppMentionEvent } from "@slack/bolt";
import { CommandInterface } from "./commandInterface";

/**
 * @export
 * @class GetAnonymousSquirrelFortuneCommand
 * @implements {CommandInterface}
 */
export class GetAnonymousSquirrelFortuneCommand implements CommandInterface {
  private topic = "sukkirisu-bot-get-anonymous-squirrel-fortune";
  private channelId: string;

  /**
    * Creates an instance of GetAnonymousSquirrelFortuneCommand.
    * @param {AppMentionEvent} event
    * @memberof GetAnonymousSquirrelFortuneCommand
    */
  constructor(event: AppMentionEvent) {
    this.channelId = event.channel;
  }

  /**
   * @return {*}  {string}
   * @memberof GetAnonymousSquirrelFortuneCommand
   */
  getTopic(): string {
    return this.topic;
  }

  /**
   * @return {*}  {string}
   * @memberof GetAnonymousSquirrelFortuneCommand
   */
  getChannelId(): string {
    return this.channelId;
  }

  /**
   * @return {*}  {(object | null)}
   * @memberof GetAnonymousSquirrelFortuneCommand
   */
  getDetail(): object | null {
    return null;
  }
}
