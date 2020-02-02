import { IContainerService } from '../Core/Container/IContainerService';
import { INewable } from '../Core/Definition/INewable';
import { IHttpServer } from '../Core/Http/Server/IHttpServer';
import { HealthRoute } from './HealthRoute';
import { IRoute } from './IRoute';
import { BookingRoute } from './v1/BookingRoute';
import { RestaurantRoute } from './v1/RestaurantRoute';

class RouteRegistry {
  private static readonly REGISTERED_ROUTES: INewable<IRoute>[] = [
    HealthRoute,
    BookingRoute,
    RestaurantRoute,
  ];

  public static async registerAll(container: IContainerService, httpServer: IHttpServer): Promise<void> {
    const routesCount = RouteRegistry.REGISTERED_ROUTES.length;

    for (let i = 0; i < routesCount; i += 1) {
      await RouteRegistry.registerRoute(
        RouteRegistry.REGISTERED_ROUTES[i],
        container,
        httpServer
      );
    }
  }

  public static async registerRoute(
    newableRoute: INewable<IRoute>,
    container: IContainerService,
    httpServer: IHttpServer
  ): Promise<void> {
    const route: IRoute = new newableRoute(container, httpServer);

    await route.register();
  }
}

export { RouteRegistry };
