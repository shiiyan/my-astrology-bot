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
    const matchedGroups = eventMessage.match(/(?<fortune>スッキりす)/)?.groups;
    if (matchedGroups?.fortune) {
      return {
        useCaseName: "GetSquirrelFortuneRankingForToday",
        useCaseParam: undefined,
      };
    }

    return {
      useCaseName: undefined,
      useCaseParam: undefined,
    };
  }
}
