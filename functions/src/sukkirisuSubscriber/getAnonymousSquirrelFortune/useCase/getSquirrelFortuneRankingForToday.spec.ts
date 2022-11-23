import { should } from "chai";
import { BirthMonthFortune, SquirrelFortuneRankingFactory } from "@shiiyan/sukkirisu-function-core-domain";
import { GetSquirrelFortuneRankingForToday } from "./getSquirrelFortuneRankingForToday";
import { SquirrelFortuneRankingInMemoryRepository }
  from "../gateway/repository/squirrelFortuneRankingInMemoryRepository";
import { SquirrelFortuneRankingSlackMessageBuilder }
  from "../gateway/messageBuilder/squirrelFortuneRankingSlackMessageBuilder";
import { SquirrelFortuneRankingMessageBuilderInterface } from "./squirrelFortuneRankingMessageBuilderInterface";
should();

describe("GetSquirrelFortuneRankingForToday", () => {
  let repository: SquirrelFortuneRankingInMemoryRepository;
  let messageBuilder: SquirrelFortuneRankingMessageBuilderInterface;
  let useCase: GetSquirrelFortuneRankingForToday;

  beforeEach("prepare use case", () => {
    repository = new SquirrelFortuneRankingInMemoryRepository();
    messageBuilder = new SquirrelFortuneRankingSlackMessageBuilder();
    useCase = new GetSquirrelFortuneRankingForToday(repository, messageBuilder);
  });

  it("should get squirrel fortune ranking by date of today", async () => {
    const squirrelFortuneRanking = SquirrelFortuneRankingFactory.build(new Date(), createFortunes());
    repository.save(squirrelFortuneRanking);

    const result = await useCase.handle();

    result.should.be.a("object");
    result.should.deep.equal(makeExpectedMessageBlock());
  });

  it("should return failure message block when there is no fortune ranking for today", async () => {
    const squirrelFortuneRanking = SquirrelFortuneRankingFactory.build(new Date("2021-07-27"));
    repository.save(squirrelFortuneRanking);

    const result = await useCase.handle();

    const expected = {
      "blocks": [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "今日のスッキりすランキングを取得できませんでした。",
          },
        },
      ],
    };

    result.should.be.a("object");
    result.should.deep.equal(expected);
  });
});

const createFortunes = (): BirthMonthFortune[] => {
  return [
    { birthMonth: 8, rank: 1, comment: "マンネリから抜け出し新鮮な気分で興味のある事に挑戦しよう", luckyColor: "オレンジ" },
    { birthMonth: 10, rank: 2, comment: "新しい刺激で心が弾みそうな週末に！", luckyColor: "青" },
    { birthMonth: 6, rank: 3, comment: "一発逆転！ラッキーがありそうな予感", luckyColor: "ピンク" },
    { birthMonth: 3, rank: 4, comment: "行動すればするほど良い結果が出そう", luckyColor: "黄" },
    { birthMonth: 7, rank: 5, comment: "古き良き物に触れることで運気ＵＰ", luckyColor: "ゴールド" },
    { birthMonth: 11, rank: 6, comment: "派手よりもナチュラルを大切にすると◎", luckyColor: "茶" },
    { birthMonth: 4, rank: 7, comment: "料理に迷ったら時短メニューがオススメ", luckyColor: "黒" },
    { birthMonth: 12, rank: 8, comment: "愛は言葉で分かりやすく相手に伝えよう", luckyColor: "シルバー" },
    { birthMonth: 9, rank: 9, comment: "自己中心的にならず相手を優先しよう", luckyColor: "白" },
    { birthMonth: 1, rank: 10, comment: "水回りをピカピカに掃除をすると吉", luckyColor: "紫" },
    { birthMonth: 2, rank: 11, comment: "予想外なことにも冷静に対処してミス防止", luckyColor: "赤" },
    { birthMonth: 5, rank: 12, comment: "体がなまり気味に…毎日の運動がパワーの源に！", luckyColor: "緑" },
  ];
};

const makeExpectedMessageBlock = (): object=> {
  return {
    "blocks": [
      {
        "text": {
          "emoji": true,
          "text": ":sparkles:スッキりす:sparkles::chipmunk:",
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
          "text": ":snowflake:まあまあスッキりす:snowflake::chipmunk:",
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
          "text": ":sunny:超スッキりす:sunny::chipmunk:",
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
          "text": "ソース： <https://www.ntv.co.jp/sukkiri/sukkirisu/index.html|誕生月占い スッキりす!>",
        },
      },
    ],
  };
};
