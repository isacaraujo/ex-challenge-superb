import * as _ from 'lodash';
import * as Joi from '@hapi/joi';

import { ConstraintViolatedError } from '../../../Error/Validator/ConstraintViolatedError';
import { ISchemaValidator } from '../../ISchemaValidator';

class JoiSchemaValidator<T> implements ISchemaValidator<T> {
  public constructor(private readonly schema: Joi.Schema) {}

  public validate(params: T): void {
    const result = this.schema.validate(params);

    if (result.error !== undefined) {
      const originalError = result.error;
      throw new ConstraintViolatedError(originalError.message, originalError);
    }

    _.extend(params, result.value);
  }
}

export { JoiSchemaValidator };
