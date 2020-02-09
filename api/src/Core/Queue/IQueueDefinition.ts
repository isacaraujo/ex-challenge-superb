interface IQueueDefinition {
  QueueName: string;
  QueueErrorName: string;
  ExchangeName: string;
  ExchangeErrorName: string;
  QueueRoutingKey: string;
  QueueErrorRoutingKey: string;
}

export { IQueueDefinition };
