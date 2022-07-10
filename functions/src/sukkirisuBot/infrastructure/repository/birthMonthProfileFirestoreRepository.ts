import {firestore} from "firebase-admin";
import {BirthMonthProfile} from "../../domain/birthMonthProfile/birthMonthProfile";
import {BirthMonthProfileRepositoryInterface} from "../../domain/birthMonthProfile/entityRepositoryInterface";

/**
 * @export
 * @class BirthMonthProfileFirestoreRepository
 * @implements {BirthMonthProfileRepositoryInterface}
 */
export class BirthMonthProfileFirestoreRepository implements BirthMonthProfileRepositoryInterface {
  private database: firestore.Firestore;

  /**
   * Creates an instance of BirthMonthProfileFirestoreRepository.
   * @param {firestore.Firestore} database
   * @memberof BirthMonthProfileFirestoreRepository
   */
  constructor(
      database: firestore.Firestore
  ) {
    this.database = database;
  }

  /**
   * Save birth month profile to firestore with unique name.
   * Batched write is used to ensure name is unique.
   * @link https://stackoverflow.com/a/59892127
   *
   * @param {BirthMonthProfile} birthMonthProfile
   * @memberof BirthMonthProfileFirestoreRepository
   */
  async save(birthMonthProfile: BirthMonthProfile): Promise<void> {
    const batch = this.database.batch();

    const birthMonthDocRef = this.database.collection("birthMonthProfiles").doc();
    batch.create(birthMonthDocRef, birthMonthProfile);

    const indexDocRef = this.database.collection("indexes")
        .doc(`/birthMonthProfiles/name/${birthMonthProfile.name}`);
    batch.create(indexDocRef, {value: birthMonthDocRef.id});

    await batch.commit();
  }
}
