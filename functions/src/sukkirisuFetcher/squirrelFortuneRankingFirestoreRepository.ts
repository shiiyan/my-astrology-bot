import { firestore } from "firebase-admin";
import moment from "moment";
import {
  SquirrelFortuneRankingRepositoryInterface,
  SquirrelFortuneRanking,
} from "@shiiyan/sukkirisu-function-core-domain";

/**
 * @export
 * @class SquirrelFortuneRankingFirestoreRepository
 * @implements {SquirrelFortuneRankingRepositoryInterface}
 */
export class SquirrelFortuneRankingFirestoreRepository implements SquirrelFortuneRankingRepositoryInterface {
  private database: firestore.Firestore;

  /**
   * Creates an instance of SquirrelFortuneRankingFirestoreRepository.
   * @param {firestore.Firestore} database
   * @memberof SquirrelFortuneRankingFirestoreRepository
   */
  constructor(
      database: firestore.Firestore
  ) {
    this.database = database;
  }

  /**
   * Find squirrel fortune ranking by create date.
   *
   * @param {Date} date
   * @return {*} {(Promise<SquirrelFortuneRanking | undefined>)}
   * @memberof SquirrelFortuneRankingFirestoreRepository
   */
  async findByCreateDateWithLock(date: Date): Promise<SquirrelFortuneRanking | undefined> {
    throw new Error("To be implemented.".concat(" date: ", date.toDateString()));
  }

  /**
   * Save SquirrelFortuneRanking to firestore.
   *
   * @param {SquirrelFortuneRanking} squirrelFortuneRanking
   * @return {*}  {Promise<void>}
   * @memberof SquirrelFortuneRankingFirestoreRepository
   */
  async save(squirrelFortuneRanking: SquirrelFortuneRanking): Promise<void> {
    const batch = this.database.batch();

    const dateString = moment(squirrelFortuneRanking.getCreateDate()).format("YYYY-MM-DD");
    const squirrelFortuneRankingDocRef = this.database.collection("squirrelFortuneRankings")
        .doc(dateString);

    const createDateInTimestamp = {
      createDate: firestore.Timestamp.fromDate(squirrelFortuneRanking.getCreateDate()),
    };
    batch.create(squirrelFortuneRankingDocRef, createDateInTimestamp);

    squirrelFortuneRanking.getAllMonthFortunes().forEach((singleMonthFortune) => {
      const singleMonthFortuneDocRef = this.database.collection("squirrelFortuneRankings")
          .doc(dateString)
          .collection("birthMonthFortunes")
          .doc();
      batch.create(singleMonthFortuneDocRef, singleMonthFortune);
    });

    const indexDocRef = this.database.collection("indexes")
        .doc(`/squirrelFortuneRanking/date/${dateString}`);
    batch.create(indexDocRef, { value: squirrelFortuneRankingDocRef.id });

    await batch.commit();
  }
}
