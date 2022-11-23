import { UseCaseType } from "./useCaseType";

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
    execute(): Promise<void>;
}
