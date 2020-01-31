import moment from 'moment';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { IContainerService } from '../Core/Container/IContainerService';
import { IBookingCreator } from '../Domain/Booking/Service/IBookingCreator';
import { IBookingStatsFinder } from '../Domain/Booking/Service/IBookingStatsFinder';
import { WorkingDay } from '../Domain/Restaurant/Entity/WorkingDay';
import {
    IRestaurantWorkingDayLoader
} from '../Domain/Restaurant/Service/IRestaurantWorkingDayLoader';
import { DayOfWeek } from '../Domain/Restaurant/Type/Enum/DayOfWeek';

enum NewReservationStep {
  RETRIEVING_SETTINGS = 'retrieving_settings',
  CHECK_AVAILABILITY = 'check_availability',
  LOADING_TABLES = 'loading_tables',
  BOOKING = 'booking',
  SUBMITING = 'submiting',
  SUBMITED = 'submited'
}

interface INewReservationProps extends RouteComponentProps<any> {
  container: IContainerService;
}

interface INewReservationState {
  step: NewReservationStep;
  date: string;
  time: string;
  name: string;
  email: string;
  totalGuests: string;
  totalTables: string;
  availableTables: string;
  workingDays: WorkingDay[];
  times: string[];
}

class NewReservationView extends React.Component<INewReservationProps, INewReservationState> {
  private workingDayLoader?: IRestaurantWorkingDayLoader;

  private bookingCreator?: IBookingCreator;

  private bookingStatsFinder?: IBookingStatsFinder;

  public constructor(props: INewReservationProps) {
    super(props);

    this.state = {
      step: NewReservationStep.RETRIEVING_SETTINGS,
      date: '',
      time: '',
      name: '',
      email: '',
      totalGuests: '',
      totalTables: '',
      availableTables: '',
      workingDays: [],
      times: [],
    };
  }

  public async componentDidMount(): Promise<void> {
    const container = this.props.container;

    this.workingDayLoader = await container
      .get<IRestaurantWorkingDayLoader>(IRestaurantWorkingDayLoader);

    this.bookingCreator = await container
      .get<IBookingCreator>(IBookingCreator);

    this.bookingStatsFinder = await container
      .get<IBookingStatsFinder>(IBookingStatsFinder);

    void this.retrieveSettings();
  }

  private async retrieveSettings(): Promise<void> {
    const workingDays = await this.workingDayLoader!.obtain();

    this.setState({
      ...this.state,
      workingDays,
      step: NewReservationStep.CHECK_AVAILABILITY,
    });
  }

  private onCheckAvailabilitySubmit(e: any): void {
    e.preventDefault();

    void this.loadBookingStats();
  }

  private async loadBookingStats(): Promise<void> {
    await this.setStateAndWait({
      ...this.state,
      step: NewReservationStep.LOADING_TABLES,
    });

    const stats = await this.bookingStatsFinder!.query({
      date: this.state.date,
      time: this.state.time,
    });

    this.setState({
      ...this.state,
      step: NewReservationStep.BOOKING,
      totalTables: String(stats.TotalTables),
      availableTables: String(stats.AvailableTables),
    })
  }

  private onBookingSubmit(e: any): void {
    e.preventDefault();

    void this.createBooking();
  }

  private async createBooking(): Promise<void> {
    await this.setStateAndWait({
      ...this.state,
      step: NewReservationStep.SUBMITING,
    });

    await this.bookingCreator!.create({
      date: this.state.date,
      time: this.state.time,
      name: this.state.name,
      email: this.state.email,
      totalGuests: this.state.totalGuests,
    });

    this.props.history.push('/');
  }

  private inputChange(field: string, e: any): void {
    this.setState({
      ...this.state,
      [field]: e.target?.value,
    });
  }

  private onChangeDate(e: any): void {
    const value = e.target.value;
    
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      this.setState({
        ...this.state,
        date: value,
        times:  [],
      });

      return;
    }

    const date = moment(value);
    const dayOfWeek = date.day() as DayOfWeek;
    const workingDays = this.state.workingDays;
    const workingDay = workingDays.find(day => day.DayOfWeek === dayOfWeek);

    this.setState({
      ...this.state,
      date: value,
      times: workingDay?.AvailableTimes || [],
    });
  }

  public render(): React.ReactNode {
    let content: React.ReactNode;

    switch (this.state.step) {
      case NewReservationStep.CHECK_AVAILABILITY:
        content = this.renderCheckAvailabilityForm();
        break;

      case NewReservationStep.BOOKING:
        content = this.renderBookingForm();
        break;

      default:
        content = this.renderLoading();
    }

    return <div>{ content }</div>;
  }

  private renderCheckAvailabilityForm():React.ReactNode {
    return (
      <div className="panel">
        <h1>When would you like to visit us?</h1>
        <form noValidate autoComplete="off" onSubmit={ e => this.onCheckAvailabilitySubmit(e) }>
          <div className="form-group">
            <label>Date:</label>
            <input
              type="text"
              name="date"
              onChange={ (e) => this.onChangeDate(e) }
              value={ this.state.date } />
          </div>

          <div className="form-group">
            <label>Time:</label>
            <select
              name="time"
              onChange={ (e) => this.inputChange('time', e) }
              value={ this.state.time }>
                { this.state.times.map((time: string) =>
                    <option key={time} value={ time }>{ time }</option>
                ) }
            </select>
          </div>
          <div className="form-group">
            <button>Check availability</button>
          </div>
        </form>
      </div>
    );
  }

  private renderBookingForm(): React.ReactNode {
    return (
      <div className="panel">
        <h1>Booking now</h1>
        <p>Selected date: {this.state.date} at {this.state.time}</p>
        <p>Total tables in restaurant: {this.state.totalTables}</p>
        <p>Available tables: {this.state.availableTables}</p>

        <form noValidate autoComplete="off" onSubmit={ (e) => this.onBookingSubmit(e) }>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              onChange={ (e) => this.inputChange('name', e) }
              value={ this.state.name } />
          </div>
          
          <div className="form-group">
            <label>Email:</label>
            <input
              type="text"
              name="email"
              onChange={ (e) => this.inputChange('email', e) }
              value={ this.state.email } />
          </div>

          <div className="form-group">
            <label>Number of guests:</label>
            <input
              type="number"
              name="totalGuests"
              onChange={ (e) => this.inputChange('totalGuests', e) }
              value={ this.state.totalGuests } />
          </div>

          <button>Booking now</button>
        </form>
      </div>
    );
  }

  private renderLoading(): React.ReactNode {
    if (this.state.step === NewReservationStep.RETRIEVING_SETTINGS) {
      return <div className="loading">Loading settings. Please wait</div>;
    }

    if (this.state.step === NewReservationStep.LOADING_TABLES) {
      return <div className="loading">Loading available tables ...</div>;
    }

    if (this.state.step === NewReservationStep.SUBMITING) {
      return <div className="loading">Booking ...</div>;
    }

    return <div className="loading">Retrieving data. Please wait</div>;
  }

  private async setStateAndWait(state: INewReservationState): Promise<void> {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }
}

const NewReservation = withRouter(NewReservationView);

export { NewReservation };
