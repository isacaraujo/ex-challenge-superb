import { IQueueMessage } from './IQueueMessage';

class QueueMessage implements IQueueMessage {
  public constructor(private readonly content: string, private readonly messageId: string) {}

  public get Content(): string {
    return this.content;
  }

  public get MessageId(): string {
    return this.messageId;
  }
}

export { QueueMessage };
