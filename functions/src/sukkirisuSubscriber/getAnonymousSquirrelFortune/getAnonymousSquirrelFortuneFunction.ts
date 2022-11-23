import * as functions from "firebase-functions";
import * as firebaseAdmin from "firebase-admin";
import { boltApp, MessageBody } from "../common/bootstrap";
import { GetSquirrelFortuneRankingForToday } from "./useCase/getSquirrelFortuneRankingForToday";
import { KnownBlock } from "@slack/bolt";
import { SquirrelFortuneRankingFirestoreRepository }
  from "./gateway/repository/squirrelFortuneRankingFirestoreRepository";
import { SquirrelFortuneRankingSlackMessageBuilder }
  from "./gateway/messageBuilder/squirrelFortuneRankingSlackMessageBuilder";

const getAnonymousSquirrelFortuneFunction = async (message: {data: string}): Promise<void> => {
  try {
    const messageBody = Buffer.from(message.data, "base64").toString();
    const parsedBody: MessageBody = JSON.parse(messageBody);

    const useCase = new GetSquirrelFortuneRankingForToday(
        new SquirrelFortuneRankingFirestoreRepository(firebaseAdmin.firestore()),
        new SquirrelFortuneRankingSlackMessageBuilder()
    );

    const result = await useCase.handle();

    boltApp.client.chat.postMessage({
      channel: parsedBody.channel,
      blocks: result.blocks as KnownBlock[],
    });
  } catch (e: unknown) {
    functions.logger.error(e);
  }
};

export default getAnonymousSquirrelFortuneFunction;
