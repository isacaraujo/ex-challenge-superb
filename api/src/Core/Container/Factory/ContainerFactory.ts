import { ContainerService } from '../ContainerService';
import { IContainerService } from '../IContainerService';
import { ContainerStrategies } from '../ContainerStrategies';
import { InversifyContainerService } from '../Strategy/Inversify/InversifyContainerService';

class ContainerFactory {
  public static create(strategy: ContainerStrategies): IContainerService {
    switch (strategy) {
      case ContainerStrategies.INVERSIFY:
        return ContainerFactory.getInversify();
      default:
        return ContainerFactory.getInversify();
    }
  }

  private static getInversify(): IContainerService {
    const inversify = new InversifyContainerService();

    return new ContainerService(inversify);
  }
}

export { ContainerFactory };
