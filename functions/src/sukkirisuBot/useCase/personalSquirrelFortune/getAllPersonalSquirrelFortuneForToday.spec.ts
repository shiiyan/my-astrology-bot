import { should } from "chai";
import { PersonalSquirrelFortuneDtoInMemoryQueryService }
  from "../../infrastructure/queryService/personalSquirrelFortuneDtoInMemoryQueryService";
import { GetAllPersonalSquirrelFortuneForToday } from "./getAllPersonalSquirrelFortuneForToday";
import { PersonalSquirrelFortuneDto } from "./personalSquirrelFortuneDto";
should();

describe("GetAllPersonalSquirrelFortuneForToday", () => {
  let queryService: PersonalSquirrelFortuneDtoInMemoryQueryService;
  let useCase: GetAllPersonalSquirrelFortuneForToday;

  beforeEach("prepare use case", () => {
    queryService = new PersonalSquirrelFortuneDtoInMemoryQueryService();
    useCase = new GetAllPersonalSquirrelFortuneForToday(queryService);
  });

  it("should get all personal squirrel fortune by date of today", async () => {
    const personalFortunes = createPersonalFortunes();
    queryService.saveAll(new Date(), personalFortunes);

    const result = await useCase.run();

    result?.should.be.a("array");
    result?.should.have.members(personalFortunes);
  });

  it("should return undefined when there is no fortunes for today", async () => {
    const personalFortunes = createPersonalFortunes();
    queryService.saveAll(new Date("2021-07-27"), personalFortunes);

    const result = await useCase.run();

    (typeof result).should.equal("undefined");
  });
});

const createPersonalFortunes = (): PersonalSquirrelFortuneDto[] => {
  return [
    {
      birthMonth: 1,
      name: "one",
      rank: 1,
      comment: "number one",
    },
    {
      birthMonth: 2,
      name: "two",
      rank: 2,
      comment: "number two",
    },
    {
      birthMonth: 3,
      name: "three",
      rank: 3,
      comment: "number three",
    },
  ];
};
