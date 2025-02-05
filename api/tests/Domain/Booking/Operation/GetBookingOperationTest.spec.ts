import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { describe } from 'mocha';
import * as sinon from 'sinon';

import { FindRecordError } from '../../../../src/Core/Error/Repository/FindRecordError';
import { RecordNotFoundError } from '../../../../src/Core/Error/Repository/RecordNotFoundError';
import { Logger } from '../../../../src/Core/Logger/Logger';
import {
    BookingNotFoundError
} from '../../../../src/Domain/Booking/Error/Operation/BookingNotFoundError';
import {
    FindBookingGenericError
} from '../../../../src/Domain/Booking/Error/Operation/FindBookingGenericError';
import { GetBookingOperation } from '../../../../src/Domain/Booking/Operation/GetBookingOperation';
import { BookingRepository } from '../../../../src/Domain/Booking/Repository/BookingRepository';

chai.use(chaiAsPromised);

describe('GetBookingOperation', () => {
  let sandbox: sinon.SinonSandbox;

  let logger: sinon.SinonStubbedInstance<Logger>;
  let bookingRepository: sinon.SinonStubbedInstance<BookingRepository>;

  let operation: GetBookingOperation;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    logger = sandbox.createStubInstance(Logger);
    bookingRepository = sandbox.createStubInstance(BookingRepository);

    operation = new GetBookingOperation(
      bookingRepository,
      logger
    );
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('when repository throw RecordNotFoundError', () => {
    let bookingId: string;

    beforeEach(() => {
      const error = new RecordNotFoundError('not found');
      bookingId = 'anybookingid';

      bookingRepository
        .findOneById
        .withArgs(bookingId)
        .rejects(error);
    });

    it('throw BookingNotFoundError', async () => {
      await chai.expect(operation.execute(bookingId))
        .to.eventually
        .rejected
        .instanceOf(BookingNotFoundError);
    });
  });

  describe('when repository throw FindRecordError', () => {
    let bookingId: string;
    const originalError = new Error('any error');

    beforeEach(() => {
      const error = new FindRecordError('error', originalError);

      bookingId = 'anybookingid';

      bookingRepository
        .findOneById
        .withArgs(bookingId)
        .rejects(error);
    });

    it('throw FindBookingGenericError', async () => {
      await chai.expect(operation.execute(bookingId))
        .to.eventually
        .rejected
        .instanceOf(FindBookingGenericError);

      chai.assert(
        logger
          .error
          .withArgs(sinon.match.string, { error: originalError })
          .calledOnce
      );
    });
  });
});
