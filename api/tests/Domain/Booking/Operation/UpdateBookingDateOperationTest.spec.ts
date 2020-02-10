import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as _ from 'lodash';
import { describe } from 'mocha';
import * as moment from 'moment';
import * as sinon from 'sinon';

import { Logger } from '../../../../src/Core/Logger/Logger';
import { BookingStats } from '../../../../src/Domain/Booking/Entity/BookingStats';
import {
    BookingNoTablesLeftError
} from '../../../../src/Domain/Booking/Error/Operation/BookingNoTablesLeftError';
import {
    BookingOutOfTimeRangeError
} from '../../../../src/Domain/Booking/Error/Operation/BookingOutOfTimeRangeError';
import {
    UpdateBookingDateOperation
} from '../../../../src/Domain/Booking/Operation/UpdateBookingDateOperation';
import { BookingRepository } from '../../../../src/Domain/Booking/Repository/BookingRepository';
import {
    UpdateBookingDateCommand
} from '../../../../src/Domain/Booking/Type/Command/Operation/UpdateBookingDateCommand';
import { Restaurant } from '../../../../src/Domain/Restaurant/Entity/Restaurant';
import { createBooking, createRestaurant, createStats } from '../../../Support/Factories';
import { UpdateBookingGenericError } from '../../../../src/Domain/Booking/Error/Operation/UpdateBookingGenericError';
import { SaveRecordError } from '../../../../src/Core/Error/Repository/SaveRecordError';

chai.use(chaiAsPromised);

const createCommand = (args: Partial<UpdateBookingDateCommand> = {}): UpdateBookingDateCommand => {
  const options = _.merge({
    Restaurant: createRestaurant(),
    Stats: createStats(),
    Booking: createBooking(),
    Date: moment().format('YYYY-MM-DD'),
    Time: 15,
  }, args);

  return new UpdateBookingDateCommand(
    options.Booking,
    options.Restaurant,
    options.Stats,
    options.Date,
    options.Time
  );
}

describe('UpdateBookingDateOperation', () => {
  let sandbox: sinon.SinonSandbox;
  let logger: sinon.SinonStubbedInstance<Logger>;
  let bookingRepository: sinon.SinonStubbedInstance<BookingRepository>;

  let operation: UpdateBookingDateOperation;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    logger = sandbox.createStubInstance(Logger);
    bookingRepository = sandbox.createStubInstance(BookingRepository);

    operation = new UpdateBookingDateOperation(
      bookingRepository,
      logger
    );
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('when booking is out of restaurant time range', () => {
    let command: UpdateBookingDateCommand;
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

  describe('when has no tables left', () => {
    let command: UpdateBookingDateCommand;
    let restaurant: Restaurant;
    let stats: BookingStats;

    beforeEach(() => {
      restaurant = createRestaurant({ TablesCount: 4 });
      stats = createStats({ TotalConfirmed: 4 });
      command = createCommand({ Restaurant: restaurant, Stats: stats });
    });

    it('throws BookingNoTablesLeftError', async () => {
      await chai.expect(operation.execute(command))
        .to.eventually
        .rejected
        .instanceOf(BookingNoTablesLeftError);
    });
  });

  describe('when bookingRepository throw SaveRecordError', () => {
    let command: UpdateBookingDateCommand;
    let originalError: Error;
    let error: SaveRecordError;

    beforeEach(() => {
      originalError = new Error('any error');
      error = new SaveRecordError('save error', originalError);

      command = createCommand();

      bookingRepository
        .update
        .withArgs(command.Booking)
        .rejects(error);
    });

    it('throws UpdateBookingGenericError', async () => {
      await chai.expect(operation.execute(command))
        .to.eventually
        .rejected
        .instanceOf(UpdateBookingGenericError);

      chai.assert(
        logger.error.withArgs(sinon.match.string, { error: originalError }).calledOnce
      );
    });
  });
});
