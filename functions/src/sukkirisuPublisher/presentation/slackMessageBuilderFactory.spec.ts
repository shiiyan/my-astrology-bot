import { should } from "chai";
import { SlackMessageBuilderFactory } from "./slackMessageBuilderFactory";
import { AnonymousSquirrelFortuneRankingSlackMessageBuilder }
  from "./anonymousSquirrelFortuneRankingSlackMessageBuilder";
import { SquirrelFortuneRankingFactory } from "@shiiyan/sukkirisu-function-core-domain";
should();

describe("SlackMessageBuilderFactory", () => {
  it("should create correct slack message builder given queryResult as SquirrelFortuneRanking", () => {
    const squirrelFortuneRanking = SquirrelFortuneRankingFactory.build();
    const created = SlackMessageBuilderFactory.create(squirrelFortuneRanking);

    created.should.be.an.instanceOf(AnonymousSquirrelFortuneRankingSlackMessageBuilder);
  });
});
