import { AppMentionEvent } from "@slack/bolt";
import { CommandInterface } from "./commandInterface";

/**
 * @export
 * @class ShowHelpMessageCommand
 * @implements {CommandInterface}
 */
export class ShowHelpMessageCommand implements CommandInterface {
  private topic = "sukkirisu-bot-show-help-message";
  private channelId: string;

  /**
   * Creates an instance of ShowHelpMessageCommand.
   * @param {AppMentionEvent} event
   * @memberof ShowHelpMessageCommand
   */
  constructor(event: AppMentionEvent) {
    this.channelId = event.channel;
  }

  /**
   * @return {*}  {string}
   * @memberof ShowHelpMessageCommand
   */
  getTopic(): string {
    return this.topic;
  }

  /**
   * @return {*}  {string}
   * @memberof ShowHelpMessageCommand
   */
  getChannelId(): string {
    return this.channelId;
  }

  /**
   * @return {*}  {(object | null)}
   * @memberof ShowHelpMessageCommand
   */
  getDetail(): object | null {
    return null;
  }
}
