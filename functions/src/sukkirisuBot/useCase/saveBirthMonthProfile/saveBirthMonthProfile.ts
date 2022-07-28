import { BirthMonthProfile } from "../../domain/birthMonthProfile/birthMonthProfile";
import { BirthMonthProfileRepositoryInterface } from "../../domain/birthMonthProfile/entityRepositoryInterface";
import { AppMentionCommandUseCaseInterface } from "../appMentionCommandUseCaseInterface";
import { UseCaseType } from "../useCaseType";

/**
 * Class usecase for saving birth month.
 */
export class SaveBirthMonthProfile implements AppMentionCommandUseCaseInterface {
  private repository: BirthMonthProfileRepositoryInterface;

  public metaInfo = {
    type: UseCaseType.Command,
    description: {
      english: "saving birth month profile",
      japanese: "誕生月情報を保存",
    },
    message: {
      success: "誕生月情報を保存しました。",
      failure: "誕生月情報を保存できませんでした。",
    },
  };

  /**
   * Creates an instance of SaveBirthMonthProfile.
   * @param {BirthMonthProfileRepositoryInterface} repository
   * @memberof SaveBirthMonthProfile
   */
  constructor(repository: BirthMonthProfileRepositoryInterface) {
    this.repository = repository;
  }

  /**
   * Execute save birth month profile usecase.
   *
   * @param {BirthMonthProfile} birthMonthProfile
   * @return {*} {Promise<void>}
   * @memberof SaveBirthMonthProfile
   */
  public async execute(birthMonthProfile: BirthMonthProfile): Promise<void> {
    await this.repository.save(birthMonthProfile);
  }
}
