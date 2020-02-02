import { InternalServerError } from '../../../../Core/Error/Http/InternalServerError';

class UpdateRestaurantGenericError extends InternalServerError {
  private static readonly ORIGINAL_ERROR_TYPE = 'UpdateRestaurantGeneric';

  public constructor() {
    super('Save restaurant failed', UpdateRestaurantGenericError.ORIGINAL_ERROR_TYPE);
  }
}

export { UpdateRestaurantGenericError };
