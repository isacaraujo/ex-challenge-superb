import { IHttpHeaders } from './IHttpHeaders';

interface IHttpResponse {
  StatusCode: number;
  Headers: IHttpHeaders;
  Body?: string;
}

export { IHttpResponse };
