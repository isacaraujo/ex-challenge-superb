import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { describe } from 'mocha';
import * as sinon from 'sinon';

import { SaveRecordError } from '../../../../src/Core/Error/Repository/SaveRecordError';
import { Logger } from '../../../../src/Core/Logger/Logger';
import { Booking } from '../../../../src/Domain/Booking/Entity/Booking';
import { BookingStats } from '../../../../src/Domain/Booking/Entity/BookingStats';
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
    BookingStatsRepository
} from '../../../../src/Domain/Booking/Repository/BookingStatsRepository';
import {
    CreateBookingCommand
} from '../../../../src/Domain/Booking/Type/Command/Operation/CreateBookingCommand';
import { Restaurant } from '../../../../src/Domain/Restaurant/Entity/Restaurant';
import { BookingStatus } from '../../../../src/Domain/Booking/Entity/BookingStatus';
import { BookingNoTablesLeftError } from '../../../../src/Domain/Booking/Error/Operation/BookingNoTablesLeftError';

chai.use(chaiAsPromised);

describe('CreateBookingOperation', () => {
  let sandbox: sinon.SinonSandbox;

  let logger: sinon.SinonStubbedInstance<Logger>;
  let bookingRepository: sinon.SinonStubbedInstance<BookingRepository>;
  let bookingStatsRepository: sinon.SinonStubbedInstance<BookingStatsRepository>;

  let operation: CreateBookingOperation;

  let command: CreateBookingCommand;

  let restaurant: Restaurant;

  let stats: BookingStats;

  const bookingDate = '2020-01-01';
  const bookingTime = 10;
  const totalGuests = 10;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    logger = sandbox.createStubInstance(Logger);
    bookingRepository = sandbox.createStubInstance(BookingRepository);
    bookingStatsRepository = sandbox.createStubInstance(BookingStatsRepository);

    operation = new CreateBookingOperation(
      bookingRepository,
      bookingStatsRepository,
      logger
    );

    restaurant = new Restaurant();
    restaurant.TablesCount = 10;
    restaurant.OpenTime = 8;
    restaurant.CloseTime = 20;

    stats = new BookingStats();
    stats.Date = bookingDate;
    stats.Time = bookingTime;
    stats.TotalConfirmed = 0;
    stats.TotalScheduled = 0;
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('when restaurant has slots available', () => {
    beforeEach(() => {
      bookingRepository.create
        .withArgs(sinon.match.instanceOf(Booking))
        .resolves();

      bookingStatsRepository.consolidateByDateAndTime
        .withArgs(restaurant, bookingDate, bookingTime)
        .resolves(stats);

      command = new CreateBookingCommand(
        restaurant,
        bookingDate,
        bookingTime,
        'Kelvin',
        'maria@mail.net',
        totalGuests
      );
    });

    it('should booking status be CONFIRMED', async () => {
      await chai.expect(operation.execute(command))
        .to.eventually
        .fulfilled
        .instanceOf(Booking)
        .include({ status: BookingStatus.CONFIRMED });
    });
  });

  describe('when restaurant has no slots available', () => {
    beforeEach(() => {
      stats.TotalConfirmed = restaurant.TablesCount;

      bookingRepository.create
        .withArgs(sinon.match.instanceOf(Booking))
        .resolves();

      bookingStatsRepository.consolidateByDateAndTime
        .withArgs(restaurant, bookingDate, bookingTime)
        .resolves(stats);

      command = new CreateBookingCommand(
        restaurant,
        bookingDate,
        bookingTime,
        'Kelvin',
        'maria@mail.net',
        totalGuests
      );
    });

    it('should booking status be SCHEDULED', async () => {
      await chai.expect(operation.execute(command))
        .to.eventually
        .rejected
        .instanceOf(BookingNoTablesLeftError);
    });
  });

  describe('when restaurant has slot available but scheduled booking in queue', () => {
    beforeEach(() => {
      stats.TotalScheduled = 1;

      bookingRepository.create
        .withArgs(sinon.match.instanceOf(Booking))
        .resolves();

      bookingStatsRepository.consolidateByDateAndTime
        .withArgs(restaurant, bookingDate, bookingTime)
        .resolves(stats);

      command = new CreateBookingCommand(
        restaurant,
        bookingDate,
        bookingTime,
        'Kelvin',
        'maria@mail.net',
        totalGuests
      );
    });

    it('should booking status be SCHEDULED', async () => {
      await chai.expect(operation.execute(command))
        .to.eventually
        .rejected
        .instanceOf(BookingNoTablesLeftError);
    });
  });

  describe('when restaurant close in next day', () => {
    beforeEach(() => {
      restaurant.OpenTime = 20;
      restaurant.CloseTime = 26;

      const time = 1;

      bookingRepository.create
        .withArgs(sinon.match.instanceOf(Booking))
        .resolves();

      bookingStatsRepository.consolidateByDateAndTime
        .withArgs(restaurant, bookingDate, Restaurant.DAY_IN_HOURS + time)
        .resolves(stats);

      command = new CreateBookingCommand(
        restaurant,
        bookingDate,
        time,
        'Kelvin',
        'maria@mail.net',
        totalGuests
      );
    });

    it('should be fulfilled', async () => {
      await chai.expect(operation.execute(command))
        .to.eventually
        .fulfilled
        .instanceOf(Booking);
    });
  });

  describe('when reservation time is before restaurant open time', () => {
    beforeEach(() => {
      const date = '2020-01-01';
      const time = restaurant.OpenTime - 1;

      bookingRepository.create
        .withArgs(sinon.match.instanceOf(Booking))
        .resolves();

      command = new CreateBookingCommand(
        restaurant,
        date,
        time,
        'Kelvin',
        'maria@mail.net',
        totalGuests
      );
    });

    it('throws BookingOutOfTimeRangeError', async () => {
      await chai.expect(operation.execute(command))
        .to.eventually
        .rejected
        .instanceOf(BookingOutOfTimeRangeError);
    });
  });

  describe('when repository throws SaveRecordError', () => {
    const originalError = new Error('sample error');
    const error = new SaveRecordError('failed', originalError);

    beforeEach(() => {
      bookingRepository.create
        .withArgs(sinon.match.instanceOf(Booking))
        .rejects(error);

      bookingStatsRepository.consolidateByDateAndTime
        .withArgs(restaurant, bookingDate, bookingTime)
        .resolves(stats);

      command = new CreateBookingCommand(
        restaurant,
        '2020-01-01',
        10,
        'Kelvin',
        'maria@mail.net',
        totalGuests
      );
    });

    it('throws CreateBookingGenericError and log error', async () => {
      await chai.expect(operation.execute(command))
        .to.eventually
        .rejected
        .instanceOf(CreateBookingGenericError);

      chai.assert(
        logger.error.withArgs(sinon.match.string, { error: originalError }).calledOnce);
    });
  });

  describe('when repository throws unknown error', () => {
    const error = new Error('sample error');

    beforeEach(() => {
      bookingRepository.create
        .withArgs(sinon.match.instanceOf(Booking))
        .rejects(error);

      bookingStatsRepository.consolidateByDateAndTime
        .withArgs(restaurant, bookingDate, bookingTime)
        .resolves(stats);

      command = new CreateBookingCommand(
        restaurant,
        '2020-01-01',
        10,
        'Kelvin',
        'maria@mail.net',
        totalGuests
      );
    });

    it('throws CreateBookingGenericError and log error', async () => {
      await chai.expect(operation.execute(command))
        .to.eventually
        .rejected
        .instanceOf(CreateBookingGenericError);

      chai.assert(
        logger.error.withArgs(sinon.match.string, { error }).calledOnce);
    });
  });
});
