import { should } from "chai";
import { UseCaseSelector } from "./useCaseSelector";
should();

describe("UseCaseSelector", () => {
  it("should return save birth month profile use case when correct message is provided", () => {
    const message = "abcは12月生まれ";
    const result = UseCaseSelector.select(message);

    result.should.be.a("object");
    result.should.have.property("useCaseName").equals("SaveBirthMonthProfile");
    result.should.have.property("useCaseParam").be.a("object");
    result.useCaseParam?.should.have.property("name").be.a("string");
    result.useCaseParam?.should.have.property("name").equals("abc");
    result.useCaseParam?.should.have.property("birthMonth").be.a("number");
    result.useCaseParam?.should.have.property("birthMonth").equals(12);
  });

  it("should return get squirrel fortune ranking use case when correct message is provided", () => {
    const message = "今日のスッキりすランキングを教えて";
    const result = UseCaseSelector.select(message);

    result.should.be.a("object");
    result.should.have.property("useCaseName").equals("GetSquirrelFortuneRankingForToday");
    result.should.have.property("useCaseParam").be.undefined;
  });

  it("should return get personal fortune ranking for all use case when correct message is provided", () => {
    const message = "今日の個人スッキりすランキングを教えて";
    const result = UseCaseSelector.select(message);

    result.should.be.a("object");
    result.should.have.property("useCaseName").equals("GetAllPersonalSquirrelFortuneForToday");
    result.should.have.property("useCaseParam").be.undefined;
  });

  it("should return save dummy squirrel fortune ranking use case when correct message is provided", () => {
    const message = "テストデータを生成して";
    const result = UseCaseSelector.select(message);

    result.should.be.a("object");
    result.should.have.property("useCaseName").equals("SaveDummySquirrelFortuneRanking");
    result.should.have.property("useCaseParam").be.undefined;
  });

  it("should return show help message use case when correct message is provided", () => {
    const message = "help";
    const result = UseCaseSelector.select(message);

    result.should.be.a("object");
    result.should.have.property("useCaseName").equals("ShowHelpMessage");
    result.should.have.property("useCaseParam").be.undefined;
  });

  it("should return show help message use case when japanese message is provided", () => {
    const message = "ヘルプ";
    const result = UseCaseSelector.select(message);

    result.should.be.a("object");
    result.should.have.property("useCaseName").equals("ShowHelpMessage");
    result.should.have.property("useCaseParam").be.undefined;
  });

  it("should return undefined use case when message is not understandable", () => {
    const message = "xxxxxxxxxxxxx";
    const result = UseCaseSelector.select(message);

    result.should.be.a("object");
    result.should.have.property("useCaseName").be.undefined;
    result.should.have.property("useCaseParam").be.undefined;
  });
});
