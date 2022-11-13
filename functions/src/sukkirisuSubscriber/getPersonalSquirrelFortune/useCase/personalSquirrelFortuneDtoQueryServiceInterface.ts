import { PersonalSquirrelFortuneDto } from "./personalSquirrelFortuneDto";

export interface PersonalSquirrelFortuneDtoQueryServiceInterface {
    fetchAllByDate(date: Date): Promise<PersonalSquirrelFortuneDto[] | undefined>;
}
