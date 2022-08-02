import { should } from "chai";
import { InvalidArgumentError } from "@shiiyan/sukkirisu-function-error";
import { BirthMonthFortune } from "./birthMonthFortune";
import { SquirrelFortuneRanking } from "./squirrelFortuneRanking";
should();

describe("SquirrelFortuneRanking", () => {
  it("should hold createDate and ranking of birth month fortune", () => {
    const list = createAllMonthBirthMonthFortunes();
    const fortuneRanking = SquirrelFortuneRanking.create(list);

    fortuneRanking.should.be.instanceOf(SquirrelFortuneRanking);
    fortuneRanking.should.have.property("createDate");
    fortuneRanking.should.have.property("createDate").be.instanceOf(Date);
    fortuneRanking.should.have.property("birthMonthFortunes");
    fortuneRanking.should.have.property("birthMonthFortunes").be.a("array");
    const expectedAllMonthFortunes = createAllMonthBirthMonthFortunes();
    fortuneRanking.should.have.property("birthMonthFortunes").that.have.deep.members(expectedAllMonthFortunes);
  });

  it("should throw invalid argument error given empty array.", () => {
    const list: BirthMonthFortune[] = [];

    (() => SquirrelFortuneRanking.create(list)).should.throw(
        InvalidArgumentError, "Fortune Ranking does not cover each month once."
    );
  });

  it("should throw invalid argument error given month duplicated.", () => {
    const list: BirthMonthFortune[] = createDuplicatedMonthBirthMonthFortunes();

    (() => SquirrelFortuneRanking.create(list)).should.throw(
        InvalidArgumentError, "There is no fortune of month 12."
    );
  });

  it("should reconstruct using createDate and list of birth month fortune", () => {
    const createDate: Date = new Date("2022-07-10 10:08:00");
    const list: BirthMonthFortune[] = createAllMonthBirthMonthFortunes();
    const reconstructed = SquirrelFortuneRanking.reconstruct(createDate, list);

    reconstructed.should.be.instanceOf(SquirrelFortuneRanking);
    reconstructed.should.have.property("createDate");
    reconstructed.should.have.property("createDate").be.instanceOf(Date);
    reconstructed.getCreateDate().getTime().should.equal(createDate.getTime());
    reconstructed.should.have.property("birthMonthFortunes");
    reconstructed.should.have.property("birthMonthFortunes").be.a("array");
    reconstructed.should.have.property("birthMonthFortunes").that.have.members(list);
  });

  it("should get a birth month fortune by rank", () => {
    const list: BirthMonthFortune[] = createAllMonthBirthMonthFortunes();
    const fortuneRanking = SquirrelFortuneRanking.create(list);

    const getResult = fortuneRanking.getFortuneByRank(1);

    getResult.should.have.property("birthMonth").equals(1);
    getResult.should.have.property("rank").equals(1);
    getResult.should.have.property("comment").equals("");
    getResult.should.have.property("luckyColor").equals("");
  });

  it("should get a birth month fortune by birth month", () => {
    const list: BirthMonthFortune[] = createAllMonthBirthMonthFortunes();
    const fortuneRanking = SquirrelFortuneRanking.create(list);

    const getResult = fortuneRanking.getFortuneByBirthMonth(1);

    getResult.should.have.property("birthMonth").equals(1);
    getResult.should.have.property("rank").equals(1);
    getResult.should.have.property("comment").equals("");
    getResult.should.have.property("luckyColor").equals("");
  });

  it("should get create date", () => {
    const createDate: Date = new Date("2022-07-10 10:08:00");
    const list: BirthMonthFortune[] = createAllMonthBirthMonthFortunes();
    const fortuneRanking = SquirrelFortuneRanking.reconstruct(createDate, list);

    const getResult = fortuneRanking.getCreateDate();

    getResult.should.be.instanceOf(Date);
    getResult.getTime().should.equal(createDate.getTime());
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

const createDuplicatedMonthBirthMonthFortunes = (): BirthMonthFortune[] => {
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
    { birthMonth: 11, rank: 12, comment: "", luckyColor: "" },
  ];
};
