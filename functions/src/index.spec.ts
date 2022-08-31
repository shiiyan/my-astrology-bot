import * as functions from "firebase-functions";
import { helloWorld } from "./index";
import { should } from "chai";
import { stub } from "sinon";
import firebaseFunctionsTest from "firebase-functions-test";
should();

const pathToServiceAccountKey = process.env.PATH_TO_SERVICE_ACCOUNT_KEY_OF_SUKKIRISU_TEST ?? "";
export const { cleanup } = firebaseFunctionsTest({
  projectId: "sukkirisu-test",
  databaseURL: "https://sukkirisu-test.firebaseio.com",
}, pathToServiceAccountKey);

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
