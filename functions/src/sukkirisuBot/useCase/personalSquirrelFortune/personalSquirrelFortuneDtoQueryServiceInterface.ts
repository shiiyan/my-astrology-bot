import {PersonalSquirrelFortuneDto} from "./personalSquirrelFortuneDto";

export interface PersonalSquirrelFortuneDtoQueryServiceInterface {
    fetchAllByDateWithLock(date: Date): Promise<PersonalSquirrelFortuneDto[]>;
}
