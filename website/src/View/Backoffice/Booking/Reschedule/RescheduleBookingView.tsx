import * as _ from 'lodash';
import moment, { Moment } from 'moment';
import React from 'react';
import { withRouter } from 'react-router-dom';

import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, Grid,
    InputLabel, MenuItem, Select, withStyles
} from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

import {
    RecordNotFoundError
} from '../../../../Domain/Booking/Error/Repository/RecordNotFoundError';
import { IBookingRepository } from '../../../../Domain/Booking/Repository/IBookingRepository';
import {
    UpdateTimeBookingCommand
} from '../../../../Domain/Booking/Type/Command/UpdateTimeBookingCommand';
import { RescheduleBookingStyles } from './RescheduleBookingStyles';
import { IRescheduleBookingProps } from './IRescheduleBookingProps';
import { IRescheduleBookingState } from './IRescheduleBookingState';

class RescheduleBookingView extends React.Component<IRescheduleBookingProps, IRescheduleBookingState> {
  private bookingRepository?: IBookingRepository;

  public constructor(props: IRescheduleBookingProps) {
    super(props);

    this.state = {
      modalOpen: true,
      bookingNotFoundError: false,
      booking: undefined,
      date: null,
      time: '',
      times: [],
    };
  }

  public async componentDidMount(): Promise<void> {
    const container = this.props.container;

    this.bookingRepository = await container
      .get<IBookingRepository>(IBookingRepository);

    const now = moment();

    this.setState({
      date: now,
    });

    void this.getAvailabilitiesByDate(now);

    const { bookingId } = this.props.match.params;

    void this.getBookingById(bookingId);
  }

  private async handleSaveClick(): Promise<void> {
    const booking = this.state.booking;

    if (undefined === booking) {
      console.log('unable to save while booking is not loaded');

      return;
    }
    const command = UpdateTimeBookingCommand.create(
      booking,
      this.state.date as Moment,
      this.state.time
    );

    try {
      await this.bookingRepository!.updateTime(command);

      this.handleClose();
    } catch (error) {
      console.error(error);
    }
  }

  private handleFormSubmit(e: React.FormEvent): void {
    e.preventDefault();
  }

  private handleDateChange(date: MaterialUiPickersDate): void {
    this.setState({
      date,
    });

    void this.getAvailabilitiesByDate(date as Moment);
  }

  private handleTime(e: React.ChangeEvent<any>): void {
    this.setState({
      time: e.target.value,
    });
  }

  private handleClose(): void {
    this.props.history.push('/backoffice');
  }

  private async getAvailabilitiesByDate(date: Moment): Promise<void> {
    try {
      const availabilities = await this.bookingRepository!  
        .getAvailabilityByDate(date);

      const nonEmptyAvailabilities = availabilities.filter(availability =>
        availability.AvailableSlots > 0);

      this.setState({
        times: nonEmptyAvailabilities,
      });
    } catch (error) {
      console.error(error);
    }
  }

  private async getBookingById(bookingId: string): Promise<void> {
    try {
      const booking = await this.bookingRepository!.findById(bookingId);

      this.setState({
        booking,
        date: booking.Date ? moment(booking.Date, 'YYYY-MM-DD') : null,
        time: booking.Time ? String(booking.Time) : '',
      });
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        this.setState({
          bookingNotFoundError: true,
        });

        return;
      }

      console.error(error);
    }
  }

  public render(): React.ReactNode {
    const { classes } = this.props;

    return (
      <Dialog 
        open={this.state.modalOpen}
        onClose={() => this.handleClose()}
        aria-labelledby="form-dialog-title"
        disableBackdropClick={true}
      >
        <DialogTitle id="form-dialog-title">New booking</DialogTitle>
        <DialogContent>
        <form
          className={classes.form}
          noValidate
          autoComplete="off"
          onSubmit={ (e) => this.handleFormSubmit(e) }
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <KeyboardDatePicker
                autoOk
                clearable
                value={ this.state.date }
                onChange={ (e) => this.handleDateChange(e) }
                format="MM/DD/YYYY"
                label="Choose a date"
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <InputLabel>Choose a time</InputLabel>
                <Select
                  value={this.state.time}
                  onChange={ (e) => this.handleTime(e) }>
                  {
                    this.state.times.map((stats: any, index: number) =>
                      <MenuItem key={index} value={`${stats.time}`}>{_.padStart(String(stats.time), 2, '0')}:00</MenuItem>
                    )
                  }
                </Select>
              </FormControl>
            </Grid>

            <Divider />
          </Grid>
        </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.handleClose()} color="primary">
            Cancel
          </Button>
          <Button onClick={() => this.handleSaveClick()} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withRouter(withStyles(RescheduleBookingStyles)(RescheduleBookingView));
