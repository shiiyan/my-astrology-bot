import { BirthMonthFortune, SquirrelFortuneRanking } from "@shiiyan/sukkirisu-function-core-domain";
import { MessageBlock, SquirrelFortuneRankingMessageBuilderInterface }
  from "../../useCase/squirrelFortuneRankingMessageBuilderInterface";

/**
 * Build rich slack message for squirrel fortune ranking using same format as slack block kit.
 *
 * @link https://api.slack.com/block-kit
 * @export
 * @class SquirrelFortuneRankingSlackMessageBuilder
 */
export class SquirrelFortuneRankingSlackMessageBuilder implements SquirrelFortuneRankingMessageBuilderInterface {
  private readonly upperRankHeader = {
    "type": "header",
    "text": {
      "type": "plain_text",
      "text": ":sparkles:スッキりす:sparkles::chipmunk:",
      "emoji": true,
    },
  };

  private readonly lowerRankHeader = {
    "type": "header",
    "text": {
      "type": "plain_text",
      "text": ":snowflake:まあまあスッキりす:snowflake::chipmunk:",
      "emoji": true,
    },
  };

  private readonly lastRankHeader = {
    "type": "header",
    "text": {
      "type": "plain_text",
      "text": ":cloud:がっかりす:cloud::chipmunk:",
      "emoji": true,
    },
  };

  private readonly firstRankHeader = {
    "type": "header",
    "text": {
      "type": "plain_text",
      "text": ":sunny:超スッキりす:sunny::chipmunk:",
      "emoji": true,
    },
  };

  private readonly dividerSection = {
    "type": "divider",
  };

  private readonly footer = {
    type: "section",
    text: {
      type: "mrkdwn",
      text: "ソース： <https://www.ntv.co.jp/sukkiri/sukkirisu/index.html|誕生月占い スッキりす!>",
    },
  };

  private readonly upperRanks = [2, 3, 4, 5, 6];
  private readonly lowerRanks = [7, 8, 9, 10, 11];
  private readonly firstRank = [1];
  private readonly lastRank = [12];


  /**
   * @param {SquirrelFortuneRanking} squirrelFortuneRanking
   * @return {*}  {object}
   * @memberof SquirrelFortuneRankingSlackMessageBuilder
   */
  public build(squirrelFortuneRanking :SquirrelFortuneRanking): MessageBlock {
    const blocks: object[] = [];

    this.addMessageSectionsToBlocks(
        squirrelFortuneRanking,
        blocks,
        this.upperRankHeader,
        this.upperRanks,
    );
    this.addMessageSectionsToBlocks(
        squirrelFortuneRanking,
        blocks,
        this.lowerRankHeader,
        this.lowerRanks,
    );
    this.addMessageSectionsToBlocks(
        squirrelFortuneRanking,
        blocks,
        this.lastRankHeader,
        this.lastRank,
    );
    this.addMessageSectionsToBlocks(
        squirrelFortuneRanking,
        blocks,
        this.firstRankHeader,
        this.firstRank,
    );
    this.addFooterSectionToBlocks(
        blocks,
        this.footer
    );

    return {
      "blocks": blocks,
    };
  }

  /**
   * @param {string} failureMessage
   * @return {*}  {MessageBlock}
   * @memberof SquirrelFortuneRankingSlackMessageBuilder
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
   * @private
   * @param {SquirrelFortuneRanking} squirrelFortuneRanking
   * @param {object[]} blocks
   * @param {object} header
   * @param {number[]} ranks
   * @memberof SquirrelFortuneRankingSlackMessageBuilder
   */
  private addMessageSectionsToBlocks(
      squirrelFortuneRanking: SquirrelFortuneRanking,
      blocks: object[],
      header: object,
      ranks: number[],
  ) {
    blocks.push(header);
    blocks.push(this.dividerSection);
    ranks.forEach((rank) => {
      const fortune = squirrelFortuneRanking.getFortuneByRank(rank);
      const messageSection = this.createMessageSection(fortune);
      blocks.push(messageSection);
      blocks.push(this.dividerSection);
    });
  }

  /**
   * Create message seciton for single month fortune.
   *
   * @private
   * @param {BirthMonthFortune} fortune
   * @return {*} {object}
   * @memberof SquirrelFortuneRankingSlackMessageBuilder
   */
  private createMessageSection(fortune: BirthMonthFortune): object {
    return {
      "type": "section",
      "fields": [
        {
          "type": "mrkdwn",
          "text": `${fortune.rank}位`,
        },
        {
          "type": "mrkdwn",
          "text": `${fortune.birthMonth}月`,
        },
        {
          "type": "mrkdwn",
          "text": fortune.comment,
        },
        {
          "type": "mrkdwn",
          "text": `ラッキーカラー\n${fortune.luckyColor}`,
        },
      ],
    };
  }

  /**
   * Add footer section to blocks.
   *
   * @private
   * @param {object[]} blocks
   * @param {object} footer
   * @memberof AnonymousSquirrelFortuneRankingSlackMessageBuilder
   */
  private addFooterSectionToBlocks(
      blocks: object[],
      footer: object) {
    blocks.push(footer);
  }
}
