import { ConnectionOptions, createConnection } from 'mongoose';

import { IApplicationConfiguration } from '../../../../../Config/IApplicationConfiguration';
import { IMongooseConnection } from '../Connection/IMongooseConnection';

class ConnectionFactory {
  public static create(config: IApplicationConfiguration): IMongooseConnection {
    const connectionString = config.databaseUrl();

    const options: ConnectionOptions = {
      useFindAndModify: false,
      useNewUrlParser: true
    };

    const connection = createConnection(connectionString, options);

    return connection as IMongooseConnection;
  }
}

export { ConnectionFactory };
