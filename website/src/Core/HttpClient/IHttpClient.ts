interface IHttpClient {
  get<T>(path: string): Promise<T>;

  post<T>(path: string, payload?: any): Promise<T>;

  put<T>(path: string, payload?: any): Promise<T>;

  delete<T>(path: string): Promise<T>;
}

const IHttpClient = Symbol.for('IHttpClient');

export { IHttpClient };
