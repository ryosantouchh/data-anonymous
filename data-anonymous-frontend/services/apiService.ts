import axios, { AxiosRequestConfig } from "axios";
import { HTTP_METHOD } from "next/dist/server/web/http";

export const apiService = async <TData>({
  method,
  endPoint,
  data,
  config,
}: {
  method: HTTP_METHOD;
  endPoint: string;
  data?: TData;
  config?: AxiosRequestConfig & { accessToken?: string };
}) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      ...(config?.accessToken
        ? { Authorization: `Bearer ${config.accessToken}` }
        : {}),
    };

    const apiConfig: AxiosRequestConfig<TData> = {
      method,
      url: `${endPoint}`,
      ...(data || { data }),
      headers: {
        ...headers,
        // TODO: some config here
      },
      ...config,
    };

    const response = await axios(apiConfig);

    return response;
  } catch (error) {
    throw error;
  }
};
