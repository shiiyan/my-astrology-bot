import { should } from "chai";
import { SquirrelFortuneRanking } from "../domain/squirrelFortuneRanking/squirrelFortuneRanking";
import { AnonymousSquirrelFortuneRankingSlackMessageBuilder }
  from "./anonymousSquirrelFortuneRankingSlackMessageBuilder";
should();

describe("AnonymousSquirrelFortuneRankingSlackMessageBuilder", () => {
  it("should render correct slack message given SquirrelFortuneRanking", () => {
    const squirrelFortuneRanking = createSquirrelFortuneRanking();
    const slackMessageBuilder = new AnonymousSquirrelFortuneRankingSlackMessageBuilder(squirrelFortuneRanking);
    const message = slackMessageBuilder.build();

    message.should.have.property("blocks").be.a("array");
    const expected = createExpectedMessage();
    message.should.have.property("blocks").that.have.deep.members(expected);
  });
});

const createSquirrelFortuneRanking = () => {
  const allMonthFortunes = [
    { birthMonth: 1, rank: 1, comment: "", luckyColor: "" },
    { birthMonth: 2, rank: 2, comment: "", luckyColor: "" },
    { birthMonth: 3, rank: 3, comment: "", luckyColor: "" },
    { birthMonth: 4, rank: 4, comment: "", luckyColor: "" },
    { birthMonth: 5, rank: 5, comment: "", luckyColor: "" },
    { birthMonth: 6, rank: 6, comment: "", luckyColor: "" },
    { birthMonth: 7, rank: 7, comment: "", luckyColor: "" },
    { birthMonth: 8, rank: 8, comment: "", luckyColor: "" },
    { birthMonth: 9, rank: 9, comment: "", luckyColor: "" },
    { birthMonth: 10, rank: 10, comment: "", luckyColor: "" },
    { birthMonth: 11, rank: 11, comment: "", luckyColor: "" },
    { birthMonth: 12, rank: 12, comment: "", luckyColor: "" },
  ];
  return SquirrelFortuneRanking.create(allMonthFortunes);
};

const createExpectedMessage = () => {
  return [
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
          "text": "2月",
          "type": "mrkdwn",
        },
        {
          "text": "",
          "type": "mrkdwn",
        },
        {
          "text": "ラッキーカラー\n",
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
          "text": "3月",
          "type": "mrkdwn",
        },
        {
          "text": "",
          "type": "mrkdwn",
        },
        {
          "text": "ラッキーカラー\n",
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
          "text": "4月",
          "type": "mrkdwn",
        },
        {
          "text": "",
          "type": "mrkdwn",
        },
        {
          "text": "ラッキーカラー\n",
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
          "text": "5月",
          "type": "mrkdwn",
        },
        {
          "text": "",
          "type": "mrkdwn",
        },
        {
          "text": "ラッキーカラー\n",
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
          "text": "6月",
          "type": "mrkdwn",
        },
        {
          "text": "",
          "type": "mrkdwn",
        },
        {
          "text": "ラッキーカラー\n",
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
          "text": "7月",
          "type": "mrkdwn",
        },
        {
          "text": "",
          "type": "mrkdwn",
        },
        {
          "text": "ラッキーカラー\n",
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
          "text": "8月",
          "type": "mrkdwn",
        },
        {
          "text": "",
          "type": "mrkdwn",
        },
        {
          "text": "ラッキーカラー\n",
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
          "text": "",
          "type": "mrkdwn",
        },
        {
          "text": "ラッキーカラー\n",
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
          "text": "10月",
          "type": "mrkdwn",
        },
        {
          "text": "",
          "type": "mrkdwn",
        },
        {
          "text": "ラッキーカラー\n",
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
          "text": "11月",
          "type": "mrkdwn",
        },
        {
          "text": "",
          "type": "mrkdwn",
        },
        {
          "text": "ラッキーカラー\n",
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
          "text": "12月",
          "type": "mrkdwn",
        },
        {
          "text": "",
          "type": "mrkdwn",
        },
        {
          "text": "ラッキーカラー\n",
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
          "text": "1月",
          "type": "mrkdwn",
        },
        {
          "text": "",
          "type": "mrkdwn",
        },
        {
          "text": "ラッキーカラー\n",
          "type": "mrkdwn",
        },
      ],
      "type": "section",
    },
    {
      "type": "divider",
    },
  ];
};
