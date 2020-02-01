import * as _ from 'lodash';

import { IContainerService } from './IContainerService';
import { IContainerStrategy } from './Strategy/IContainerStrategy';

class ContainerService implements IContainerService {
  private readonly container: IContainerStrategy;

  private readonly cache: { [key: string]: any } = {};

  public constructor(container: IContainerStrategy) {
    this.container = container;
  }

  public register<T>(serviceIdentifier: symbol, service: () => Promise<T>): void {
    this.container.register<T>(serviceIdentifier, service);
  }

  public async get<T>(serviceIdentifier: symbol): Promise<T> {
    try {
      let service = this.cache[serviceIdentifier.toString()];

      if (service) {
        return service;
      }

      const factory = await this.container.get<() => T>(serviceIdentifier);

      service = factory();

      this.cache[serviceIdentifier.toString()] = service;

      return service;
    } catch (e) {
      throw e;
    }
  }
}

export { ContainerService };
