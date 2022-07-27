import {InvalidArgumentError} from "../../shared/error/invalidArgumentError";
import {SquirrelFortuneRanking} from "../domain/squirrelFortuneRanking/squirrelFortuneRanking";
import {SlackMessageBuilderInterface} from "./slackMessageBuilderInterface";
import {SquirrelFortuneRankingSlackMessageBuilder} from "./squirrelFortuneRankingSlackMessageBuilder";

type QueryResult = SquirrelFortuneRanking;

/**
 * @export
 * @class SlackMessageBuilderFactory
 */
export class SlackMessageBuilderFactory {
  /**
   * @static
   * @param {QueryResult} queryResult
   * @return {*}  {SlackMessageBuilderInterface}
   * @memberof SlackMessageBuilderFactory
   */
  public static create(queryResult: QueryResult): SlackMessageBuilderInterface {
    switch (queryResult.constructor) {
      case SquirrelFortuneRanking:
        return new SquirrelFortuneRankingSlackMessageBuilder(queryResult);
      default:
        throw new InvalidArgumentError(`No slack message builder for given query result ${queryResult}`);
    }
  }
}
