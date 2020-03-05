/*
 * @Author: your name
 * @Date: 2019-12-08 19:18:17
 * @LastEditTime : 2019-12-23 09:02:37
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labs-fronted/src/interfaces/labs.ts
 */

import { PAGE_SIZE } from './common';

export interface TaskModel {
  // 任务编码
  taskCode: string;
  // 预约单号
  reservationCode: string;
  // 实验室编码
  labCode: string;
  // 实验教师编码
  teacherCode: string;
  // 课程编码
  courseCode: string;
  // 学生人数
  studentNum: string;
  // 联系电话
  contactPhone: string;
  // 次数
  totalCount: string;
  // 按位表示的周
  weekDayFlag: string;
  // 状态
  status: string;
  // 创建时间
  createAt: string;
  // 更改时间
  updatedAt: string;
}

export interface TaskEditModel {
  // 任务编码
  taskCode: string;
  // 预约单号
  reservationCode: string;
  // 实验室编码
  labCode: string;
  // 实验室名称
  labName: string;
  // 实验教师编码
  teacherCode: string;
  // 实验教师名称
  teacherName: string;
  // 课程编码
  courseCode: string;
  // 课程名称
  courseName: string;
  // 学生人数
  studentNum: string;
  // 联系电话
  contactPhone: string;
  // 次数
  totalCount: string;
  // 按位表示的周
  weekDayFlag: string;
  // 状态
  status: string;
}

export const defaultTaskEditModel: TaskEditModel = {
  // 任务编码
  taskCode: '',
  // 预约单号
  reservationCode: '',
  // 实验室编码
  labCode: '',
  // 实验室名称
  labName: '',
  // 实验教师编码
  teacherCode: '',
  // 实验教师名称
  teacherName: '',
  // 课程编码
  courseCode: '',
  // 课程名称
  courseName: '',
  // 学生人数
  studentNum: '',
  // 联系电话
  contactPhone: '',
  // 次数
  totalCount: '',
  // 按位表示的周
  weekDayFlag: '',
  // 状态
  status: '',
};

export interface TaskScheduleModel {
    // 计划编码
    scheduleCode: string;
    // 任务编码
    taskCode: string;
    // 实验日期
    taskDate: string;
    // 节次安排
    classFlag: string;
    // 课时数
    classCount: string;
    // 周几
    weekDay: string;
    // 到课状态
    status: string;
    // 实际到课人数
    studentNum: string;
    // 安全隐患
    securityProblem: string;
    // 实验器材损坏情况
    damage: string;
    // 实际开始时间
    arrivedAt: string;
    // 实际离开时间
    leftAt: string;
    // 创建时间
    createAt: string;
    // 更新时间
    updatedAt: string;
  }

  export interface TaskSearchProps {
    taskCode?: string;
    reservationCode?: string;
    labCode?: string;
    labName?: string;
    teacherCode?: string;
    teacherName?:string;
    courseCode?: string;
    courseName?: string;
    contactPhone?: string;
    totalCount?: string;
    status?: number;
    statusDesc?: string;
    page?: number;
    pageSize?: number;
  }
  
  export const defaultLabSearchProps: TaskSearchProps = {
    taskCode: undefined,
    reservationCode: undefined,
    labCode: undefined,
    labName: undefined,
    teacherCode: undefined,
    teacherName: undefined,
    courseCode: undefined,
    courseName: undefined,
    contactPhone: undefined,
    totalCount: undefined,
    status: undefined,
    statusDesc: undefined,
    page: 1,
    pageSize: PAGE_SIZE,
  };