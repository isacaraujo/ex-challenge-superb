import { IApplicationConfiguration } from './IApplicationConfiguration';

class ApplicationConfiguration implements IApplicationConfiguration {
  public httpBaseUrl(): string {
    return String(process.env.REACT_APP_HTTP_BASE_URL);
  }
}

export { ApplicationConfiguration };
