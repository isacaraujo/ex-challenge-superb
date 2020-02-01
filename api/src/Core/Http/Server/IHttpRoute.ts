import { IActionController } from '../../Controller/IActionController';
import { IHttpMiddleware } from '../../Middleware/IHttpMiddleware';
import { HttpRequestMethod } from '../Type/HttpRequestMethod';

interface IHttpRoute {
  before?: IHttpMiddleware[];
  controller: IActionController;
  methods: HttpRequestMethod | HttpRequestMethod[];
  path: string;
  version?: string;
}

export { IHttpRoute };
