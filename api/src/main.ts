import { Environments } from './Config/Environments';
import { StartHttpServerCommand } from './Console/Command/StartHttpServerCommand';
import { ApplicationLoader } from './Core/Application/ApplicationLoader';
import { CreateRestaurantCommand } from './Console/Command/CreateRestaurantCommand';

(async function (): Promise<void> {
  const env = process.env.NODE_ENV as Environments || Environments.DEVELOPMENT;

  await new ApplicationLoader(env)
    .command('start-http-server', StartHttpServerCommand)
    .command('create-restaurant', CreateRestaurantCommand)
    .run();
}())
  .then(() => {
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);

    process.exit(-1);
  });
