import { BirthMonthProfile } from "@shiiyan/sukkirisu-function-core-domain";
import { should } from "chai";
import { BirthMonthProfileInMemoryRepository } from "../gateway/birthMonthProfileInMemoryRepository";
import { SaveBirthMonthProfile } from "./saveBirthMonthProfile";
should();

describe("SaveBirthMonthProfile", () => {
  it("should save given birth month profile", () => {
    const repository = new BirthMonthProfileInMemoryRepository();
    const useCase = new SaveBirthMonthProfile(repository);
    const birthMonthProfile: BirthMonthProfile = {
      name: "test",
      birthMonth: 12,
    };

    useCase.handle(birthMonthProfile);

    const saved = repository.findFirst();
    saved.should.be.a("object");
    saved.should.have.property("name").be.a("string");
    saved.should.have.property("name").equals("test");
    saved.should.have.property("birthMonth").be.a("number");
    saved.should.have.property("birthMonth").equals(12);
  });
});
