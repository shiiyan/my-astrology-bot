import { AppMentionEvent } from "@slack/bolt";
import { firestore } from "firebase-admin";
import moment from "moment";

/**
 * Filter same AppMentionEvents.
 * Only one of same AppMentionEvents will pass through this filter within 30 minutes.
 *
 * @export
 * @class SameAppMentionEventFilter
 */
export class SameAppMentionEventFilter {
  private database: firestore.Firestore;

  /**
   * Creates an instance of SameAppMentionEventFilter.
   * @param {firestore.Firestore} database
   * @memberof SameAppMentionEventFilter
   */
  constructor(database: firestore.Firestore) {
    this.database = database;
  }

  /**
   * @param {AppMentionEvent} event
   * @return {*}  {Promise<void>}
   * @memberof SameAppMentionEventFilter
   */
  public async filter(event: AppMentionEvent): Promise<void> {
    const batch = this.database.batch();

    const documentPath = this.makeDocumentPath(event);
    const appMentionEventFilterRef = this.database.collection("appMentionEventFilters").doc(documentPath);
    batch.create(appMentionEventFilterRef, { isFiltered: true });

    await batch.commit();
  }

  /**
   * @private
   * @param {AppMentionEvent} event
   * @return {*}  {string}
   * @memberof SameAppMentionEventFilter
   */
  private makeDocumentPath(event: AppMentionEvent): string {
    const halfHour = Number(moment().format("m")) > 30 ? "30" : "00";
    const currentHour = moment().format("YYYY-MM-DD HH");

    return event.text
        .concat(" ")
        .concat(event.user ?? "nobody")
        .concat(" ")
        .concat(currentHour)
        .concat(":")
        .concat(halfHour);
  }
}
