import {
  SquirrelFortuneRankingRepositoryInterface,
  SquirrelFortuneRanking,
} from "@shiiyan/sukkirisu-function-core-domain";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import { SquirrelDomParser } from "./squirrelDomParser";

/**
 * Fetch squirrel fortune ranking from sukkirsu website.
 *
 * @export
 * @class FetchSukkirisuUseCase
 */
export class FetchSukkirisuUseCase {
  private readonly url: string;
  private readonly repository: SquirrelFortuneRankingRepositoryInterface;

  /**
   * Creates an instance of FetchSukkirisuUseCase.
   * @param {string} url
   * @param {SquirrelFortuneRankingRepositoryInterface} repository
   * @memberof FetchSukkirisuUseCase
   */
  constructor(url: string, repository: SquirrelFortuneRankingRepositoryInterface) {
    this.url = url;
    this.repository = repository;
  }

  /**
   * Run fetch sukkirisu usecase.
   *
   * @return {*}  {Promise<void>}
   * @memberof FetchSukkirisuUseCase
   */
  async run(): Promise<void> {
    const fetchResponse = await fetch(this.url);
    const htmlString = await fetchResponse.text();
    const allMonthFortunes = (new SquirrelDomParser(new JSDOM(htmlString))).parse();
    const squirrelFortuneRanking = SquirrelFortuneRanking.create(allMonthFortunes);
    await this.repository.save(squirrelFortuneRanking);
  }
}
