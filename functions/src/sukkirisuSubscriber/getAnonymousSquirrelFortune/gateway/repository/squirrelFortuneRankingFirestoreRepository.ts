import { firestore } from "firebase-admin";
import moment from "moment";
import {
  BirthMonthFortune,
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
  async findByCreateDate(date: Date): Promise<SquirrelFortuneRanking | undefined> {
    const { rankingSnapShot, fortunesSnapShot } = await this.database.runTransaction(
        async (transaction) => {
          const dateString = moment(date).format("YYYY-MM-DD");
          const rankingRef = this.database
              .collection("squirrelFortuneRankings")
              .doc(dateString);
          const rankingSnapShot = await transaction.get(rankingRef);
          const fortunesRef = rankingRef.collection("birthMonthFortunes");
          const fortunesSnapShot = await transaction.get(fortunesRef);

          return { rankingSnapShot, fortunesSnapShot };
        });

    if (!rankingSnapShot.exists) {
      return;
    }

    const createDate: firestore.Timestamp | undefined = rankingSnapShot.data()?.createDate;
    if (!createDate) {
      return;
    }

    const allMonthFortunes: BirthMonthFortune[] = [];
    fortunesSnapShot.forEach((fortune) => {
      const singleMonthFortune = {
        birthMonth: fortune.data().birthMonth,
        rank: fortune.data().rank,
        comment: fortune.data().comment,
        luckyColor: fortune.data().luckyColor,
      };

      allMonthFortunes.push(singleMonthFortune);
    });

    return SquirrelFortuneRanking.reconstruct(createDate.toDate(), allMonthFortunes);
  }

  /**
   * @param {SquirrelFortuneRanking} squirrelFortuneRanking
   * @memberof SquirrelFortuneRankingFirestoreRepository
   */
  save(squirrelFortuneRanking: SquirrelFortuneRanking): Promise<void> {
    console.log("To be saved: ", squirrelFortuneRanking);
    throw new Error("Method not implemented.",);
  }
}
