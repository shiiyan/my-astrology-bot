import { should } from "chai";
import { BirthMonthFortune } from "@shiiyan/sukkirisu-function-core-domain";
import { SquirrelFortuneRanking } from "../../../core/domain/squirrelFortuneRanking/squirrelFortuneRanking";
import { SquirrelFortuneRankingFactory }
  from "../../../core/domain/squirrelFortuneRanking/squirrelFortuneRankingFactory";
import { SquirrelFortuneRankingInMemoryRepository }
  from "../../infrastructure/repository/squirrelFortuneRankingInMemoryRepository";
import { GetSquirrelFortuneRankingForToday } from "./getSquirrelFortuneRankingForToday";
should();

describe("GetSquirrelFortuneRankingForToday", () => {
  let repository: SquirrelFortuneRankingInMemoryRepository;
  let useCase: GetSquirrelFortuneRankingForToday;

  beforeEach("prepare use case", () => {
    repository = new SquirrelFortuneRankingInMemoryRepository();
    useCase = new GetSquirrelFortuneRankingForToday(repository);
  });

  it("should get squirrel fortune ranking by date of today", async () => {
    const squirrelFortuneRanking = SquirrelFortuneRankingFactory.build();
    repository.save(squirrelFortuneRanking);

    const result = await useCase.run();

    result?.should.be.instanceOf(SquirrelFortuneRanking);
    result?.should.have.property("createDate");
    result?.should.have.property("createDate").be.instanceOf(Date);
    result?.should.have.property("birthMonthFortunes");
    result?.should.have.property("birthMonthFortunes").be.a("array");
    const expectedAllMonthFortunes = createExpectedFortunes();
    result?.should.have.property("birthMonthFortunes").that.have.deep.members(expectedAllMonthFortunes);
  });

  it("should return undefined when there is no squirrel fortune ranking for today", async () => {
    const squirrelFortuneRanking = SquirrelFortuneRankingFactory.build(new Date("2021-07-27"));
    repository.save(squirrelFortuneRanking);

    const result = await useCase.run();

    (typeof result).should.equal("undefined");
  });
});

const createExpectedFortunes = (): BirthMonthFortune[] => {
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
