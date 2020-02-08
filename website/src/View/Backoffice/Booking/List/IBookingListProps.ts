import { RouteComponentProps } from 'react-router-dom';

import { WithStyles } from '@material-ui/core';

import { IContainerService } from '../../../../Core/Container/IContainerService';
import { BookingListStyles } from './BookingListStyles';

interface IBookingListProps extends WithStyles<typeof BookingListStyles>, RouteComponentProps<any> {
  container: IContainerService;
}

const IBookingListProps = Symbol.for('IBookingListProps');

export { IBookingListProps };
