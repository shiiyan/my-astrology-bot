import * as functions from "firebase-functions";
import helloWorldFunction from "./helloWorld";
import boltAppReceiver from "./sukkirisuBot/sukkirisuBot";
import fetchSukkirisuFunction from "./sukkirisuFetcher/fetchSukkirisuFunction";

export const helloWorld = functions.https.onRequest(helloWorldFunction);
export const slack = functions.region("asia-northeast1").https.onRequest(boltAppReceiver.app);
export const fetchSukkirisu = functions.pubsub.topic("my-pubsub").onPublish(fetchSukkirisuFunction);
