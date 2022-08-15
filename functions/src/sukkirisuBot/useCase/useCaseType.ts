import { AppMentionCommandUseCaseInterface } from "./appMentionCommandUseCaseInterface";
import { AppMentionQueryUseCaseInterface } from "./appMentionQueryUseCaseInterface";
import { ShowHelpMessage } from "./showHelpMessage/showHelpMessage";

export enum UseCaseType {
    Command = "command",
    Query = "query",
    Help = "help"
}

/**
 * Check whether use case is a command use case.
 *
 * @export
 * @param {AppMentionQueryUseCaseInterface | AppMentionCommandUseCaseInterface | ShowHelpMessage} useCase
 * @return {*} {useCase is AppMentionCommandUseCaseInterface}
 */
export function isCommandUseCase(
    useCase: AppMentionQueryUseCaseInterface | AppMentionCommandUseCaseInterface | ShowHelpMessage
): useCase is AppMentionCommandUseCaseInterface {
  return useCase.metaInfo.type === UseCaseType.Command;
}

/**
 * Check whether use case is a query use case.
 *
 * @export
 * @param {AppMentionQueryUseCaseInterface | AppMentionCommandUseCaseInterface | ShowHelpMessage} useCase
 * @return {*} {useCase is AppMentionQueryUseCaseInterface}
 */
export function isQueryUseCase(
    useCase: AppMentionQueryUseCaseInterface | AppMentionCommandUseCaseInterface | ShowHelpMessage
): useCase is AppMentionQueryUseCaseInterface {
  return useCase.metaInfo.type === UseCaseType.Query;
}

/**
 * Check whether use case is a query use case.
 *
 * @export
 * @param {AppMentionQueryUseCaseInterface | AppMentionCommandUseCaseInterface | ShowHelpMessage} useCase
 * @return {*} {useCase is ShowHelpMessage}
 */
export function isHelpUseCase(
    useCase: AppMentionQueryUseCaseInterface | AppMentionCommandUseCaseInterface | ShowHelpMessage
): useCase is ShowHelpMessage {
  return useCase.metaInfo.type === UseCaseType.Help;
}
