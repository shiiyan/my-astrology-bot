import {AppMentionQueryUseCaseInterface} from "../appMentionQueryUseCaseInterface";
import {UseCaseType} from "../useCaseType";
import {PersonalSquirrelFortuneDto} from "./personalSquirrelFortuneDto";
import {PersonalSquirrelFortuneDtoQueryServiceInterface} from "./personalSquirrelFortuneDtoQueryServiceInterface";

/**
 * @export
 * @class GetAllPersonalSquirrelFortuneForToday
 * @implements {AppMentionQueryUseCaseInterface}
 */
export class GetAllPersonalSquirrelFortuneForToday implements AppMentionQueryUseCaseInterface {
  private queryService: PersonalSquirrelFortuneDtoQueryServiceInterface;

  public metaInfo = {
    type: UseCaseType.Query,
    description: {
      english: "get all personal squirrel fortune for today",
      japanese: "全員の今日の個人運勢を取得",
    },
    message: {
      success: "全員の今日の個人運勢を取得しました。",
      failure: "全員の今日の個人運勢を取得できませんでした。",
    },
  };

  /**
   * Creates an instance of GetAllPersonalSquirrelFortuneForToday.
   *
   * @param {PersonalSquirrelFortuneDtoQueryServiceInterface} queryService
   * @memberof GetAllPersonalSquirrelFortuneForToday
   */
  constructor(queryService: PersonalSquirrelFortuneDtoQueryServiceInterface) {
    this.queryService = queryService;
  }


  /**
   * Run get all personal squirrel fortune query.
   *
   * @return {Promise<PersonalSquirrelFortuneDto[]>}
   * @memberof GetAllPersonalSquirrelFortuneForToday
   */
  async run(): Promise<PersonalSquirrelFortuneDto[]> {
    const now = new Date();
    const found = await this.queryService.fetchAllByDateWithLock(now);
    return found;
  }
}
