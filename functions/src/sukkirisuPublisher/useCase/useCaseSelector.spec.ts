import { should } from "chai";
import { UseCaseSelector } from "./useCaseSelector";
should();

describe("UseCaseSelector", () => {
  it("should return get squirrel fortune ranking use case when correct message is provided", () => {
    const message = "今日のスッキりすランキングを教えて";
    const result = UseCaseSelector.select(message);

    result.should.be.a("object");
    result.should.have.property("useCaseName").equals("GetSquirrelFortuneRankingForToday");
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
