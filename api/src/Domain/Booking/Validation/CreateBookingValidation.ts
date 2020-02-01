import * as Joi from '@hapi/joi';

import { JoiSchemaValidator } from '../../../Core/Validator/Adapter/Joi/JoiSchemaValidator';
import { ISchemaValidator } from '../../../Core/Validator/ISchemaValidator';
import { ICreateBookingValidation } from './ICreateBookingValidation';

class CreateBookingValidation implements ICreateBookingValidation {
  private readonly validator: ISchemaValidator<any>;

  public constructor() {
    const schema = Joi.object({
      date: Joi.string()
          .regex(/^\d{4}-\d{2}-\d{2}$/)
          .required(),
      time: Joi.string()
          .regex(/^\d{2}:\d{2}$/)
          .required(),
      guestName: Joi.string()
          .required(),
      guestEmail: Joi.string().email().required(),
      totalGuests: Joi.number().required(),
    });

    this.validator = new JoiSchemaValidator(schema);
  }

  public validate(data: any): void {
    this.validator.validate(data);
  }
}

export { CreateBookingValidation };
