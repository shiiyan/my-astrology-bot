import { InvalidArgumentError } from "@shiiyan/sukkirisu-function-error";
import { SquirrelFortuneRanking } from "../domain/squirrelFortuneRanking/squirrelFortuneRanking";
import { PersonalSquirrelFortuneDto } from "../useCase/personalSquirrelFortune/personalSquirrelFortuneDto";
import { SlackMessageBuilderInterface } from "./slackMessageBuilderInterface";
import { AnonymousSquirrelFortuneRankingSlackMessageBuilder }
  from "./anonymousSquirrelFortuneRankingSlackMessageBuilder";

type QueryResult = SquirrelFortuneRanking | PersonalSquirrelFortuneDto[];

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
    if (queryResult instanceof SquirrelFortuneRanking) {
      return new AnonymousSquirrelFortuneRankingSlackMessageBuilder(queryResult);
    } else {
      throw new InvalidArgumentError("No slack message builder for given query result");
    }
  }
}
