import {should} from "chai";
import {BirthMonthProfile} from "../../domain/birthMonthProfile/birthMonthProfile";
import {BirthMonthProfileInMemoryRepository} from "../../infrastructure/repository/birthMonthProfileInMemoryRepository";
import {SaveBirthMonthProfile} from "./saveBirthMonthProfile";
should();


describe("SaveBirthMonthProfile", () => {
  it("should save given birth month profile", () => {
    const repository = new BirthMonthProfileInMemoryRepository();
    const useCase = new SaveBirthMonthProfile(repository);
    const birthMonthProfile: BirthMonthProfile = {
      name: "test",
      birthMonth: 12,
    };

    useCase.execute(birthMonthProfile);

    const saved = repository.findFirst();
    saved.should.be.a("object");
    saved.should.have.property("name").be.a("string");
    saved.should.have.property("name").equals("test");
    saved.should.have.property("birthMonth").be.a("number");
    saved.should.have.property("birthMonth").equals(12);
  });
});
