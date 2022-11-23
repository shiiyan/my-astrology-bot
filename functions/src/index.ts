import * as functions from "firebase-functions";
import * as firebaseAdmin from "firebase-admin";
import dotenv from "dotenv";
import helloWorldFunction from "./helloWorld";
import boltAppReceiver from "./sukkirisuPublisher/sukkirisuBotFunction";
import fetchSukkirisuFunction from "./sukkirisuFetcher/fetchSukkirisuFunction";
import selfIntroduceFunction from "./sukkirisuSubscriber/selfIntroduceFunction";
import showHelpMessageFunction from "./sukkirisuSubscriber/showHelpMessageFunction";
import getPersonalSquirrelFortuneFunction
  from "./sukkirisuSubscriber/getPersonalSquirrelFortune/getPersonalSquirrelFortuneFunction";
import saveBirthMonthProfileFunction from "./sukkirisuSubscriber/saveBirthMonthProfile/saveBirthMonthProfileFunction";
import getAnonymousSquirrelFortuneFunction
  from "./sukkirisuSubscriber/getAnonymousSquirrelFortune/getAnonymousSquirrelFortuneFunction";

dotenv.config();
firebaseAdmin.initializeApp();

export const helloWorld = functions
    .https
    .onRequest(helloWorldFunction);

export const slack = functions
    .region("asia-northeast1")
    .https
    .onRequest(boltAppReceiver.app);

export const fetchSukkirisu = functions
    .pubsub
    .topic("my-pubsub")
    .onPublish(fetchSukkirisuFunction);

export const sukkirisuBotSelfIntroduce = functions
    .pubsub
    .topic("sukkirisu-bot-self-introduce")
    .onPublish(selfIntroduceFunction);

export const sukkirisuBotShowHelpMessage = functions
    .pubsub
    .topic("sukkirisu-bot-show-help-message")
    .onPublish(showHelpMessageFunction);

export const sukkirisuBotGetPersonalSquirrelFortune = functions
    .pubsub
    .topic("sukkirisu-bot-get-personal-squirrel-fortune")
    .onPublish(getPersonalSquirrelFortuneFunction);

export const sukkirisuBotSaveBirthMonthProfile = functions
    .pubsub
    .topic("sukkirisu-bot-save-birth-month-profile")
    .onPublish(saveBirthMonthProfileFunction);

export const sukkirisuBotGetAnonymousSquirrelFortune = functions
    .pubsub
    .topic("sukkirisu-bot-get-anonymous-squirrel-fortune")
    .onPublish(getAnonymousSquirrelFortuneFunction);
