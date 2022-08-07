import { firestore } from "firebase-admin";
import { InvalidArgumentError } from "@shiiyan/sukkirisu-function-error";
import { BirthMonthProfileFirestoreRepository }
  from "../infrastructure/repository/birthMonthProfileFirestoreRepository";
import { SquirrelFortuneRankingFirestoreRepository }
  from "../infrastructure/repository/squirrelFortuneRankingFirestoreRepository";
import { AppMentionCommandUseCaseInterface } from "./appMentionCommandUseCaseInterface";
import { AppMentionQueryUseCaseInterface } from "./appMentionQueryUseCaseInterface";
import { GetSquirrelFortuneRankingForToday }
  from "./getSquirrelFortuneRankingForToday/getSquirrelFortuneRankingForToday";
import { SaveBirthMonthProfile } from "./saveBirthMonthProfile/saveBirthMonthProfile";
import { GetAllPersonalSquirrelFortuneForToday } from "./personalSquirrelFortune/getAllPersonalSquirrelFortuneForToday";
import { PersonalSquirrelFortuneDtoFireStoreQueryService }
  from "../infrastructure/queryService/personalSquirrelFortuneDtoFirestoreQueryService";

export type CreateParam = {
    useCaseName: string,
    firestore: firestore.Firestore
}

/**
 * @export
 * @class UseCaseFactory
 */
export class UseCaseFactory {
  /**
   * @param {CreateParam} {useCaseName, firestore}
   * @return {*} {AppMentionUseCaseInterface}
   * @memberof UseCaseFactory
   */
  public static create(
      { useCaseName, firestore }: CreateParam
  ): AppMentionQueryUseCaseInterface | AppMentionCommandUseCaseInterface {
    switch (useCaseName) {
      case "SaveBirthMonthProfile":
        return new SaveBirthMonthProfile(
            new BirthMonthProfileFirestoreRepository(firestore)
        );
      case "GetSquirrelFortuneRankingForToday":
        return new GetSquirrelFortuneRankingForToday(
            new SquirrelFortuneRankingFirestoreRepository(firestore)
        );
      case "GetAllPersonalSquirrelFortuneForToday":
        return new GetAllPersonalSquirrelFortuneForToday(
            new PersonalSquirrelFortuneDtoFireStoreQueryService(firestore)
        );
      default:
        throw new InvalidArgumentError(`No use case to create for given name ${useCaseName}`);
    }
  }
}
