import { HttpRequestMethod } from '../../Core/Http/Type/HttpRequestMethod';
import {
    IAddRestaurantTableController
} from '../../Domain/Restaurant/Controller/IAddRestaurantTableController';
import {
    IGetRestaurantInfoController
} from '../../Domain/Restaurant/Controller/IGetRestaurantInfoController';
import {
    ISetRestaurantTimeRangeController
} from '../../Domain/Restaurant/Controller/ISetRestaurantTimeRangeController';
import { Api } from './Api';

class RestaurantRoute extends Api {
  public async register(): Promise<void> {
    await this.registerAddRestaurantTableRoute();
    await this.registerSetRestaurantTimeRangeRoute();
    await this.registerGetRestaurantInfoRoute();
  }

  private async registerAddRestaurantTableRoute(): Promise<void> {
    const controller = await this.getController(IAddRestaurantTableController);

    this.addHttpRoute({
      controller,
      methods: HttpRequestMethod.POST,
      path: '/restaurants/current/tables',
      version: RestaurantRoute.VERSION,
    });
  }

  private async registerSetRestaurantTimeRangeRoute(): Promise<void> {
    const controller = await this.getController(ISetRestaurantTimeRangeController);

    this.addHttpRoute({
      controller,
      methods: HttpRequestMethod.PUT,
      path: '/restaurants/current/timerange',
      version: RestaurantRoute.VERSION,
    });
  }

  private async registerGetRestaurantInfoRoute(): Promise<void> {
    const controller = await this.getController(IGetRestaurantInfoController);

    this.addHttpRoute({
      controller,
      methods: HttpRequestMethod.GET,
      path: '/restaurants/current',
      version: RestaurantRoute.VERSION,
    });
  }
}

export { RestaurantRoute };
