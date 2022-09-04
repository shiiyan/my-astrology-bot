import { firestore } from "firebase-admin";

/**
 * @export
 * @class FirebaseFunctionsTestHelper
 */
export class FirebaseFunctionsTestHelper {
  private database: firestore.Firestore;

  /**
   * Creates an instance of FirebaseFunctionsTestHelper.
   * @param {firestore.Firestore} database
   * @memberof FirebaseFunctionsTestHelper
   */
  constructor(database: firestore.Firestore) {
    this.database = database;
  }

  /**
   * @param {string} collectionName
   * @memberof FirebaseFunctionsTestHelper
   */
  public async deleteTestCollection(collectionName: string) {
    const snapshot = await this.database.collection(collectionName).get();
    const batch = this.database.batch();
    snapshot.docs.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();
  }

  /**
   * @memberof FirebaseFunctionsTestHelper
   */
  public async deleteTestDocument(
      { collectionName, docPath }: {collectionName: string, docPath: string}
  ) {
    await this.database.collection(collectionName).doc(docPath).delete();
  }
}
