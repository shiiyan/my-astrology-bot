export type BirthMonthProfile = {
    name: string,
    birthMonth: number
  }

export type AppMentionUseCaseExecuteParam = BirthMonthProfile

export interface AppMentionUseCaseInterface {
    description: {
        english: string,
        japanese: string
    };
    execute(param: AppMentionUseCaseExecuteParam): void;
}
