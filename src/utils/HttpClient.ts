/*
 * @文件描述: HTTP请求封装
 * @公司: 山东大学
 * @作者: 黄建停
 * @LastEditors: 李洪文
 * @Date: 2019-05-09 13:39:27
 * @LastEditTime: 2019-10-06 10:36:43
 */

import * as qs from 'qs';
import Axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import user from './user';

export interface AjaxResponse<T> {
  code: number;
  data: T;
  result: T;
  message: string;
  msg: string;
  success: boolean;
}

function toastSuccess(response: AxiosResponse) {
  return response.data;
}

function handleError(error: AxiosError) {
  const { response } = error;
  let errorMsg = '';
  if (response) {
    switch (response.status) {
      case 400:
        errorMsg = `请求接口${response.data.path}报错，请检查参数是否合法`;
        break;
      case 500:
      case 501:
      case 502:
        errorMsg = '服务器内部错误';
        break;
    }
    return Promise.reject({
      code: response.status,
      success: false,
      data: response.data,
      message: errorMsg,
    });
  }
  return Promise.reject({
    code: 50000,
    success: false,
    message: '对不起，服务出错了',
  });
}

class HttpClient {
  public commonOption: AxiosRequestConfig = {
    baseURL: '/',
    // 查询对象序列化函数
    paramsSerializer(params) {
      return qs.stringify(params);
    },
    // 请求后的数据处理
    transformResponse: [
      data => {
        return data;
      },
    ],
    // 跨域是否带token
    withCredentials: false,
    responseType: 'json',
    // xsrf 设置
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    validateStatus(status) {
      return status >= 200 && status < 300;
    },
  };
  public axios: AxiosInstance;

  public constructor() {
    this.axios = Axios.create(this.commonOption);

    /**
     * 添加默认的请求拦截器，请求之前把token加到header中
     */
    this.axios.interceptors.request.use(
      config => {
        if (user.isLogin()) {
          config.headers.accessToken = user.getToken();
        }
        return config;
      },
      error => Promise.reject(error),
    );

    /**
     * 添加默认的响应拦截器，把成功返回且success=true的结果直接返回data
     */
    // this.axios.interceptors.response.use(
    //   (response: AxiosResponse) => {
    //     return response.data;
    //   },
    //   error => Promise.reject(error),
    // );
  }

  public get<T>(url: string, option?: AxiosRequestConfig): Promise<AjaxResponse<T>> {
    return this.axios
      .get<T>(url, option)
      .then(toastSuccess)
      .catch(handleError);
  }

  public put<T>(url: string, data?: object, option?: AxiosRequestConfig): Promise<AjaxResponse<T>> {
    return this.axios
      .put<T>(url, data, option)
      .then(toastSuccess)
      .catch(handleError);
  }

  /**
   * 表单提交
   */
  public postForm<T>(url: string, data?: object): Promise<AjaxResponse<T>> {
    return this.post<T>(url, qs.stringify(data || {}), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }

  public postJSON<T>(url: string, data?: object): Promise<AjaxResponse<T>> {
    return this.post<T>(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  private post<T>(
    url: string,
    data?: string | object,
    option?: AxiosRequestConfig,
  ): Promise<AjaxResponse<T>> {
    return this.axios
      .post<T>(url, data, option)
      .then(toastSuccess)
      .catch((error: AxiosError) => {
        if (error.response && error.response.data) {
          return error.response.data;
        }
        return handleError(error);
      });
  }
}

export default HttpClient;
