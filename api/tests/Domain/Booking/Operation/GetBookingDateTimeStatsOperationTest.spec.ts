import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { describe } from 'mocha';
import * as sinon from 'sinon';

import { AggregateRecordError } from '../../../../src/Core/Error/Repository/AggregateRecordError';
import { Logger } from '../../../../src/Core/Logger/Logger';
import {
    GetBookingDateTimeStatsGenericError
} from '../../../../src/Domain/Booking/Error/Operation/GetBookingDateTimeStatsGenericError';
import {
    GetBookingDateTimeStatsOperation
} from '../../../../src/Domain/Booking/Operation/GetBookingDateTimeStatsOperation';
import {
    BookingStatsRepository
} from '../../../../src/Domain/Booking/Repository/BookingStatsRepository';
import { Restaurant } from '../../../../src/Domain/Restaurant/Entity/Restaurant';
import { createRestaurant } from '../../../Support/Factories';

chai.use(chaiAsPromised);

describe('GetBookingDateTimeStatsOperation', () => {
  let sandbox: sinon.SinonSandbox;

  let logger: sinon.SinonStubbedInstance<Logger>;
  let bookingStatsRepository: sinon.SinonStubbedInstance<BookingStatsRepository>;

  let operation: GetBookingDateTimeStatsOperation;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    logger = sandbox.createStubInstance(Logger);
    bookingStatsRepository = sandbox.createStubInstance(BookingStatsRepository);

    operation = new GetBookingDateTimeStatsOperation(
      bookingStatsRepository,
      logger
    );
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('when bookingStatsRepository throw AggregateRecordError', () => {
    let restaurant: Restaurant;
    let date: string;
    let time: number;
    const originalError = new Error('any error');

    beforeEach(() => {
      const error = new AggregateRecordError('error', originalError);

      restaurant = createRestaurant();
      date = '2020-03-02';
      time = 10;

      bookingStatsRepository
        .consolidateByDateAndTime
        .withArgs(restaurant, date, time)
        .rejects(error);
    });

    it('throw GetBookingDateTimeStatsGenericError', async () => {
      await chai.expect(operation.execute(restaurant, date, time))
        .to.eventually
        .rejected
        .instanceOf(GetBookingDateTimeStatsGenericError);

      chai.assert(
        logger
          .error
          .withArgs(sinon.match.string, { error: originalError })
          .calledOnce
      );
    });
  });
});
