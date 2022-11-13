import { PersonalSquirrelFortuneDto } from "./personalSquirrelFortuneDto";

export type MessageBlock = {
    blocks: object[]
};

export interface personalSquirrelFortuneMessageBuilderInterface {
    build(queryResult: PersonalSquirrelFortuneDto[]): MessageBlock
    buildFailure(failureMessage: string): MessageBlock
}
