import * as functions from "firebase-functions";
import * as firebaseAdmin from "firebase-admin";
import { SquirrelFortuneRankingFirestoreRepository } from "./squirrelFortuneRankingFirestoreRepository";
import { FetchSukkirisuUseCase } from "./fetchSukkirisuUsecase";
import { InvalidPubSubMessageError } from "@shiiyan/sukkirisu-function-error";

/**
 * Sukkirisu fortune ranking fetcher function triggered by pub/sub events.
 * @see https://firebase.google.com/docs/functions/pubsub-events
 *
 * @param {{data: string}} message
 * @return {*}  {Promise<void>}
 */
const fetchSukkirisuFunction = async (message: {data: string}): Promise<void> => {
  try {
    const messageBody = message.data ? Buffer.from(message.data, "base64").toString() : null;
    if (messageBody !== "trigger sukkirisuFetchFunction") {
      throw new InvalidPubSubMessageError(
          "Wrong message for sukkirisuFetchFunction: ".concat(messageBody ?? "")
      );
    }

    const useCase = new FetchSukkirisuUseCase(
        functions.config().sukkirisu.url,
        new SquirrelFortuneRankingFirestoreRepository(firebaseAdmin.firestore())
    );
    await useCase.run();
  } catch (e: unknown) {
    functions.logger.error(
      e instanceof InvalidPubSubMessageError ? e.message : e
    );
  }
};

export default fetchSukkirisuFunction;
