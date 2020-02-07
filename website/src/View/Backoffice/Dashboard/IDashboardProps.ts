import { RouteComponentProps } from 'react-router-dom';
import { WithStyles } from '@material-ui/core';
import { DashboardStyles } from './Styles/DashboardStyles';

interface IDashboardProps extends RouteComponentProps<any>,
  WithStyles<typeof DashboardStyles> {}

const IDashboardProps = Symbol.for('IDashboardProps');

export { IDashboardProps };
