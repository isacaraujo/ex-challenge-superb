import { WithStyles } from '@material-ui/core';
import { BookingListStyles } from './Styles/BookingListStyles';

interface IBookingListProps extends WithStyles<typeof BookingListStyles> {}

const IBookingListProps = Symbol.for('IBookingListProps');

export { IBookingListProps };
