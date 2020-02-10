import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as _ from 'lodash';
import { describe } from 'mocha';
import * as sinon from 'sinon';

import { FindRecordError } from '../../../../src/Core/Error/Repository/FindRecordError';
import { RecordNotFoundError } from '../../../../src/Core/Error/Repository/RecordNotFoundError';
import { Logger } from '../../../../src/Core/Logger/Logger';
import {
    BookingNotFoundError
} from '../../../../src/Domain/Booking/Error/Operation/BookingNotFoundError';
import {
    FindNextWaitingBookingOperation
} from '../../../../src/Domain/Booking/Operation/FindNextWaitingBookingOperation';
import { BookingRepository } from '../../../../src/Domain/Booking/Repository/BookingRepository';
import {
    FindNextWaitingBookingQuery
} from '../../../../src/Domain/Booking/Type/Query/FindNextWaitingBookingQuery';
import { createRestaurant } from '../../../Support/Factories';
import { FindBookingGenericError } from '../../../../src/Domain/Booking/Error/Operation/FindBookingGenericError';

chai.use(chaiAsPromised);

const createQuery = (args: Partial<FindNextWaitingBookingQuery> = {}): FindNextWaitingBookingQuery => {
  const options = _.merge({
    Restaurant: createRestaurant(),
    Date: '2020-03-02',
    Time: 10
  }, args);

  return new FindNextWaitingBookingQuery(
    options.Restaurant,
    options.Date,
    options.Time
  );
}

describe('FindNextWaitingBookingOperation', () => {
  let sandbox: sinon.SinonSandbox;

  let logger: sinon.SinonStubbedInstance<Logger>;
  let bookingRepository: sinon.SinonStubbedInstance<BookingRepository>;

  let operation: FindNextWaitingBookingOperation;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    logger = sandbox.createStubInstance(Logger);
    bookingRepository = sandbox.createStubInstance(BookingRepository);

    operation = new FindNextWaitingBookingOperation(
      bookingRepository,
      logger
    );
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('when repository throw RecordNotFoundError', () => {
    let query: FindNextWaitingBookingQuery;

    beforeEach(() => {
      const error = new RecordNotFoundError('not found');

      query = createQuery();

      bookingRepository
        .findNextPending
        .withArgs(query.Restaurant, query.Date, query.Time)
        .rejects(error)
    });

    it('throw BookingNotFoundError', async () => {
      await chai.expect(operation.execute(query))
        .to.eventually
        .rejected
        .instanceOf(BookingNotFoundError);
    });
  });

  describe('when repository throw FindRecordError', () => {
    let query: FindNextWaitingBookingQuery;
    let originalError = new Error('any error');

    beforeEach(() => {
      const error = new FindRecordError('error', originalError);

      query = createQuery();

      bookingRepository.findNextPending
        .withArgs(query.Restaurant, query.Date, query.Time)
        .rejects(error)
    });

    it('throw FindBookingGenericError', async () => {
      await chai.expect(operation.execute(query))
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
