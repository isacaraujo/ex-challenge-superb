import { IContainerService } from '../../../Core/Container/IContainerService';
import { IProvider } from '../../../Core/Provider/IProvider';
import { CreateBookingValidation } from '../Validation/CreateBookingValidation';
import { ICreateBookingValidation } from '../Validation/ICreateBookingValidation';

class BookingValidationProvider implements IProvider {
  public constructor(private readonly container: IContainerService) {}

  public register(): void {
    this.registerCreateBookingValidation();
  }

  private registerCreateBookingValidation(): void {
    this.container.register(
      ICreateBookingValidation,
      async () => Promise.resolve(new CreateBookingValidation())
    );
  }
}

export { BookingValidationProvider };
