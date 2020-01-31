import { BookingRepositoryProvider } from '../../Domain/Booking/Provider/BookingRepositoryProvider';
import { BookingServiceProvider } from '../../Domain/Booking/Provider/BookingServiceProvider';
import {
    RestaurantRepositoryProvider
} from '../../Domain/Restaurant/Provider/RestaurantRepositoryProvider';
import {
    RestaurantServiceProvider
} from '../../Domain/Restaurant/Provider/RestaurantServiceProvider';
import { IContainerService } from '../Container/IContainerService';
import { INewable } from '../Definition/INewable';
import { IProvider } from '../Provider/IProvider';
import { IServiceRegistry } from './IServiceRegistry';

class ServiceRegistry implements IServiceRegistry {
  private static readonly REGISTERED_PROVIDERS: INewable<IProvider>[] = [
    RestaurantRepositoryProvider,
    RestaurantServiceProvider,
    BookingRepositoryProvider,
    BookingServiceProvider,
  ];

  private readonly container: IContainerService;

  public constructor(container: IContainerService) {
    this.container = container;
  }

  public async registerAll(): Promise<void> {
    const providersLength = ServiceRegistry.REGISTERED_PROVIDERS.length;

    for (let i = 0; i < providersLength; i += 1) {
      const newableProvider = ServiceRegistry.REGISTERED_PROVIDERS[i];

      this.registerProvider(newableProvider);
    }
  }

  public registerProvider(newableProvider: INewable<IProvider>): void {
    const provider: IProvider = new newableProvider(this.container);

    provider.register();
  }
}

export { ServiceRegistry };
