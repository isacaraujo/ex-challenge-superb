import { RouteComponentProps } from 'react-router-dom';

import { WithStyles } from '@material-ui/core';

import { IContainerService } from '../../../Core/Container/IContainerService';
import { DashboardStyles } from './Styles/DashboardStyles';

interface IDashboardProps extends RouteComponentProps<any>, WithStyles<typeof DashboardStyles> {
  container: IContainerService;
}

const IDashboardProps = Symbol.for('IDashboardProps');

export { IDashboardProps };
