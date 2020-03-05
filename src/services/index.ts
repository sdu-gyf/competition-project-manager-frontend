/*
 * @作者: 李洪文
 * @公司: 山东大学
 * @文件描述: 服务总封装
 * @LastEditors  : Please set LastEditors
 * @Date: 2019-09-13 07:27:24
 * @LastEditTime : 2019-12-25 15:33:56
 */

import { PublicService } from './public.service';
import { DepartmentService } from './department.service';
import { LabService } from './lab.service';

export default {
  publicService: new PublicService(),
  departmentService: new DepartmentService(),
  labService: new LabService(),
};
