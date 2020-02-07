import * as _ from 'lodash';
import * as Joi from '@hapi/joi';

import { ConstraintViolatedError } from '../../../Error/Validator/ConstraintViolatedError';
import { ISchemaValidator } from '../../ISchemaValidator';

class JoiSchemaValidator<T> implements ISchemaValidator<T> {
  public constructor(private readonly schema: Joi.Schema) {}

  public validate(params: T): void {
    const result = this.schema.validate(params, {
      abortEarly: false
    });

    if (result.error !== undefined) {
      console.error(result.error);

      throw new ConstraintViolatedError('Schema is invalid', result.error.details);
    }

    _.extend(params, result.value);
  }
}

export { JoiSchemaValidator };
