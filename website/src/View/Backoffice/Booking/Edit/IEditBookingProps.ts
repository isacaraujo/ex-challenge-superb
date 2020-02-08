import { RouteComponentProps } from 'react-router-dom';

import { WithStyles } from '@material-ui/core';

import { IContainerService } from '../../../../Core/Container/IContainerService';
import { EditBookingStyles } from './EditBookingStyles';

interface IEditBookingProps extends WithStyles<typeof EditBookingStyles>, RouteComponentProps<any> {
  container: IContainerService;
}

const IEditBookingProps = Symbol.for('IEditBookingProps');

export { IEditBookingProps };
