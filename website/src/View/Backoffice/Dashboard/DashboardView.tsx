import React from 'react';
import { Link as RouterLink, Route, Switch, withRouter } from 'react-router-dom';

import { Button } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import AddCircle from '@material-ui/icons/AddCircle';

import BookingFormView from '../Booking/BookingFormView';
import BookingListView from '../Booking/BookingListView';
import BackofficeLayout from '../Layout/BackofficeLayout';
import { IDashboardProps } from './IDashboardProps';
import { IDashboardState } from './IDashboardState';
import { DashboardStyles } from './Styles/DashboardStyles';

class DashboardView extends React.Component<IDashboardProps, IDashboardState> {
  public constructor(props: IDashboardProps) {
    super(props);

    this.state = {};
  }

  public render(): React.ReactNode {
    const { classes, match } = this.props;

    const { path } = match;

    return (
      <BackofficeLayout>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
            <Button
              component={RouterLink}
              to={`${path}/bookings/new`}
              color="primary"
              variant="contained"
              startIcon={<AddCircle />}
              className={classes.buttonAddBooking}>
                Booking
            </Button>
            </Grid>
            <Grid item xs={12}>
              <BookingListView />
            </Grid>
          </Grid>
        </Container>
        <Switch>
          <Route path={`${path}/bookings/new`}>
            <BookingFormView container={this.props.container} />
          </Route>
        </Switch>
      </BackofficeLayout>
    );
  }
}

export default withRouter(withStyles(DashboardStyles)(DashboardView));
