import { BirthMonthProfile, BirthMonthProfileRepositoryInterface } from "@shiiyan/sukkirisu-function-core-domain";

/**
 * Class usecase for saving birth month.
 */
export class SaveBirthMonthProfile {
  private repository: BirthMonthProfileRepositoryInterface;

  public metaInfo = {
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
   *
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
  public async handle(birthMonthProfile: BirthMonthProfile): Promise<void> {
    await this.repository.save(birthMonthProfile);
  }
}
