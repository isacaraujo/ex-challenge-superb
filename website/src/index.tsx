import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import { ContainerFactory } from './Core/Container/Factory/ContainerFactory';
import { IContainerService } from './Core/Container/IContainerService';
import { ServiceRegistry } from './Core/Registry/ServiceRegistry';
import NewBookingView from './View/Guest/Booking/NewBookingView';
import LoginView from './View/Backoffice/Login/LoginView';
import DashboardView from './View/Backoffice/Dashboard/DashboardView';
import { IApplicationConfiguration } from './Config/IApplicationConfiguration';
import { ApplicationConfiguration } from './Config/ApplicationConfiguration';
import RestaurantEditView from './View/Backoffice/Restaurant/RestaurantEditView';

(async function () {
  const container: IContainerService = ContainerFactory.createInversify();

  container.register(
    IApplicationConfiguration,
    async () => Promise.resolve(new ApplicationConfiguration()));

  const serviceRegistry = new ServiceRegistry(container);

  await serviceRegistry.registerAll();

  ReactDOM.render(
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <NewBookingView container={container} />
          </Route>

          <Route exact path="/backoffice/login">
            <LoginView />
          </Route>

          <Route path="/backoffice">
            <DashboardView container={container} />
          </Route>

          <Route exact path="/backoffice/restaurant/edit">
            <RestaurantEditView container={container} />
          </Route>
        </Switch>
      </BrowserRouter>
    </MuiPickersUtilsProvider>,
    document.getElementById('root')
  );
}());
