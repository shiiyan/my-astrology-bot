import { AppMentionQueryUseCaseInterface } from "./appMentionQueryUseCaseInterface";

export enum UseCaseType {
    Command = "command",
    Query = "query",
    Help = "help"
}

/**
 * Check whether use case is a query use case.
 *
 * @export
 * @param {AppMentionQueryUseCaseInterface} useCase
 * @return {*} {useCase is AppMentionQueryUseCaseInterface}
 */
export function isQueryUseCase(
    useCase: AppMentionQueryUseCaseInterface
): useCase is AppMentionQueryUseCaseInterface {
  return useCase.metaInfo.type === UseCaseType.Query;
}
