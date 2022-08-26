import * as functions from "firebase-functions";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import fetchSukkirisuFunction from "./fetchSukkirisuFunction";
import { stub } from "sinon";
chai.use(chaiAsPromised);
chai.should();

describe("fetchSukkirisuFunction", () => {
  it("should raise invalid message error given wrong message", () => {
    const errorLoggerStub = stub(functions.logger, "error");

    const wrongMessage = { data: "YWFhYWE=" }; // Base64 encoded from "aaaaa"
    const result = fetchSukkirisuFunction(wrongMessage);

    errorLoggerStub.calledOnce.should.be.true;
    errorLoggerStub.calledWith("Wrong message for sukkirisuFetchFunction: aaaaa").should.be.true;
    return result.should.be.fulfilled;
  });
});
