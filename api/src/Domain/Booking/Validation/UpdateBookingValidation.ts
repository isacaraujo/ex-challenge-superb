import * as Joi from '@hapi/joi';

import { JoiSchemaValidator } from '../../../Core/Validator/Adapter/Joi/JoiSchemaValidator';
import { ISchemaValidator } from '../../../Core/Validator/ISchemaValidator';
import { IUpdateBookingValidation } from './IUpdateBookingValidation';

class UpdateBookingValidation implements IUpdateBookingValidation {
  private readonly validator: ISchemaValidator<any>;

  public constructor() {
    const schema = Joi.object().keys({
      guestName: Joi.string().min(2).required(),
      guestEmail: Joi.string().email().required(),
      totalGuests: Joi.number().integer().min(1).required(),
    });

    this.validator = new JoiSchemaValidator(schema);
  }
  public validate(data: any): void {
    this.validator.validate(data);
  }
}

export { UpdateBookingValidation };
