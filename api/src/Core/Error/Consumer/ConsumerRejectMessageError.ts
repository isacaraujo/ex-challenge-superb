class ConsumerRejectMessageError extends Error {
  public readonly name = 'ConsumerRejectMessageError';

  public constructor(message: string) {
    super(message);
  }
}

export { ConsumerRejectMessageError };
