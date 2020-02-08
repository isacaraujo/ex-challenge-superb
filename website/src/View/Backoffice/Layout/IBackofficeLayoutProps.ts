import { RouteComponentProps } from 'react-router-dom';

import { WithStyles } from '@material-ui/core';

import { BackofficeLayoutStyles } from './Styles/BackofficeLayoutStyles';

interface IBackofficeLayoutProps extends RouteComponentProps<any>, WithStyles<typeof BackofficeLayoutStyles> {}

const IBackofficeLayoutProps = Symbol.for('IBackofficeLayoutProps');

export { IBackofficeLayoutProps };
