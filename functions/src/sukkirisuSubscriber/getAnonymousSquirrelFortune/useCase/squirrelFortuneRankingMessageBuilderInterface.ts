import { SquirrelFortuneRanking } from "@shiiyan/sukkirisu-function-core-domain";

export type MessageBlock = {
    blocks: object[]
};

export interface SquirrelFortuneRankingMessageBuilderInterface {
    build(queryResult: SquirrelFortuneRanking): MessageBlock
    buildFailure(failureMessage: string): MessageBlock
}
