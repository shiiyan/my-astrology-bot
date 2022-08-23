import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import fetchSukkirisuFunction from "./fetchSukkirisuFunction";
chai.use(chaiAsPromised);
chai.should();

describe("fetchSukkirisuFunction", () => {
  it("should raise invalid message error given wrong message", () => {
    const wrongMessage = { data: "YWFhYWE=" };
    return fetchSukkirisuFunction(wrongMessage).should.be.fulfilled;
  });
});
