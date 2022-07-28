import { InvalidArgumentError } from "../../shared/error/invalidArgumentError";
import { SquirrelFortuneRanking } from "../domain/squirrelFortuneRanking/squirrelFortuneRanking";
import { PersonalSquirrelFortuneDto } from "../useCase/personalSquirrelFortune/personalSquirrelFortuneDto";
import { SlackMessageBuilderInterface } from "./slackMessageBuilderInterface";
import { SquirrelFortuneRankingSlackMessageBuilder } from "./squirrelFortuneRankingSlackMessageBuilder";

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
      return new SquirrelFortuneRankingSlackMessageBuilder(queryResult);
    } else {
      throw new InvalidArgumentError(`No slack message builder for given query result ${queryResult}`);
    }
  }
}
