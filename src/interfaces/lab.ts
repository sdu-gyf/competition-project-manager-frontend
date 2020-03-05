/*
 * @Author: your name
 * @Date: 2019-12-08 19:18:17
 * @LastEditTime : 2019-12-23 09:02:37
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labs-fronted/src/interfaces/labs.ts
 */
import { PAGE_SIZE } from './common';

export interface LabModel {
  // 实验室编码
  labCode: string;
  // 实验室名称
  labName: string;
  // 实验室列表
  address: string;
  // 容纳人数
  capacity: string;
  // 负责人
  director: string;
  // 联系电话
  contactPhone: string;
  // 描述
  description: string;
  // 创建日期
  createdAt: string;
  // 修改日期
  updatedAt: string;
}

export interface LabAssistantEditModel {
  teacherCode: string;
  // 实验员名称
  teacherName: string;

  departmentName: string;

  workCode: string;
}

export interface LabEditModel {
  // 实验室编码
  labCode: string;
  // 实验室名称
  labName: string;
  // 实验室列表
  address: string;
  // 容纳人数
  capacity: string;
  // 负责人
  director: string;
  // 联系电话
  contactPhone: string;
  // 描述
  description: string;

  labAssistantList: LabAssistantEditModel[];
}

export const defaultLabEditModel: LabEditModel = {
  // 实验室编码
  labCode: '',
  // 实验室名称
  labName: '',
  // 实验室列表
  address: '',
  // 容纳人数
  capacity: '',
  director: '',
  // 联系电话
  contactPhone: '',
  // 描述
  description: '',

  labAssistantList: [],
};

export interface LabSearchProps {
  labName?: string;
  director?: string;
  capacity?: number;
  address?: string;
  page?: number;
  pageSize?: number;
}

export const defaultLabSearchProps: LabSearchProps = {
  labName: undefined,
  director: undefined,
  capacity: undefined,
  address: undefined,
  page: 1,
  pageSize: PAGE_SIZE,
};
