/*
 * @作者: 李洪文
 * @公司: 山东大学
 * @文件描述: 主页服务（包括代办、登录）
 * @LastEditors: 李洪文
 * @Date: 2019-09-13 07:27:24
 * @LastEditTime: 2019-10-30 12:02:46
 */
import { action } from 'mobx';
import HttpClient from '../utils/HttpClient';
import { BACKEND_URL, messageFail } from './common';
import { Pagination, initalPaginationValue } from '@/interfaces/common';
import { UserModel } from '@/interfaces/department';
import { UserStore } from '../stores/user.store';

export class UserService {
  public store: UserStore;
  private http: HttpClient;

  public constructor() {
    this.http = new HttpClient();
    this.store = new UserStore();
  }
  @action
  public async fetchList(name: string, page: number, pageSize: number): Promise<boolean> {
    this.store.userList = initalPaginationValue;
    try {
      const result = await this.http.get<Pagination<UserModel>>(`${BACKEND_URL}/user/list`, {
        params: { name, page, pageSize },
      });
      if (result.success) {
        this.store.userList = result.data;
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
}
