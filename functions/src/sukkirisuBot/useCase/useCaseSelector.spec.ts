import {should} from "chai";
import {UseCaseSelector} from "./useCaseSelector";
should();

describe("UseCaseSelector", () => {
  it("should return save birth month profile use case when registered message is provided", () => {
    const message = "abcは12月生まれ";
    const result = UseCaseSelector.select(message);

    result.should.be.a("object");
    result.should.have.property("useCaseName").equals("SaveBirthMonthProfile");
    result.should.have.property("executeParam").be.a("object");
    result.executeParam?.should.have.property("name").be.a("string");
    result.executeParam?.should.have.property("name").equals("abc");
    result.executeParam?.should.have.property("birthMonth").be.a("number");
    result.executeParam?.should.have.property("birthMonth").equals(12);
  });

  it("should return undefined use case when message is not understandable", () => {
    const message = "xxxxxxxxxxxxx";
    const result = UseCaseSelector.select(message);

    result.should.be.a("object");
    result.should.have.property("useCaseName").be.undefined;
    result.should.have.property("executeParam").be.undefined;
  });
});
