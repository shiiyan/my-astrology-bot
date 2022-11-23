import { should } from "chai";
import { PersonalSquirrelFortuneRankingSlackMessageBuilder }
  from "../gateway/messageBuilder/personalSquirrelFortuneRankingSlackMessageBuilder";
import { PersonalSquirrelFortuneDtoInMemoryQueryService }
  from "../gateway/queryService/personalSquirrelFortuneDtoInMemoryQueryService";
import { GetAllPersonalSquirrelFortuneForToday } from "./getAllPersonalSquirrelFortuneForToday";
import { PersonalSquirrelFortuneDto } from "./personalSquirrelFortuneDto";
import { PersonalSquirrelFortuneMessageBuilderInterface } from "./personalSquirrelFortuneMessageBuilderInterface";
should();

describe("GetAllPersonalSquirrelFortuneForToday", () => {
  let queryService: PersonalSquirrelFortuneDtoInMemoryQueryService;
  let messageBuilder: PersonalSquirrelFortuneMessageBuilderInterface;
  let useCase: GetAllPersonalSquirrelFortuneForToday;

  beforeEach("prepare use case", () => {
    queryService = new PersonalSquirrelFortuneDtoInMemoryQueryService();
    messageBuilder = new PersonalSquirrelFortuneRankingSlackMessageBuilder();
    useCase = new GetAllPersonalSquirrelFortuneForToday(queryService, messageBuilder);
  });

  it("should return personal squirrel fortune message block of today", async () => {
    const personalFortunes = createPersonalFortunes();
    queryService.saveAll(new Date(), personalFortunes);

    const result = await useCase.handle();
    const expected = {
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
            "text": "*1位* one number one",
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

    result.should.be.a("object");
    result.should.deep.equal(expected);
  });

  it("should return failure message block when there is no fortunes for today", async () => {
    const personalFortunes = createPersonalFortunes();
    queryService.saveAll(new Date("2021-07-27"), personalFortunes);

    const result = await useCase.handle();
    const expected = {
      "blocks": [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "今日の個人スッキりすランキングを取得できませんでした。",
          },
        },
      ],
    };

    result.should.be.a("object");
    result.should.deep.equal(expected);
  });
});

const createPersonalFortunes = (): PersonalSquirrelFortuneDto[] => {
  return [
    {
      birthMonth: 1,
      name: "one",
      rank: 1,
      comment: "number one",
    },
  ];
};
