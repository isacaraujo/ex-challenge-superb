import * as Joi from '@hapi/joi';

import { IGetBookingStatsValidation } from './IGetBookingStatsValidation';
import { JoiSchemaValidator } from '../../../Core/Validator/Adapter/Joi/JoiSchemaValidator';
import { ISchemaValidator } from '../../../Core/Validator/ISchemaValidator';

class GetBookingStatsValidation implements IGetBookingStatsValidation {
  private readonly validator: ISchemaValidator<any>;

  public constructor() {
    const schema = Joi.object().keys({
      date: Joi.date().iso().required().raw(),
    });

    this.validator = new JoiSchemaValidator(schema);
  }

  public validate(data: any): void {
    this.validator.validate(data);
  }
}

export { GetBookingStatsValidation };
