import { PersonalSquirrelFortuneDtoQueryServiceInterface } from "./personalSquirrelFortuneDtoQueryServiceInterface";
import { MessageBlock, personalSquirrelFortuneMessageBuilderInterface }
  from "./personalSquirrelFortuneMessageBuilderInterface";

/**
 * @export
 * @class GetAllPersonalSquirrelFortuneForToday
 */
export class GetAllPersonalSquirrelFortuneForToday {
  private queryService: PersonalSquirrelFortuneDtoQueryServiceInterface;
  private messageBuilder: personalSquirrelFortuneMessageBuilderInterface;

  public metaInfo = {
    description: {
      english: "get all personal squirrel fortune for today",
      japanese: "今日の個人スッキりすランキングを取得",
    },
    message: {
      success: "今日の個人スッキりすランキングを取得しました。",
      failure: "今日の個人スッキりすランキングを取得できませんでした。",
    },
  };

  /**
   * Creates an instance of GetAllPersonalSquirrelFortuneForToday.
   * @param {PersonalSquirrelFortuneDtoQueryServiceInterface} queryService
   * @param {personalSquirrelFortuneMessageBuilderInterface} messageBuilder
   * @memberof GetAllPersonalSquirrelFortuneForToday
   */
  constructor(
      queryService: PersonalSquirrelFortuneDtoQueryServiceInterface,
      messageBuilder: personalSquirrelFortuneMessageBuilderInterface,
  ) {
    this.queryService = queryService;
    this.messageBuilder = messageBuilder;
  }

  /**
   * @return {*}  {Promise<MessageBlock>}
   * @memberof GetAllPersonalSquirrelFortuneForToday
   */
  async handle(): Promise<MessageBlock> {
    const now = new Date();
    const found = await this.queryService.fetchAllByDate(now);

    return found ?
     this.messageBuilder.build(found) :
     this.messageBuilder.buildFailure(this.metaInfo.message.failure);
  }
}
