import * as functions from "firebase-functions";
import fetch from "node-fetch";

const helloWorldFunction = async (_request: functions.https.Request, response: functions.Response) => {
  functions.logger.info("Hello logs!", { structuredData: true });

  const fetchResponse = await fetch("https://www.ntv.co.jp/sukkiri/sukkirisu/index.html");
  const body = await fetchResponse.text();

  response.send("Hello from cloud function" + body);
};

export default helloWorldFunction;
