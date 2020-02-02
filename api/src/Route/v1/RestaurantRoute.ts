import { HttpRequestMethod } from '../../Core/Http/Type/HttpRequestMethod';
import {
    IAddRestaurantTableController
} from '../../Domain/Restaurant/Controller/IAddRestaurantTableController';
import { Api } from './Api';

class RestaurantRoute extends Api {
  public async register(): Promise<void> {
    await this.registerAddRestaurantTableRoute();
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
}

export { RestaurantRoute };
