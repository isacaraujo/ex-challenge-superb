import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { describe } from 'mocha';
import * as sinon from 'sinon';

import { SaveRecordError } from '../../../../src/Core/Error/Repository/SaveRecordError';
import { Booking } from '../../../../src/Domain/Booking/Entity/Booking';
import { Logger } from '../../../../src/Core/Logger/Logger';
import { BookingRepository } from '../../../../src/Domain/Booking/Repository/BookingRepository';
import {
  CancelBookingOperation
} from '../../../../src/Domain/Booking/Operation/CancelBookingOperation';
import {
  NextPendingBookingNotifierService
} from '../../../../src/Domain/Booking/Service/NextPendingBookingNotifierService';
import { createBooking } from '../../../Support/Factories';
import { CancelBookingGenericError } from '../../../../src/Domain/Booking/Error/Operation/CancelBookingGenericError';
import { NextPendingBookingNotifyCommand } from '../../../../src/Domain/Booking/Type/Command/Service/NextPendingBookingNotifyCommand';


chai.use(chaiAsPromised);

describe('CancelBookingOperation', () => {
  let sandbox: sinon.SinonSandbox;

  let logger: sinon.SinonStubbedInstance<Logger>;
  let bookingRepository: sinon.SinonStubbedInstance<BookingRepository>;
  let pendingBookingNotifier: sinon.SinonStubbedInstance<NextPendingBookingNotifierService>;

  let operation: CancelBookingOperation;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    logger = sandbox.createStubInstance(Logger);
    bookingRepository = sandbox.createStubInstance(BookingRepository);
    pendingBookingNotifier = sandbox.createStubInstance(NextPendingBookingNotifierService);

    operation = new CancelBookingOperation(
      bookingRepository,
      pendingBookingNotifier,
      logger
    );
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('when bookingRepository throw SaveRecordError', () => {
    let error: SaveRecordError;
    let originalError: Error;
    let booking: Booking;

    beforeEach(() => {
      originalError = new Error('any error');
      error = new SaveRecordError('save error', originalError);
      booking = createBooking();

      bookingRepository
        .update
        .withArgs(booking)
        .rejects(error);
    });

    it('throw CancelBookingGenericError', async () => {
      await chai.expect(operation.execute(booking))
        .to.eventually
        .rejected
        .instanceOf(CancelBookingGenericError);

      chai.assert(
        logger
          .error
          .withArgs(sinon.match.string, { error: originalError })
          .calledOnce
      );
    });
  });

  describe('in case of success', () => {
    let booking: Booking;

    beforeEach(() => {
      booking = createBooking();

      bookingRepository
        .update
        .withArgs(booking)
        .resolves();
    });

    it('notifier should be called', async () => {
      await chai.expect(operation.execute(booking))
        .to.eventually
        .fulfilled;

      chai.assert(
        pendingBookingNotifier
          .notify
          .withArgs(sinon.match.instanceOf(NextPendingBookingNotifyCommand))
          .calledOnce
      );
    });
  });
});
