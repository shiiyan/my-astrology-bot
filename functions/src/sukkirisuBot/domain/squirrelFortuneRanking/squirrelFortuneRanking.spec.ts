import {should} from "chai";
import {InvalidArgumentError} from "../../../shared/error/invalidArgumentError";
import {BirthMonthFortune} from "./birthMonthFortune";
import {SquirrelFortuneRanking} from "./squirrelFortuneRanking";
should();

describe("FortuneRanking", () => {
  it("should holds createDate and ranking of birth month fortune", () => {
    const list: BirthMonthFortune[] = [
      {birthMonth: 1, rank: 1, comment: "", luckyColor: ""},
      {birthMonth: 2, rank: 2, comment: "", luckyColor: ""},
      {birthMonth: 3, rank: 3, comment: "", luckyColor: ""},
      {birthMonth: 4, rank: 4, comment: "", luckyColor: ""},
      {birthMonth: 5, rank: 5, comment: "", luckyColor: ""},
      {birthMonth: 6, rank: 6, comment: "", luckyColor: ""},
      {birthMonth: 7, rank: 7, comment: "", luckyColor: ""},
      {birthMonth: 8, rank: 8, comment: "", luckyColor: ""},
      {birthMonth: 9, rank: 9, comment: "", luckyColor: ""},
      {birthMonth: 10, rank: 10, comment: "", luckyColor: ""},
      {birthMonth: 11, rank: 11, comment: "", luckyColor: ""},
      {birthMonth: 12, rank: 12, comment: "", luckyColor: ""},
    ];

    const fortuneRanking = SquirrelFortuneRanking.create(list);

    fortuneRanking.should.be.instanceOf(SquirrelFortuneRanking);
    fortuneRanking.should.have.property("createDate");
    fortuneRanking.should.have.property("createDate").be.instanceOf(Date);
    fortuneRanking.should.have.property("ranks");
    fortuneRanking.should.have.property("ranks").be.a("array");
    fortuneRanking.should.have.property("ranks").that.have.members(list);
  });

  it("should throw invalid argument error given empty array.", () => {
    const list: BirthMonthFortune[] = [];

    (() => SquirrelFortuneRanking.create(list)).should.throw(
        InvalidArgumentError, "Fortune Ranking does not cover each month once."
    );
  });

  it("should throw invalid argument error given month duplicated.", () => {
    const list: BirthMonthFortune[] = [
      {birthMonth: 1, rank: 1, comment: "", luckyColor: ""},
      {birthMonth: 2, rank: 2, comment: "", luckyColor: ""},
      {birthMonth: 3, rank: 3, comment: "", luckyColor: ""},
      {birthMonth: 4, rank: 4, comment: "", luckyColor: ""},
      {birthMonth: 5, rank: 5, comment: "", luckyColor: ""},
      {birthMonth: 6, rank: 6, comment: "", luckyColor: ""},
      {birthMonth: 7, rank: 7, comment: "", luckyColor: ""},
      {birthMonth: 8, rank: 8, comment: "", luckyColor: ""},
      {birthMonth: 9, rank: 9, comment: "", luckyColor: ""},
      {birthMonth: 10, rank: 10, comment: "", luckyColor: ""},
      {birthMonth: 11, rank: 11, comment: "", luckyColor: ""},
      {birthMonth: 11, rank: 12, comment: "", luckyColor: ""},
    ];

    (() => SquirrelFortuneRanking.create(list)).should.throw(
        InvalidArgumentError, "There is no fortune of month 12."
    );
  });
});
