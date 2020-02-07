import { RouteComponentProps } from 'react-router-dom';

import { WithStyles } from '@material-ui/core';

import { LoginStyles } from './Styles/LoginStyles';

interface ILoginProps extends RouteComponentProps<any>, WithStyles<typeof LoginStyles> {}

const ILoginProps = Symbol.for('ILoginProps');

export { ILoginProps };
