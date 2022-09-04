/* eslint-disable no-invalid-this */
import * as firebaseAdmin from "firebase-admin";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { SquirrelFortuneRankingFirestoreRepository } from "./squirrelFortuneRankingFirestoreRepository";
import { SquirrelFortuneRanking, SquirrelFortuneRankingFactory } from "@shiiyan/sukkirisu-function-core-domain";
import { cleanup } from "../index.spec";
import moment from "moment";
import { FirebaseFunctionsTestHelper } from "../shared/firebaseFunctionsTestHelper";
chai.use(chaiAsPromised);
chai.should();

const firestore = firebaseAdmin.firestore();

describe("squirrelFortuneRankingFirestoreRepository", function() {
  (this as unknown as Mocha.Suite).timeout(10000);

  const squirrelFortuneRanking = SquirrelFortuneRankingFactory.build();
  const dateString = moment(squirrelFortuneRanking.getCreateDate()).format("YYYY-MM-DD");

  afterEach(async () => {
    cleanup();
    await Promise.all([
      removeSavedSquirrelFortuneRanking(dateString),
      removeIndex(dateString),
    ]);
  });

  it("should save when SquirrelFortuneRanking is provided", async () => {
    const repository = new SquirrelFortuneRankingFirestoreRepository(firestore);
    await repository.save(squirrelFortuneRanking);

    const found = await repository.findByCreateDate(squirrelFortuneRanking.getCreateDate());

    found?.should.be.instanceOf(SquirrelFortuneRanking);
    found?.should.have.property("createDate");
    found?.should.have.property("createDate").be.instanceOf(Date);
    found?.should.have.property("birthMonthFortunes");
    found?.should.have.property("birthMonthFortunes").be.a("array");
    found?.should.have.property("birthMonthFortunes").to.have.lengthOf(12);
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach((month) => {
      found?.getAllMonthFortunes().should.deep.include(squirrelFortuneRanking.getFortuneByBirthMonth(month));
    });
  });
});

const removeSavedSquirrelFortuneRanking = async (dateString: string) => {
  await (new FirebaseFunctionsTestHelper(firestore)).deleteTestCollection(
      `squirrelFortuneRankings/${dateString}/birthMonthFortunes`
  );
  await (new FirebaseFunctionsTestHelper(firestore)).deleteTestDocument({
    collectionName: "squirrelFortuneRankings",
    docPath: dateString,
  });
};

const removeIndex = async (dateString: string) => {
  await (new FirebaseFunctionsTestHelper(firestore)).deleteTestDocument({
    collectionName: "indexes",
    docPath: `/squirrelFortuneRanking/date/${dateString}`,
  });
};
