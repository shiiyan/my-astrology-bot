import { PersonalSquirrelFortuneDto } from "../../useCase/personalSquirrelFortuneDto";
import { MessageBlock, personalSquirrelFortuneMessageBuilderInterface as MessageBuilderInterface }
  from "../../useCase/personalSquirrelFortuneMessageBuilderInterface";

type FortuneRankingBlock = { type: string; text: { type: string; text: string; }; };


/**
 * Build rich slack message for squirrel fortune ranking using same format as slack block kit.
 *
 * @link https://api.slack.com/block-kit
 * @export
 * @class PersonalSquirrelFortuneRankingSlackMessageBuilder
 * @implements {SlackMessageBuilderInterface}
 */
export class PersonalSquirrelFortuneRankingSlackMessageBuilder implements MessageBuilderInterface {
  /**
   * @param {PersonalSquirrelFortuneDto[]} personalSquirrelFortunes
   * @return {*}  {MessageBlock}
   * @memberof PersonalSquirrelFortuneRankingSlackMessageBuilder
   */
  build(personalSquirrelFortunes: PersonalSquirrelFortuneDto[]): MessageBlock {
    return {
      blocks: [
        this.createHeaderBlock(),
        this.createDivider(),
        ...this.createFortuneRankingBlocks(personalSquirrelFortunes),
        this.createDivider(),
        this.createFooterBlock(),
      ],
    };
  }

  /**
   * Build Failure message for squirrel fortune ranking.
   *
   * @param {string} failureMessage
   * @return {*}  {MessageBlock}
   * @memberof PersonalSquirrelFortuneRankingSlackMessageBuilder
   */
  buildFailure(failureMessage: string): MessageBlock {
    return {
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": failureMessage,
          },
        },
      ],
    };
  }


  /**
   * @return {*}  {object}
   * @memberof PersonalSquirrelFortuneRankingSlackMessageBuilder
   */
  private createHeaderBlock(): object {
    return {
      type: "header",
      text: {
        emoji: true,
        text: "今日の個人スッキりすランキング:chipmunk:",
        type: "plain_text",
      },
    };
  }

  /**
   * @return {*}  {object}
   * @memberof PersonalSquirrelFortuneRankingSlackMessageBuilder
   */
  private createDivider(): object {
    return {
      type: "divider",
    };
  }

  /**
   * @private
   * @param {PersonalSquirrelFortuneDto[]} personalSquirrelFortunes
   * @return {*}  {object[]}
   * @memberof PersonalSquirrelFortuneRankingSlackMessageBuilder
   */
  private createFortuneRankingBlocks(personalSquirrelFortunes: PersonalSquirrelFortuneDto[]): object[] {
    const fortunesSorted: PersonalSquirrelFortuneDto[] = personalSquirrelFortunes.sort(
        (one, another) => one.rank - another.rank
    );

    const fortunesGroupByRank: Map<number, PersonalSquirrelFortuneDto[]> = fortunesSorted.reduce(
        (groupMap, fortune) => groupMap.set(
            fortune.rank,
            [...(groupMap.get(fortune.rank) || []), fortune]
        ),
        new Map()
    );

    const fortuneRankingBlocks: FortuneRankingBlock[] = [];

    fortunesGroupByRank.forEach((fortunes, rank) => {
      const joinedNames = fortunes.map((fortune) => fortune.name).join();

      const message = `*${rank}位* ${joinedNames} ${fortunes[0].comment}`;
      fortuneRankingBlocks.push({
        type: "section",
        text: {
          type: "mrkdwn",
          text: message,
        },
      });
    });

    return fortuneRankingBlocks;
  }

  /**
   * @return {*}  {object}
   * @memberof PersonalSquirrelFortuneRankingSlackMessageBuilder
   */
  private createFooterBlock(): object {
    return {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "ソース： <https://www.ntv.co.jp/sukkiri/sukkirisu/index.html|誕生月占い スッキりす!>",
      },
    };
  }
}
