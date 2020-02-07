import { IApplicationConfiguration } from '../../../Config/IApplicationConfiguration';
import { IContainerService } from '../../../Core/Container/IContainerService';
import { HttpClientFactory } from '../../../Core/HttpClient/Factory/HttpClientFactory';
import { IProvider } from '../../../Core/Provider/IProvider';
import { BookingRepository } from '../Repository/BookingRepository';
import { IBookingRepository } from '../Repository/IBookingRepository';

class BookingRepositoryProvider implements IProvider {
  public constructor(private readonly container: IContainerService) {}

  public register(): void {
    this.registerBookingRepository();
  }

  private registerBookingRepository(): void {
    this.container.register(
      IBookingRepository,
      async () => {
        const config = await this.container
          .get<IApplicationConfiguration>(IApplicationConfiguration);

        const httpClient = HttpClientFactory.create(config.httpBaseUrl());

        return new BookingRepository(httpClient);
      }
    );
  }
}

export { BookingRepositoryProvider };
