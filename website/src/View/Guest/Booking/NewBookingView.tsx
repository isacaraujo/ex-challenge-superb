import * as _ from 'lodash';
import moment, { Moment } from 'moment';
import React from 'react';

import {
    AppBar, Divider, FormControl, InputLabel, Link, MenuItem, Select, Toolbar, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import { DatePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

import { INewBookingProps } from './INewBookingProps';
import { INewBookingState } from './INewBookingState';
import { NewBookingStyles } from './Styles/NewBookingStyles';
import { IBookingRepository } from '../../../Domain/Booking/Repository/IBookingRepository';
import { CreateBookingCommand } from '../../../Domain/Booking/Type/Command/CreateBookingCommand';

class NewBookingView extends React.Component<INewBookingProps, INewBookingState> {
  private bookingRepository?: IBookingRepository;

  public constructor(props: INewBookingProps) {
    super(props);

    this.state = {
      date: null,
      name: '',
      email: '',
      totalGuests: '',
      totalTables: '',
      availableTables: '',
      times: [],
      time: '',
      dialog: {
        open: false,
        title: '',
        content: '',
      }
    };
  }

  public async componentDidMount(): Promise<void> {
    const container = this.props.container;

    this.bookingRepository = await container
      .get<IBookingRepository>(IBookingRepository);

    const now = moment();

    void this.handleDateChange(now);
  }

  private async handleDateChange(date: MaterialUiPickersDate): Promise<void> {
    this.setState({
      date
    });

    if (_.isEmpty(date)) {
      return;
    }

    try {
      const momentDate = date as Moment;

      const availabilities = await this.bookingRepository!.getAvailabilityByDate(momentDate);

      this.setState({
        times: availabilities,
      });
    } catch (error) {
      console.error(error);
    }
  }

  private handleTime(e: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>): void {
    const value = e.target.value as string;
    const time = parseInt(value);
    const availability = this.state.times
      .find(availability => availability.Time === time);

    if (!availability) {
      return;
    }

    this.setState({
      availableTables: String(availability.AvailableSlots),
      time: value,
    });
  }

  private handleName(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    const value = e.target.value as string;

    this.setState({
      name: value,
    });
  }

  private handleEmail(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    const value = e.target.value as string;

    this.setState({
      email: value,
    });
  }

  private handleTotalGuests(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    const value = e.target.value as string;

    this.setState({
      totalGuests: value,
    });
  }

  private handleDialogClose(): void {
    this.setState({
      dialog: {
        open: false,
        title: '',
        content: '',
      }
    });
  }

  private async handleFormSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    const command = CreateBookingCommand.create(
      this.state.name,
      this.state.email,
      this.state.totalGuests,
      this.state.date as Moment,
      this.state.time
    );

    try {
      const booking = await this.bookingRepository!.create(command);

      const date = booking.ReservationDate.format('MMMM Do [at] ha');

      if (booking.IsScheduled) {
        this.presentDialog(
          'You are in the queue',
          `Your reserved was scheduled to ${date} and if anyone resign we will call you!`
        );
        
        this.resetForm();

        return;
      }

      this.presentDialog(
        'Your booking is confirmed!',
        `You just need to go to the restaurant in ${date}`
      );

      this.resetForm();
    } catch (error) {
      console.error(error);
    }
  }

  private resetForm(): void {
    this.setState({
      date: null,
      name: '',
      email: '',
      totalGuests: '',
      totalTables: '',
      availableTables: '',
      times: [],
      time: '',
    });
  }

  private presentDialog(title: string, content: string): void {
    this.setState({
      dialog: {
        open: true,
        title,
        content,
      }
    });
  }

  public render(): React.ReactNode {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>Superb</Typography>
            <Link color="inherit" href="/backoffice/login">Backoffice</Link>
          </Toolbar>
        </AppBar>
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Booking
            </Typography>
            <form
              className={classes.form}
              noValidate
              autoComplete="off"
              onSubmit={ (e) => this.handleFormSubmit(e) }>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <DatePicker
                    disablePast
                    autoOk
                    initialFocusedDate={undefined}
                    orientation="landscape"
                    variant="static"
                    openTo="date"
                    value={ this.state.date }
                    onChange={ (e) => this.handleDateChange(e) }
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

                { this.getAvailabilityWarning() }

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

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}>
                Booking Now
              </Button>
            </form>
          </div>
        </Container>

        <Dialog
          open={this.state.dialog.open}
          onClose={() => this.handleDialogClose()}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{this.state.dialog.title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.state.dialog.content}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleDialogClose()} color="primary" autoFocus>Ok</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  private getAvailabilityWarning(): React.ReactNode {
    if (_.isEmpty(this.state.time)) {
      return <p></p>;
    }

    const { classes } = this.props;
    const available = parseInt(this.state.availableTables);
    const formatDate = this.state.date!.format('MMMM Do');
    const formatHour = _.padStart(this.state.time, 2, '0') + ':00';

    if (available) {
      return (
        <Alert severity="info" className={classes.availabilityAlert}>
          There are {available} tables available
          in {formatDate} at {formatHour}<br />
          Don't waste more time and booking now!
        </Alert>
      );
    }

    return (
      <Alert severity="warning" className={classes.availabilityAlert}>
        Sorry, but all tables were reserved
        for ${formatDate} at {formatHour}.<br />
        You can choose another date or time,
        or wait for some other cancel the reservation.</Alert>
    );
  }
}

export default withStyles(NewBookingStyles)(NewBookingView);
