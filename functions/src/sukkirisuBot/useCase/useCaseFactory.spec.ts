import {should} from "chai";
import {firestore} from "firebase-admin";
import {stubInterface} from "ts-sinon";
import {InvalidArgumentError} from "../../shared/error/invalidArgumentError";
import {GetSquirrelFortuneRankingForToday} from "./getSquirrelFortuneRankingForToday/getSquirrelFortuneRankingForToday";
import {SaveBirthMonthProfile} from "./saveBirthMonthProfile/saveBirthMonthProfile";
import {UseCaseFactory} from "./useCaseFactory";
should();

describe("UseCaseFactory", () => {
  const stubFirestore = stubInterface<firestore.Firestore>();

  it("should create correct use case given use case name SaveBirthMonthProfile", () => {
    const created = UseCaseFactory.create({
      useCaseName: "SaveBirthMonthProfile",
      firestore: stubFirestore,
    });

    created.should.be.an.instanceOf(SaveBirthMonthProfile);
  });

  it("should create correct use case given use case name GetSquirrelFortuneRankingForToday", () => {
    const created = UseCaseFactory.create({
      useCaseName: "GetSquirrelFortuneRankingForToday",
      firestore: stubFirestore,
    });

    created.should.be.an.instanceOf(GetSquirrelFortuneRankingForToday);
  });

  it("should throw error when no use case to create", () => {
    const unknownUseCaseCreateParam = {
      useCaseName: "unknown",
      firestore: stubFirestore,
    };

    (() => UseCaseFactory.create(unknownUseCaseCreateParam)).should.throw(
        InvalidArgumentError, "No use case to create for given name unknown"
    );
  });
});
