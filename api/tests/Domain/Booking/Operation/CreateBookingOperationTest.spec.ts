import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { describe } from 'mocha';
import * as sinon from 'sinon';

import { Logger } from '../../../../src/Core/Logger/Logger';
import { Booking } from '../../../../src/Domain/Booking/Entity/Booking';
import {
    CreateBookingOperation
} from '../../../../src/Domain/Booking/Operation/CreateBookingOperation';
import { BookingRepository } from '../../../../src/Domain/Booking/Repository/BookingRepository';
import {
    CreateBookingCommand
} from '../../../../src/Domain/Booking/Type/Command/Operation/CreateBookingCommand';
import { SaveRecordError } from '../../../../src/Core/Error/Repository/SaveRecordError';
import { CreateBookingGenericError } from '../../../../src/Domain/Booking/Error/Operation/CreateBookingGenericError';

chai.use(chaiAsPromised);

describe('CreateBookingOperation', () => {
  let sandbox: sinon.SinonSandbox;

  let logger: sinon.SinonStubbedInstance<Logger>;
  let repository: sinon.SinonStubbedInstance<BookingRepository>;

  let operation: CreateBookingOperation;

  let command: CreateBookingCommand;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    logger = sandbox.createStubInstance(Logger);
    repository = sandbox.createStubInstance(BookingRepository);

    operation = new CreateBookingOperation(repository, logger);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('when booking successfuly', () => {
    beforeEach(() => {
      repository.create
        .withArgs(sinon.match.instanceOf(Booking))
        .resolves();

      command = new CreateBookingCommand(
        '2020-01-01',
        '10:00',
        'Kelvin',
        'maria@mail.net',
        10
      );
    });

    it('should return instanceof Booking', async () => {
      await chai.expect(operation.execute(command))
        .to.eventually
        .instanceOf(Booking);
    });
  });

  describe('when repository throws SaveRecordError', () => {
    const originalError = new Error('sample error');
    const error = new SaveRecordError('failed', originalError);

    beforeEach(() => {
      repository.create
        .withArgs(sinon.match.instanceOf(Booking))
        .rejects(error);

      command = new CreateBookingCommand(
        '2020-01-01',
        '10:00',
        'Kelvin',
        'maria@mail.net',
        10
      );
    });

    it('throws CreateBookingGenericError and log error', async () => {
      await chai.expect(operation.execute(command))
        .to.eventually
        .rejected
        .instanceOf(CreateBookingGenericError);

      chai.assert(
        logger.error.withArgs(sinon.match.string, originalError).calledOnce);
    });
  });

  describe('when repository throws unknown error', () => {
    const error = new Error('sample error');

    beforeEach(() => {
      repository.create
        .withArgs(sinon.match.instanceOf(Booking))
        .rejects(error);

      command = new CreateBookingCommand(
        '2020-01-01',
        '10:00',
        'Kelvin',
        'maria@mail.net',
        10
      );
    });

    it('throws CreateBookingGenericError and log error', async () => {
      await chai.expect(operation.execute(command))
        .to.eventually
        .rejected
        .instanceOf(CreateBookingGenericError);

      chai.assert(
        logger.error.withArgs(sinon.match.string, error).calledOnce);
    });
  });
});
