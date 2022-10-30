import * as functions from "firebase-functions";
import { PubSub } from "@google-cloud/pubsub";
import { AppMentionEvent } from "@slack/bolt";

/**
 * @export
 * @class SelfIntroduce
 */
export class SelfIntroduce {
  private pubsubClient: PubSub;
  private logger: typeof functions.logger;
  private readonly topicName = "projects/sukkirisu-d6ac0/topics/sukkirisu-bot-self-introduce";

  // eslint-disable-next-line valid-jsdoc
  /**
   * Creates an instance of SelfIntroduce.
   *
   * @param {PubSub} pubsubClient
   * @param {typeof functions.logger} logger
   * @memberof SelfIntroduce
   */
  constructor(pubsubClient: PubSub, logger: typeof functions.logger) {
    this.pubsubClient = pubsubClient;
    this.logger = logger;
  }

  // TODO: find a better place for this method.
  /**
   * @static
   * @param {string} useCaseName
   * @return {*}  {boolean}
   * @memberof SelfIntroduce
   */
  public static confirmUseCase(useCaseName: string): boolean {
    return useCaseName === "SelfIntroduce";
  }

  /**
   * Execute the usecase then publish message to pubsub.
   *
   * @param {AppMentionEvent} event
   * @memberof SelfIntroduce
   */
  public async execute(event: AppMentionEvent): Promise<void> {
    const dataBuffer = Buffer.from(
        JSON.stringify({ channel: event.channel })
    );

    const messageId = await this.pubsubClient
        .topic(this.topicName)
        .publishMessage({ data: dataBuffer });

    this.logger.info(`Message ${messageId} of topic ${this.topicName} published.`);
  }
}
