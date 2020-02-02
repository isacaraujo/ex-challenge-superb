import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { describe } from 'mocha';
import * as sinon from 'sinon';

import { SaveRecordError } from '../../../../src/Core/Error/Repository/SaveRecordError';
import { Logger } from '../../../../src/Core/Logger/Logger';
import { Restaurant } from '../../../../src/Domain/Restaurant/Entity/Restaurant';
import {
    UpdateRestaurantGenericError
} from '../../../../src/Domain/Restaurant/Error/Operation/UpdateRestaurantGenericError';
import {
    AddRestaurantTableOperation
} from '../../../../src/Domain/Restaurant/Operation/AddRestaurantTableOperation';
import {
    RestaurantRepository
} from '../../../../src/Domain/Restaurant/Repository/RestaurantRepository';

chai.use(chaiAsPromised);

describe('AddRestaurantTableOperation', () => {
  let sandbox: sinon.SinonSandbox;

  let logger: sinon.SinonStubbedInstance<Logger>;
  let repository: sinon.SinonStubbedInstance<RestaurantRepository>;

  let operation: AddRestaurantTableOperation;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    logger = sandbox.createStubInstance(Logger);
    repository = sandbox.createStubInstance(RestaurantRepository);

    operation = new AddRestaurantTableOperation(repository, logger);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('when restaurant was updated', () => {
    const restaurant = new Restaurant();

    beforeEach(() => {
      repository.update
        .withArgs(restaurant)
        .resolves();
    });

    it('should be resolved', async () => {
      const spyRestaurantIncrementTable = sandbox.spy(restaurant, 'incrementTable');

      await chai.expect(operation.execute(restaurant))
        .to.be.fulfilled;

      chai.assert(spyRestaurantIncrementTable.calledOnce);
    });
  });

  describe('when repository throws SaveRecordError', () => {
    const originalError = new Error('failed')
    const error = new SaveRecordError('sample failed', originalError);
    const restaurant = new Restaurant();

    beforeEach(() => {
      repository.update
        .withArgs(restaurant)
        .rejects(error);
    });

    it('throws UpdateRestaurantGenericError', async () => {
      const spyRestaurantIncrementTable = sandbox.spy(restaurant, 'incrementTable');

      await chai.expect(operation.execute(restaurant))
        .to.eventually
        .rejected
        .instanceOf(UpdateRestaurantGenericError);

      chai.assert(spyRestaurantIncrementTable.calledOnce);
      chai.assert(
        logger.error.withArgs(sinon.match.string, { error: originalError }).calledOnce);
    });
  });
});

