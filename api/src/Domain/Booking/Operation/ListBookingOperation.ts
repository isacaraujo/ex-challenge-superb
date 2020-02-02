import { FindRecordError } from '../../../Core/Error/Repository/FindRecordError';
import { ILogger } from '../../../Core/Logger/ILogger';
import { Booking } from '../Entity/Booking';
import { ListBookingGenericError } from '../Error/Operation/ListBookingGenericError';
import { IBookingRepository } from '../Repository/IBookingRepository';
import { ListBookingQuery } from '../Type/Query/ListBookingQuery';
import { IListBookingOperation } from './IListBookingOperation';

class ListBookingOperation implements IListBookingOperation {
  public constructor(
    private readonly repository: IBookingRepository,
    private readonly logger: ILogger
  ) {}

  public async execute(query: ListBookingQuery): Promise<Booking[]> {
    try {
      return await this.repository.findAllBookingsByDate(query.Date);
    } catch (error) {
      this.throwSpecificErrorBasedOn(error);
    }
  }

  private throwSpecificErrorBasedOn(error: Error): void {
    switch (error.constructor) {
      case FindRecordError:
        const findError = error as FindRecordError;
        this.logger.error(
          `ListBookingGenericError: ${findError.message}`,
          { error: findError.OriginalError }
        );

        throw new ListBookingGenericError();
      default:
        this.logger.error(
          `ListBookingGenericError: ${error.constructor.name} ${error.message}`,
          { error }
        );

        throw new ListBookingGenericError();
    }
  }
}

export { ListBookingOperation };
