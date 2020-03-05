/*
 * @文件描述:  公共服务
 * @公司: thundersdata
 * @作者: 李洪文
 * @Date: 2019-05-31 09:24:39
 * @LastEditTime: 2019-10-06 10:29:15
 * @LastEditors: 李洪文
 */
import { action } from 'mobx';
import HttpClient from '../utils/HttpClient';
import { BACKEND_URL, messageFail } from './common';
import { UserTokenInfo } from '../interfaces/common';
import user from '@/utils/user';
import { PublicStore } from '@/stores/public.store';

export class PublicService {
  public store: PublicStore;
  private http: HttpClient;

  public constructor() {
    this.http = new HttpClient();
    this.store = new PublicStore();
  }

  @action
  public async ping() {
    try {
      const result = await this.http.get<UserTokenInfo>(`${BACKEND_URL}/system/ping`);
      return result.success;
    } catch (error) {
      return false;
    }
  }

  @action
  public async login(userId: string, password: string): Promise<boolean> {
    try {
      const result = await this.http.get<UserTokenInfo>(`${BACKEND_URL}/system/login`, {
        params: { userId, password },
      });
      if (result.success) {
        user.saveToken(result.data.accessToken);
        user.saveUserInfo(result.data.userName, '', '');
        return true;
      } else {
        messageFail(result.message);
        return false;
      }
    } catch (error) {
      messageFail();
      return false;
    }
  }

  @action
  public setMenuKeys(selectedKeys: any, openKeys: any) {
    if (selectedKeys) {
      this.store.selectedKeys = selectedKeys;
    }
    if (openKeys) {
      this.store.openKeys = openKeys;
    }
  }
}
