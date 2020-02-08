import React from 'react';
import { withRouter } from 'react-router-dom';

import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, withStyles, DialogContentText
} from '@material-ui/core';

import { IBookingRepository } from '../../../../Domain/Booking/Repository/IBookingRepository';
import { UpdateBookingCommand } from '../../../../Domain/Booking/Type/Command/UpdateBookingCommand';

import { EditBookingState } from './EditBookingState';
import { EditBookingStyles } from './EditBookingStyles';
import { IEditBookingProps } from './IEditBookingProps';
import { RecordNotFoundError } from '../../../../Domain/Booking/Error/Repository/RecordNotFoundError';

class EditBookingView extends React.Component<IEditBookingProps, EditBookingState> {
  private bookingRepository?: IBookingRepository;

  public constructor(props: IEditBookingProps) {
    super(props);

    this.state = {
      modalOpen: true,
      name: '',
      email: '',
      totalGuests: '',
      booking: undefined,
      bookingNotFoundError: false,
    };
  }

  public async componentDidMount(): Promise<void> {
    const container = this.props.container;

    this.bookingRepository = await container
      .get<IBookingRepository>(IBookingRepository);

    const { bookingId } = this.props.match.params;

    void this.getBookingById(bookingId);
  }

  private handleFormSubmit(e: React.FormEvent): void {
    e.preventDefault();
  }

  private async handleSaveClick(): Promise<void> {
    const booking = this.state.booking;

    if (undefined === booking) {
      console.log('unable to save while booking is not loaded');

      return;
    }

    const command = UpdateBookingCommand.create(
      booking,
      this.state.name,
      this.state.email,
      this.state.totalGuests
    );

    try {
      await this.bookingRepository!.update(command);

      this.handleClose();
    } catch (error) {
      console.error(error);
    }
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

  private async getBookingById(bookingId: string): Promise<void> {
    try {
      const booking = await this.bookingRepository!.findById(bookingId);

      this.setState({
        booking,
        name: booking.GuestName || '',
        email: booking.GuestEmail || '',
        totalGuests: booking.TotalGuests ? String(booking.TotalGuests) : '',
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

    const bookingNotFound = (
      <DialogContentText>Booking not found</DialogContentText>
    );

    const editForm = (
      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={ (e) => this.handleFormSubmit(e) }
      >
        <Grid container spacing={2}>
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
    );

    return (
      <Dialog 
        open={this.state.modalOpen}
        onClose={() => this.handleClose()}
        aria-labelledby="form-dialog-title"
        disableBackdropClick={true}
      >
        <DialogTitle id="form-dialog-title">Edit booking</DialogTitle>
        <DialogContent>
          {this.state.bookingNotFoundError ? bookingNotFound : editForm}
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

export default withRouter(withStyles(EditBookingStyles)(EditBookingView));
