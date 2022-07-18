import {firestore} from "firebase-admin";
import {PersonalSquirrelFortuneDto} from "../../useCase/personalSquirrelFortune/personalSquirrelFortuneDto";
import {PersonalSquirrelFortuneDtoQueryServiceInterface as QueryServiceInterface}
  from "../../useCase/personalSquirrelFortune/personalSquirrelFortuneDtoQueryServiceInterface";

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
   *
   *
   * // @return {Promise<PersonalSquirrelFortuneDto[]>}
   * @memberof PersonalSquirrelFortuneDtoFireStoreQueryService
   */
  async fetchAllByDateWithLock(): Promise<PersonalSquirrelFortuneDto[]> {
    throw new Error("Method not implemented.");
  }
}
