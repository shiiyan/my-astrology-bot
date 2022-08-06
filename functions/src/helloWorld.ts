import * as functions from "firebase-functions";

const helloWorldFunction = (_request: functions.https.Request, response: functions.Response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
};

export default helloWorldFunction;
