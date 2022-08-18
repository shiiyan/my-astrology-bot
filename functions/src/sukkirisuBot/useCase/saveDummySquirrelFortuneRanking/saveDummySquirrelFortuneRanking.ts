import {
  SquirrelFortuneRankingRepositoryInterface,
  SquirrelFortuneRankingFactory,
} from "@shiiyan/sukkirisu-function-core-domain";
import { AppMentionCommandUseCaseInterface } from "../appMentionCommandUseCaseInterface";
import { UseCaseType } from "../useCaseType";


/**
 * Usecase for saving dummy squirrel fortune ranking, mainly for testing.
 *
 * @export
 * @class SaveDummySquirrelFortuneRanking
 * @implements {AppMentionCommandUseCaseInterface}
 */
export class SaveDummySquirrelFortuneRanking implements AppMentionCommandUseCaseInterface {
  private repository: SquirrelFortuneRankingRepositoryInterface;

  public metaInfo = {
    type: UseCaseType.Command,
    description: {
      english: "saving dummy squirrel fortune ranking",
      japanese: "仮のスッキりすランキングを保存",
    },
    message: {
      success: "仮のスッキりすランキングを保存しました。",
      failure: "仮のスッキりすランキングを保存できませんでした。",
    },
  };

  /**
   * Creates an instance of SaveDummySquirrelFortuneRanking.
   * @param {SquirrelFortuneRankingRepositoryInterface} repository
   * @memberof SaveDummySquirrelFortuneRanking
   */
  constructor(repository: SquirrelFortuneRankingRepositoryInterface) {
    this.repository = repository;
  }

  /**
   * @return {*}  {Promise<void>}
   * @memberof SaveDummySquirrelFortuneRanking
   */
  public async execute(): Promise<void> {
    const dummy = SquirrelFortuneRankingFactory.build();
    await this.repository.save(dummy);
  }
}
