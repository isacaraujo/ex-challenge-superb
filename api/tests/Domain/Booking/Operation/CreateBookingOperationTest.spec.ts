import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as _ from 'lodash';
import { describe } from 'mocha';
import * as moment from 'moment';
import * as sinon from 'sinon';

import { SaveRecordError } from '../../../../src/Core/Error/Repository/SaveRecordError';
import { Logger } from '../../../../src/Core/Logger/Logger';
import { Booking } from '../../../../src/Domain/Booking/Entity/Booking';
import { BookingStats } from '../../../../src/Domain/Booking/Entity/BookingStats';
import { BookingStatus } from '../../../../src/Domain/Booking/Entity/BookingStatus';
import {
    BookingOutOfTimeRangeError
} from '../../../../src/Domain/Booking/Error/Operation/BookingOutOfTimeRangeError';
import {
    CreateBookingGenericError
} from '../../../../src/Domain/Booking/Error/Operation/CreateBookingGenericError';
import {
    CreateBookingOperation
} from '../../../../src/Domain/Booking/Operation/CreateBookingOperation';
import { BookingRepository } from '../../../../src/Domain/Booking/Repository/BookingRepository';
import {
    CreateBookingCommand
} from '../../../../src/Domain/Booking/Type/Command/Operation/CreateBookingCommand';
import { Restaurant } from '../../../../src/Domain/Restaurant/Entity/Restaurant';
import { createRestaurant, createStats } from '../../../Support/Factories';

chai.use(chaiAsPromised);

const createCommand = (args: Partial<CreateBookingCommand> = {}): CreateBookingCommand => {
  const options = _.merge({
    Restaurant: createRestaurant(),
    Stats: createStats(),
    Date: moment().format('YYYY-MM-DD'),
    Time: 15,
    GuestName: 'Homer',
    GuestEmail: 'homer@simpson.com',
    TotalGuests: 2,
  }, args);
  
  return new CreateBookingCommand(
    options.Restaurant,
    options.Stats,
    options.Date,
    options.Time,
    options.GuestName,
    options.GuestEmail,
    options.TotalGuests
  );
}

describe('CreateBookingOperation', () => {
  let sandbox: sinon.SinonSandbox;

  let logger: sinon.SinonStubbedInstance<Logger>;
  let bookingRepository: sinon.SinonStubbedInstance<BookingRepository>;

  let operation: CreateBookingOperation;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    logger = sandbox.createStubInstance(Logger);
    bookingRepository = sandbox.createStubInstance(BookingRepository);

    operation = new CreateBookingOperation(
      bookingRepository,
      logger
    );
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('when booking is out of restaurant time range', () => {
    let command: CreateBookingCommand;
    let restaurant: Restaurant;

    beforeEach(() => {
      restaurant = createRestaurant({ OpenTime: 10 });
      command = createCommand({ Restaurant: restaurant, Time: 9 });
    });

    it('throws BookingOutOfTimeRangeError', async () => {
      await chai.expect(operation.execute(command))
        .to.eventually
        .rejected
        .instanceOf(BookingOutOfTimeRangeError);
    });
  });

  describe('when bookingStats.TotalScheduled is 1', () => {
    let command: CreateBookingCommand;
    let stats: BookingStats;

    beforeEach(() => {
      stats = createStats({ TotalScheduled: 1 });
      command = createCommand({ Stats: stats });

      bookingRepository
        .create
        .withArgs(sinon.match.instanceOf(Booking))
        .resolves();
    });

    it('should booking.status be "scheduled"', async () => {
      await chai.expect(operation.execute(command))
        .to.eventually
        .fulfilled
        .instanceOf(Booking)
        .include({ Status: BookingStatus.SCHEDULED, });
    });
  });

  describe('when bookingStats.TotalConfirmed is eq restaurant.TablesCount', () => {
    let command: CreateBookingCommand;
    let stats: BookingStats;
    let restaurant: Restaurant;

    beforeEach(() => {
      restaurant = createRestaurant({ TablesCount: 4 });
      stats = createStats({ TotalConfirmed: 4 });
      command = createCommand({ Stats: stats, Restaurant: restaurant });

      bookingRepository
        .create
        .withArgs(sinon.match.instanceOf(Booking))
        .resolves();
    });

    it('should booking.status be "scheduled"', async () => {
      await chai.expect(operation.execute(command))
        .to.eventually
        .fulfilled
        .instanceOf(Booking)
        .include({ Status: BookingStatus.SCHEDULED, });
    });
  });

  describe('when scheduled time is for the next day', () => {
    let command: CreateBookingCommand;
    let restaurant: Restaurant;
    let momentDate;

    beforeEach(() => {
      restaurant = createRestaurant({ OpenTime: 22, CloseTime: 3 });

      momentDate = moment('2020-03-02');

      const date = momentDate.format('YYYY-MM-DD');

      command = createCommand({ Restaurant: restaurant, Date: date, Time: 2 });

      bookingRepository
        .create
        .withArgs(sinon.match.instanceOf(Booking))
        .resolves();
    });

    it('should booking.status be "scheduled"', async () => {
      const booking = await operation.execute(command);

      chai.expect(booking.ReservationDate.getDate())
        .to.eq(momentDate.date() + 1);
    });
  });

  describe('when repository throw SaveRecordError', () => {
    let command: CreateBookingCommand;
    let error: SaveRecordError;
    let originalError: Error;

    beforeEach(() => {
      originalError = new Error('any error');
      error = new SaveRecordError('save error', originalError);

      command = createCommand();

      bookingRepository
        .create
        .withArgs(sinon.match.instanceOf(Booking))
        .rejects(error);
    });

    it('should booking.status be "scheduled"', async () => {
      await chai.expect(operation.execute(command))
        .to.eventually
        .rejected
        .instanceOf(CreateBookingGenericError);

      chai.assert(
        logger
          .error
          .withArgs(sinon.match.string, { error: originalError })
          .calledOnce
      );
    });
  });
});
