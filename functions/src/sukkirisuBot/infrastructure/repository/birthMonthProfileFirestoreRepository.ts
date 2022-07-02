import {firestore} from "firebase-admin";
import {BirthMonthProfile} from "../../domain/birthMonthProfile";
import {BirthMonthProfileRepositoryInterface} from "../../domain/birthMonthProfileRepositoryInterface";

/**
 * @export
 * @class BirthMonthProfileFirestoreRepository
 * @implements {BirthMonthProfileRepositoryInterface}
 */
export class BirthMonthProfileFirestoreRepository implements BirthMonthProfileRepositoryInterface {
  private firestoreClient: firestore.Firestore;

  /**
   * Creates an instance of BirthMonthProfileFirestoreRepository.
   * @param {firestore.Firestore} firestoreClient
   * @memberof SaveBirthMonthProfile
   */
  constructor(
      firestoreClient: firestore.Firestore
  ) {
    this.firestoreClient = firestoreClient;
  }

  /**
   * Save birth month profile to firestore.
   *
   * @param {BirthMonthProfile} birthMonthProfile
   * @memberof BirthMonthProfileFirestoreRepository
   */
  async save(birthMonthProfile: BirthMonthProfile): Promise<void> {
    await this.firestoreClient.collection("birthMonthProfiles").add(
        birthMonthProfile
    );
  }
}
