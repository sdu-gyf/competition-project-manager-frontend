import { PAGE_SIZE } from './common';

export interface CourseModel {
  // 课程编码
  courseCode: string;
  // 课程号
  courseNumber: string;
  // 课程名称
  courseName: string;
  // 课程负责人
  director: string;
  // 联系电话
  contactPhone: string;
  // 描述
  description: string;
  // 创建日期
  createdAt: string;
  // 修改日期
  updatedAt: string;
  // 创建人
  createdBy: string;
  // 更新人
  updatedBy: string;
}

export interface CourseEditModel {
  // 课程编码
  courseCode: string;
  // 课程号
  courseNumber: string;
  // 课程名称
  courseName: string;
  // 课程负责人
  director: string;
  // 联系电话
  contactPhone: string;
  // 描述
  description?: string;
}

export interface CourseSearchProps {
  courseName?: string;
  director?: string;
  page?: number;
  pageSize?: number;
}

export const defaultCourseSearchProps: CourseSearchProps = {
  courseName: undefined,
  director: undefined,
  page: 1,
  pageSize: PAGE_SIZE,
};
