import * as Joi from '@hapi/joi';

import { IUpdateBookingDateValidation } from './IUpdateBookingDateValidation';
import { JoiSchemaValidator } from '../../../Core/Validator/Adapter/Joi/JoiSchemaValidator';
import { ISchemaValidator } from '../../../Core/Validator/ISchemaValidator';

class UpdateBookingDateValidation implements IUpdateBookingDateValidation {
  private readonly validator: ISchemaValidator<any>;

  public constructor() {
    const schema = Joi.object().keys({
      date: Joi.date().iso().required().raw(),
      time: Joi.number().integer().required().min(0).max(23),
    });

    this.validator = new JoiSchemaValidator(schema);
  }

  public validate(data: any): void {
    this.validator.validate(data);
  }
}

export { UpdateBookingDateValidation };
