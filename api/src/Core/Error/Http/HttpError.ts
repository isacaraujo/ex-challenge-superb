abstract class HttpError extends Error {
  public readonly statusCode: number;

  public readonly errorType: string;

  public readonly originalErrorType: string;

  public constructor(
    message: string,
    statusCode: number,
    errorType: string,
    originalErrorType: string
  ) {
    super(message);

    this.statusCode = statusCode;
    this.errorType = errorType;
    this.originalErrorType = originalErrorType;
  }
}

export { HttpError };
