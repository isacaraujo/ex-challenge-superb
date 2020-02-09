import { IContainerService } from '../../../Core/Container/IContainerService';
import { IProvider } from '../../../Core/Provider/IProvider';
import {
    IFindCurrentRestaurantOperation
} from '../../Restaurant/Operation/IFindCurrentRestaurantOperation';
import { CancelBookingController } from '../Controller/CancelBookingController';
import { CreateBookingController } from '../Controller/CreateBookingController';
import { GetBookingController } from '../Controller/GetBookingController';
import { GetBookingStatsController } from '../Controller/GetBookingStatsController';
import { ICancelBookingController } from '../Controller/ICancelBookingController';
import { ICreateBookingController } from '../Controller/ICreateBookingController';
import { IGetBookingController } from '../Controller/IGetBookingController';
import { IGetBookingStatsController } from '../Controller/IGetBookingStatsController';
import { IListBookingController } from '../Controller/IListBookingController';
import { IUpdateBookingController } from '../Controller/IUpdateBookingController';
import { IUpdateBookingDateController } from '../Controller/IUpdateBookingDateController';
import { ListBookingController } from '../Controller/ListBookingController';
import { UpdateBookingController } from '../Controller/UpdateBookingController';
import { UpdateBookingDateController } from '../Controller/UpdateBookingDateController';
import { ICancelBookingOperation } from '../Operation/ICancelBookingOperation';
import { ICreateBookingOperation } from '../Operation/ICreateBookingOperation';
import { IGetBookingDateTimeStatsOperation } from '../Operation/IGetBookingDateTimeStatsOperation';
import { IGetBookingOperation } from '../Operation/IGetBookingOperation';
import { IGetBookingStatsOperation } from '../Operation/IGetBookingStatsOperation';
import { IListBookingOperation } from '../Operation/IListBookingOperation';
import { IUpdateBookingDateOperation } from '../Operation/IUpdateBookingDateOperation';
import { IUpdateBookingOperation } from '../Operation/IUpdateBookingOperation';
import { ICreateBookingValidation } from '../Validation/ICreateBookingValidation';
import { IGetBookingStatsValidation } from '../Validation/IGetBookingStatsValidation';
import { IListBookingValidation } from '../Validation/IListBookingValidation';
import { IUpdateBookingDateValidation } from '../Validation/IUpdateBookingDateValidation';
import { IUpdateBookingValidation } from '../Validation/IUpdateBookingValidation';

class BookingControllerProvider implements IProvider {
  public constructor(private readonly container: IContainerService) {}

  public register(): void {
    this.registerCreateBookingController();
    this.registerListBookingController();
    this.registerGetBookingController();
    this.registerUpdateBookingController();
    this.registerGetBookingStatsController();
    this.registerUpdateBookingDateController();
    this.registerCancelBookingController();
  }

  private registerCreateBookingController(): void {
    this.container.register(
      ICreateBookingController,
      async () => {
        const validation = await this.container
          .get<ICreateBookingValidation>(ICreateBookingValidation);

        const findRestaurant = await this.container
          .get<IFindCurrentRestaurantOperation>(IFindCurrentRestaurantOperation);

        const getStats = await this.container
          .get<IGetBookingDateTimeStatsOperation>(IGetBookingDateTimeStatsOperation);

        const createBooking = await this.container
          .get<ICreateBookingOperation>(ICreateBookingOperation);

        const controller = new CreateBookingController(
          validation,
          findRestaurant,
          getStats,
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

  private registerUpdateBookingDateController(): void {
    this.container.register(
      IUpdateBookingDateController,
      async () => {
        const validation = await this.container
          .get<IUpdateBookingDateValidation>(IUpdateBookingDateValidation);

        const findRestaurant = await this.container
          .get<IFindCurrentRestaurantOperation>(IFindCurrentRestaurantOperation);

        const getBookingStats = await this.container
          .get<IGetBookingDateTimeStatsOperation>(IGetBookingDateTimeStatsOperation);

        const getBooking = await this.container
          .get<IGetBookingOperation>(IGetBookingOperation);

        const updateBookingDate = await this.container
          .get<IUpdateBookingDateOperation>(IUpdateBookingDateOperation);

        return new UpdateBookingDateController(
          validation,
          findRestaurant,
          getBookingStats,
          getBooking,
          updateBookingDate
        );
      });
  }

  private registerCancelBookingController(): void {
    this.container.register(
      ICancelBookingController,
      async () => {
        const getBooking = await this.container
          .get<IGetBookingOperation>(IGetBookingOperation);

        const cancelBooking = await this.container
          .get<ICancelBookingOperation>(ICancelBookingOperation);

        return new CancelBookingController(
          getBooking,
          cancelBooking
        );
      });
  }
}

export { BookingControllerProvider };
