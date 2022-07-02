import {BirthMonthProfile} from "./birthMonthProfile";

export interface BirthMonthProfileRepositoryInterface {
    save(birthMonthProfile: BirthMonthProfile): Promise<void>;
}
