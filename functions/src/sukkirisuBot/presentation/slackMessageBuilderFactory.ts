import { SquirrelFortuneRanking } from "@shiiyan/sukkirisu-function-core-domain";
import { SlackMessageBuilderInterface } from "./slackMessageBuilderInterface";
import { AnonymousSquirrelFortuneRankingSlackMessageBuilder }
  from "./anonymousSquirrelFortuneRankingSlackMessageBuilder";

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
    return new AnonymousSquirrelFortuneRankingSlackMessageBuilder(queryResult);
  }
}
