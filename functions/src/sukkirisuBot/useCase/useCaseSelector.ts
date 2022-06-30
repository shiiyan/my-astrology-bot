import {AppMentionUseCaseExecuteParam} from "./appMentionUseCaseInterface";

declare type SelectResult = {
    useCaseName?: string,
    executeParam?: AppMentionUseCaseExecuteParam
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
   * @return {SelectResult}
   * @memberof UseCaseSelector
   */
  public static select(eventMessage: string): SelectResult {
    const matchedGroups = eventMessage.match(
        /(?<name>[\w]+)は(?<month>[0-9]{1,2})月生まれ/
    )?.groups;

    if (!matchedGroups) {
      return {
        useCaseName: undefined,
        executeParam: undefined,
      };
    }

    const birthMonthProfile = {
      name: String(matchedGroups.name),
      birthMonth: Number(matchedGroups.month),
    };

    return {
      useCaseName: "SaveBirthMonthProfile",
      executeParam: birthMonthProfile,
    };
  }
}
