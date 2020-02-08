import moment from 'moment';
import React from 'react';

import {
    Grid, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography,
    withStyles
} from '@material-ui/core';
import BlockIcon from '@material-ui/icons/Block';
import EditIcon from '@material-ui/icons/Edit';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

import { Booking } from '../../../Domain/Booking/Entity/Booking';
import { IBookingListProps } from './IBookingListProps';
import { IBookingListState } from './IBookingListState';
import { BookingListStyles } from './Styles/BookingListStyles';

class BookingListView extends React.Component<IBookingListProps, IBookingListState> {
  public constructor(props: IBookingListProps) {
    super(props);

    this.state = {
      selectedDate: null,
      bookings: [],
    };
  }

  public componentDidMount(): void {
    const now = moment();

    this.setState({
      selectedDate: now,
    });
  }

  private handleDateChange(date: MaterialUiPickersDate): void {
    this.setState({
      selectedDate: date,
    });
  }

  private handleEditClick(booking: Booking): void {
    console.log('edit', booking);
  }

  private handleCancelClick(booking: Booking): void {
    console.log('cancel', booking);
  }

  public render(): React.ReactNode {
    const {classes} = this.props;

    return (
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
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.bookings.map((booking, index) => (
              <TableRow key={index}>
                <TableCell>{booking.GuestName}</TableCell>
                <TableCell>{booking.GuestEmail}</TableCell>
                <TableCell>{booking.Date}</TableCell>
                <TableCell>{booking.Time}</TableCell>
                <TableCell>{booking.TotalGuests}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => this.handleEditClick(booking)}><EditIcon fontSize="small" /></IconButton>
                  <IconButton onClick={() => this.handleCancelClick(booking)}><BlockIcon fontSize="small" /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(BookingListStyles)(BookingListView);
