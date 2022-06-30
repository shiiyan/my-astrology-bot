import {firestore} from "firebase-admin";
import {AppMentionUseCaseInterface} from "./appMentionUseCaseInterface";
import {SaveBirthMonthProfile} from "./saveBirthMonthProfile";

export type CreateParam = {
    useCaseName: string,
    dependency: firestore.Firestore
}

/**
 * @export
 * @class UseCaseFactory
 */
export class UseCaseFactory {
  /**
   * @param {CreateParam} {useCaseName, dependency}
   * @return {AppMentionUseCaseInterface}
   * @memberof UseCaseFactory
   */
  public static create(
      {useCaseName, dependency}: CreateParam
  ): AppMentionUseCaseInterface {
    switch (useCaseName) {
      case "SaveBirthMonthProfile":
        return new SaveBirthMonthProfile(dependency);
      default:
        throw new Error("No use case to create");
    }
  }
}
