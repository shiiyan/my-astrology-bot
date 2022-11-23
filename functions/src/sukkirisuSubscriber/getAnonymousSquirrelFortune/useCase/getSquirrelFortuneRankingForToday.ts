import { SquirrelFortuneRankingRepositoryInterface } from "@shiiyan/sukkirisu-function-core-domain";
import { MessageBlock, SquirrelFortuneRankingMessageBuilderInterface }
  from "./squirrelFortuneRankingMessageBuilderInterface";

/**
 * Get squirrel fortune ranking by date of today.
 *
 * @export
 * @class GetSquirrelFortuneRankingForToday
 * @implements {AppMentionUseCaseInterface}
 */
export class GetSquirrelFortuneRankingForToday {
  private repository: SquirrelFortuneRankingRepositoryInterface;
  private messageBuilder: SquirrelFortuneRankingMessageBuilderInterface;

  public metaInfo = {
    description: {
      english: "get squirrel fortune ranking",
      japanese: "今日のスッキりすランキングを取得",
    },
    message: {
      success: "今日のスッキりすランキングを取得しました。",
      failure: "今日のスッキりすランキングを取得できませんでした。",
    },
  };

  /**
   * Creates an instance of GetSquirrelFortuneRankingForToday.
   * @param {SquirrelFortuneRankingRepositoryInterface} repository
   * @param {SquirrelFortuneRankingMessageBuilderInterface} messageBuilder
   * @memberof GetSquirrelFortuneRankingForToday
   */
  constructor(
      repository: SquirrelFortuneRankingRepositoryInterface,
      messageBuilder: SquirrelFortuneRankingMessageBuilderInterface
  ) {
    this.repository = repository;
    this.messageBuilder = messageBuilder;
  }

  /**
   * Run get squirrel fortune ranking by date of today query use case.
   *
   * @return {*} {Promise<MessageBlock>}
   * @memberof GetSquirrelFortuneRankingForToday
   */
  async handle(): Promise<MessageBlock> {
    const now = new Date();
    const found = await this.repository.findByCreateDate(now);

    return found ?
    this.messageBuilder.build(found) :
    this.messageBuilder.buildFailure(this.metaInfo.message.failure);
  }
}
