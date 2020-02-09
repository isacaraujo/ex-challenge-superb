import {
    ConsumerRejectMessageError
} from '../../../Core/Error/Consumer/ConsumerRejectMessageError';
import { IQueueMessage } from '../../../Core/Queue/Type/Dto/IQueueMessage';
import {
    IFindCurrentRestaurantOperation
} from '../../Restaurant/Operation/IFindCurrentRestaurantOperation';
import { IGetBookingDateTimeStatsOperation } from '../Operation/IGetBookingDateTimeStatsOperation';
import { INextPendingBookingConsumer } from './INextPendingBookingConsumer';

class NextPendingBookingConsumer implements INextPendingBookingConsumer {
  public constructor(
    private readonly findRestaurant: IFindCurrentRestaurantOperation,
    private readonly getStats: IGetBookingDateTimeStatsOperation
  ) {}

  public async receive(message: IQueueMessage): Promise<void> {
    const data = JSON.parse(message.Content);
    const { date, time } = data;

    try {
      const restaurant = await this.findRestaurant.execute();

      const stats = await this.getStats.execute(restaurant, date, time);

      console.log('stats', stats);
    } catch (error) {
      throw new ConsumerRejectMessageError(error.message);
    }

    // const nextBooking = await this.getNextScheduledBooking(restaurant, date, time);

    // const command = ConfirmBookingCommand.create(restaurant, stats, nextBooking);

    // await this.confirmBooking(command);

    // if (stats.TotalScheduled < 1) {
    //   const message = 'There is no scheduled booking';

    //   throw new ConsumerRejectMessageError(message);
    // }

    // if (restaurant.TablesCount - stats.TotalConfirmed < 1) {
    //   const message = `Restaurant tables: ${restaurant.TablesCount}; Total Confirmed: ${stats.TotalConfirmed}; no tables available`;

    //   throw new ConsumerRejectMessageError(message);
    // }
  }
}

export { NextPendingBookingConsumer };
