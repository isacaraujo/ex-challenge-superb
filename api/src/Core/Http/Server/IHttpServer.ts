import { IHttpRoute } from './IHttpRoute';

interface IHttpServer {
  route(route: IHttpRoute): IHttpServer;
  start(host: string, port: number): Promise<void>;
}

export { IHttpServer };
