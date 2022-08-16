import { should } from "chai";
import { SquirrelFortuneRankingFactory } from "@shiiyan/sukkirisu-function-core-domain";
import { AnonymousSquirrelFortuneRankingSlackMessageBuilder }
  from "./anonymousSquirrelFortuneRankingSlackMessageBuilder";
should();

describe("AnonymousSquirrelFortuneRankingSlackMessageBuilder", () => {
  it("should render correct slack message given SquirrelFortuneRanking", () => {
    const squirrelFortuneRanking = SquirrelFortuneRankingFactory.build();
    const slackMessageBuilder = new AnonymousSquirrelFortuneRankingSlackMessageBuilder(squirrelFortuneRanking);
    const message = slackMessageBuilder.build();

    const expected = createExpectedMessage();
    message.should.deep.equal(expected);
  });
});

const createExpectedMessage = () => {
  return {
    "blocks": [
      {
        "text": {
          "emoji": true,
          "text": ":sparkles:スッキリす:sparkles::chipmunk:",
          "type": "plain_text",
        },
        "type": "header",
      },
      {
        "type": "divider",
      },
      {
        "fields": [
          {
            "text": "2位",
            "type": "mrkdwn",
          },
          {
            "text": "10月",
            "type": "mrkdwn",
          },
          {
            "text": "新しい刺激で心が弾みそうな週末に！",
            "type": "mrkdwn",
          },
          {
            "text": "ラッキーカラー\n青",
            "type": "mrkdwn",
          },
        ],
        "type": "section",
      },
      {
        "type": "divider",
      },
      {
        "fields": [
          {
            "text": "3位",
            "type": "mrkdwn",
          },
          {
            "text": "6月",
            "type": "mrkdwn",
          },
          {
            "text": "一発逆転！ラッキーがありそうな予感",
            "type": "mrkdwn",
          },
          {
            "text": "ラッキーカラー\nピンク",
            "type": "mrkdwn",
          },
        ],
        "type": "section",
      },
      {
        "type": "divider",
      },
      {
        "fields": [
          {
            "text": "4位",
            "type": "mrkdwn",
          },
          {
            "text": "3月",
            "type": "mrkdwn",
          },
          {
            "text": "行動すればするほど良い結果が出そう",
            "type": "mrkdwn",
          },
          {
            "text": "ラッキーカラー\n黄",
            "type": "mrkdwn",
          },
        ],
        "type": "section",
      },
      {
        "type": "divider",
      },
      {
        "fields": [
          {
            "text": "5位",
            "type": "mrkdwn",
          },
          {
            "text": "7月",
            "type": "mrkdwn",
          },
          {
            "text": "古き良き物に触れることで運気ＵＰ",
            "type": "mrkdwn",
          },
          {
            "text": "ラッキーカラー\nゴールド",
            "type": "mrkdwn",
          },
        ],
        "type": "section",
      },
      {
        "type": "divider",
      },
      {
        "fields": [
          {
            "text": "6位",
            "type": "mrkdwn",
          },
          {
            "text": "11月",
            "type": "mrkdwn",
          },
          {
            "text": "派手よりもナチュラルを大切にすると◎",
            "type": "mrkdwn",
          },
          {
            "text": "ラッキーカラー\n茶",
            "type": "mrkdwn",
          },
        ],
        "type": "section",
      },
      {
        "type": "divider",
      },
      {
        "text": {
          "emoji": true,
          "text": ":snowflake:まあまあスッキリす:snowflake::chipmunk:",
          "type": "plain_text",
        },
        "type": "header",
      },
      {
        "type": "divider",
      },
      {
        "fields": [
          {
            "text": "7位",
            "type": "mrkdwn",
          },
          {
            "text": "4月",
            "type": "mrkdwn",
          },
          {
            "text": "料理に迷ったら時短メニューがオススメ",
            "type": "mrkdwn",
          },
          {
            "text": "ラッキーカラー\n黒",
            "type": "mrkdwn",
          },
        ],
        "type": "section",
      },
      {
        "type": "divider",
      },
      {
        "fields": [
          {
            "text": "8位",
            "type": "mrkdwn",
          },
          {
            "text": "12月",
            "type": "mrkdwn",
          },
          {
            "text": "愛は言葉で分かりやすく相手に伝えよう",
            "type": "mrkdwn",
          },
          {
            "text": "ラッキーカラー\nシルバー",
            "type": "mrkdwn",
          },
        ],
        "type": "section",
      },
      {
        "type": "divider",
      },
      {
        "fields": [
          {
            "text": "9位",
            "type": "mrkdwn",
          },
          {
            "text": "9月",
            "type": "mrkdwn",
          },
          {
            "text": "自己中心的にならず相手を優先しよう",
            "type": "mrkdwn",
          },
          {
            "text": "ラッキーカラー\n白",
            "type": "mrkdwn",
          },
        ],
        "type": "section",
      },
      {
        "type": "divider",
      },
      {
        "fields": [
          {
            "text": "10位",
            "type": "mrkdwn",
          },
          {
            "text": "1月",
            "type": "mrkdwn",
          },
          {
            "text": "水回りをピカピカに掃除をすると吉",
            "type": "mrkdwn",
          },
          {
            "text": "ラッキーカラー\n紫",
            "type": "mrkdwn",
          },
        ],
        "type": "section",
      },
      {
        "type": "divider",
      },
      {
        "fields": [
          {
            "text": "11位",
            "type": "mrkdwn",
          },
          {
            "text": "2月",
            "type": "mrkdwn",
          },
          {
            "text": "予想外なことにも冷静に対処してミス防止",
            "type": "mrkdwn",
          },
          {
            "text": "ラッキーカラー\n赤",
            "type": "mrkdwn",
          },
        ],
        "type": "section",
      },
      {
        "type": "divider",
      },
      {
        "text": {
          "emoji": true,
          "text": ":cloud:がっかりす:cloud::chipmunk:",
          "type": "plain_text",
        },
        "type": "header",
      },
      {
        "type": "divider",
      },
      {
        "fields": [
          {
            "text": "12位",
            "type": "mrkdwn",
          },
          {
            "text": "5月",
            "type": "mrkdwn",
          },
          {
            "text": "体がなまり気味に…毎日の運動がパワーの源に！",
            "type": "mrkdwn",
          },
          {
            "text": "ラッキーカラー\n緑",
            "type": "mrkdwn",
          },
        ],
        "type": "section",
      },
      {
        "type": "divider",
      },
      {
        "text": {
          "emoji": true,
          "text": ":sunny:超スッキリす:sunny::chipmunk:",
          "type": "plain_text",
        },
        "type": "header",
      },
      {
        "type": "divider",
      },
      {
        "fields": [
          {
            "text": "1位",
            "type": "mrkdwn",
          },
          {
            "text": "8月",
            "type": "mrkdwn",
          },
          {
            "text": "マンネリから抜け出し新鮮な気分で興味のある事に挑戦しよう",
            "type": "mrkdwn",
          },
          {
            "text": "ラッキーカラー\nオレンジ",
            "type": "mrkdwn",
          },
        ],
        "type": "section",
      },
      {
        "type": "divider",
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "ソース： <https://www.ntv.co.jp/sukkiri/sukkirisu/index.html|誕生月占い スッキリす!>",
        },
      },
    ],
  };
};
