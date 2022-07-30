import { should } from "chai";
import { InvalidArgumentError } from "@shiiyan/sukkirisu-function-error";
import { SquirrelFortuneRanking } from "../domain/squirrelFortuneRanking/squirrelFortuneRanking";
import { PersonalSquirrelFortuneDto } from "../useCase/personalSquirrelFortune/personalSquirrelFortuneDto";
import { SlackMessageBuilderFactory } from "./slackMessageBuilderFactory";
import { SquirrelFortuneRankingSlackMessageBuilder } from "./squirrelFortuneRankingSlackMessageBuilder";
should();

describe("SlackMessageBuilderFactory", () => {
  it("should create correct slack message builder given queryResult as SquirrelFortuneRanking", () => {
    const squirrelFortuneRanking = createSquirrelFortuneRanking();
    const created = SlackMessageBuilderFactory.create(squirrelFortuneRanking);

    created.should.be.an.instanceOf(SquirrelFortuneRankingSlackMessageBuilder);
  });

  it("should throw error given queryResult as PersonalSquirrelFortuneDtos", () => {
    const personalFortunes = createPersonalFortunes();

    (() => SlackMessageBuilderFactory.create(personalFortunes)).should.throw(
        InvalidArgumentError, "No slack message builder for given query result"
    );
  });
});

const createSquirrelFortuneRanking = (): SquirrelFortuneRanking => {
  const list = [
    { birthMonth: 1, rank: 1, comment: "", luckyColor: "" },
    { birthMonth: 2, rank: 2, comment: "", luckyColor: "" },
    { birthMonth: 3, rank: 3, comment: "", luckyColor: "" },
    { birthMonth: 4, rank: 4, comment: "", luckyColor: "" },
    { birthMonth: 5, rank: 5, comment: "", luckyColor: "" },
    { birthMonth: 6, rank: 6, comment: "", luckyColor: "" },
    { birthMonth: 7, rank: 7, comment: "", luckyColor: "" },
    { birthMonth: 8, rank: 8, comment: "", luckyColor: "" },
    { birthMonth: 9, rank: 9, comment: "", luckyColor: "" },
    { birthMonth: 10, rank: 10, comment: "", luckyColor: "" },
    { birthMonth: 11, rank: 11, comment: "", luckyColor: "" },
    { birthMonth: 12, rank: 12, comment: "", luckyColor: "" },
  ];
  return SquirrelFortuneRanking.create(list);
};

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
