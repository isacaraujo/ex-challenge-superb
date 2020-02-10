import * as _ from 'lodash';
import * as moment from 'moment';

import { BookingStats } from '../../src/Domain/Booking/Entity/BookingStats';
import { Restaurant } from '../../src/Domain/Restaurant/Entity/Restaurant';
import { Booking } from '../../src/Domain/Booking/Entity/Booking';
import { BookingStatus } from '../../src/Domain/Booking/Entity/BookingStatus';

const createRestaurant = (args: Partial<Restaurant> = {}): Restaurant => {
  const options = _.merge({
    TablesCount: 20,
    OpenTime: 10,
    CloseTime: 20,
  }, args);

  const restaurant = new Restaurant();
  
  for (let key in options) {
    if (!options.hasOwnProperty(key)) {
      continue;
    }

    restaurant[key] = options[key];
  }

  return restaurant;
}

const createStats = (args: Partial<BookingStats> = {}): BookingStats => {
  const options = _.merge({
    Date: moment().format('YYYY-MM-DD'),
    Time: 15,
    TotalConfirmed: 0,
    TotalScheduled: 0,
  }, args);

  const stats = new BookingStats();
  
  for (let key in options) {
    if (!options.hasOwnProperty(key)) {
      continue;
    }

    stats[key] = options[key];
  }

  return stats;
}

const createBooking = (args: Partial<Booking> = {}): Booking => {
  const now = new Date();
  const options = _.merge({
    Id: 'uniquebookingid',
    CreatedAt: now,
    UpdatedAt: now,
    CanceledAt: undefined,
    ConfirmatedAt: now,
    Date: moment().format('YYYY-MM-DD'),
    Time: 9,
    Guest: {
      Name: 'Mario',
      Email: 'mario@nintendo.jp',
    },
    TotalGuests: 2,
    Status: BookingStatus.CONFIRMED,
    RestaurantId: 'uniquerestaurantid',
    ReservationDate: moment().hour(9).toDate(),
  }, args);

  const booking = new Booking();
  
  for (let key in options) {
    if (!options.hasOwnProperty(key)) {
      continue;
    }

    booking[key] = options[key];
  }

  return booking;
}

export { createRestaurant, createStats, createBooking };
