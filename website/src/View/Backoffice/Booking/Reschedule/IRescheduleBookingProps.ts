import { RouteComponentProps } from 'react-router-dom';

import { WithStyles } from '@material-ui/core';
import { RescheduleBookingStyles } from './RescheduleBookingStyles';
import { IContainerService } from '../../../../Core/Container/IContainerService';

interface IRescheduleBookingProps extends WithStyles<typeof RescheduleBookingStyles>, RouteComponentProps<any> {
  container: IContainerService;
}

const IRescheduleBookingProps = Symbol.for('IRescheduleBookingProps');

export { IRescheduleBookingProps };
