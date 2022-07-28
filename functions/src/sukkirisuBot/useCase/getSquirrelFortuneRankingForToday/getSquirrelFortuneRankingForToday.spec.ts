import { should } from "chai";
import { BirthMonthFortune } from "../../domain/squirrelFortuneRanking/birthMonthFortune";
import { SquirrelFortuneRanking } from "../../domain/squirrelFortuneRanking/squirrelFortuneRanking";
import { SquirrelFortuneRankingInMemoryRepository }
  from "../../infrastructure/repository/squirrelFortuneRankingInMemoryRepository";
import { GetSquirrelFortuneRankingForToday } from "./getSquirrelFortuneRankingForToday";
should();

describe("GetSquirrelFortuneRankingForToday", () => {
  let repository: SquirrelFortuneRankingInMemoryRepository;
  let useCase: GetSquirrelFortuneRankingForToday;

  beforeEach("prepare use case", () => {
    repository = new SquirrelFortuneRankingInMemoryRepository();
    useCase = new GetSquirrelFortuneRankingForToday(repository);
  });

  it("should get squirrel fortune ranking by date of today", async () => {
    const allMonthFortunes = createAllMonthBirthMonthFortunes();
    const squirrelFortuneRanking = SquirrelFortuneRanking.create(allMonthFortunes);
    repository.save(squirrelFortuneRanking);

    const result = await useCase.run();

    result?.should.be.instanceOf(SquirrelFortuneRanking);
    result?.should.have.property("createDate");
    result?.should.have.property("createDate").be.instanceOf(Date);
    result?.should.have.property("birthMonthFortunes");
    result?.should.have.property("birthMonthFortunes").be.a("array");
    result?.should.have.property("birthMonthFortunes").that.have.members(allMonthFortunes);
  });

  it("should return undefined when there is no squirrel fortune ranking for today", async () => {
    const allMonthFortunes = createAllMonthBirthMonthFortunes();
    const squirrelFortuneRanking = SquirrelFortuneRanking.reconstruct(
        new Date("2021-07-27"),
        allMonthFortunes
    );
    repository.save(squirrelFortuneRanking);

    const result = await useCase.run();

    (typeof result).should.equal("undefined");
  });
});

const createAllMonthBirthMonthFortunes = (): BirthMonthFortune[] => {
  return [
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
};
