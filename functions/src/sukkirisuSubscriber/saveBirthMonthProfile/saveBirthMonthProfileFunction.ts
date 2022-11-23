import * as functions from "firebase-functions";
import * as firebaseAdmin from "firebase-admin";
import { boltApp, MessageBody } from "../common/bootstrap";
import { SaveBirthMonthProfile } from "./useCase/saveBirthMonthProfile";
import { BirthMonthProfileFirestoreRepository } from "./gateway/birthMonthProfileFirestoreRepository";
import { BirthMonthProfile } from "@shiiyan/sukkirisu-function-core-domain";

type ParsedBody = MessageBody & {
  name: string,
  birthMonth: number
}

let parsedBody: ParsedBody;
let useCase: SaveBirthMonthProfile;

const saveBirthMonthProfileFunction = async (message: {data: string}): Promise<void> => {
  try {
    const messageBody = Buffer.from(message.data, "base64").toString();
    parsedBody = JSON.parse(messageBody);

    useCase = new SaveBirthMonthProfile(
        new BirthMonthProfileFirestoreRepository(firebaseAdmin.firestore())
    );
    const birthMonthProfile: BirthMonthProfile = {
      name: parsedBody.name,
      birthMonth: parsedBody.birthMonth,
    };
    await useCase.handle(birthMonthProfile);

    boltApp.client.chat.postMessage({
      channel: parsedBody.channel,
      text: useCase.metaInfo.message.success,
    });
  } catch (e: unknown) {
    functions.logger.error(e);

    if (parsedBody && useCase) {
      boltApp.client.chat.postMessage({
        channel: parsedBody.channel,
        text: useCase.metaInfo.message.failure,
      });
    }
  }
};

export default saveBirthMonthProfileFunction;
