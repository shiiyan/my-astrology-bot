import { should } from "chai";
import { InvalidArgumentError } from "@shiiyan/sukkirisu-function-error";
import { BirthMonthFortune } from "./birthMonthFortune";
import { SquirrelFortuneRanking } from "./squirrelFortuneRanking";
import { SquirrelFortuneRankingFactory } from "./squirrelFortuneRankingFactory";
should();

describe("SquirrelFortuneRanking", () => {
  it("should hold createDate and ranking of birth month fortune", () => {
    const list = createAllMonthBirthMonthFortunes();
    const fortuneRanking = SquirrelFortuneRanking.create(list);

    fortuneRanking.should.be.instanceOf(SquirrelFortuneRanking);
    fortuneRanking.should.have.property("createDate");
    fortuneRanking.should.have.property("createDate").be.instanceOf(Date);
    fortuneRanking.should.have.property("birthMonthFortunes");
    fortuneRanking.should.have.property("birthMonthFortunes").be.a("array");
    const expectedAllMonthFortunes = createAllMonthBirthMonthFortunes();
    fortuneRanking.should.have.property("birthMonthFortunes").that.have.deep.members(expectedAllMonthFortunes);
  });

  it("should throw invalid argument error given empty array.", () => {
    const list: BirthMonthFortune[] = [];

    (() => SquirrelFortuneRanking.create(list)).should.throw(
        InvalidArgumentError, "Fortune Ranking does not cover each month once."
    );
  });

  it("should throw invalid argument error given month duplicated.", () => {
    const list: BirthMonthFortune[] = createDuplicatedMonthBirthMonthFortunes();

    (() => SquirrelFortuneRanking.create(list)).should.throw(
        InvalidArgumentError, "There is no fortune of month 6."
    );
  });

  it("should reconstruct using createDate and list of birth month fortune", () => {
    const createDate: Date = new Date("2022-07-10 10:08:00");
    const list: BirthMonthFortune[] = createAllMonthBirthMonthFortunes();
    const reconstructed = SquirrelFortuneRanking.reconstruct(createDate, list);

    reconstructed.should.be.instanceOf(Array);
    reconstructed.should.have.property("createDate");
    reconstructed.should.have.property("createDate").be.instanceOf(Date);
    reconstructed.getCreateDate().getTime().should.equal(createDate.getTime());
    reconstructed.should.have.property("birthMonthFortunes");
    reconstructed.should.have.property("birthMonthFortunes").be.a("array");
    reconstructed.should.have.property("birthMonthFortunes").that.have.deep.members(list);
  });

  it("should get a birth month fortune by rank", () => {
    const fortuneRanking = SquirrelFortuneRankingFactory.build();

    const getResult = fortuneRanking.getFortuneByRank(1);

    getResult.should.have.property("birthMonth").equals(8);
    getResult.should.have.property("rank").equals(1);
    getResult.should.have.property("comment").equals("マンネリから抜け出し新鮮な気分で興味のある事に挑戦しよう");
    getResult.should.have.property("luckyColor").equals("オレンジ");
  });

  it("should get a birth month fortune by birth month", () => {
    const fortuneRanking = SquirrelFortuneRankingFactory.build();

    const getResult = fortuneRanking.getFortuneByBirthMonth(1);

    getResult.should.have.property("birthMonth").equals(1);
    getResult.should.have.property("rank").equals(10);
    getResult.should.have.property("comment").equals("水回りをピカピカに掃除をすると吉");
    getResult.should.have.property("luckyColor").equals("紫");
  });

  it("should get create date", () => {
    const createDate = new Date("2022-07-10 10:08:00");
    const fortuneRanking = SquirrelFortuneRankingFactory.build(createDate);

    const getResult = fortuneRanking.getCreateDate();

    getResult.should.be.instanceOf(Date);
    getResult.getTime().should.equal(createDate.getTime());
  });

  it("should get all month fortunes", () => {
    const fortuneRanking = SquirrelFortuneRankingFactory.build();

    const getResult = fortuneRanking.getAllMonthFortunes();

    const list = createAllMonthBirthMonthFortunes();
    getResult.should.deep.equal(list);
  });
});

const createAllMonthBirthMonthFortunes = (): BirthMonthFortune[] => {
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

const createDuplicatedMonthBirthMonthFortunes = (): BirthMonthFortune[] => {
  return [
    { birthMonth: 8, rank: 1, comment: "マンネリから抜け出し新鮮な気分で興味のある事に挑戦しよう", luckyColor: "オレンジ" },
    { birthMonth: 10, rank: 2, comment: "新しい刺激で心が弾みそうな週末に！", luckyColor: "青" },
    { birthMonth: 5, rank: 3, comment: "一発逆転！ラッキーがありそうな予感", luckyColor: "ピンク" },
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
