import {BirthMonthProfile} from "../domain/birthMonthProfile/birthMonthProfile";

export type AppMentionUseCaseExecuteParam = BirthMonthProfile

export interface AppMentionUseCaseInterface {
    description: {
        english: string,
        japanese: string
    };
    execute(param: AppMentionUseCaseExecuteParam): Promise<void>;
}
