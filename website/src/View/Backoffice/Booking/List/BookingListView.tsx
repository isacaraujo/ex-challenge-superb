import * as _ from 'lodash';
import moment, { Moment } from 'moment';
import React from 'react';
import { withRouter, Link as RouterLink } from 'react-router-dom';

import { UnregisterCallback, Location, History, Action } from 'history';

import {
    Grid, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography, DialogContentText,
    withStyles,
    Dialog,
    DialogTitle,
    Button,
    DialogActions,
    DialogContent
} from '@material-ui/core';
import BlockIcon from '@material-ui/icons/Block';
import EditIcon from '@material-ui/icons/Edit';
import EventIcon from '@material-ui/icons/Event';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

import { Booking } from '../../../../Domain/Booking/Entity/Booking';
import { IBookingRepository } from '../../../../Domain/Booking/Repository/IBookingRepository';
import { IBookingListProps } from './IBookingListProps';
import { IBookingListState } from './IBookingListState';
import { BookingListStyles } from './BookingListStyles';

class BookingListView extends React.Component<IBookingListProps, IBookingListState> {
  private bookingRepository?: IBookingRepository;

  private locationUnlisten?: UnregisterCallback;

  public constructor(props: IBookingListProps) {
    super(props);

    this.state = {
      selectedDate: null,
      bookings: [],
      bookingForCancel: undefined,
    };
  }

  public async componentDidMount(): Promise<void> {
    const container = this.props.container;

    this.locationUnlisten = this.props.history.listen((location: Location<History.LocationState>, action: Action): void => {
      this.handleLocationChange(location, action);
    });

    this.bookingRepository = await container
      .get<IBookingRepository>(IBookingRepository);

    const now = moment();

    this.setState({
      selectedDate: now,
    });

    void this.loadBookingsByDate(now);
  }

  public componentWillUnmount(): void {
    if (this.locationUnlisten) {
      this.locationUnlisten();

      this.locationUnlisten = undefined;
    }
  }

  private handleLocationChange(location: Location<History.LocationState>, action: Action): void {
    const date = this.state.selectedDate as Moment;

    void this.loadBookingsByDate(date);
  }

  private handleDateChange(date: MaterialUiPickersDate): void {
    this.setState({
      selectedDate: date,
    });
  }

  private handleCancelClick(booking: Booking): void {
    console.log('cancel', booking);
  }

  private async loadBookingsByDate(date: Moment): Promise<void> {
    try {
      const bookings = await this.bookingRepository!.findAllByDate(date);

      this.setState({ bookings });
    } catch (error) {
      console.error(error);
    }
  }

  private async cancelBooking(): Promise<void> {
    const booking = this.state.bookingForCancel;

    if (undefined === booking) {
      console.log('unable to cancel a booking before select it');

      return;
    }

    try {
      await this.bookingRepository!.cancel(booking);

      this.setState({
        bookingForCancel: undefined,
      });

      const date = this.state.selectedDate as Moment;

      void this.loadBookingsByDate(date);
    } catch (error) {
      console.error(error);
    }
  }

  public render(): React.ReactNode {
    const { classes, match } = this.props;
    const { path } = match;

    return (
      <>
        <Paper className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Bookings
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <KeyboardDatePicker
                autoOk
                variant="inline"
                inputVariant="outlined"
                format="MM/DD/YYYY"
                margin="none"
                id="date-picker-inline"
                value={this.state.selectedDate}
                InputAdornmentProps={{ position: "start" }}
                onChange={(date) => this.handleDateChange(date)}
                className={classes.selectDatePicker}
              />
            </Grid>
          </Grid>

          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Guests</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.bookings.map((booking, index) => (
                <TableRow key={index}>
                  <TableCell>{booking.GuestName}</TableCell>
                  <TableCell>{booking.GuestEmail}</TableCell>
                  <TableCell>{booking.Date}</TableCell>
                  <TableCell>{_.padStart(`${booking.Time}`, 2, '0') + ':00'}</TableCell>
                  <TableCell>{booking.TotalGuests}</TableCell>
                  <TableCell>{booking.Status}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      component={RouterLink}
                      to={`${path}/bookings/reschedule/${booking.Id}`}
                    >
                      <EventIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      component={RouterLink}
                      to={`${path}/bookings/edit/${booking.Id}`}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      onClick={() => this.setState({ bookingForCancel: booking })}
                    >
                      <BlockIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>

        <Dialog 
          open={this.state.bookingForCancel !== undefined}
          onClose={() => this.setState({ bookingForCancel: undefined })}
          aria-labelledby="form-dialog-title"
          disableBackdropClick={true}
        >
          <DialogTitle id="form-dialog-title">Cancel booking</DialogTitle>
          <DialogContent>
            <DialogContentText>You are about to cancel the reservation 
              of {this.state.bookingForCancel?.GuestName} scheduled
              for {this.state.bookingForCancel?.Date} at {this.state.bookingForCancel?.Time}.
              Do you like to proceed?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.setState({ bookingForCancel: undefined })}
              color="primary"
            >
              NO
            </Button>
            <Button onClick={() => this.cancelBooking()} color="primary">
              YES, go ahead!
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default withRouter(withStyles(BookingListStyles)(BookingListView));
