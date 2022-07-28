import { firestore } from "firebase-admin";
import moment from "moment";
import { BirthMonthFortune } from "../../domain/squirrelFortuneRanking/birthMonthFortune";
import { SquirrelFortuneRankingRepositoryInterface }
  from "../../domain/squirrelFortuneRanking/entityRepositoryInterface";
import { SquirrelFortuneRanking } from "../../domain/squirrelFortuneRanking/squirrelFortuneRanking";

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
    const { rankingSnapShot, fortunesSnapShot } = await this.database.runTransaction(
        async (transaction) => {
          const dateString = moment(date).format("YYYY-MM-DD");
          const rankingRef = this.database
              .collection("squirrelFortuneRankings")
              .doc(dateString);
          const rankingSnapShot = await transaction.get(rankingRef);
          const fortunesRef = rankingRef.collection("birthMonthFortunes");
          const fortunesSnapShot = await transaction.get(fortunesRef);

          // ensure same query can only perform once per half hour.
          const halfHour = Number(moment().format("m")) > 30 ? "30" : "00";
          const currentHour = moment().format("YYYY-MM-DD HH");
          const logsRef = this.database
              .collection("squirrelFortuneRankingQueryLogs")
              .doc(currentHour + ":" + halfHour);
          transaction.create(logsRef, { method: "findByCreateDateWithLock" });

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
}
