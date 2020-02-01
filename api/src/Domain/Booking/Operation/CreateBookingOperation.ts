import { SaveRecordError } from '../../../Core/Error/Repository/SaveRecordError';
import { ILogger } from '../../../Core/Logger/ILogger';
import { Booking } from '../Entity/Booking';
import { CreateBookingGenericError } from '../Error/Operation/CreateBookingGenericError';
import { IBookingRepository } from '../Repository/IBookingRepository';
import { CreateBookingCommand } from '../Type/Command/Operation/CreateBookingCommand';
import { ICreateBookingOperation } from './ICreateBookingOperation';

class CreateBookingOperation implements ICreateBookingOperation {
  public constructor(
    private readonly repository: IBookingRepository,
    private readonly logger: ILogger
  ) {}

  public async execute(command: CreateBookingCommand): Promise<Booking> {
    const booking = Booking.newBooking(
      command.Date,
      command.Time,
      command.GuestName,
      command.GuestEmail,
      command.TotalGuests
    );

    try {
      await this.repository.create(booking);

      return booking;
    } catch (error) {
      this.throwSpecificErrorBasedOn(error);
    }
  }

  private throwSpecificErrorBasedOn(error: Error): void {
    if (error instanceof SaveRecordError) {
      const saveError = error as SaveRecordError;

      this.logger.error('CreateBookingOperation#execute() failed', saveError.OriginalError);

      throw new CreateBookingGenericError(error.message);
    }

    this.logger.error('CreateBookingOperation#execute() failed', error);

    throw new CreateBookingGenericError(error.message);
  }
}

export { CreateBookingOperation };
