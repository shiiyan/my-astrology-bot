import { AppMentionEvent } from "@slack/bolt";
import { CommandInterface } from "./commandInterface";

/**
 * @export
 * @class SelfIntroduceCommand
 * @implements {CommandInterface}
 */
export class SelfIntroduceCommand implements CommandInterface {
  private topic = "sukkirisu-bot-self-introduce";
  private channelId: string;

  /**
   * Creates an instance of SelfIntroduceCommand.
   * @param {AppMentionEvent} event
   * @memberof SelfIntroduceCommand
   */
  constructor(event: AppMentionEvent) {
    this.channelId = event.channel;
  }

  /**
   * @return {*}  {string}
   * @memberof SelfIntroduceCommand
   */
  getTopic(): string {
    return this.topic;
  }

  /**
   * @return {*}  {string}
   * @memberof SelfIntroduceCommand
   */
  getChannelId(): string {
    return this.channelId;
  }

  /**
   * @return {*}  {(object | null)}
   * @memberof SelfIntroduceCommand
   */
  getDetail(): object | null {
    return null;
  }
}
