import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as _ from 'lodash';
import { describe } from 'mocha';
import * as sinon from 'sinon';

import { AggregateRecordError } from '../../../../src/Core/Error/Repository/AggregateRecordError';
import { Logger } from '../../../../src/Core/Logger/Logger';
import {
    GetBookingStatsGenericError
} from '../../../../src/Domain/Booking/Error/Operation/GetBookingStatsGenericError';
import {
    GetBookingStatsOperation
} from '../../../../src/Domain/Booking/Operation/GetBookingStatsOperation';
import {
    BookingStatsRepository
} from '../../../../src/Domain/Booking/Repository/BookingStatsRepository';
import {
    GetBookingStatsQuery
} from '../../../../src/Domain/Booking/Type/Query/GetBookingStatsQuery';
import { Restaurant } from '../../../../src/Domain/Restaurant/Entity/Restaurant';
import { createRestaurant } from '../../../Support/Factories';

chai.use(chaiAsPromised);

const createQuery = (args: Partial<GetBookingStatsQuery> = {}): GetBookingStatsQuery => {
  const options = _.merge({
    Restaurant: createRestaurant(),
    Date: '2020-03-02',
  }, args);

  return new GetBookingStatsQuery(
    options.Restaurant,
    options.Date
  );
}

describe('GetBookingStatsOperation', () => {
  let sandbox: sinon.SinonSandbox;
  let logger: sinon.SinonStubbedInstance<Logger>;
  let bookingStatsRepository: sinon.SinonStubbedInstance<BookingStatsRepository>;

  let operation: GetBookingStatsOperation;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    logger = sandbox.createStubInstance(Logger);
    bookingStatsRepository = sandbox.createStubInstance(BookingStatsRepository);

    operation = new GetBookingStatsOperation(
      bookingStatsRepository,
      logger
    );
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('when repository throw AggregateRecordError', () => {
    let query: GetBookingStatsQuery;
    let error;
    let originalError;

    beforeEach(() => {
      query = createQuery();
      originalError = new Error('any error');
      error = new AggregateRecordError('aggregate error', error);

      bookingStatsRepository
        .consolidateByDate
        .withArgs(query.Restaurant, query.Date)
        .rejects(error);
    });

    it('throw GetBookingStatsGenericError', async () => {
      await chai.expect(operation.execute(query))
        .to.eventually
        .rejected
        .instanceOf(GetBookingStatsGenericError);

      chai.assert(
        logger.error.withArgs(sinon.match.string, { error: originalError })
      );
    });
  });

  describe('when restaurant timerange is from 10 to 22', () => {
    let query: GetBookingStatsQuery;
    let restaurant: Restaurant;

    beforeEach(() => {
      restaurant = createRestaurant({ OpenTime: 10, CloseTime: 22 });

      query = createQuery({ Restaurant: restaurant });

      bookingStatsRepository
        .consolidateByDate
        .withArgs(query.Restaurant, query.Date)
        .resolves([]);
    });

    it('should match length, openTime and closeTime', async () => {
      const stats = await operation.execute(query);

      chai.expect(stats.length)
        .to.eq(restaurant.CloseTime - restaurant.OpenTime);

      chai.expect(stats[0].Time).to.eq(restaurant.OpenTime);
      chai.expect(stats[stats.length - 1].Time).to.eq(restaurant.CloseTime - 1);
    });
  });

  describe('when restaurant timerange is from 22 to 2', () => {
    let query: GetBookingStatsQuery;
    let restaurant: Restaurant;

    beforeEach(() => {
      restaurant = createRestaurant({ OpenTime: 22, CloseTime: 2 });

      query = createQuery({ Restaurant: restaurant });

      bookingStatsRepository
        .consolidateByDate
        .withArgs(query.Restaurant, query.Date)
        .resolves([]);
    });

    it('should have 4 times', async () => {
      const stats = await operation.execute(query);

      chai.expect(stats.length).to.eq(4);

      chai.expect(stats[0].Time).to.eq(restaurant.OpenTime);
      chai.expect(stats[stats.length - 1].Time).to.eq(restaurant.CloseTime - 1);
    });
  });
});
