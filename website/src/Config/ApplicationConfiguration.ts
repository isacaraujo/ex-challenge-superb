import { IApplicationConfiguration } from './IApplicationConfiguration';

class ApplicationConfiguration implements IApplicationConfiguration {
  public httpBaseUrl(): string {
    return 'http://localhost:3001';
  }
}

export { ApplicationConfiguration };
