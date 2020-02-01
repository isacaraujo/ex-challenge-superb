import {
    IMongooseConnection
} from '../../../Core/Database/Driver/Mongoose/Connection/IMongooseConnection';
import {
    MongooseRepository
} from '../../../Core/Database/Driver/Mongoose/Repository/MongooseRepository';
import { SaveRecordError } from '../../../Core/Error/Repository/SaveRecordError';
import { Booking } from '../Entity/Booking';
import { BookingRecordFactory } from './Factory/BookingRecordFactory';
import { IBookingRepository } from './IBookingRepository';
import { IBookingModel } from './Model/IBookingModel';
import { BookingSchema } from './Schema/BookingSchema';

class BookingRepository extends MongooseRepository<IBookingModel> implements IBookingRepository {
  private static readonly COLLECTION = 'booking';

  public constructor(connection: IMongooseConnection) {
    super(connection, BookingRepository.COLLECTION, BookingSchema);
  }

  public async create(booking: Booking): Promise<void> {
    const record = BookingRecordFactory.createRecord(booking);

    try {
      const newRecord = await this.documentModel.create(record);

      booking.setId(newRecord.id);
    } catch (error) {
      throw new SaveRecordError(`SaveRecordError: ${error.message}`, error);
    }
  }
}

export { BookingRepository };
