import { IBookingAvailability } from '../ResponseType/IBookingAvailability';
import { BookingAvailability } from '../../Entity/BookingAvailability';

class BookingAvailabilityRecordFactory {
  public static fromResultSet(results: IBookingAvailability[]): BookingAvailability[] {
    return results.map(record =>
      BookingAvailabilityRecordFactory.fromRecord(record));
  }

  public static fromRecord(record: IBookingAvailability): BookingAvailability {
    return new BookingAvailability(
      record.date,
      record.time,
      record.availableSlots
    );
  }
}

export { BookingAvailabilityRecordFactory };
