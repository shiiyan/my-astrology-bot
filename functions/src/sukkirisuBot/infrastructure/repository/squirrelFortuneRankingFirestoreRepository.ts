import {firestore} from "firebase-admin";
import moment from "moment";
import {BirthMonthFortune} from "../../domain/squirrelFortuneRanking/birthMonthFortune";
import {SquirrelFortuneRankingRepositoryInterface} from "../../domain/squirrelFortuneRanking/entityRepositoryInterface";
import {SquirrelFortuneRanking} from "../../domain/squirrelFortuneRanking/squirrelFortuneRanking";

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
   * @return {(Promise<SquirrelFortuneRanking | undefined>)}
   * @memberof SquirrelFortuneRankingFirestoreRepository
   */
  async findByCreateDate(date: Date): Promise<SquirrelFortuneRanking | undefined> {
    const dateString = moment(date).format("YYYY-MM-DD");
    const rankingRef = this.database.collection("squirrelFortuneRankings").doc(dateString);

    const fortuneRanking = await rankingRef.get();
    if (!fortuneRanking.exists) {
      return;
    }

    const createDate: firestore.Timestamp | undefined = fortuneRanking.data()?.createDate;
    if (!createDate) {
      return;
    }

    const fortunesRef = rankingRef.collection("birthMonthFortunes");
    const fortunesSnapShot = await fortunesRef.get();

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
