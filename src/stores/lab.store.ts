/*
 * @作者: 李洪文
 * @公司: 山东大学
 * @文件描述: file content
 * @LastEditors  : Please set LastEditors
 * @Date: 2019-09-13 07:27:24
 * @LastEditTime : 2019-12-23 09:14:27
 */
import { observable } from 'mobx';
import { LabModel } from '@/interfaces/lab';

import { Pagination, initalPaginationValue } from '@/interfaces/common';

export class LabStore {
  // 正在获取数据状态
  @observable
  public loading: boolean;

  // 部门分页列表数据
  @observable
  public pageData: Pagination<LabModel> = initalPaginationValue;
}
