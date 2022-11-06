import { AppMentionUseCaseExecuteParam } from "./appMentionCommandUseCaseInterface";

declare type SelectResult = {
    useCaseName?: string,
    useCaseParam?: AppMentionUseCaseExecuteParam
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

    matchedGroups = eventMessage.match(/(?<name>[\w]+)は(?<month>[0-9]{1,2})月生まれ/)?.groups;
    if (matchedGroups?.name && matchedGroups?.month) {
      const birthMonthProfile = {
        name: String(matchedGroups.name),
        birthMonth: Number(matchedGroups.month),
      };

      return {
        useCaseName: "SaveBirthMonthProfile",
        useCaseParam: birthMonthProfile,
      };
    }

    // Named Capture Group personal (?<personal>(?:個人)?)
    // Non-capturing group (?:個人)? between zero and one times.
    // Named Capture Group fortune (?<fortune>スッキりす)
    matchedGroups = eventMessage.match(/(?<personal>(?:個人)?)(?<fortune>スッキりす)/)?.groups;
    if (!matchedGroups?.personal && matchedGroups?.fortune) {
      return {
        useCaseName: "GetSquirrelFortuneRankingForToday",
        useCaseParam: undefined,
      };
    }

    if (matchedGroups?.personal && matchedGroups?.fortune) {
      return {
        useCaseName: "GetAllPersonalSquirrelFortuneForToday",
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
