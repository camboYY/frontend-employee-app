import axios, { AxiosError, AxiosResponse } from "axios";
const token = "";
axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.headers.options = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
};
axios.interceptors.request.use((config: any) => {
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    const { data, status, config } = error.response!;
    switch (status) {
      case 400:
        console.error(data);
        break;

      case 401:
        console.error("unauthorised");
        break;

      case 404:
        console.error("/not-found");
        break;

      case 500:
        console.error("/server-error");
        break;
    }
    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

export const http = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.post<T>(url).then(responseBody),
};
