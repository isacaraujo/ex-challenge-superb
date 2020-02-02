import { NotFoundError } from '../../../../Core/Error/Http/NotFoundError';

class RestaurantNotFoundError extends NotFoundError {
  private static readonly ORIGINAL_ERROR_TYPE = 'RestaurantNotFound';

  public constructor() {
    super('Restaurant not found', RestaurantNotFoundError.ORIGINAL_ERROR_TYPE);
  }
}

export { RestaurantNotFoundError };
