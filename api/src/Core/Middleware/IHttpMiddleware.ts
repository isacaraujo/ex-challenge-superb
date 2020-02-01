import { IHttpRequest } from '../Http/Type/IHttpRequest';
import { IHttpResponse } from '../Http/Type/IHttpResponse';

interface IHttpMiddleware {
  perform(request: IHttpRequest): Promise<IHttpResponse | undefined>;
}

export { IHttpMiddleware };
