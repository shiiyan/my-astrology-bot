import { SquirrelFortuneRanking } from "@shiiyan/sukkirisu-function-core-domain";
import { PersonalSquirrelFortuneDto } from "../useCase/personalSquirrelFortune/personalSquirrelFortuneDto";
import { SlackMessageBuilderInterface } from "./slackMessageBuilderInterface";
import { AnonymousSquirrelFortuneRankingSlackMessageBuilder }
  from "./anonymousSquirrelFortuneRankingSlackMessageBuilder";
import { PersonalSquirrelFortuneRankingSlackMessageBuilder } from "./personalSquirrelFortuneRankingSlackMessageBuilder";

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
      return new PersonalSquirrelFortuneRankingSlackMessageBuilder(queryResult);
    }
  }
}
