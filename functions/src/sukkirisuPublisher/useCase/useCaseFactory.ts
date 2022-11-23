import { firestore } from "firebase-admin";
import { InvalidArgumentError } from "@shiiyan/sukkirisu-function-error";
import { SquirrelFortuneRankingFirestoreRepository }
  from "../infrastructure/repository/squirrelFortuneRankingFirestoreRepository";
import { AppMentionQueryUseCaseInterface } from "./appMentionQueryUseCaseInterface";
import { GetSquirrelFortuneRankingForToday }
  from "./getSquirrelFortuneRankingForToday/getSquirrelFortuneRankingForToday";

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
  ): AppMentionQueryUseCaseInterface {
    switch (useCaseName) {
      case "GetSquirrelFortuneRankingForToday":
        return new GetSquirrelFortuneRankingForToday(
            new SquirrelFortuneRankingFirestoreRepository(firestore)
        );
      default:
        throw new InvalidArgumentError(`No use case to create for given name ${useCaseName}`);
    }
  }
}
