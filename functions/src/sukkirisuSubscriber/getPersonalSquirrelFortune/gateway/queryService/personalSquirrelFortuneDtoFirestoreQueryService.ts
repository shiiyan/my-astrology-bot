import { firestore } from "firebase-admin";
import moment from "moment";
import { BirthMonthFortune, SquirrelFortuneRanking } from "@shiiyan/sukkirisu-function-core-domain";
import { PersonalSquirrelFortuneDto } from "../../useCase/personalSquirrelFortuneDto";
import { PersonalSquirrelFortuneDtoQueryServiceInterface as QueryServiceInterface }
  from "../../useCase/personalSquirrelFortuneDtoQueryServiceInterface";

/**
 * @export
 * @class PersonalSquirrelFortuneDtoFireStoreQueryService
 * @implements {PersonalSquirrelFortuneDtoQueryServiceInterface}
 */
export class PersonalSquirrelFortuneDtoFireStoreQueryService implements QueryServiceInterface {
  private database: firestore.Firestore;

  /**
   * Creates an instance of PersonalSquirrelFortuneDtoFireStoreQueryService.
   * @param {firestore.Firestore} database
   * @memberof PersonalSquirrelFortuneDtoFireStoreQueryService
   */
  constructor(
      database: firestore.Firestore
  ) {
    this.database = database;
  }

  /**
   * Fetch all personal squirrel fortune by date.
   *
   * @param {Date} date
   * @return {*} {Promise<PersonalSquirrelFortuneDto[]>}
   * @memberof PersonalSquirrelFortuneDtoFireStoreQueryService
   */
  async fetchAllByDate(date: Date): Promise<PersonalSquirrelFortuneDto[]> {
    const { fortunesSnapShot, birthMonthProfilesSnapShot } = await this.database.runTransaction(
        async (transaction) => {
          // get fortunes snap shot.
          const dateString = moment(date).format("YYYY-MM-DD");
          const fortunesRef = this.database
              .collection("squirrelFortuneRankings")
              .doc(dateString)
              .collection("birthMonthFortunes");
          const fortunesSnapShot = await transaction.get(fortunesRef);

          // get birth month profiles snap shot.
          const birthMonthProfilesRef = this.database
              .collection("birthMonthProfiles");
          const birthMonthProfilesSnapShot = await transaction.get(birthMonthProfilesRef);

          return { fortunesSnapShot, birthMonthProfilesSnapShot };
        });

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

    if (allMonthFortunes.length === 0) {
      return [];
    }

    const squirrelFortuneRanking = SquirrelFortuneRanking.reconstruct(date, allMonthFortunes);
    const personalSquirrelFortunes: PersonalSquirrelFortuneDto[] = [];
    birthMonthProfilesSnapShot.forEach((birthMonthProfile) => {
      const name = String(birthMonthProfile.data().name);
      const birthMonth = Number(birthMonthProfile.data().birthMonth);
      const singleMonthFortune = squirrelFortuneRanking.getFortuneByBirthMonth(birthMonth);
      const personalSquirrelFortune: PersonalSquirrelFortuneDto = {
        name: name,
        birthMonth: birthMonth,
        rank: singleMonthFortune.rank,
        comment: singleMonthFortune.comment,
      };

      personalSquirrelFortunes.push(personalSquirrelFortune);
    });


    return personalSquirrelFortunes;
  }
}
