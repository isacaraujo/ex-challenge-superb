import { RouteComponentProps } from 'react-router-dom';

import { WithStyles } from '@material-ui/core';

import { IContainerService } from '../../../Core/Container/IContainerService';
import { NewBookingStyles } from './Styles/NewBookingStyles';

interface INewBookingProps extends RouteComponentProps<any>,
    WithStyles<typeof NewBookingStyles> {
  container: IContainerService;
}

const INewBookingProps = Symbol.for('INewBookingProps');

export { INewBookingProps };
