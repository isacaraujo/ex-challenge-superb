import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as _ from 'lodash';
import { describe } from 'mocha';
import * as sinon from 'sinon';

import { FindRecordError } from '../../../../src/Core/Error/Repository/FindRecordError';
import { Logger } from '../../../../src/Core/Logger/Logger';
import {
    ListBookingGenericError
} from '../../../../src/Domain/Booking/Error/Operation/ListBookingGenericError';
import {
    ListBookingOperation
} from '../../../../src/Domain/Booking/Operation/ListBookingOperation';
import { BookingRepository } from '../../../../src/Domain/Booking/Repository/BookingRepository';
import { ListBookingQuery } from '../../../../src/Domain/Booking/Type/Query/ListBookingQuery';

chai.use(chaiAsPromised);

const createQuery = (args: Partial<ListBookingQuery> = {}): ListBookingQuery => {
  const options = _.merge({
    Date: '2020-03-02'
  }, args);

  return new ListBookingQuery(
    options.Date
  );
}

describe('ListBookingOperation', () => {
  let sandbox: sinon.SinonSandbox;

  let logger: sinon.SinonStubbedInstance<Logger>;
  let bookingRepository: sinon.SinonStubbedInstance<BookingRepository>;

  let operation: ListBookingOperation;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    logger = sandbox.createStubInstance(Logger);
    bookingRepository = sandbox.createStubInstance(BookingRepository);

    operation = new ListBookingOperation(
      bookingRepository,
      logger
    );
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('when repository throw FindRecordError', () => {
    let query: ListBookingQuery;
    const originalError = new Error('any error');

    beforeEach(() => {
      const error = new FindRecordError('error', originalError);

      query = createQuery();

      bookingRepository
        .findAllBookingsByDate
        .withArgs(query.Date)
        .rejects(error);
    });

    it('throw ListBookingGenericError', async () => {
      await chai.expect(operation.execute(query))
        .to.eventually
        .rejected
        .instanceOf(ListBookingGenericError);

      chai.assert(
        logger
          .error
          .withArgs(sinon.match.string, { error: originalError })
          .calledOnce
      );
    });
  });
});
