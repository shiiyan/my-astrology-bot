import {PersonalSquirrelFortuneDto} from "../../useCase/personalSquirrelFortune/personalSquirrelFortuneDto";
import {PersonalSquirrelFortuneDtoQueryServiceInterface as QueryServiceInterface}
  from "../../useCase/personalSquirrelFortune/personalSquirrelFortuneDtoQueryServiceInterface";

type InMemoryDatum = {
    createDate: Date,
    personalSquirrelFortunes: PersonalSquirrelFortuneDto[]
};

/**
 * @export
 * @class PersonalSquirrelFortuneDtoInMemoryQueryService
 * @implements {QueryServiceInterface}
 */
export class PersonalSquirrelFortuneDtoInMemoryQueryService implements QueryServiceInterface {
  private data: InMemoryDatum[] = [];

  /**
   * Fetch all personal squirrel fortunes from this.data by date.
   *
   * @param {Date} date
   * @return {*} {Promise<PersonalSquirrelFortuneDto[] | undefined>}
   * @memberof PersonalSquirrelFortuneDtoInMemoryQueryService
   */
  fetchAllByDateWithLock(date: Date): Promise<PersonalSquirrelFortuneDto[] | undefined> {
    const found = this.data.find(
        (datum) => datum.createDate.getTime() === date.getTime()
    );

    return new Promise((resolve) => resolve(found?.personalSquirrelFortunes));
  }

  /**
   * Save personal squirrel fortunes to this.data with date for testing.
   *
   * @param {Date} date
   * @param {PersonalSquirrelFortuneDto[]} personalSquirrelFortunes
   * @memberof PersonalSquirrelFortuneDtoInMemoryQueryService
   */
  saveAll(date: Date, personalSquirrelFortunes: PersonalSquirrelFortuneDto[]): void {
    const datum = {
      createDate: date,
      personalSquirrelFortunes: personalSquirrelFortunes,
    };
    this.data.push(datum);
  }
}
