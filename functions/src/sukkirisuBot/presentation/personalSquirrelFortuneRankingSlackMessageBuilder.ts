import { PersonalSquirrelFortuneDto } from "../useCase/personalSquirrelFortune/personalSquirrelFortuneDto";
import { SlackMessageBuilderInterface } from "./slackMessageBuilderInterface";

type FortuneRankingBlock = { type: string; text: { type: string; text: string; }; };


/**
 * Build rich slack message for squirrel fortune ranking using same format as slack block kit.
 *
 * @link https://api.slack.com/block-kit
 * @export
 * @class PersonalSquirrelFortuneRankingSlackMessageBuilder
 * @implements {SlackMessageBuilderInterface}
 */
export class PersonalSquirrelFortuneRankingSlackMessageBuilder implements SlackMessageBuilderInterface {
  private readonly personalSquirrelFortunes: PersonalSquirrelFortuneDto[];

  /**
   * Creates an instance of PersonalSquirrelFortuneRankingSlackMessageBuilder.
   * @param {PersonalSquirrelFortuneDto[]} personalSquirrelFortunes
   * @memberof PersonalSquirrelFortuneRankingSlackMessageBuilder
   */
  constructor(personalSquirrelFortunes: PersonalSquirrelFortuneDto[]) {
    this.personalSquirrelFortunes = personalSquirrelFortunes;
  }

  /**
   * Build message for squirrel fortune ranking.
   *
   * @return {*}  {object}
   * @memberof PersonalSquirrelFortuneRankingSlackMessageBuilder
   */
  build(): object {
    return {
      blocks: [
        this.createHeaderBlock(),
        this.createDivider(),
        ...this.createFortuneRankingBlocks(),
        this.createDivider(),
        this.createFooterBlock(),
      ],
    };
  }

  /**
   * @return {*}  {object}
   * @memberof PersonalSquirrelFortuneRankingSlackMessageBuilder
   */
  createHeaderBlock(): object {
    return {
      type: "header",
      text: {
        emoji: true,
        text: "今日の個人スッキリすランキング:chipmunk:",
        type: "plain_text",
      },
    };
  }

  /**
   * @return {*}  {object}
   * @memberof PersonalSquirrelFortuneRankingSlackMessageBuilder
   */
  createDivider(): object {
    return {
      type: "divider",
    };
  }

  /**
   * @return {*}  {array}
   * @memberof PersonalSquirrelFortuneRankingSlackMessageBuilder
   */
  createFortuneRankingBlocks() {
    const fortunesGroupByRank: Map<number, PersonalSquirrelFortuneDto[]> = this.personalSquirrelFortunes.reduce(
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
  createFooterBlock(): object {
    return {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "ソース： <https://www.ntv.co.jp/sukkiri/sukkirisu/index.html|誕生月占い スッキりす!>",
      },
    };
  }
}
