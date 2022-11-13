import { should } from "chai";
import { PersonalSquirrelFortuneDto } from "../../useCase/personalSquirrelFortuneDto";
import { PersonalSquirrelFortuneRankingSlackMessageBuilder }
  from "./personalSquirrelFortuneRankingSlackMessageBuilder";
should();

describe("PersonalSquirrelFortuneRankingSlackMessageBuilder", () => {
  it("should render fortune ranking message in correct format given PersonlSquirrelFortunes", () => {
    const personalSquirrelFortunes = createPersonalFortunes();
    const slackMessageBuilder = new PersonalSquirrelFortuneRankingSlackMessageBuilder();
    const message = slackMessageBuilder.build(personalSquirrelFortunes);

    const expected = createExpectedMessage();
    message.should.deep.equal(expected);
  });

  it("should render fortune ranking message in ascending order of rank given PersonlSquirrelFortunes", () => {
    const randomOrderedFortunes = createPersonalFortunesInRandomOrder();
    const slackMessageBuilder = new PersonalSquirrelFortuneRankingSlackMessageBuilder();
    const message = slackMessageBuilder.build(randomOrderedFortunes);

    const expected = createExpectedMessage();
    message.should.deep.equal(expected);
  });

  it("should render fortune ranking failure message when failed to get fortune rank", () => {
    const slackMessageBuilder = new PersonalSquirrelFortuneRankingSlackMessageBuilder();
    const message = slackMessageBuilder.buildFailure("failed to fetch fortune rank");

    const expected = {
      "blocks": [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "failed to fetch fortune rank",
          },
        },
      ],
    };
    message.should.deep.equal(expected);
  });
});

const createPersonalFortunes = (): PersonalSquirrelFortuneDto[] => {
  return [
    {
      birthMonth: 1,
      name: "abc",
      rank: 1,
      comment: "日焼け対策をして肌トラブルを防ごう",
    },
    {
      birthMonth: 2,
      name: "bbb",
      rank: 2,
      comment: "日焼け対策をして肌トラブルを防ごう",
    },
    {
      birthMonth: 3,
      name: "ccc",
      rank: 3,
      comment: "日焼け対策をして肌トラブルを防ごう",
    },
    {
      birthMonth: 1,
      name: "333",
      rank: 1,
      comment: "日焼け対策をして肌トラブルを防ごう",
    },
    {
      birthMonth: 1,
      name: "uuu",
      rank: 1,
      comment: "日焼け対策をして肌トラブルを防ごう",
    },
  ];
};

const createPersonalFortunesInRandomOrder = (): PersonalSquirrelFortuneDto[] => {
  return [
    {
      birthMonth: 3,
      name: "ccc",
      rank: 3,
      comment: "日焼け対策をして肌トラブルを防ごう",
    },
    {
      birthMonth: 1,
      name: "abc",
      rank: 1,
      comment: "日焼け対策をして肌トラブルを防ごう",
    },
    {
      birthMonth: 1,
      name: "333",
      rank: 1,
      comment: "日焼け対策をして肌トラブルを防ごう",
    },
    {
      birthMonth: 2,
      name: "bbb",
      rank: 2,
      comment: "日焼け対策をして肌トラブルを防ごう",
    },
    {
      birthMonth: 1,
      name: "uuu",
      rank: 1,
      comment: "日焼け対策をして肌トラブルを防ごう",
    },
  ];
};

const createExpectedMessage = () => {
  return {
    "blocks": [
      {
        "type": "header",
        "text": {
          "emoji": true,
          "text": "今日の個人スッキりすランキング:chipmunk:",
          "type": "plain_text",
        },
      },
      {
        "type": "divider",
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "*1位* abc,333,uuu 日焼け対策をして肌トラブルを防ごう",
        },
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "*2位* bbb 日焼け対策をして肌トラブルを防ごう",
        },
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "*3位* ccc 日焼け対策をして肌トラブルを防ごう",
        },
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
