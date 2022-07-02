import {BirthMonthProfile} from "../domain/birthMonthProfile";
import {BirthMonthProfileRepositoryInterface} from "../domain/birthMonthProfileRepositoryInterface";
import {AppMentionUseCaseInterface} from "./appMentionUseCaseInterface";

/**
 * Class usecase for saving birth month.
 */
export class SaveBirthMonthProfile implements AppMentionUseCaseInterface {
  private repository: BirthMonthProfileRepositoryInterface;
  public description = {
    english: "saving birth month profile",
    japanese: "誕生月情報を保存する",
  };

  /**
   * Creates an instance of SaveBirthMonthProfile.
   * @param {BirthMonthProfileRepositoryInterface} repository
   * @memberof SaveBirthMonthProfile
   */
  constructor(
      repository: BirthMonthProfileRepositoryInterface
  ) {
    this.repository = repository;
  }

  /**
   * Execute save birth month profile usecase.
   *
   * @param {BirthMonthProfile} birthMonthProfile
   * @return {Promise<void>}
   * @memberof SaveBirthMonthProfile
   */
  public async execute(birthMonthProfile: BirthMonthProfile): Promise<void> {
    await this.repository.save(birthMonthProfile);
  }
}
