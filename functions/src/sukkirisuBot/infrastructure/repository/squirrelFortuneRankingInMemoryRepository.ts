import {
  SquirrelFortuneRankingRepositoryInterface,
  SquirrelFortuneRanking,
} from "@shiiyan/sukkirisu-function-core-domain";

/**
 * @export
 * @class SquirrelFortuneRankingInMemoryRepository
 * @implements {SquirrelFortuneRankingRepositoryInterface}
 */
export class SquirrelFortuneRankingInMemoryRepository implements SquirrelFortuneRankingRepositoryInterface {
  private data: SquirrelFortuneRanking[] = [];

  /**
   * Find squirrel fortune ranking from this.data by create date.
   *
   * @param {Date} date
   * @return {*} {(Promise<SquirrelFortuneRanking | undefined>)}
   * @memberof SquirrelFortuneRankingInMemoryRepository
   */
  findByCreateDateWithLock(date: Date): Promise<SquirrelFortuneRanking | undefined> {
    const found = this.data.find(
        (squirrelFortuneRanking) => squirrelFortuneRanking.getCreateDate().getTime() === date.getTime()
    );
    return new Promise((resolve) => resolve(found));
  }

  /**
   * Save squirrel fortune ranking to this.data.
   *
   * @param {SquirrelFortuneRanking} squirrelFortuneRanking
   * @return {*} {Promise<void>}
   * @memberof SquirrelFortuneRankingInMemoryRepository
   */
  save(squirrelFortuneRanking: SquirrelFortuneRanking): Promise<void> {
    this.data.push(squirrelFortuneRanking);
    return new Promise((resolve) => resolve());
  }
}
