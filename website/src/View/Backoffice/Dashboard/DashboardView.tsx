import moment from 'moment';
import React from 'react';
import { withRouter } from 'react-router-dom';

import { IconButton } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import BlockIcon from '@material-ui/icons/Block';
import EditIcon from '@material-ui/icons/Edit';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

import { IDashboardProps } from './IDashboardProps';
import { IDashboardState } from './IDashboardState';
import { DashboardStyles } from './Styles/DashboardStyles';

class DashboardView extends React.Component<IDashboardProps, IDashboardState> {
  public constructor(props: IDashboardProps) {
    super(props);

    this.state = {
      selectedDate: moment(),
      bookings: [],
    };
  }

  private handleEditClick(row: any): void {
    console.log('edit id', row);
  }

  private handleCancelClick(row: any): void {
    console.log('cancel id', row);
  }

  private handleDateChange(date: MaterialUiPickersDate): void {
    this.setState({
      selectedDate: date,
    });
  }

  public render(): React.ReactNode {
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              Backoffice
            </Typography>
          </Toolbar>
        </AppBar>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
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
                          <TableCell>{booking.Name}</TableCell>
                          <TableCell>{booking.Email}</TableCell>
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
              </Grid>
            </Grid>
          </Container>
        </main>
      </div>
    );
  }
}

export default withRouter(withStyles(DashboardStyles)(DashboardView));
