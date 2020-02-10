import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { describe } from 'mocha';
import * as sinon from 'sinon';
import * as _ from 'lodash';

import { SaveRecordError } from '../../../../src/Core/Error/Repository/SaveRecordError';
import { Logger } from '../../../../src/Core/Logger/Logger';
import { BookingRepository } from '../../../../src/Domain/Booking/Repository/BookingRepository';
import {
  ConfirmBookingOperation
} from '../../../../src/Domain/Booking/Operation/ConfirmBookingOperation';
import { createBooking, createStats, createRestaurant } from '../../../Support/Factories';
import {
  ConfirmBookingCommand
} from '../../../../src/Domain/Booking/Type/Command/Operation/ConfirmBookingCommand';
import { BookingNoTablesLeftError } from '../../../../src/Domain/Booking/Error/Operation/BookingNoTablesLeftError';
import { UpdateBookingGenericError } from '../../../../src/Domain/Booking/Error/Operation/UpdateBookingGenericError';

chai.use(chaiAsPromised);

const createCommand = (args: Partial<ConfirmBookingCommand> = {}): ConfirmBookingCommand => {
  const options = _.merge({
    Restaurant: createRestaurant(),
    Stats: createStats(),
    Booking: createBooking(),
    Time: 15,
    GuestName: 'Homer',
    GuestEmail: 'homer@simpson.com',
    TotalGuests: 2,
  }, args);
  
  return new ConfirmBookingCommand(
    options.Restaurant,
    options.Stats,
    options.Booking
  );
}

describe('ConfirmBookingOperation', () => {
  let sandbox: sinon.SinonSandbox;
  let logger: sinon.SinonStubbedInstance<Logger>;
  let bookingRepository: sinon.SinonStubbedInstance<BookingRepository>;

  let operation: ConfirmBookingOperation;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    logger = sandbox.createStubInstance(Logger);
    bookingRepository = sandbox.createStubInstance(BookingRepository);

    operation = new ConfirmBookingOperation(
      bookingRepository,
      logger
    );
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('when there is no table available', () => {
    let command;
    let restaurant;
    let stats;

    beforeEach(() => {
      restaurant = createRestaurant({ TablesCount: 4 });
      stats = createStats({ TotalConfirmed: 4 });
      command = createCommand({ Restaurant: restaurant, Stats: stats });
    });

    it('throw BookingNoTablesLeftError', async () => {
      await chai.expect(operation.execute(command))
        .to.eventually
        .rejected
        .instanceOf(BookingNoTablesLeftError);
    });
  });

  describe('when repository throws SaveRecordError', () => {
    let command;
    let error;
    let originalError;

    beforeEach(() => {
      command = createCommand();
      originalError = new Error('any error');
      error = new SaveRecordError('save error', originalError);

      bookingRepository
        .update
        .withArgs(command.Booking)
        .rejects(error);
    });

    it('throw UpdateBookingGenericError', async () => {
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
