import * as functions from "firebase-functions";
import * as firebaseAdmin from "firebase-admin";
import { SquirrelFortuneRankingFirestoreRepository } from "./squirrelFortuneRankingFirestoreRepository";
import { FetchSukkirisuUseCase } from "./fetchSukkirisuUsecase";

firebaseAdmin.initializeApp();

/**
 * Sukkirisu fortune ranking fetcher function triggered by pub/sub events.
 * @see https://firebase.google.com/docs/functions/pubsub-events
 *
 * @param {{data: string}} message
 * @return {*}  {Promise<void>}
 */
const sukkirisuFetchFunction = async (message: {data: string}): Promise<void> => {
  try {
    const messageBody = message.data ? Buffer.from(message.data, "base64").toString() : null;
    if (messageBody !== "trigger sukkirisuFetchFunction") {
      throw new Error("Wrong message for sukkirisuFetchFunction: ".concat(messageBody ?? ""));
    }

    const useCase = new FetchSukkirisuUseCase(
        functions.config().sukkirisu.url,
        new SquirrelFortuneRankingFirestoreRepository(firebaseAdmin.firestore())
    );
    await useCase.run();
  } catch (e) {
    functions.logger.error(e);
  }
};

export default sukkirisuFetchFunction;
