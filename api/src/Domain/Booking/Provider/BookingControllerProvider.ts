import { IContainerService } from '../../../Core/Container/IContainerService';
import { IProvider } from '../../../Core/Provider/IProvider';
import {
    IFindCurrentRestaurantOperation
} from '../../Restaurant/Operation/IFindCurrentRestaurantOperation';
import { CreateBookingController } from '../Controller/CreateBookingController';
import { GetBookingController } from '../Controller/GetBookingController';
import { GetBookingStatsController } from '../Controller/GetBookingStatsController';
import { GuestCreateBookingController } from '../Controller/GuestCreateBookingController';
import { ICreateBookingController } from '../Controller/ICreateBookingController';
import { IGetBookingController } from '../Controller/IGetBookingController';
import { IGetBookingStatsController } from '../Controller/IGetBookingStatsController';
import { IGuestCreateBookingController } from '../Controller/IGuestCreateBookingController';
import { IListBookingController } from '../Controller/IListBookingController';
import { IUpdateBookingController } from '../Controller/IUpdateBookingController';
import { ListBookingController } from '../Controller/ListBookingController';
import { UpdateBookingController } from '../Controller/UpdateBookingController';
import { ICreateBookingOperation } from '../Operation/ICreateBookingOperation';
import { IGetBookingOperation } from '../Operation/IGetBookingOperation';
import { IGetBookingStatsOperation } from '../Operation/IGetBookingStatsOperation';
import { IGuestCreateBookingOperation } from '../Operation/IGuestCreateBookingOperation';
import { IListBookingOperation } from '../Operation/IListBookingOperation';
import { IUpdateBookingOperation } from '../Operation/IUpdateBookingOperation';
import { ICreateBookingValidation } from '../Validation/ICreateBookingValidation';
import { IGetBookingStatsValidation } from '../Validation/IGetBookingStatsValidation';
import { IListBookingValidation } from '../Validation/IListBookingValidation';
import { IUpdateBookingValidation } from '../Validation/IUpdateBookingValidation';

class BookingControllerProvider implements IProvider {
  public constructor(private readonly container: IContainerService) {}

  public register(): void {
    this.registerGuestCreateBookingController();
    this.registerCreateBookingController();
    this.registerListBookingController();
    this.registerGetBookingController();
    this.registerUpdateBookingController();
    this.registerGetBookingStatsController();
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

  private registerListBookingController(): void {
    this.container.register(
      IListBookingController,
      async () => {
        const validation = await this.container
          .get<IListBookingValidation>(IListBookingValidation);

        const listBooking = await this.container
          .get<IListBookingOperation>(IListBookingOperation);

        return new ListBookingController(validation, listBooking);
      });
  }

  private registerGetBookingController(): void {
    this.container.register(
      IGetBookingController,
      async () => {
        const getBooking = await this.container
          .get<IGetBookingOperation>(IGetBookingOperation);

        return new GetBookingController(getBooking);
      });
  }

  private registerUpdateBookingController(): void {
    this.container.register(
      IUpdateBookingController,
      async () => {
        const validation = await this.container
          .get<IUpdateBookingValidation>(IUpdateBookingValidation);

        const getBooking = await this.container
          .get<IGetBookingOperation>(IGetBookingOperation);

        const updateBooking = await this.container
          .get<IUpdateBookingOperation>(IUpdateBookingOperation);

        return new UpdateBookingController(validation, getBooking, updateBooking);
      });
  }

  private registerGetBookingStatsController(): void {
    this.container.register(
      IGetBookingStatsController,
      async () => {
        const validation = await this.container
          .get<IGetBookingStatsValidation>(IGetBookingStatsValidation);

        const findRestaurant = await this.container
          .get<IFindCurrentRestaurantOperation>(IFindCurrentRestaurantOperation);

        const getStats = await this.container
          .get<IGetBookingStatsOperation>(IGetBookingStatsOperation);

        return new GetBookingStatsController(
          validation,
          findRestaurant,
          getStats
        );
      });
  }
}

export { BookingControllerProvider };
