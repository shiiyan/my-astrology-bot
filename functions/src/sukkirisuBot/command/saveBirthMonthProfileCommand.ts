import { CommandInterface } from "./commandInterface";

/**
 * @export
 * @class SaveBirthMonthProfileCommand
 * @implements {CommandInterface}
 */
export class SaveBirthMonthProfileCommand implements CommandInterface {
  private topic = "sukkirisu-bot-save-birth-month-profile";
  private channelId: string;
  private name: string;
  private birthMonth: number;

  /**
   * Creates an instance of SaveBirthMonthProfileCommand.
   * @param {{
   *         channelId: string,
   *         name: string,
   *         month: string
   *     }} params
   * @memberof SaveBirthMonthProfileCommand
   */
  constructor(params: {
        channelId: string,
        name: string,
        month: string
    }) {
    this.channelId = params.channelId;
    this.name = params.name,
    this.birthMonth = Number(params.month);
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
   * @return {*}  {object}
   * @memberof SaveBirthMonthProfileCommand
   */
  getDetail(): object {
    return {
      name: this.name,
      birthMonth: this.birthMonth,
    };
  }
}
