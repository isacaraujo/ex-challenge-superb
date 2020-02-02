import { IContainerService } from '../../../Core/Container/IContainerService';
import { IProvider } from '../../../Core/Provider/IProvider';
import {
    IFindCurrentRestaurantOperation
} from '../../Restaurant/Operation/IFindCurrentRestaurantOperation';
import { CreateBookingController } from '../Controller/CreateBookingController';
import { ICreateBookingController } from '../Controller/ICreateBookingController';
import { IGuestCreateBookingOperation } from '../Operation/IGuestCreateBookingOperation';
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
        const findRestaurant = await this.container
          .get<IFindCurrentRestaurantOperation>(IFindCurrentRestaurantOperation);

        const createBooking = await this.container
          .get<IGuestCreateBookingOperation>(IGuestCreateBookingOperation);

        const validation = await this.container
          .get<ICreateBookingValidation>(ICreateBookingValidation);

        const controller = new CreateBookingController(
          findRestaurant,
          createBooking,
          validation
        );

        return controller;
      }
    )
  }
}

export { BookingControllerProvider };
