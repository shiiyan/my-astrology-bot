import {InvalidArgumentError} from "../../../shared/error/invalidArgumentError";
import {BirthMonthFortune} from "./birthMonthFortune";

/**
 * Ranking of birth month fortune.
 *
 * @export
 * @class SquirrelFortuneRanking
 */
export class SquirrelFortuneRanking {
  private readonly createDate: Date;
  private readonly ranks: BirthMonthFortune[];
  private readonly ALL_MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  /**
   * Creates an instance of SquirrelFortuneRanking.
   *
   * @param {BirthMonthFortune[]} list
   * @memberof SquirrelFortuneRanking
   */
  constructor(list: BirthMonthFortune[]) {
    this.ensureRankCoversEachMonthOnce(list);

    this.createDate = new Date();
    this.ranks = list;
  }

  /**
   * Factory method to create SquirrelFortuneRanking.
   *
   * @static
   * @param {BirthMonthFortune[]} list
   * @return {SquirrelFortuneRanking}
   * @memberof SquirrelFortuneRanking
   */
  public static create(list: BirthMonthFortune[]): SquirrelFortuneRanking {
    return new SquirrelFortuneRanking(list);
  }

  /**
   * Get fortune by rank.
   *
   * @param {number} rank
   * @return {BirthMonthFortune}
   * @memberof SquirrelFortuneRanking
   */
  public getFortuneByRank(rank: number): BirthMonthFortune | undefined {
    return this.ranks.find((fortune) => fortune.rank === rank);
  }

  /**
   * Get create date.
   *
   * @return {Date}
   * @memberof SquirrelFortuneRanking
   */
  public getCreateDate(): Date {
    return this.createDate;
  }

  /**
   * Validation to ensure ranking covers all months.
   *
   * @private
   * @param {BirthMonthFortune[]} list
   * @memberof SquirrelFortuneRanking
   */
  private ensureRankCoversEachMonthOnce(list: BirthMonthFortune[]) {
    if (list.length !== this.ALL_MONTHS.length) {
      throw new InvalidArgumentError("Fortune Ranking does not cover each month once.");
    }

    const monthSet = new Set(list.map((fortune) => fortune.birthMonth));
    this.ALL_MONTHS.forEach((month) => {
      if (!monthSet.has(month)) {
        throw new InvalidArgumentError(`There is no fortune of month ${month}.`);
      }
    });
  }
}
