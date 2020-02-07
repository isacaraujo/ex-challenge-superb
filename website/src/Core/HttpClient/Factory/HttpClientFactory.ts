import { AxiosHttpClient } from '../Adapter/Axios/AxiosHttpClient';

class HttpClientFactory {
  public static create(baseUrl: string) {
    return new AxiosHttpClient(baseUrl);
  }
}

export { HttpClientFactory };
