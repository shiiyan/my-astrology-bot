import * as functions from "firebase-functions";
import * as firebaseAdmin from "firebase-admin";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import { SquirrelFortuneRanking } from "@shiiyan/sukkirisu-function-core-domain";
import { SquirrelFortuneRankingFirestoreRepository } from "./squirrelFortuneRankingFirestoreRepository";
import { SquirrelDomParser } from "./squirrelDomParser";

firebaseAdmin.initializeApp();

/**
 * Sukkirisu fortune ranking fetcher function triggered by pub/sub events.
 * @see https://firebase.google.com/docs/functions/pubsub-events
 *
 * @param {{data: string}} message
 * @return {*}  {Promise<void>}
 */
const sukkirisuFetcher = async (message: {data: string}): Promise<void> => {
  try {
    const messageBody = message.data ? Buffer.from(message.data, "base64").toString() : null;
    if (messageBody !== "trigger sukkirisuFetcher") {
      throw new Error("Wrong message for sukkirisuFetcher: ".concat(messageBody ?? ""));
    }

    const fetchResponse = await fetch(functions.config().sukkirisu.url);
    const htmlString = await fetchResponse.text();

    const dom = new JSDOM(htmlString);
    const allMonthFortunes = (new SquirrelDomParser(dom)).parse();

    const squirrelFortuneRanking = SquirrelFortuneRanking.create(allMonthFortunes);
    const repository = new SquirrelFortuneRankingFirestoreRepository(firebaseAdmin.firestore());
    await repository.save(squirrelFortuneRanking);
  } catch (e) {
    functions.logger.error(e);
  }
};

export default sukkirisuFetcher;
