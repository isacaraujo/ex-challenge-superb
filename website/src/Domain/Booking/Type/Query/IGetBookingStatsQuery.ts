interface IGetBookingStatsQuery {
  date: string;
  time: string;
}

const IGetBookingStatsQuery = Symbol.for('IGetBookingStatsQuery');

export { IGetBookingStatsQuery };
