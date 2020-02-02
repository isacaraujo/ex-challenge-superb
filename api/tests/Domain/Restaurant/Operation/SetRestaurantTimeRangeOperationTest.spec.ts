import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { describe } from 'mocha';
import * as sinon from 'sinon';

import { Logger } from '../../../../src/Core/Logger/Logger';
import { Restaurant } from '../../../../src/Domain/Restaurant/Entity/Restaurant';
import {
    SetRestaurantTimeRangeOperation
} from '../../../../src/Domain/Restaurant/Operation/SetRestaurantTimeRangeOperation';
import {
    RestaurantRepository
} from '../../../../src/Domain/Restaurant/Repository/RestaurantRepository';
import {
    SetRestaurantTimeRangeCommand
} from '../../../../src/Domain/Restaurant/Type/Command/SetRestaurantTimeRangeCommand';
import { UpdateRestaurantGenericError } from '../../../../src/Domain/Restaurant/Error/Operation/UpdateRestaurantGenericError';
import { SaveRecordError } from '../../../../src/Core/Error/Repository/SaveRecordError';

chai.use(chaiAsPromised);

describe('SetRestaurantTimeRangeOperation', () => {
  let sandbox: sinon.SinonSandbox;

  let logger: sinon.SinonStubbedInstance<Logger>;
  let repository: sinon.SinonStubbedInstance<RestaurantRepository>;

  let operation: SetRestaurantTimeRangeOperation;

  let command: SetRestaurantTimeRangeCommand;

  let openTime = 10;
  let closeTime = 20;

  const restaurant = new Restaurant();

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    logger = sandbox.createStubInstance(Logger);
    repository = sandbox.createStubInstance(RestaurantRepository);

    operation = new SetRestaurantTimeRangeOperation(repository, logger);

    command = new SetRestaurantTimeRangeCommand(restaurant, openTime, closeTime);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('when restaurant was updated', () => {
    beforeEach(() => {
      repository.update
        .withArgs(restaurant)
        .resolves();
    });

    it('should be resolved', async () => {
      await chai.expect(operation.execute(command))
        .to.be.fulfilled;
    });
  });

  describe('when repository throws SaveRecordError', () => {
    const originalError = new Error('failed')
    const error = new SaveRecordError('sample failed', originalError);

    beforeEach(() => {
      repository.update
        .withArgs(restaurant)
        .rejects(error);
    });

    it('throws UpdateRestaurantGenericError', async () => {
      await chai.expect(operation.execute(command))
        .to.eventually
        .rejected
        .instanceOf(UpdateRestaurantGenericError);

      chai.assert(
        logger.error.withArgs(sinon.match.string, { error: originalError }).calledOnce);
    });
  });
});
