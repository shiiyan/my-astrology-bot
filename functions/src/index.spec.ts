import * as functions from "firebase-functions";
import { helloWorld, fetchSukkirisu } from "./index";
import { should } from "chai";
import { stub } from "sinon";
import firebaseFunctionsTest from "firebase-functions-test";
should();

const pathToServiceAccountKey = process.env.PATH_TO_SERVICE_ACCOUNT_KEY_OF_SUKKIRISU_TEST ?? "";
const testSdk = firebaseFunctionsTest({
  projectId: "sukkirisu-test",
  databaseURL: "https://sukkirisu-test.firebaseio.com",
}, pathToServiceAccountKey);
export const { cleanup } = testSdk;

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
  it("should fetch sukkirisu when correct pubsub message is provided", async () => {
    // make base64 encoded message of "trigger sukkirisuFetchFunction"
    const pubsubMessage = testSdk.pubsub.makeMessage("dHJpZ2dlciBzdWtraXJpc3VGZXRjaEZ1bmN0aW9u");
    const wrapped = testSdk.wrap(fetchSukkirisu);
    await wrapped(pubsubMessage);

    // todo: assert fetch result
  });
});

describe("slackFunction", () => {
  it("to be tested", () => {
    // todo
  });
});
