import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { describe } from 'mocha';
import * as sinon from 'sinon';

import { Logger } from '../../../../src/Core/Logger/Logger';
import { Restaurant } from '../../../../src/Domain/Restaurant/Entity/Restaurant';
import {
    FindCurrentRestaurantOperation
} from '../../../../src/Domain/Restaurant/Operation/FindCurrentRestaurantOperation';
import {
    RestaurantRepository
} from '../../../../src/Domain/Restaurant/Repository/RestaurantRepository';
import { RecordNotFoundError } from '../../../../src/Core/Error/Repository/RecordNotFoundError';
import { RestaurantNotFoundError } from '../../../../src/Domain/Restaurant/Error/Operation/RestaurantNotFoundError';
import { FindRecordError } from '../../../../src/Core/Error/Repository/FindRecordError';
import { FindRestaurantGenericError } from '../../../../src/Domain/Restaurant/Error/Operation/FindRestaurantGenericError';

chai.use(chaiAsPromised);

describe('FindCurrentRestaurantOperation', () => {
  let sandbox: sinon.SinonSandbox;

  let logger: sinon.SinonStubbedInstance<Logger>;
  let repository: sinon.SinonStubbedInstance<RestaurantRepository>;

  let operation: FindCurrentRestaurantOperation;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    logger = sandbox.createStubInstance(Logger);
    repository = sandbox.createStubInstance(RestaurantRepository);

    operation = new FindCurrentRestaurantOperation(repository, logger);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('when restaurant found', () => {
    const restaurant = new Restaurant();

    beforeEach(() => {
      repository.findOne
        .resolves(restaurant);
    });

    it('should return instanceof Restaurant', async () => {
      await chai.expect(operation.execute())
        .to.eventually
        .instanceOf(Restaurant);
    });
  });

  describe('when repository throws RecordNotFoundError', () => {
    const error = new RecordNotFoundError('not found');

    beforeEach(() => {
      repository.findOne
        .rejects(error);
    });

    it('throws RestaurantNotFoundError', async () => {
      await chai.expect(operation.execute())
        .to.eventually
        .rejected
        .instanceOf(RestaurantNotFoundError);
    });
  });

  describe('when repository throws FindRecordError', () => {
    const originalError = new Error('sample error');
    const error = new FindRecordError('sample', originalError);

    beforeEach(() => {
      repository.findOne
        .rejects(error);
    });

    it('throws CreateBookingGenericError and log error', async () => {
      await chai.expect(operation.execute())
        .to.eventually
        .rejected
        .instanceOf(FindRestaurantGenericError);

      chai.assert(
        logger.error
          .withArgs(sinon.match.string, { error: originalError }).calledOnce);
    });
  });
});
