import * as _ from 'lodash';

import {
    IMongooseConnection
} from '../../../Core/Database/Driver/Mongoose/Connection/IMongooseConnection';
import {
    MongooseRepository
} from '../../../Core/Database/Driver/Mongoose/Repository/MongooseRepository';
import { AggregateRecordError } from '../../../Core/Error/Repository/AggregateRecordError';
import { BookingStats } from '../Entity/BookingStats';
import { BookingStatus } from '../Entity/BookingStatus';
import { BookingRepository } from './BookingRepository';
import { IBookingStatsRepository } from './IBookingStatsRepository';
import { IBookingModel } from './Model/IBookingModel';
import { BookingSchema } from './Schema/BookingSchema';

class BookingStatsRepository extends MongooseRepository<IBookingModel> implements IBookingStatsRepository {
  public constructor(connection: IMongooseConnection) {
    super(connection, BookingRepository.COLLECTION, BookingSchema);
  }

  public async consolidateByDate(date: string): Promise<BookingStats[]> {
    try {
      const results = await this.documentModel.aggregate([
        {
          $match: {
            status: {
              $in: [BookingStatus.SCHEDULED, BookingStatus.CONFIRMED]
            },
            date
          }
        }, {
          $group: {
            _id: { status: "$status", time: "$time" },
            count: { $sum: 1 }
          }
        }
      ]);

      return this.groupResultsByTime(date, results);
    } catch (error) {
      throw new AggregateRecordError('Failed while consolidate bookings by date', error);
    }
  }

  public async consolidateByDateAndTime(date: string, time: number): Promise<BookingStats> {
    try {
      const results = await this.documentModel.aggregate([
        {
          $match: {
            status: {
              $in: [BookingStatus.SCHEDULED, BookingStatus.CONFIRMED]
            },
            date,
            time
          }
        }, {
          $group: {
            _id: { status: "$status" },
            count: { $sum: 1 }
          }
        }
      ]);

      return this.createStats(date, time, results);
    } catch (error) {
      throw new AggregateRecordError('Failed while consolidate bookings by date and time', error);
    }
  }

  private groupResultsByTime(date: string, results: any[]): any {
    const times = _.uniq(results.map(record => record._id.time));

    return times.map(time => {
      const recordsByTime = results.filter(record => record._id.time === time);

      return this.createStats(date, time, recordsByTime);
    });
  }

  private createStats(date: string, time: number, results: any): BookingStats {
    const initialState = {
      confirmed: 0,
      scheduled: 0,
    };

    const reducedResult = results.reduce((previous, current) => {
      previous[current._id.status] = current.count;

      return previous;
    }, initialState);

    const stats = new BookingStats();
    stats.Date = date;
    stats.Time = time;
    stats.TotalConfirmed = reducedResult.confirmed;
    stats.TotalScheduled = reducedResult.scheduled;

    return stats;
  }
}


export { BookingStatsRepository };
