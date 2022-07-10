import {SquirrelFortuneRanking} from "./squirrelFortuneRanking";

export interface SquirrelFortuneRankingRepositoryInterface {
    findByCreateDateWithLock(date: Date): Promise<SquirrelFortuneRanking | undefined>;
}
