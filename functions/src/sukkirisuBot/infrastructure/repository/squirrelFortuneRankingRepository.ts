import {SquirrelFortuneRankingRepositoryInterface} from "../../domain/squirrelFortuneRanking/entityRepositoryInterface";
import {SquirrelFortuneRanking} from "../../domain/squirrelFortuneRanking/squirrelFortuneRanking";

/**
 * @export
 * @class SquirrelFortuneRankingRepository
 * @implements {SquirrelFortuneRankingRepositoryInterface}
 */
export class SquirrelFortuneRankingRepository implements SquirrelFortuneRankingRepositoryInterface {
  /**
   * @param {Date} date
   * @memberof SquirrelFortuneRankingRepository
   */
  findByCreateDate(date: Date): Promise<SquirrelFortuneRanking | undefined> {
    console.error(date);
    throw new Error("Method not implemented.");
  }
}
