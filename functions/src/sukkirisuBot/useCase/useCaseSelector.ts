declare type SelectResult = {
    useCaseName?: string,
    useCaseParam?: undefined
  }

/**
 * Class select use case based on event message.
 *
 * @export
 * @class UseCaseSelector
 */
export class UseCaseSelector {
  /**
   * @param {string} eventMessage
   * @return {*} {SelectResult}
   * @memberof UseCaseSelector
   */
  public static select(eventMessage: string): SelectResult {
    let matchedGroups: {[key: string]: string} | undefined;

    matchedGroups = eventMessage.match(/(?<fortune>スッキりす)/)?.groups;
    if (matchedGroups?.fortune) {
      return {
        useCaseName: "GetSquirrelFortuneRankingForToday",
        useCaseParam: undefined,
      };
    }

    matchedGroups = eventMessage.match(/(?<testData>テストデータ)/)?.groups;
    if (matchedGroups?.testData) {
      return {
        useCaseName: "SaveDummySquirrelFortuneRanking",
        useCaseParam: undefined,
      };
    }

    return {
      useCaseName: undefined,
      useCaseParam: undefined,
    };
  }
}
