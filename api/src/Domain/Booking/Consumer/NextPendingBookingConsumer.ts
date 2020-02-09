import {
    ConsumerRejectMessageError
} from '../../../Core/Error/Consumer/ConsumerRejectMessageError';
import { IQueueMessage } from '../../../Core/Queue/Type/Dto/IQueueMessage';
import {
    IFindCurrentRestaurantOperation
} from '../../Restaurant/Operation/IFindCurrentRestaurantOperation';
import { IFindNextWaitingBookingOperation } from '../Operation/IFindNextScheduledBookingOperation';
import { IGetBookingDateTimeStatsOperation } from '../Operation/IGetBookingDateTimeStatsOperation';
import { FindNextWaitingBookingQuery } from '../Type/Query/FindNextWaitingBookingQuery';
import { INextPendingBookingConsumer } from './INextPendingBookingConsumer';

class NextPendingBookingConsumer implements INextPendingBookingConsumer {
  public constructor(
    private readonly findRestaurant: IFindCurrentRestaurantOperation,
    private readonly getStats: IGetBookingDateTimeStatsOperation,
    private readonly findNextWaitingBooking: IFindNextWaitingBookingOperation
  ) {}

  public async receive(message: IQueueMessage): Promise<void> {
    const data = JSON.parse(message.Content);
    const { date, time } = data;

    try {
      const restaurant = await this.findRestaurant.execute();

      const stats = await this.getStats.execute(restaurant, date, time);

      console.log('stats', stats);

      const nextWaitingQuery = FindNextWaitingBookingQuery.create(restaurant, date, time);

      const booking = await this.findNextWaitingBooking.execute(nextWaitingQuery);

      console.log('booking', booking);
    } catch (error) {
      throw new ConsumerRejectMessageError(error.message);
    }
  }
}

export { NextPendingBookingConsumer };
