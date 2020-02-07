import React from 'react';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { ILoginProps } from './ILoginProps';
import { ILoginState } from './ILoginState';
import { LoginStyles } from './Styles/LoginStyles';

class LoginView extends React.Component<ILoginProps, ILoginState> {
  public constructor(props: ILoginProps) {
    super(props);
    this.state = {};
  }

  private handleFormSubmit(e: React.FormEvent): void {
    e.preventDefault();

    this.props.history.push('/backoffice');
  }

  public render(): React.ReactNode {
    const { classes } = this.props as any;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={(e) => this.handleFormSubmit(e)}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}

export default withRouter(withStyles(LoginStyles)(LoginView));
