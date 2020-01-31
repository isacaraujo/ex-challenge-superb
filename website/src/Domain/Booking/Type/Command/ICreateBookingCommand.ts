interface ICreateBookingCommand {
  name: string;
  email: string;
  totalGuests: string;
  date: string;
  time: string;
}

const ICreateBookingCommand = Symbol.for('ICreateBookingCommand');

export { ICreateBookingCommand };
