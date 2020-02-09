import { HttpRequestMethod } from '../../Core/Http/Type/HttpRequestMethod';
import { ICancelBookingController } from '../../Domain/Booking/Controller/ICancelBookingController';
import { ICreateBookingController } from '../../Domain/Booking/Controller/ICreateBookingController';
import { IGetBookingController } from '../../Domain/Booking/Controller/IGetBookingController';
import {
    IGetBookingStatsController
} from '../../Domain/Booking/Controller/IGetBookingStatsController';
import { IListBookingController } from '../../Domain/Booking/Controller/IListBookingController';
import { IUpdateBookingController } from '../../Domain/Booking/Controller/IUpdateBookingController';
import {
    IUpdateBookingDateController
} from '../../Domain/Booking/Controller/IUpdateBookingDateController';
import { Api } from './Api';

class BookingRoute extends Api {
  public async register(): Promise<void> {
    await this.registerCreateBookingRoute();
    await this.registerGetBookingStatsRoute();
    await this.registerListBookingsRoute();
    await this.registerGetBookingRoute();
    await this.registerUpdateBookingRoute();
    await this.registerUpdateBookingDateRoute();
    await this.registerCancelBookingRoute();
  }

  private async registerGetBookingStatsRoute(): Promise<void> {
    const controller = await this.getController(IGetBookingStatsController);

    this.addHttpRoute({
      controller,
      methods: HttpRequestMethod.GET,
      path: '/bookings/stats',
      version: BookingRoute.VERSION,
    });
  }

  private async registerCreateBookingRoute(): Promise<void> {
    const controller = await this.getController(ICreateBookingController);

    this.addHttpRoute({
      controller,
      methods: HttpRequestMethod.POST,
      path: '/restaurants/current/bookings',
      version: BookingRoute.VERSION,
    });
  }

  private async registerListBookingsRoute(): Promise<void> {
    const controller = await this.getController(IListBookingController);

    this.addHttpRoute({
      controller,
      methods: HttpRequestMethod.GET,
      path: '/restaurants/current/bookings',
      version: BookingRoute.VERSION,
    });
  }

  private async registerGetBookingRoute(): Promise<void> {
    const controller = await this.getController(IGetBookingController);

    this.addHttpRoute({
      controller,
      methods: HttpRequestMethod.GET,
      path: '/bookings/:id',
      version: BookingRoute.VERSION,
    });
  }

  private async registerUpdateBookingRoute(): Promise<void> {
    const controller = await this.getController(IUpdateBookingController);

    this.addHttpRoute({
      controller,
      methods: HttpRequestMethod.PUT,
      path: '/bookings/:id',
      version: BookingRoute.VERSION,
    });
  }

  private async registerUpdateBookingDateRoute(): Promise<void> {
    const controller = await this.getController(IUpdateBookingDateController);

    this.addHttpRoute({
      controller,
      methods: HttpRequestMethod.PUT,
      path: '/bookings/:id/date',
      version: BookingRoute.VERSION,
    });
  }

  private async registerCancelBookingRoute(): Promise<void> {
    const controller = await this.getController(ICancelBookingController);

    this.addHttpRoute({
      controller,
      methods: HttpRequestMethod.DELETE,
      path: '/bookings/:id',
      version: BookingRoute.VERSION,
    });
  }
}

export { BookingRoute }
