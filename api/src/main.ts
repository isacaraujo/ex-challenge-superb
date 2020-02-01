import { Environments } from './Config/Environments';
import { StartHttpServerCommand } from './Console/Command/StartHttpServerCommand';
import { ApplicationLoader } from './Core/Application/ApplicationLoader';

(async function (): Promise<void> {
  const env = process.env.NODE_ENV as Environments || Environments.DEVELOPMENT;

  const app = new ApplicationLoader(env);

  app.command('start-http-server', StartHttpServerCommand);

  await app.run();
}())
  .then(() => {
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);

    process.exit(-1);
  });
