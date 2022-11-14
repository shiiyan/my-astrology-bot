import { SquirrelFortuneRanking } from "@shiiyan/sukkirisu-function-core-domain";
import { UseCaseType } from "./useCaseType";

export type AppMentionQueryResult = SquirrelFortuneRanking | undefined;

export interface AppMentionQueryUseCaseInterface {
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
    run(): Promise<AppMentionQueryResult>;
}
