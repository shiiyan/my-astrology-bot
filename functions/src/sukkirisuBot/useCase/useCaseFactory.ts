import {firestore} from "firebase-admin";
import {BirthMonthProfileFirestoreRepository} from "../infrastructure/repository/birthMonthProfileFirestoreRepository";
import {AppMentionCommandUseCaseInterface} from "./appMentionCommandUseCaseInterface";
import {AppMentionQueryUseCaseInterface} from "./appMentionQueryUseCaseInterface";
import {SaveBirthMonthProfile} from "./appMentionUseCaseImplementation/saveBirthMonthProfile";

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
   * @return {AppMentionUseCaseInterface}
   * @memberof UseCaseFactory
   */
  public static create(
      {useCaseName, firestore}: CreateParam
  ): AppMentionQueryUseCaseInterface | AppMentionCommandUseCaseInterface {
    switch (useCaseName) {
      case "SaveBirthMonthProfile":
        return new SaveBirthMonthProfile(
            new BirthMonthProfileFirestoreRepository(firestore)
        );
      default:
        throw new Error("No use case to create");
    }
  }
}
