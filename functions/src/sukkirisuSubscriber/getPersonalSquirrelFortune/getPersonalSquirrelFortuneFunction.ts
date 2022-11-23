import * as functions from "firebase-functions";
import * as firebaseAdmin from "firebase-admin";
import { KnownBlock } from "@slack/bolt";
import { GetAllPersonalSquirrelFortuneForToday } from "./useCase/getAllPersonalSquirrelFortuneForToday";
import { PersonalSquirrelFortuneRankingSlackMessageBuilder }
  from "./gateway/messageBuilder/personalSquirrelFortuneRankingSlackMessageBuilder";
import { PersonalSquirrelFortuneDtoFireStoreQueryService }
  from "./gateway/queryService/personalSquirrelFortuneDtoFirestoreQueryService";
import { boltApp, MessageBody } from "../common/bootstrap";


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
