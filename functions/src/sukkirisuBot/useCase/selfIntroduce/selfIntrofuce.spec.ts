import { should } from "chai";
import { SelfIntroduce } from "./selfIntroduce";
should();

describe("SelfIntroduce", () => {
  it("should confirm use case given correct use case name", () => {
    SelfIntroduce.confirmUseCase("SelfIntroduce").should.be.true;
  });
});
