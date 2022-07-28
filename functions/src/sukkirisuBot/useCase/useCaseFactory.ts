import { firestore } from "firebase-admin";
import { InvalidArgumentError } from "../../shared/error/invalidArgumentError";
import { BirthMonthProfileFirestoreRepository }
  from "../infrastructure/repository/birthMonthProfileFirestoreRepository";
import { SquirrelFortuneRankingFirestoreRepository }
  from "../infrastructure/repository/squirrelFortuneRankingFirestoreRepository";
import { AppMentionCommandUseCaseInterface } from "./appMentionCommandUseCaseInterface";
import { AppMentionQueryUseCaseInterface } from "./appMentionQueryUseCaseInterface";
import { GetSquirrelFortuneRankingForToday }
  from "./getSquirrelFortuneRankingForToday/getSquirrelFortuneRankingForToday";
import { SaveBirthMonthProfile } from "./saveBirthMonthProfile/saveBirthMonthProfile";

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
      default:
        throw new InvalidArgumentError(`No use case to create for given name ${useCaseName}`);
    }
  }
}
