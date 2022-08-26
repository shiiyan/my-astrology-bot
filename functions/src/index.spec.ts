import * as functions from "firebase-functions";
import { helloWorld } from "./index";
import { should } from "chai";
import { stub } from "sinon";
should();

describe("helloWorldFunction", () => {
  it("should send hello message when invoked", () => {
    const infoLoggerStub = stub(functions.logger, "info");

    const request = {} as functions.https.Request;
    const response = {
      send: (body: string) => {
        body.should.equal("Hello from cloud function");
      },
    } as functions.Response;

    helloWorld(request, response);
    infoLoggerStub.calledOnceWith("Hello logs!", { structuredData: true }).should.be.true;
  });
});

describe("fetchSukkirisuFunction", () => {
  it("to be tested", () => {
    // todo
  });
});

describe("slackFunction", () => {
  it("to be tested", () => {
    // todo
  });
});
