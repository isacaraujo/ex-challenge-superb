import { IContainerService } from '../../../Core/Container/IContainerService';
import { IProvider } from '../../../Core/Provider/IProvider';
import { CreateBookingValidation } from '../Validation/CreateBookingValidation';
import { ICreateBookingValidation } from '../Validation/ICreateBookingValidation';
import { IListBookingValidation } from '../Validation/IListBookingValidation';
import { IUpdateBookingValidation } from '../Validation/IUpdateBookingValidation';
import { ListBookingValidation } from '../Validation/ListBookingValidation';
import { UpdateBookingValidation } from '../Validation/UpdateBookingValidation';

class BookingValidationProvider implements IProvider {
  public constructor(private readonly container: IContainerService) {}

  public register(): void {
    this.registerCreateBookingValidation();
    this.registerListBookingValidation();
    this.registerUpdateBookingValidation();
  }

  private registerCreateBookingValidation(): void {
    this.container.register(
      ICreateBookingValidation,
      async () => Promise.resolve(new CreateBookingValidation())
    );
  }

  private registerListBookingValidation(): void {
    this.container.register(
      IListBookingValidation,
      async () => Promise.resolve(new ListBookingValidation())
    );
  }

  private registerUpdateBookingValidation(): void {
    this.container.register(
      IUpdateBookingValidation,
      async () => Promise.resolve(new UpdateBookingValidation())
    );
  }
}

export { BookingValidationProvider };
