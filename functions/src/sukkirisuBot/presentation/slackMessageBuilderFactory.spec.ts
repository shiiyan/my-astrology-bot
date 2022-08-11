import { should } from "chai";
import { PersonalSquirrelFortuneDto } from "../useCase/personalSquirrelFortune/personalSquirrelFortuneDto";
import { SlackMessageBuilderFactory } from "./slackMessageBuilderFactory";
import { AnonymousSquirrelFortuneRankingSlackMessageBuilder }
  from "./anonymousSquirrelFortuneRankingSlackMessageBuilder";
import { PersonalSquirrelFortuneRankingSlackMessageBuilder }
  from "./personalSquirrelFortuneRankingSlackMessageBuilder";
import { SquirrelFortuneRankingFactory } from "@shiiyan/sukkirisu-function-core-domain";
should();

describe("SlackMessageBuilderFactory", () => {
  it("should create correct slack message builder given queryResult as SquirrelFortuneRanking", () => {
    const squirrelFortuneRanking = SquirrelFortuneRankingFactory.build();
    const created = SlackMessageBuilderFactory.create(squirrelFortuneRanking);

    created.should.be.an.instanceOf(AnonymousSquirrelFortuneRankingSlackMessageBuilder);
  });

  it("should create correct slack message builder given queryResult as PersonalSquirrelFortuneDtos", () => {
    const personalFortunes = createPersonalFortunes();
    const created = SlackMessageBuilderFactory.create(personalFortunes);

    created.should.be.an.instanceOf(PersonalSquirrelFortuneRankingSlackMessageBuilder);
  });
});

const createPersonalFortunes = (): PersonalSquirrelFortuneDto[] => {
  return [
    {
      birthMonth: 1,
      name: "one",
      rank: 1,
      comment: "number one",
    },
    {
      birthMonth: 2,
      name: "two",
      rank: 2,
      comment: "number two",
    },
    {
      birthMonth: 3,
      name: "three",
      rank: 3,
      comment: "number three",
    },
  ];
};
