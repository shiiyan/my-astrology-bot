import { should } from "chai";
import { helloWorld } from "./index";
import * as functions from "firebase-functions";
should();

describe("helloWorldFunction", () => {
  it("should send hello message when invoked", () => {
    const request = {} as functions.https.Request;
    const response = {
      send: (body: string) => {
        body.should.equal("Hello from cloud function");
      },
    } as functions.Response;

    helloWorld(request, response);
  });
});
