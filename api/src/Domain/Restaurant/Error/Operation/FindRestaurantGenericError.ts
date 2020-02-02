import { InternalServerError } from '../../../../Core/Error/Http/InternalServerError';

class FindRestaurantGenericError extends InternalServerError {
  private static readonly ORIGINAL_ERROR_TYPE = 'FindRestaurantGeneric';

  public constructor() {
    super('Find restaurant failed', FindRestaurantGenericError.ORIGINAL_ERROR_TYPE);
  }
}

export { FindRestaurantGenericError };
