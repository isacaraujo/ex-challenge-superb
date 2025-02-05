import { Booking } from '../../Entity/Booking';
import { CreateBookingCommand } from '../../Type/Command/CreateBookingCommand';
import { IBookingResponse } from '../ResponseType/IBookingResponse';
import { BookingStatus } from '../../Type/Enum/BookingStatus';
import { Guest } from '../../Entity/Guest';

class BookingRecordFactory {
  public static fromRecord(record: IBookingResponse): Booking {
    const booking = new Booking();
    const guest = new Guest(record.guest.name, record.guest.email);
    booking.Id = record.id;
    booking.Status = record.status as BookingStatus;
    booking.Guest = guest;
    booking.TotalGuests = record.totalGuests;
    booking.Date = record.date;
    booking.Time = record.time;

    return booking;
  }

  public static createRecordFromCommand(command: CreateBookingCommand): any {
    return {
      guestName: command.Name,
      guestEmail: command.Email,
      totalGuests: command.TotalGuests,
      date: command.Date,
      time: command.Time,
    };
  }
}

export { BookingRecordFactory };
