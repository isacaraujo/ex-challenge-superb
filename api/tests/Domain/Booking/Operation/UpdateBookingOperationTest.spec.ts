import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as _ from 'lodash';
import { describe } from 'mocha';
import * as sinon from 'sinon';

import { SaveRecordError } from '../../../../src/Core/Error/Repository/SaveRecordError';
import { Logger } from '../../../../src/Core/Logger/Logger';
import {
    UpdateBookingGenericError
} from '../../../../src/Domain/Booking/Error/Operation/UpdateBookingGenericError';
import {
    UpdateBookingOperation
} from '../../../../src/Domain/Booking/Operation/UpdateBookingOperation';
import { BookingRepository } from '../../../../src/Domain/Booking/Repository/BookingRepository';
import {
    UpdateBookingCommand
} from '../../../../src/Domain/Booking/Type/Command/Operation/UpdateBookingCommand';
import { createBooking } from '../../../Support/Factories';

chai.use(chaiAsPromised);

const createCommand = (args: Partial<UpdateBookingCommand> = {}): UpdateBookingCommand => {
  const options = _.merge({
    Booking: createBooking(),
    GuestName: 'Homer',
    GuestEmail: 'homer@mail.net',
    TotalGuests: 2
  }, args);

  return new UpdateBookingCommand(
    options.Booking,
    options.GuestName,
    options.GuestEmail,
    options.TotalGuests
  );
}

describe('UpdateBookingOperation', () => {
  let sandbox: sinon.SinonSandbox;
  let logger: sinon.SinonStubbedInstance<Logger>;
  let bookingRepository: sinon.SinonStubbedInstance<BookingRepository>;

  let operation: UpdateBookingOperation;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    logger = sandbox.createStubInstance(Logger);
    bookingRepository = sandbox.createStubInstance(BookingRepository);

    operation = new UpdateBookingOperation(
      bookingRepository,
      logger
    );
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('when bookingRepository throw SaveRecordError', () => {
    let command: UpdateBookingCommand;
    let originalError;

    beforeEach(() => {
      originalError = new Error('any eror');
      const error = new SaveRecordError('save error', originalError);

      command = createCommand();

      bookingRepository
        .update
        .withArgs(command.Booking)
        .rejects(error);
    });

    it('throw UpdateBookingGenericError', async () => {
      await chai.expect(operation.execute(command))
        .to.eventually.rejected
        .instanceOf(UpdateBookingGenericError);

      chai.assert(
        logger.error.withArgs(sinon.match.string, { error: originalError }).calledOnce
      );
    });
  });
});
