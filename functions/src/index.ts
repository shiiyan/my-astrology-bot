import * as functions from "firebase-functions";
import helloWorldFunction from "./helloWorld";
import boltAppReceiver from "./sukkirisuBot/sukkirisuBot";

export const helloWorld = functions
    .https
    .onRequest(helloWorldFunction);

export const slack = functions
    .https
    .onRequest(boltAppReceiver.app);
