import * as functions from "firebase-functions";
import * as firebaseAdmin from "firebase-admin";
import { App as BoltApp, KnownBlock } from "@slack/bolt";
import { GetAllPersonalSquirrelFortuneForToday } from "./useCase/getAllPersonalSquirrelFortuneForToday";
import { PersonalSquirrelFortuneRankingSlackMessageBuilder }
  from "./gateway/messageBuilder/personalSquirrelFortuneRankingSlackMessageBuilder";
import { PersonalSquirrelFortuneDtoFireStoreQueryService }
  from "./gateway/queryService/personalSquirrelFortuneDtoFirestoreQueryService";

const functionConfig = functions.config();
const boltApp = new BoltApp({
  // set token as not_available for CI to pass
  // TODO: find a better way than above.
  token: functionConfig.slack?.bot_token ?? "not_available",
  signingSecret: functionConfig.slack?.signing_secret ?? "not_available",
});

type MessageBody = {
    channel: string
};

const getPersonalSquirrelFortuneFunction = async (message: {data: string}): Promise<void> => {
  try {
    const messageBody = Buffer.from(message.data, "base64").toString();
    const parsedBody: MessageBody = JSON.parse(messageBody);

    const useCase = new GetAllPersonalSquirrelFortuneForToday(
        new PersonalSquirrelFortuneDtoFireStoreQueryService(firebaseAdmin.firestore()),
        new PersonalSquirrelFortuneRankingSlackMessageBuilder());

    const result = await useCase.handle();

    boltApp.client.chat.postMessage({
      channel: parsedBody.channel,
      blocks: result.blocks as KnownBlock[],
    });
  } catch (e: unknown) {
    functions.logger.error(e);
  }
};

export default getPersonalSquirrelFortuneFunction;
