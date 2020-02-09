interface IQueueMessage {
  Content: string;
  MessageId: string;
}

const IQueueMessage = Symbol.for('IQueueMessage');

export { IQueueMessage };
