/*
 * @作者: 李洪文
 * @公司: 山东大学
 * @文件描述: file content
 * @LastEditors: 李洪文
 * @Date: 2019-09-13 07:27:24
 * @LastEditTime: 2019-10-06 10:27:58
 */
import { observable } from 'mobx';
import { DepartmentModel } from '@/interfaces/department';

import { Pagination, initalPaginationValue } from '@/interfaces/common';

export class DepartmentStore {
  // 正在获取数据状态
  @observable
  public loading: boolean;

  // 部门分页列表数据
  @observable
  public pageData: Pagination<DepartmentModel> = initalPaginationValue;

}
