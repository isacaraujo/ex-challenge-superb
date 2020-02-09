import { FindRecordError } from '../../../Core/Error/Repository/FindRecordError';
import { RecordNotFoundError } from '../../../Core/Error/Repository/RecordNotFoundError';
import { ILogger } from '../../../Core/Logger/ILogger';
import { Booking } from '../Entity/Booking';
import { BookingNotFoundError } from '../Error/Operation/BookingNotFoundError';
import { FindBookingGenericError } from '../Error/Operation/FindBookingGenericError';
import { IBookingRepository } from '../Repository/IBookingRepository';
import { FindNextWaitingBookingQuery } from '../Type/Query/FindNextWaitingBookingQuery';
import { IFindNextWaitingBookingOperation } from './IFindNextScheduledBookingOperation';

class FindNextWaitingBookingOperation implements IFindNextWaitingBookingOperation {
  public constructor(
    private readonly repository: IBookingRepository,
    private readonly logger: ILogger
  ) {}

  public async execute(query: FindNextWaitingBookingQuery): Promise<Booking> {
    try {
      return await this.repository
        .findNextPending(query.Restaurant, query.Date, query.Time);
    } catch (error) {
      this.throwSpecificErrorBasedOn(error);
    }
  }

  private throwSpecificErrorBasedOn(error: Error): void {
    switch (error.constructor) {
      case RecordNotFoundError:
        throw new BookingNotFoundError();
      case FindRecordError:
        const findError = error as FindRecordError;

        this.logger.error(
          `FindBookingGenericError: ${findError.message}`,
          { error: findError.OriginalError }
        );

        throw new FindBookingGenericError();
      default:
        this.logger.error(
          `FindBookingGenericError: ${error.constructor.name}: ${error.message}`,
          { error }
        );

        throw new FindBookingGenericError();
    }
  }
}

export { FindNextWaitingBookingOperation };
