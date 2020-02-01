import { Booking } from '../../Entity/Booking';

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
}

export { BookingRecordFactory };
