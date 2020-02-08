import { RouteComponentProps } from 'react-router-dom';

import { WithStyles } from '@material-ui/core';

import { BookingFormStyles } from './BookingFormStyles';
import { IContainerService } from '../../../../Core/Container/IContainerService';

interface INewBookingFormProps extends WithStyles<typeof BookingFormStyles>, RouteComponentProps<any> {
  container: IContainerService;
  formSubmitted: () => void;
}

const INewBookingFormProps = Symbol.for('INewBookingFormProps');

export { INewBookingFormProps };
