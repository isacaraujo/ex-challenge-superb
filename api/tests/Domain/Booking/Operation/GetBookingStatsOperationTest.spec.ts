import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { describe } from 'mocha';
import * as sinon from 'sinon';

chai.use(chaiAsPromised);

describe('GetBookingStatsOperation', () => {
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('when repository throw AggregateRecordError', () => {
    it('this test must be implemented');
  });
});
