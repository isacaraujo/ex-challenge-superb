import { IContainerService } from '../../../Core/Container/IContainerService';
import { IProvider } from '../../../Core/Provider/IProvider';
import { CreateBookingController } from '../Controller/CreateBookingController';
import { ICreateBookingController } from '../Controller/ICreateBookingController';
import { ICreateBookingOperation } from '../Operation/ICreateBookingOperation';
import { ICreateBookingValidation } from '../Validation/ICreateBookingValidation';

class BookingControllerProvider implements IProvider {
  public constructor(private readonly container: IContainerService) {}

  public register(): void {
    this.registerCreateBookingController();
  }

  private registerCreateBookingController(): void {
    this.container.register(
      ICreateBookingController,
      async () => {
        const createBooking = await this.container
          .get<ICreateBookingOperation>(ICreateBookingOperation);

        const validation = await this.container
          .get<ICreateBookingValidation>(ICreateBookingValidation);

        const controller = new CreateBookingController(createBooking, validation);

        return controller;
      }
    )
  }
}

export { BookingControllerProvider };
