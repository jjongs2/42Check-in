import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

type CallApiFunction = (config: AxiosRequestConfig) => Promise<AxiosResponse>;

export default function useCallApi(): CallApiFunction {
  async function callApi(config: AxiosRequestConfig): Promise<AxiosResponse> {
    const headers: any = { ...config.headers };
    // headers.Authorization = `Bearer ${accessToken}`;
    return await axios({
      ...config,
      headers,
    });
  }
  return callApi;
}
