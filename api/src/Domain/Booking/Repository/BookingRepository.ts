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
import { BookingStatus } from '../Entity/BookingStatus';
import { FindRecordError } from '../../../Core/Error/Repository/FindRecordError';
import { RecordNotFoundError } from '../../../Core/Error/Repository/RecordNotFoundError';

class BookingRepository extends MongooseRepository<IBookingModel> implements IBookingRepository {
  public static readonly COLLECTION = 'booking';

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

  public async findAllBookingsByDate(date: string): Promise<Booking[]> {
    try {
      const collection = await this.documentModel.find({
        date,
        status: { $in: [BookingStatus.CONFIRMED, BookingStatus.SCHEDULED] }
      });

      return collection.map<Booking>(record =>
        BookingRecordFactory.createFromRecord(record));
    } catch (error) {
      throw new FindRecordError('Find all bookings by date failed', error);
    }
  }

  public async findOneById(id: string): Promise<Booking> {
    let record: IBookingModel;

    try {
      record = await this.documentModel.findById(id);
    } catch (error) {
      throw new FindRecordError('Find booking by id failed', error);
    }

    if (undefined === record) {
      throw new RecordNotFoundError('Booking not found');
    }

    return BookingRecordFactory.createFromRecord(record);
  }
}

export { BookingRepository };
