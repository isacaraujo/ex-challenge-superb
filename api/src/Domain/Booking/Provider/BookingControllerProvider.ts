import { IContainerService } from '../../../Core/Container/IContainerService';
import { IProvider } from '../../../Core/Provider/IProvider';
import {
    IFindCurrentRestaurantOperation
} from '../../Restaurant/Operation/IFindCurrentRestaurantOperation';
import { GuestCreateBookingController } from '../Controller/GuestCreateBookingController';
import { IGuestCreateBookingController } from '../Controller/IGuestCreateBookingController';
import { IGuestCreateBookingOperation } from '../Operation/IGuestCreateBookingOperation';
import { ICreateBookingValidation } from '../Validation/ICreateBookingValidation';
import { ICreateBookingController } from '../Controller/ICreateBookingController';
import { CreateBookingController } from '../Controller/CreateBookingController';
import { ICreateBookingOperation } from '../Operation/ICreateBookingOperation';

class BookingControllerProvider implements IProvider {
  public constructor(private readonly container: IContainerService) {}

  public register(): void {
    this.registerGuestCreateBookingController();
    this.registerCreateBookingController();
  }

  private registerGuestCreateBookingController(): void {
    this.container.register(
      IGuestCreateBookingController,
      async () => {
        const findRestaurant = await this.container
          .get<IFindCurrentRestaurantOperation>(IFindCurrentRestaurantOperation);

        const createBooking = await this.container
          .get<IGuestCreateBookingOperation>(IGuestCreateBookingOperation);

        const validation = await this.container
          .get<ICreateBookingValidation>(ICreateBookingValidation);

        const controller = new GuestCreateBookingController(
          findRestaurant,
          createBooking,
          validation
        );

        return controller;
      });
  }

  private registerCreateBookingController(): void {
    this.container.register(
      ICreateBookingController,
      async () => {
        const validation = await this.container
          .get<ICreateBookingValidation>(ICreateBookingValidation);

        const findRestaurant = await this.container
          .get<IFindCurrentRestaurantOperation>(IFindCurrentRestaurantOperation);

        const createBooking = await this.container
          .get<ICreateBookingOperation>(ICreateBookingOperation);

        const controller = new CreateBookingController(
          validation,
          findRestaurant,
          createBooking
          
        );

        return controller;
      });
  }
}

export { BookingControllerProvider };
