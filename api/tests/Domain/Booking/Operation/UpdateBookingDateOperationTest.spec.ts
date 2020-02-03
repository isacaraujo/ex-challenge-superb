import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { describe } from 'mocha';
import * as sinon from 'sinon';

chai.use(chaiAsPromised);

describe('UpdateBookingDateOperation', () => {
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('when booking is canceled', () => {
    it('this test must be implemented');
  });

  describe('when new time is before the restaurant opentime', () => {
    it('this test must be implemented');
  });

  describe('when has no tables left', () => {
    it('this test must be implemented');
  });

  describe('when bookingRepository throw SaveRecordError', () => {
    it('this test must be implemented');
  });

  describe('when update booking succesfully', () => {
    it('this test must be implemented');
  });
});
