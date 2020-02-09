class NotifierGenericError extends Error {
  public readonly name = 'NotifierGenericError';

  public readonly originalError: Error;

  public constructor(message: string, originalError: Error) {
    super(message);

    this.originalError = originalError;
  }
}

export { NotifierGenericError };
