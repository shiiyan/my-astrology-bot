import {
  SquirrelFortuneRankingRepositoryInterface,
  SquirrelFortuneRanking,
} from "@shiiyan/sukkirisu-function-core-domain";
import { AppMentionQueryUseCaseInterface } from "../appMentionQueryUseCaseInterface";
import { UseCaseType } from "../useCaseType";

/**
 * Get squirrel fortune ranking by date of today.
 *
 * @export
 * @class GetSquirrelFortuneRankingForToday
 * @implements {AppMentionUseCaseInterface}
 */
export class GetSquirrelFortuneRankingForToday implements AppMentionQueryUseCaseInterface {
  private repository: SquirrelFortuneRankingRepositoryInterface;

  public metaInfo = {
    type: UseCaseType.Query,
    description: {
      english: "get squirrel fortune ranking",
      japanese: "今日のスッキりすランキングを取得",
    },
    message: {
      success: "今日のスッキりすランキングを取得しました。",
      failure: "今日のスッキりすランキングを取得できませんでした。",
    },
  };

  /**
   * Creates an instance of GetSquirrelFortuneRankingForToday.
   * @param {SquirrelFortuneRankingRepositoryInterface} repository
   * @memberof GetSquirrelFortuneRankingForToday
   */
  constructor(repository: SquirrelFortuneRankingRepositoryInterface) {
    this.repository = repository;
  }

  /**
   * Run get squirrel fortune ranking by date of today query use case.
   *
   * @return {*} {Promise<SquirrelFortuneRanking | undefined>}
   * @memberof GetSquirrelFortuneRankingForToday
   */
  async run(): Promise<SquirrelFortuneRanking | undefined> {
    const now = new Date();
    const found = await this.repository.findByCreateDate(now);
    return found;
  }
}
