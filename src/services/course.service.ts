/*
 * @作者: 李洪文
 * @公司: 山东大学
 * @文件描述: 部门管理服务
 * @LastEditors: 李洪文
 * @Date: 2019-09-13 07:27:24
 * @LastEditTime: 2019-10-30 12:02:46
 */
import { action } from 'mobx';
import HttpClient from '../utils/HttpClient';
import { BACKEND_URL, messageFail } from './common';
import { Pagination, initalPaginationValue } from '@/interfaces/common';
import {
  CourseModel,
  CourseSearchProps,
  CourseEditModel,
} from '@/interfaces/course';

import { CourseStore } from '@/stores/course.store';

export class CourseService {
  public store: CourseStore;
  private http: HttpClient;

  public constructor() {
    this.http = new HttpClient();
    this.store = new CourseStore();
  }

  @action
  public async fetchPageData(searchProps: CourseSearchProps): Promise<boolean> {
    this.store.loading = true;
    this.store.pageData = initalPaginationValue;
    try {
      const result = await this.http.postJSON<Pagination<CourseModel>>(
        `${BACKEND_URL}/course/list`,
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
  public async update(data: CourseEditModel): Promise<boolean> {
    this.store.loading = true;
    try {
      const result = await this.http.postJSON<string>(`${BACKEND_URL}/course/update`, data);
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
  public async add(data: CourseEditModel): Promise<boolean> {
    this.store.loading = true;
    try {
      const result = await this.http.postJSON<string>(`${BACKEND_URL}/course/add`, data);
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
      const result = await this.http.postJSON<string>(`${BACKEND_URL}/course/delete`, codeList);
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
