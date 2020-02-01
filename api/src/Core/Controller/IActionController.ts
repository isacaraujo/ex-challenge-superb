import { IHttpRequest } from '../Http/Type/IHttpRequest';
import { IHttpResponse } from '../Http/Type/IHttpResponse';

interface IActionController {
  perform(request: IHttpRequest): Promise<IHttpResponse>;
}

const IActionController = Symbol.for('IActionController');

export { IActionController };
