import { PersonalSquirrelFortuneDtoQueryServiceInterface } from "./personalSquirrelFortuneDtoQueryServiceInterface";
import { MessageBlock, PersonalSquirrelFortuneMessageBuilderInterface }
  from "./personalSquirrelFortuneMessageBuilderInterface";

/**
 * @export
 * @class GetAllPersonalSquirrelFortuneForToday
 */
export class GetAllPersonalSquirrelFortuneForToday {
  private queryService: PersonalSquirrelFortuneDtoQueryServiceInterface;
  private messageBuilder: PersonalSquirrelFortuneMessageBuilderInterface;

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
   * @param {PersonalSquirrelFortuneMessageBuilderInterface} messageBuilder
   * @memberof GetAllPersonalSquirrelFortuneForToday
   */
  constructor(
      queryService: PersonalSquirrelFortuneDtoQueryServiceInterface,
      messageBuilder: PersonalSquirrelFortuneMessageBuilderInterface,
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

    return found.length !== 0 ?
     this.messageBuilder.build(found) :
     this.messageBuilder.buildFailure(this.metaInfo.message.failure);
  }
}
