import axios, { AxiosInstance } from 'axios';

import { IHttpClient } from '../../IHttpClient'
import { HttpErrorFactory } from '../../Factory/HttpErrorFactory';

class AxiosHttpClient implements IHttpClient {
  private readonly http: AxiosInstance;

  public constructor(baseUrl: string) {
    this.http = axios.create({
      baseURL: baseUrl,
      timeout: 1000,
    });
  }
  public async get<T>(path: string): Promise<T> {
    try {
      const response = await this.http.get<T>(path);

      return response.data;
    } catch (error) {
      const httpError = HttpErrorFactory.create(error);

      throw httpError;
    }
  }

  public async post<T>(path: string, payload?: any): Promise<T> {
    try {
      const response = await this.http.post<T>(path, payload);

      return response.data;
    } catch (error) {
      const httpError = HttpErrorFactory.create(error);

      throw httpError;
    }
  }

  public async put<T>(path: string, payload?: any): Promise<T> {
    try {
      const response = await this.http.put<T>(path, payload);

      return response.data;
    } catch (error) {
      const httpError = HttpErrorFactory.create(error);

      throw httpError;
    }
  }

  public async delete<T>(path: string): Promise<T> {
    try {
      const response = await this.http.delete<T>(path);

      return response.data;
    } catch (error) {
      const httpError = HttpErrorFactory.create(error);

      throw httpError;
    }
  }
}

export { AxiosHttpClient };
