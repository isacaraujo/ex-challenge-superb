import { ICreateBookingCommand } from '../Type/Command/ICreateBookingCommand';
import { IBookingCreator } from './IBookingCreator';
import { IBookingRepository } from '../Repository/IBookingRepository';
import { Guest } from '../Entity/Guest';
import { Booking } from '../Entity/Booking';

class BookingCreator implements IBookingCreator {
  public constructor(
    private bookingRepository: IBookingRepository
  ) {}

  public async create(command: ICreateBookingCommand): Promise<void> {
    const booking = this.buildBooking(command);

    await this.bookingRepository.create(booking);
  }

  private buildBooking(command: ICreateBookingCommand): Booking {
    const guest = new Guest(command.name, command.email);
    const totalGuests = parseInt(command.totalGuests);

    return new Booking(guest, totalGuests, command.date, command.time);
  }
}

export { BookingCreator };
