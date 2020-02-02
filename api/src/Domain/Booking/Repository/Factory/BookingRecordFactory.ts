import { Booking } from '../../Entity/Booking';
import { IBookingModel } from '../Model/IBookingModel';
import { Guest } from '../../Entity/Guest';

class BookingRecordFactory {
  public static createRecord(booking: Booking): any {
    return {
      createdAt: booking.CreatedAt,
      updatedAt: booking.UpdatedAt,
      canceledAt: booking.CanceledAt,
      confirmedAt: booking.ConfirmatedAt,
      date: booking.Date,
      time: booking.Time,
      guest: {
        name: booking.Guest.Name,
        email: booking.Guest.Email,
      },
      totalGuests: booking.TotalGuests,
      status: booking.Status,
    };
  }

  public static createFromRecord(record: IBookingModel): Booking {
    const guest = new Guest(record.guest.name, record.guest.email);
    const booking = new Booking();
    booking.Id = record.id;
    booking.CreatedAt = record.createdAt;
    booking.UpdatedAt = record.updatedAt;
    booking.CanceledAt = record.canceledAt;
    booking.ConfirmatedAt = record.confirmedAt;
    booking.Date = record.date;
    booking.Time = record.time;
    booking.TotalGuests = record.totalGuests;
    booking.Status = record.status;
    booking.Guest = guest;

    return booking;
  }
}

export { BookingRecordFactory };
