/*
 * @作者: 李洪文
 * @公司: 山东大学
 * @文件描述: 部门管理服务
 * @LastEditors  : Please set LastEditors
 * @Date: 2019-09-13 07:27:24
 * @LastEditTime : 2019-12-24 15:36:23
 */
import { action } from 'mobx';
import HttpClient from '../utils/HttpClient';
import { BACKEND_URL, messageFail } from './common';
import { Pagination, initalPaginationValue } from '@/interfaces/common';
import { TaskModel, TaskSearchProps, TaskEditModel } from '@/interfaces/task';

import { TaskStore } from '@/stores/task.store';

export class TaskService {
  public store: TaskStore;
  private http: HttpClient;

  public constructor() {
    this.http = new HttpClient();
    this.store = new TaskStore();
  }

  @action
  public async fetchPageData(searchProps: TaskSearchProps): Promise<boolean> {
    this.store.loading = true;
    this.store.pageData = initalPaginationValue;
    try {
      const result = await this.http.postJSON<Pagination<TaskModel>>(
        `${BACKEND_URL}/task/list`,
        searchProps,
      );
      this.store.loading = false;
      if (result.success) {
        this.store.pageData = result.data;
        return true;
      } else {
        messageFail(result.message);
        return false;
      }
    } catch (error) {
      this.store.loading = false;
      messageFail();
      return false;
    }
  }

  @action
  public async update(data: TaskEditModel): Promise<boolean> {
    this.store.loading = true;
    try {
      const result = await this.http.postJSON<string>(`${BACKEND_URL}/task/update`, data);
      this.store.loading = false;
      if (result.success) {
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
  public async add(data: TaskEditModel): Promise<boolean> {
    this.store.loading = true;
    try {
      const result = await this.http.postJSON<string>(`${BACKEND_URL}/task/add`, data);
      this.store.loading = false;
      if (result.success) {
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
  public async delete(codeList: string[]): Promise<boolean> {
    this.store.loading = true;
    try {
      const result = await this.http.postJSON<string>(`${BACKEND_URL}/task/delete`, codeList);
      this.store.loading = false;
      if (result.success) {
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
