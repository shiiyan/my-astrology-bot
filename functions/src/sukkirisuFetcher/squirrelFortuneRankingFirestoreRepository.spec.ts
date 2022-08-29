import * as firebaseAdmin from "firebase-admin";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import firebaseFunctionsTest from "firebase-functions-test";
import { SquirrelFortuneRankingFirestoreRepository } from "./squirrelFortuneRankingFirestoreRepository";
import { SquirrelFortuneRanking, SquirrelFortuneRankingFactory } from "@shiiyan/sukkirisu-function-core-domain";
import moment from "moment";
chai.use(chaiAsPromised);
chai.should();

const pathToServiceAccountKey = "/Users/shiiyan/Secret/sukkirisu-test-firebase-adminsdk-v5pk5-69565861ee.json";
const test = firebaseFunctionsTest({
  projectId: "sukkirisu-test",
  databaseURL: "https://sukkirisu-test.firebaseio.com",
}, pathToServiceAccountKey);
const firestore = firebaseAdmin.firestore();

describe("squirrelFortuneRankingFirestoreRepository", () => {
  const squirrelFortuneRanking = SquirrelFortuneRankingFactory.build();
  const dateString = moment(squirrelFortuneRanking.getCreateDate()).format("YYYY-MM-DD");

  afterEach(() => {
    test.cleanup();
  });

  it("should save when SquirrelFortuneRanking is provided", async () => {
    const repository = new SquirrelFortuneRankingFirestoreRepository(firestore);
    await repository.save(squirrelFortuneRanking);

    const found = await repository.findByCreateDateWithLock(squirrelFortuneRanking.getCreateDate());

    found?.should.be.instanceOf(SquirrelFortuneRanking);
    found?.should.have.property("createDate");
    found?.should.have.property("createDate").be.instanceOf(Date);
    found?.should.have.property("birthMonthFortunes");
    found?.should.have.property("birthMonthFortunes").be.a("array");
    found?.should.have.property("birthMonthFortunes").to.have.lengthOf(12);
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach((month) => {
      found?.getAllMonthFortunes().should.deep.include(squirrelFortuneRanking.getFortuneByBirthMonth(month));
    });

    await Promise.all([
      removeSavedSquirrelFortuneRanking(dateString),
      removeIndex(dateString),
      removeLock(),
    ]);
  }).timeout(10000);
});

const removeSavedSquirrelFortuneRanking = async (dateString: string) => {
  const snapshot = await firestore.collection(`squirrelFortuneRankings/${dateString}/birthMonthFortunes`).get();
  const batch = firestore.batch();
  snapshot.docs.forEach((doc) => batch.delete(doc.ref));
  await batch.commit();
  await firestore.collection("squirrelFortuneRankings").doc(dateString).delete();
};

const removeIndex = async (dateString: string) => {
  await firestore.collection("indexes").doc(`/squirrelFortuneRanking/date/${dateString}`).delete();
};

const removeLock = async () => {
  const snapshot = await firestore.collection("squirrelFortuneRankingQueryLogs").get();
  const batch = firestore.batch();
  snapshot.docs.forEach((doc) => batch.delete(doc.ref));
  await batch.commit();
};
