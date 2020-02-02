import * as moment from 'moment';

import * as Joi from '@hapi/joi';

import { JoiSchemaValidator } from '../../../Core/Validator/Adapter/Joi/JoiSchemaValidator';
import { ISchemaValidator } from '../../../Core/Validator/ISchemaValidator';
import { ICreateBookingValidation } from './ICreateBookingValidation';

class CreateBookingValidation implements ICreateBookingValidation {
  private readonly validator: ISchemaValidator<any>;

  public constructor() {
    /**
     * @TODO I found a bug:
     * The date 2020-02-31 passed from Joi validation. Look:
     * Joi.date().iso().min(moment().format('YYYY-MM-DD')).required().validate('2020-02-31')
     * > { value: 2020-03-02T00:00:00.000Z }
     * I will study about it
     */
    const schema = Joi.object({
      date: Joi.date().iso().min(moment().format('YYYY-MM-DD')).required().raw(),
      time: Joi.number().integer().min(0).max(23).required(),
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
