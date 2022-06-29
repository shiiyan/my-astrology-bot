import {firestore} from "firebase-admin";

export declare type BirthMonthProfile = {
  name: string,
  birthMonth: number
}

/**
 * Class usecase for saving birth month.
 */
export default class SaveBirthMonthProfile {
  private firestoreClient: firestore.Firestore;
  public description = {
    english: "saving birth month profile",
    japanese: "誕生月情報を保存する",
  };

  /**
 * Creates an instance of SaveBirthMonthProfile.
 * @param {firestore.Firestore} firestoreClient
 * @memberof SaveBirthMonthProfile
 */
  constructor(
      firestoreClient: firestore.Firestore
  ) {
    this.firestoreClient = firestoreClient;
  }


  /**
   * @param {BirthMonthProfile} {name, birthMonth}
   * @return {*}  {Promise<void>}
   * @memberof SaveBirthMonthProfile
   */
  public async execute({name, birthMonth}: BirthMonthProfile): Promise<void> {
    await this.firestoreClient.collection("birthMonthProfiles").add(
        {name, birthMonth}
    );
  }
}
