import * as functions from "firebase-functions";
import * as firebaseAdmin from "firebase-admin";
import helloWorldFunction from "./helloWorld";
import boltAppReceiver from "./sukkirisuBot/sukkirisuBotFunction";
import fetchSukkirisuFunction from "./sukkirisuFetcher/fetchSukkirisuFunction";
import selfIntroduceFunction from "./sukkirisuSubscriber/selfIntroduceFunction";
import dotenv from "dotenv";

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
