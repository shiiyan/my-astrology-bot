import { PersonalSquirrelFortuneDtoQueryServiceInterface as QueryServiceInterface }
  from "../../../../sukkirisuBot/useCase/personalSquirrelFortune/personalSquirrelFortuneDtoQueryServiceInterface";
import { PersonalSquirrelFortuneDto } from "../../useCase/personalSquirrelFortuneDto";

type FortunesWithDate = {
    createDate: Date,
    personalSquirrelFortunes: PersonalSquirrelFortuneDto[]
};

/**
 * @export
 * @class PersonalSquirrelFortuneDtoInMemoryQueryService
 * @implements {QueryServiceInterface}
 */
export class PersonalSquirrelFortuneDtoInMemoryQueryService implements QueryServiceInterface {
  private data: FortunesWithDate[] = [];

  /**
   * Fetch all personal squirrel fortunes from this.data by date.
   *
   * @param {Date} date
   * @return {*} {Promise<PersonalSquirrelFortuneDto[] | undefined>}
   * @memberof PersonalSquirrelFortuneDtoInMemoryQueryService
   */
  fetchAllByDate(date: Date): Promise<PersonalSquirrelFortuneDto[]> {
    const found = this.data.find(
        (fortuneWithDate) => fortuneWithDate.createDate.getTime() === date.getTime()
    );

    return new Promise((resolve) => resolve(found?.personalSquirrelFortunes ?? []));
  }

  /**
   * Save personal squirrel fortunes to this.data with date for testing.
   *
   * @param {Date} date
   * @param {PersonalSquirrelFortuneDto[]} personalSquirrelFortunes
   * @memberof PersonalSquirrelFortuneDtoInMemoryQueryService
   */
  saveAll(date: Date, personalSquirrelFortunes: PersonalSquirrelFortuneDto[]): void {
    const fortuneWithDate = {
      createDate: date,
      personalSquirrelFortunes: personalSquirrelFortunes,
    };
    this.data.push(fortuneWithDate);
  }
}
