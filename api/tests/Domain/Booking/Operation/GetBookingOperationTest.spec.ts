import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { describe } from 'mocha';
import * as sinon from 'sinon';

chai.use(chaiAsPromised);

describe('GetBookingOperation', () => {
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('when repository throw RecordNotFoundError', () => {
    it('this test must be implemented');
  });

  describe('when repository throw FindRecordError', () => {
    it('this test must be implemented');
  });
});
