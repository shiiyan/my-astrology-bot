import {BirthMonthProfile} from "../domain/birthMonthProfile/birthMonthProfile";
import {UseCaseType} from "./useCaseType";

export type AppMentionUseCaseExecuteParam = BirthMonthProfile | undefined;

export interface AppMentionCommandUseCaseInterface {
    metaInfo: {
        type: UseCaseType;
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
