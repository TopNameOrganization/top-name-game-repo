import { api } from './api'
import { AxiosResponse } from 'axios'
import { OAuthData, serviceIdData } from "./types";

const url = '/oauth/yandex'
const query = 'service-id'
export class OAuthAPI {
  static signInWithYandex = (data: OAuthData) => {
    return api.post<string, AxiosResponse>(url, data);
  }

  static getServiceId = (redirectUrl: string) => {
    return api.get<string, AxiosResponse<serviceIdData>>(`${url}/${query}`, {
      params: {
        redirect_uri: redirectUrl
      }
    });
  }
}
