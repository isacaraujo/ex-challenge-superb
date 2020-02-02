import * as Joi from '@hapi/joi';

import { IListBookingValidation } from './IListBookingValidation';
import { JoiSchemaValidator } from '../../../Core/Validator/Adapter/Joi/JoiSchemaValidator';
import { ISchemaValidator } from '../../../Core/Validator/ISchemaValidator';

class ListBookingValidation implements IListBookingValidation {
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

export { ListBookingValidation };
