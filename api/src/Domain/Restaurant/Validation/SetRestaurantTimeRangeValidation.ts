import * as Joi from '@hapi/joi';

import { JoiSchemaValidator } from '../../../Core/Validator/Adapter/Joi/JoiSchemaValidator';
import { ISchemaValidator } from '../../../Core/Validator/ISchemaValidator';
import { ISetRestaurantTimeRangeValidation } from './ISetRestaurantTimeRangeValidation';

class SetRestaurantTimeRangeValidation implements ISetRestaurantTimeRangeValidation {
  private readonly validator: ISchemaValidator<any>;

  public constructor() {
    const schema = Joi.object({
      workdays: Joi.array().items(
        Joi.object().keys({
          dayOfWeek: Joi.number().integer().min(0).max(6).required(),
          openTime: Joi.number().integer().min(0).max(23).required(),
          closeTime: Joi.number().integer().min(0).max(23).required(),
        })
      )
      .min(1)
      .max(7)
    });

    this.validator = new JoiSchemaValidator(schema);
  }

  public validate(data: any): void {
    this.validator.validate(data);
  }
}

export { SetRestaurantTimeRangeValidation };
