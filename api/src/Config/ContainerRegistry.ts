import { IContainerService } from '../Core/Container/IContainerService';
import { MongooseProvider } from '../Core/Database/Driver/Mongoose/Provider/MongooseProvider';
import { INewable } from '../Core/Definition/INewable';
import { LoggerProvider } from '../Core/Logger/Provider/LoggerProvider';
import { IProvider } from '../Core/Provider/IProvider';
import { ConsumerQueueProvider } from '../Core/Queue/Provider/ConsumerQueueProvider';
import { QueueProvider } from '../Core/Queue/Provider/QueueProvider';
import { BookingConsumerProvider } from '../Domain/Booking/Provider/BookingConsumerProvider';
import { BookingControllerProvider } from '../Domain/Booking/Provider/BookingControllerProvider';
import { BookingOperationProvider } from '../Domain/Booking/Provider/BookingOperationProvider';
import { BookingQueueProvider } from '../Domain/Booking/Provider/BookingQueueProvider';
import { BookingRepositoryProvider } from '../Domain/Booking/Provider/BookingRepositoryProvider';
import { BookingValidationProvider } from '../Domain/Booking/Provider/BookingValidationProvider';
import { HealthProvider } from '../Domain/Health/Provider/HealthProvider';
import {
    RestaurantControllerProvider
} from '../Domain/Restaurant/Provider/RestaurantControllerProvider';
import {
    RestaurantOperationProvider
} from '../Domain/Restaurant/Provider/RestaurantOperationProvider';
import {
    RestaurantRepositoryProvider
} from '../Domain/Restaurant/Provider/RestaurantRepositoryProvider';
import {
    RestaurantValidationProvider
} from '../Domain/Restaurant/Provider/RestaurantValidationProvider';

class ContainerRegistry {
  private static readonly REGISTERED_PROVIDERS: INewable<IProvider>[] = [
    MongooseProvider,
    LoggerProvider,
    QueueProvider,
    ConsumerQueueProvider,
    RestaurantRepositoryProvider,
    RestaurantOperationProvider,
    RestaurantValidationProvider,
    RestaurantControllerProvider,
    BookingRepositoryProvider,
    BookingOperationProvider,
    BookingValidationProvider,
    BookingControllerProvider,
    BookingQueueProvider,
    BookingConsumerProvider,
    HealthProvider,
  ];

  public static registerAll(
    container: IContainerService
  ): void {
    const providersCount = ContainerRegistry.REGISTERED_PROVIDERS.length;

    for (let i = 0; i < providersCount; i += 1) {
      ContainerRegistry.registerProvider(
        ContainerRegistry.REGISTERED_PROVIDERS[i],
        container
      );
    }
  }

  public static registerProvider(
    newableProvider: INewable<IProvider>,
    container: IContainerService
  ): any {
    const provider: IProvider = new newableProvider(container);

    provider.register();
  }
}

export { ContainerRegistry };
