import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { ContainerFactory } from './Core/Container/Factory/ContainerFactory';
import { IContainerService } from './Core/Container/IContainerService';
import { ServiceRegistry } from './Core/Registry/ServiceRegistry';
import { Home } from './Route/Home';
import { NewReservation } from './Route/NewReservation';

(async function () {
  const container: IContainerService = ContainerFactory.createInversify();

  const serviceRegistry = new ServiceRegistry(container);

  await serviceRegistry.registerAll();

  ReactDOM.render(
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/reservations/new">
          <NewReservation container={ container } />
        </Route>
      </Switch>
    </BrowserRouter>,
    document.getElementById('root')
  );
}());
