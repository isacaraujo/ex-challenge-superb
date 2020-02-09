type TQueueAdapterSubscribe<IQueueMessage> = (data: IQueueMessage) => Promise<void>;

export { TQueueAdapterSubscribe };
