import {BirthMonthProfile} from "../domain/birthMonthProfile";

export type AppMentionUseCaseExecuteParam = BirthMonthProfile

export interface AppMentionUseCaseInterface {
    description: {
        english: string,
        japanese: string
    };
    execute(param: AppMentionUseCaseExecuteParam): Promise<void>;
}
