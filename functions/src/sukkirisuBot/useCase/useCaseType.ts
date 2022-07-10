import {AppMentionCommandUseCaseInterface} from "./appMentionCommandUseCaseInterface";
import {AppMentionQueryUseCaseInterface} from "./appMentionQueryUseCaseInterface";

export enum UseCaseType {
    Command = "command",
    Query = "query",
}

/**
 * Check whether use case is a command use case.
 *
 * @export
 * @param {AppMentionQueryUseCaseInterface | AppMentionCommandUseCaseInterface} useCase
 * @return {*} {useCase is AppMentionCommandUseCaseInterface}
 */
export function isCommandUseCase(
    useCase: AppMentionQueryUseCaseInterface | AppMentionCommandUseCaseInterface
): useCase is AppMentionCommandUseCaseInterface {
  return useCase.metaInfo.type === UseCaseType.Command;
}

/**
 * Check whether use case is a query use case.
 *
 * @export
 * @param {AppMentionQueryUseCaseInterface | AppMentionCommandUseCaseInterface} useCase
 * @return {*} {useCase is AppMentionQueryUseCaseInterface}
 */
export function isQueryUseCase(
    useCase: AppMentionQueryUseCaseInterface | AppMentionCommandUseCaseInterface
): useCase is AppMentionQueryUseCaseInterface {
  return useCase.metaInfo.type === UseCaseType.Query;
}
