import {PersonalSquirrelFortuneDto} from "./personalSquirrelFortuneDto";

export interface PersonalSquirrelFortuneDtoQueryServiceInterface {
    fetchAllByDateWithLock(): Promise<PersonalSquirrelFortuneDto[]>;
}
