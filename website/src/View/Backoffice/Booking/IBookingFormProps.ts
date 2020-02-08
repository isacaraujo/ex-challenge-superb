import { RouteComponentProps } from 'react-router-dom';

import { WithStyles } from '@material-ui/core';

import { BookingFormStyles } from './Styles/BookingFormStyles';
import { IContainerService } from '../../../Core/Container/IContainerService';

interface IBookingFormProps extends WithStyles<typeof BookingFormStyles>, RouteComponentProps<any> {
  container: IContainerService;
}

const IBookingFormProps = Symbol.for('IBookingFormProps');

export { IBookingFormProps };
