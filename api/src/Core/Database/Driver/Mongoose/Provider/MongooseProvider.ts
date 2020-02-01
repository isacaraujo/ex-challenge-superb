import { IApplicationConfiguration } from '../../../../../Config/IApplicationConfiguration';
import { IContainerService } from '../../../../Container/IContainerService';
import { IProvider } from '../../../../Provider/IProvider';
import { IMongooseConnection } from '../Connection/IMongooseConnection';
import { ConnectionFactory } from '../Factory/ConnectionFactory';

class MongooseProvider implements IProvider {
  public constructor(private readonly container: IContainerService) {}

  public async register(): Promise<void> {
    await this.registerMongooseConnection();
  }

  private async registerMongooseConnection(): Promise<void> {
    this.container.register(
      IMongooseConnection,
      async () => {
        const config = await this.container
          .get<IApplicationConfiguration>(IApplicationConfiguration);

        const connection = ConnectionFactory.create(config);

        return connection;
      });
  }
}

export { MongooseProvider };
