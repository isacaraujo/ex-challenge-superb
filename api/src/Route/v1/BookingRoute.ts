import { HttpRequestMethod } from '../../Core/Http/Type/HttpRequestMethod';
import { ICreateBookingController } from '../../Domain/Booking/Controller/ICreateBookingController';
import { IGetBookingController } from '../../Domain/Booking/Controller/IGetBookingController';
import {
    IGuestCreateBookingController
} from '../../Domain/Booking/Controller/IGuestCreateBookingController';
import { IListBookingController } from '../../Domain/Booking/Controller/IListBookingController';
import { Api } from './Api';
import { IUpdateBookingController } from '../../Domain/Booking/Controller/IUpdateBookingController';

class BookingRoute extends Api {
  public async register(): Promise<void> {
    await this.registerGuestCreateBookingRoute();
    await this.registerCreateBookingRoute();
    await this.registerListBookingsRoute();
    await this.registerGetBookingRoute();
    await this.registerUpdateBookingRoute();
  }

  private async registerGuestCreateBookingRoute(): Promise<void> {
    const controller = await this.getController(IGuestCreateBookingController);

    this.addHttpRoute({
      controller,
      methods: HttpRequestMethod.POST,
      path: '/bookings',
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
}

export { BookingRoute }
