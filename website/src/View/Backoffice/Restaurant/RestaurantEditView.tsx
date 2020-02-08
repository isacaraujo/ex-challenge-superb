import React from 'react';
import * as _ from 'lodash';

import { withStyles, Container, Grid, Paper, Typography, InputLabel, FormControl, Select, MenuItem, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';

import AddCircle from '@material-ui/icons/AddCircle';

import BackofficeLayout from '../Layout/BackofficeLayout';
import { IRestaurantEditProps } from './IRestaurantEditProps';
import { IRestaurantEditState } from './IRestaurantEditState';
import { RestaurantEditStyles } from './Styles/RestaurantEditStyles';
import { IRestaurantRepository } from '../../../Domain/Restaurant/Repository/IRestaurantRepository';

class RestaurantEditView extends React.Component<IRestaurantEditProps, IRestaurantEditState> {
  private restaurantRepository?: IRestaurantRepository;

  public constructor(props: IRestaurantEditProps) {
    super(props);

    this.state = {
      openTime: '',
      closeTime: '',
      tablesCount: 0,
      times: _.range(0, 24),
      modalAddTableOpen: false,
    }
  }

  public async componentDidMount(): Promise<void> {
    const container = this.props.container;
    
    this.restaurantRepository = await container
      .get<IRestaurantRepository>(IRestaurantRepository);

    void this.getRestaurantInfo();
  }

  private handleConfirmAddTable(): void {
    this.setState({
      modalAddTableOpen: false,
    })
    void this.addTable();
  }

  private changeOpenTime(e: React.ChangeEvent<any>): void {
    const openTime = e.target.value;

    this.setState({
      openTime,
    });

    if (_.isEmpty(this.state.closeTime)) {
      console.info('waiting closeTime before update');

      return;
    }

    const closeTime = parseInt(this.state.closeTime);
    const openTimeInt = parseInt(openTime);

    void this.setTimeRange(openTimeInt, closeTime);
  }

  private changeCloseTime(e: React.ChangeEvent<any>): void {
    const closeTime = e.target.value;

    this.setState({
      closeTime,
    });

    if (_.isEmpty(this.state.openTime)) {
      console.info('waiting openTime before update');

      return;
    }

    const openTime = parseInt(this.state.openTime);
    const closeTimeInt = parseInt(closeTime);

    void this.setTimeRange(openTime, closeTimeInt);
  }

  private async setTimeRange(openTime: number, closeTime: number): Promise<void> {
    try {
      await this.restaurantRepository!.setTimeRange(openTime, closeTime);

      void this.getRestaurantInfo();
    } catch (error) {
      console.error('error', error);
    }
  }

  private async addTable(): Promise<void> {
    try {
      await this.restaurantRepository!.addTable();

      void this.getRestaurantInfo();
    } catch (error) {
      console.error(error);
    }
  }

  private async getRestaurantInfo(): Promise<void> {
    try {
      const restaurant = await this.restaurantRepository!.findCurrent();

      this.setState({
        openTime: String(restaurant.OpenTime),
        closeTime: String(restaurant.CloseTime),
        tablesCount: restaurant.TablesCount || 0,
      });
    } catch (error) {
      console.error(error);
    }
  }

  public render(): React.ReactNode {
    const {classes} = this.props;
    return (
      <BackofficeLayout>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Paper className={classes.paper} variant="outlined" square>
                <Grid container spacing={6}>
                  <Grid item xs={12}>
                    <Typography component="h2" variant="h6" color="primary" gutterBottom>
                      Restaurant Time Range
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <form className={classes.form}>
                      <Grid container spacing={4}>
                        <Grid item xs={6}>
                          <FormControl className={classes.formControl}>
                            <InputLabel>Open time</InputLabel>
                            <Select
                              value={this.state.openTime}
                              onChange={e => this.changeOpenTime(e)}>
                              {
                                this.state.times.map((t: number, index: number) =>
                                  <MenuItem key={index} value={`${t}`}>{_.padStart(String(t), 2, '0')}:00</MenuItem>
                                )
                              }
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                          <FormControl className={classes.formControl}>
                            <InputLabel>Close time</InputLabel>
                            <Select
                              value={this.state.closeTime}
                              onChange={e => this.changeCloseTime(e)}>
                              {
                                this.state.times.map((t: number, index: number) =>
                                  <MenuItem key={index} value={`${t}`}>{_.padStart(String(t), 2, '0')}:00</MenuItem>
                                )
                              }
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </form>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            <Grid item xs={6}>
              <Paper className={classes.paper} variant="outlined" square>
                <Grid container direction="column" justify="center" alignItems="center">
                  <Grid item>
                    <Typography component="h1" variant="h1">{this.state.tablesCount}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography component="span">Tables</Typography>
                  </Grid>
                  <Grid item className={classes.buttonAddTableContainer}>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<AddCircle />}
                      onClick={() => this.setState({modalAddTableOpen: true})}
                    >
                      Table
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <Dialog
            open={this.state.modalAddTableOpen}
            onClose={() => this.setState({ modalAddTableOpen: false })}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">New table</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Whould you like to add a new table to the restaurant?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.setState({modalAddTableOpen: false})} color="primary">
                Cancel
              </Button>
              <Button onClick={() => this.handleConfirmAddTable()} color="primary" autoFocus>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </BackofficeLayout>
    );
  }
}

export default withStyles(RestaurantEditStyles)(RestaurantEditView);
