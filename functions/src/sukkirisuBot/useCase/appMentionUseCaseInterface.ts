import {BirthMonthProfile} from "../domain/birthMonthProfile/birthMonthProfile";

export type AppMentionUseCaseExecuteParam = BirthMonthProfile

export interface AppMentionUseCaseInterface {
    metaInfo: {
        description: {
            english: string;
            japanese: string;
        };
        message: {
            success: string;
            failure: string;
        };
    };
    execute(param: AppMentionUseCaseExecuteParam): Promise<void>;
}
