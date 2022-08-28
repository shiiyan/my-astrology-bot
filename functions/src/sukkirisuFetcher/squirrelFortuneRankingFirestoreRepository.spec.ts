// import * as firebaseAdmin from "firebase-admin";
// import chai from "chai";
// import chaiAsPromised from "chai-as-promised";
// import firebaseFunctionsTest from "firebase-functions-test";
// import { SquirrelFortuneRankingFirestoreRepository } from "./squirrelFortuneRankingFirestoreRepository";
// import { SquirrelFortuneRankingFactory } from "@shiiyan/sukkirisu-function-core-domain";
// chai.use(chaiAsPromised);
// chai.should();

// const pathToServiceAccountKey = "/Users/shiiyan/Secret/sukkirisu-test-firebase-adminsdk-v5pk5-69565861ee.json";
// const test = firebaseFunctionsTest({
//   projectId: "sukkirisu-test",
//   databaseURL: "https://sukkirisu-test.firebaseio.com",
// }, pathToServiceAccountKey);
// const firestore = firebaseAdmin.firestore();

// describe("squirrelFortuneRankingFirestoreRepository", () => {
//   after(() => {
//     test.cleanup();
//   });

//   it("should save when SquirrelFortuneRanking is provided", async () => {
//     const squirrelFortuneRanking = SquirrelFortuneRankingFactory.build();

//     const repository = new SquirrelFortuneRankingFirestoreRepository(firestore);
//     await repository.save(squirrelFortuneRanking);

//     // TODO: assert found result is same with generated squirrelFortuneRanking.

//     // await firestore.collection("indexes").doc(`/squirrelFortuneRanking/date/${dateString}`).delete();
//   });
// });
