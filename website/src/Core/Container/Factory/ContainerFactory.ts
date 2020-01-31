import { IContainerService } from '../IContainerService';
import { InversifyContainerService } from '../Adapter/Inversify/InversifyContainerService';
import { ContainerService } from '../ContainerService';

class ContainerFactory {
  public static createInversify(): IContainerService {
    const adapter = new InversifyContainerService();

    return new ContainerService(adapter);
  }
}

export { ContainerFactory };
