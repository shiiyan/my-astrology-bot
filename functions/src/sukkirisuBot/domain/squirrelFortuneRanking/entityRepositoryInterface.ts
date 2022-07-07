import {SquirrelFortuneRanking} from "./squirrelFortuneRanking";

export interface SquirrelFortuneRankingRepositoryInterface {
    findByCreateDate(date: Date): Promise<SquirrelFortuneRanking | undefined>;
}
