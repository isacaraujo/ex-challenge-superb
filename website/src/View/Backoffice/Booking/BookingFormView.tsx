import * as _ from 'lodash';
import moment, { Moment } from 'moment';
import React from 'react';
import { withRouter } from 'react-router-dom';

import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, Grid,
    InputLabel, MenuItem, Select, TextField, withStyles
} from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

import { IBookingRepository } from '../../../Domain/Booking/Repository/IBookingRepository';
import { IBookingFormProps } from './IBookingFormProps';
import { IBookingFormState } from './IBookingFormState';
import { BookingFormStyles } from './Styles/BookingFormStyles';
import { CreateBookingCommand } from '../../../Domain/Booking/Type/Command/CreateBookingCommand';

class BookingFormView extends React.Component<IBookingFormProps, IBookingFormState> {
  private bookingRepository?: IBookingRepository;

  public constructor(props: IBookingFormProps) {
    super(props);

    this.state = {
      modalOpen: true,
      date: null,
      time: '',
      name: '',
      email: '',
      totalGuests: '',
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
  }

  private async handleSaveClick(): Promise<void> {
    const command = CreateBookingCommand.create(
      this.state.name,
      this.state.email,
      this.state.totalGuests,
      this.state.date as Moment,
      this.state.time
    );

    try {
      await this.bookingRepository!.create(command);

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

  private handleName(e: React.ChangeEvent<any>): void {
    this.setState({
      name: e.target.value,
    });
  }

  private handleEmail(e: React.ChangeEvent<any>): void {
    this.setState({
      email: e.target.value,
    });
  }

  private handleTotalGuests(e: React.ChangeEvent<any>): void {
    this.setState({
      totalGuests: e.target.value,
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

  public render(): React.ReactNode {
    const { classes } = this.props;

    return (
      <Dialog 
        open={this.state.modalOpen}
        onClose={() => this.handleClose()}
        aria-labelledby="form-dialog-title"
        disableBackdropClick={true}
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
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

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="guestName"
                id="guestName"
                label="Name"
                autoFocus
                value={this.state.name}
                onChange={(e) => this.handleName(e)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="guestEmail"
                id="guestEmail"
                label="Email Address"
                value={this.state.email}
                onChange={(e) => this.handleEmail(e)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                type="number"
                variant="outlined"
                required
                fullWidth
                id="totalGuests"
                label="How many people?"
                name="totalGuests"
                value={this.state.totalGuests}
                onChange={(e) => this.handleTotalGuests(e)} />
            </Grid>
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

export default withRouter(withStyles(BookingFormStyles)(BookingFormView));
