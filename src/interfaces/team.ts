import { PAGE_SIZE } from '@/interfaces/common';

export interface TeamModel {
  // 参赛队伍编码
  teamCode: string;
  // 队伍名字
  teamName: string;
  // 省份
  province: string;
  // 联系人
  contact: string;
  // 联系电话
  phone: string;
  // 备注
  description: string;
  // 创建时间
  createdAt: string;
  // 更新时间
  updatedAt: string;
  // 创建人
  createdBy: string;
  // 更新人
  updatedBy: string;
}


export interface TeamEditModel {
  // team名称
  teamName?: string;
  // 联系人
  contact?: string;
  // 联系电话
  phone?: string;
  // 描述
  description?: string;
  // 省份
  province?: string;
  // 队伍代码
  teamCode?: string;
}

export interface TeamSearchProps {
  teamName?: string;
  province?: string;
  contact?: string;
  page?: number;
  pageSize?: number;
}

export const defaultTeamSearchProps: TeamSearchProps = {
  teamName: undefined,
  province: undefined,
  contact:  undefined,
  page: 1,
  pageSize: PAGE_SIZE,
};
