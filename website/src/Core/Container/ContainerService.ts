import { IContainerService } from './IContainerService';
import { IContainerAdapter } from './Adapter/IContainerAdapter';

class ContainerService implements IContainerService {
  public constructor(
    private readonly container: IContainerAdapter
  ) {}

  public register<T>(
    serviceIdentifier: symbol,
    service: () => Promise<T>
  ): void {
    this.container.register<T>(serviceIdentifier, service);
  }

  public async get<T>(serviceIdentifier: symbol): Promise<T> {
    try {
      let factory = await this.container.get<() => T>(serviceIdentifier);

      return factory();
    } catch (e) {
      return this.get<T>(serviceIdentifier);
    }
  }
}

export { ContainerService };
