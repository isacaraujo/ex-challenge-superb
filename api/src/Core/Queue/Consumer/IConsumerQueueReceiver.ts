import { IQueueMessage } from '../Type/Dto/IQueueMessage';

interface IConsumerQueueReceiver {
  receive(message: IQueueMessage): Promise<void>;
}

export { IConsumerQueueReceiver };
