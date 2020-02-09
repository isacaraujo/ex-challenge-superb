import {
    ConsumerRejectMessageError
} from '../../../Core/Error/Consumer/ConsumerRejectMessageError';
import { IQueueMessage } from '../../../Core/Queue/Type/Dto/IQueueMessage';
import {
    IFindCurrentRestaurantOperation
} from '../../Restaurant/Operation/IFindCurrentRestaurantOperation';
import { IConfirmBookingOperation } from '../Operation/IConfirmBookingOperation';
import { IFindNextWaitingBookingOperation } from '../Operation/IFindNextScheduledBookingOperation';
import { IGetBookingDateTimeStatsOperation } from '../Operation/IGetBookingDateTimeStatsOperation';
import { ConfirmBookingCommand } from '../Type/Command/Operation/ConfirmBookingCommand';
import { FindNextWaitingBookingQuery } from '../Type/Query/FindNextWaitingBookingQuery';
import { INextPendingBookingConsumer } from './INextPendingBookingConsumer';

class NextPendingBookingConsumer implements INextPendingBookingConsumer {
  public constructor(
    private readonly findRestaurant: IFindCurrentRestaurantOperation,
    private readonly getStats: IGetBookingDateTimeStatsOperation,
    private readonly findNextWaitingBooking: IFindNextWaitingBookingOperation,
    private readonly confirmBooking: IConfirmBookingOperation
  ) {}

  public async receive(message: IQueueMessage): Promise<void> {
    const data = JSON.parse(message.Content);
    const { date, time } = data;

    try {
      const restaurant = await this.findRestaurant.execute();

      const stats = await this.getStats.execute(restaurant, date, time);

      const nextWaitingQuery = FindNextWaitingBookingQuery.create(restaurant, date, time);

      const booking = await this.findNextWaitingBooking.execute(nextWaitingQuery);

      const confirmBookingCommand = ConfirmBookingCommand.create(
        restaurant,
        stats,
        booking
      );

      await this.confirmBooking.execute(confirmBookingCommand);
    } catch (error) {
      throw new ConsumerRejectMessageError(error.message);
    }
  }
}

export { NextPendingBookingConsumer };
